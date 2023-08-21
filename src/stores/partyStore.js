import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabaseClient.js'
import emailjs from '@emailjs/browser';

export const usePartyStore = defineStore('party', () => {
  const loading = ref(false)
  const attendees = ref([{ name: '', isChild: false }])
  const contributions = ref([])
  const contact = ref({ email: '', message: '' })
  const guests = ref({total: 0, adults: 0, children: 0})

  /**
   * attendees array is ok if all entries have a name
   */
  function attendeesOk() {
    return attendees.value.every((a) => a.name.trim().length > 0)
  }

  /**
   * contact object is ok if email is valid
   */
  function contactOk() {
    return /\S+@\S+\.\S+/.test(contact.value.email)
  }

  /** 
   * get available contributions and the necessary qty for each, 
   * by merging the number of registered attendees with the current attendees list, 
   * and subtracting the already added contribution items
   */
  async function getAvailableContributions() {
    loading.value = true
    
    // get available contributions
    let availableContributions = []
    const { data, error } = await supabase
      .from('categories')
      .select(`
        id,
        name,
        contributions (
          id,
          name,
          qtyper10adults,
          qtyper10children
        )
      `);

    if (error) {
      console.error("Error fetching data:", error);
    } else {
      availableContributions = data

      // get already added contributions
      const { data: attendeeContributions } = await supabase.from('attendee_contributions').select('*');

      // get and merge existing guests with current attendees list
      guests.value = await getMergedAttendeesCount()
      
      // for each category contributions, calculate the necessary quantity
      availableContributions.forEach(category => {
        category.contributions.forEach(contribution => {        
          const totalQtyRequired = Math.ceil(
            guests.value.adults / 10 * contribution.qtyper10adults + 
            guests.value.children / 10 * contribution.qtyper10children
          );

          // subtract already selected quantities for this contribution
          const existingQty = 
            attendeeContributions.filter(ac => ac.contribution_id === contribution.id).length;
          
          // save qty to make the item available in the form 
          contribution.availableQty = totalQtyRequired - existingQty;
        })
      })
    }

    // console.log('availableContributions', availableContributions)
    // console.log('guests', guests.value)
    loading.value = false
    return availableContributions
  }

  /**
   * submit form and send confirmation email
   */
  async function submit() {
    loading.value = true
    let updatedContributions = []

    try {
      // refresh available contributions quantities from db
      const { data: currentContributions, error } = await supabase
        .from('contributions')
        .select('*');
  
      if (error) throw error
  
      // update available contributions quantities
      for (let contribution of contributions.value) {
        // find the matching contribution from the fetched data
        const currentContribution = currentContributions.find(c => c.id === contribution.id);
        
        if (currentContribution) {
          currentContribution.qty -= contribution.qty;
        }

        updatedContributions.push(currentContribution)
      }

    } catch (error) {
      console.error("Error updating contributions:", error);
      loading.value = false;
      return false;
    }

    // begin transaction
    try {
      const { data, error } = await supabase.rpc('save_data', {
        attendee_data: {
          name: attendees.value[0].name,
          email: contact.value.email, 
          message: contact.value.message,
        },
        guests_data: attendees.value,
        contributions_data: updatedContributions
      });

      if (error) throw error;

    } catch (error) {
      console.error("Transaction failed:", error);
      loading.value = false;
      return false;
    }
    // end transaction

    // build and send confirmation email
    let message = `
      <b>Quem Vai</b><br>
      ${attendees.value.map(a => '- ' + a.name + (a.isChild ? ' (criança)' : '')).join('<br>')}
      <br><br>
      <b>O Que Levo</b><br>
      ${contributions.value.map(c => '- ' + c.name + (c.qty > 1 ? ' (x' + c.qty + ')' : '')).join('<br>')}
      <br><br>
      <b>Contacto</b><br>
      ${'- ' + contact.value.email + (contact.value.message.trim().length > 0 ? '<br>- ' + contact.value.message : '')}
    `;
    sendEmail(contact.value.email, attendees.value[0].name, message)
    loading.value = false
    return true
  }

  /**
   * send email aux function
   */
  async function sendEmail(toEmail, toName, message) {
    try {
      emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID, 
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { to_email: toEmail, to_name: toName, message: message },
        import.meta.env.VITE_EMAILJS_KEY)
        .then((result) => {}, (error) => {});
    } catch (error) {
      console.error("Email failed:", error);
      return false;
    }
    return true;
  }

  /**
   * fetch all the guests from db and filter by adult and children
   */
  async function fetchAttendeesCount() {
    const { data, error } = await supabase.from('guests').select('*');

    if (!error) {
      const total = data.length;
      const adults = data.filter(guest => !guest.isChild).length;
      const children = data.filter(guest => guest.isChild).length;
    
      return { total, adults, children };
    } else {
      console.error("Error fetching guests:", error);
    }
  }

  /**
   * merge guests from db with current attendees list
   */
  async function getMergedAttendeesCount() {
    const attendeesCount = await fetchAttendeesCount();
    if (!attendeesCount) return null;
  
    const currentAdults = attendees.value.filter(a => !a.isChild).length;
    const currentChildren = attendees.value.filter(a => a.isChild).length;
  
    return {
      total: attendeesCount.total + attendees.value.length,
      adults: attendeesCount.adults + currentAdults,
      children: attendeesCount.children + currentChildren
    };
  }

  return {
    loading,
    attendees,
    contributions,
    contact,
    attendeesOk,
    contactOk,
    getAvailableContributions,
    submit,
    sendEmail,
  }
})
