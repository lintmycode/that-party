import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabaseClient.js'
import emailjs from '@emailjs/browser';

export const usePartyStore = defineStore('party', () => {
  const loading = ref(false)
  const attendees = ref([{ name: '', isChild: false }])
  const contributions = ref([])
  const contact = ref({ email: '', message: '' })

  function attendeesOk() {
    return attendees.value.every((a) => a.name.trim().length > 0)
  }

  function contactOk() {
    return /\S+@\S+\.\S+/.test(contact.value.email)
  }

  async function getAvailableContributions() {
    loading.value = true
    
    let availableContributions = []
    const { data, error } = await supabase
      .from('categories')
      .select(`
        id,
        name,
        contributions (
          id,
          name,
          qty
        )
      `);

    if (error) {
      console.error("Error fetching data:", error);
    } else {
      availableContributions = data
    }

    console.log('availableContributions', availableContributions)
    loading.value = false
    return availableContributions
  }

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
        attendees_data: {
          name: attendees.value[0].name,
          guests: attendees.value,
          email: contact.value.email, 
          message: contact.value.message,
          contributions: contributions.value
        },
        contributions_data: updatedContributions
      });

      if (error) throw error;

    } catch (error) {
      console.error("Transaction failed:", error);
      loading.value = false;
      return false;
    }
    // end transaction
    let message = `
      <b>Quem Vai</b><br>
      ${attendees.value.map(a => '- ' + a.name + (a.isChild ? ' (criança)' : '')).join('<br>')}
      <br><br>
      <b>O Que Levo</b><br>
      ${contributions.value.map(c => '- ' + c.name + (c.qty > 1 ? ' (x' + c.qty + ')' : '')).join('<br>')}
      <br><br>
      <b>Contacto</b><br>
      ${'- ' + contact.value.email + '<br>- ' + contact.value.message}
    `;
    sendEmail(contact.value.email, attendees.value[0].name, message)
    loading.value = false
    return true
  }

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
