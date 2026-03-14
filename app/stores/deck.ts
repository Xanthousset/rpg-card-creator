import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { Card } from '~/models/Card';

export const useDeckStore = defineStore('deck', () => {
  const cards = reactive<Card[]>([]);

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

  return { cards, addCard, removeCard, getCardById , duplicateCard };
});
