// import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useContributionStore = defineStore('contribution', () => {

  async function getAvailableContributions() {
    return {
      grill: {
        name: "Para a grelha",
        items: [
          { name: "Frango", qty: 10 },
          { name: "Costelinha", qty: 20 },
          { name: "Carne 🐄", qty: 10 },
          { name: "Chouriço", qty: 20 },
          { name: "Toscanas", qty: 20 },
        ]
      },
      desserts: {
        name: "Sobremesas",
        items: [
          { name: "Aletria", qty: 10 },
          { name: "Bolo de noiva", qty: 10 },
        ]
      },
      booze: {
        name: "Bebidas alcoólicas",
        items: [
          { name: "Vinho branco", qty: 10 },
          { name: "Vinho alvarinho", qty: 10 },
          { name: "Vinho rosé", qty: 10 },
          { name: "Gin + tónica (pack 6)", qty: 10 },
          { name: "Cerveja (pack 6)", qty: 10 },
        ]
      },
      softdrinks: {
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
      other: {
        name: "Outros",
        items: [
          { name: "Comida/bebida?", qty: -1 },
          { name: "Serviços?", qty: -1 },
        ]
      },
    }
  }
  
  return {
    getAvailableContributions,
  }
})
