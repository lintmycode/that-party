import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePartyStore = defineStore('party', () => {

  const attendees = ref([{name: '', isChild: false}])
  const contributions = ref([])
  const contact = ref({email: '', message: ''})

  function attendeesOk() {
    return attendees.value.every(a => a.name.trim().length > 0)
  }

  function contactOk() {
    return /\S+@\S+\.\S+/.test(contact.value.email)
  }

  async function getAvailableContributions() {
    return [
      {
        id: 1,
        name: "Para a grelha",
        items: [
          { name: "Frango", qty: 10 },
          { name: "Costelinha", qty: 20 },
          { name: "Hamburgeres", qty: 10 },
          { name: "Chouriço", qty: 20 },
          { name: "Toscanas", qty: 20 },
        ],
      },
      {
        id: 2,
        name: "Sobremesas",
        items: [
          { name: "Aletria", qty: 10 },
          { name: "Bolo de noiva", qty: 10 },
        ]
      },
      {
        id: 3,
        name: "Bebidas alcoólicas",
        items: [
          { name: "Vinho branco", qty: 10 },
          { name: "Vinho alvarinho", qty: 10 },
          { name: "Vinho rosé", qty: 10 },
          { name: "Gin + tónica (pack 6)", qty: 10 },
          { name: "Cerveja (pack 6)", qty: 10 },
        ]
      },
      {
        id: 4,
        name: "Bebidas não-alcoólicas",
        items: [
          { name: "Água das Pedras (pack 6)", qty: 20 },
          { name: "Coca-cola (1.5l)", qty: 10 },
          { name: "Seven-up (1.5l)", qty: 10 },
          { name: "Ice Tea (1.5l)", qty: 10 },
          { name: "Fanta / Sumol (1.5l)", qty: 10 },
          { name: "Sumos de fruta (1l)", qty: 10 },
        ]
      },
    ]
  }
  
  return {
    attendees, contributions, contact,
    attendeesOk, contactOk,
    getAvailableContributions,
  }
})
