import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { Card } from '~/models/Card';

export const useDeckStore = defineStore('deck', () => {
  const cards = reactive<Card[]>([]);
  const editingCard = ref<Card>()
  const backImage = ref<File | string | null>(null);

  function addCard(card: Card) {
    cards.push(reactive(card));
  }

  function removeCard(id: string) {
    const index = cards.findIndex(c => c.id === id);
    if (index !== -1) cards.splice(index, 1);
  }

  function getCardById(id: string): Card | undefined {
    return cards.find(c => c.id === id);
  }

  function setEditingCard(card: Card) {
    editingCard.value = card
  }

  function updateCard(updatedCard: Card) {

    const index = cards.findIndex(card => card.id === updatedCard.id);

    if (index !== -1) {
      // Reconstruit une instance de Card avec les données mises à jour
      cards[index] = new Card(
        updatedCard.name,
        updatedCard.image,
        updatedCard.description,
        updatedCard.cost
      );
      // Copie les propriétés optionnelles
      cards[index].id = updatedCard.id;
      cards[index].level = updatedCard.level;
      cards[index].icon = updatedCard.icon;
      cards[index].defense = updatedCard.defense;
    }

  }

  function duplicateCard(id: string , nb: number = 1) {
    const originalCard = getCardById(id);
    if (!originalCard) return;

    for (let i = 0; i < nb; i++) {
      const newCard = new Card(
        originalCard.name,
        originalCard.image,
        originalCard.description,
        originalCard.cost,
      );
      // Copie les propriétés optionnelles si elles existent
      if (originalCard.level !== undefined) newCard.level = originalCard.level;
      if (originalCard.icon !== undefined) newCard.icon = originalCard.icon;
      if (originalCard.defense !== undefined) newCard.defense = originalCard.defense;

      addCard(newCard);
    }
  }

  const createBackCardUrl = computed(() => {

    console.log(backImage.value)

      if(backImage.value === null || backImage.value === undefined) {
        return '/img/placeholder.png';
      }
      if(typeof backImage.value === 'string') {
        return backImage.value;
      }
      return URL.createObjectURL(backImage.value)

  })

  return {
    cards,
    editingCard,
    addCard,
    removeCard,
    updateCard,
    getCardById,
    setEditingCard,
    duplicateCard,
    createBackCardUrl
  };
});
