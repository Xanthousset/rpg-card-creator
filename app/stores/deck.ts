import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { Card } from '~/models/Card';

export const useDeckStore = defineStore('deck', () => {
  const cards = reactive<Card[]>([]);
  const editingCard = ref<Card>()
  const backImage = ref<File | string | null>(null);
  const backImageUrl = ref<string | null>(null);
  const isEditing = ref<boolean | null>(false);

  function addCard(card: Card) {
    cards.push(reactive(card));
  }

  function removeCard(id: string) {
    const index = cards.findIndex(c => c.id === id);

    if (index !== -1) {
      const card = cards[index];
      card?.destroy()
      cards.splice(index, 1);
    }
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

      const card = cards[index];

      card.id = updatedCard.id;
      card.level = updatedCard.level;
      card.icon = updatedCard.icon;
      card.element = updatedCard.element;
      card.range = updatedCard.range;
      card.duration = updatedCard.duration;
      card.defense = updatedCard.defense;
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
      if (originalCard.duration !== undefined) newCard.duration = originalCard.duration;
      if (originalCard.range !== undefined) newCard.range = originalCard.range;
      if (originalCard.element !== undefined) newCard.element = originalCard.element;

      addCard(newCard);
    }
  }



  const createBackCardUrl = computed(() => {

    if (!backImage.value) return '/img/templates/witcher/back-default.png';
    return typeof backImage.value === 'string'
      ? backImage.value
      : URL.createObjectURL(backImage.value);

  })

  function orderDeck(orderBy: string, asc: boolean = true) {
    if (cards?.length < 1) return cards;

    cards.sort((a, b) => {
      // Comparaison principale
      const valueA = a[orderBy as keyof typeof a];
      const valueB = b[orderBy as keyof typeof a];

      // Comparaison pour les chaînes de caractères
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        const primaryComparison = asc
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
        if (primaryComparison !== 0) return primaryComparison;
      }
      // Comparaison pour les nombres
      else if (typeof valueA === 'number' && typeof valueB === 'number') {
        const primaryComparison = asc
          ? valueA - valueB
          : valueB - valueA;
        if (primaryComparison !== 0) return primaryComparison;
      }
      // Par défaut, convertir en chaîne et comparer
      else {
        const primaryComparison = asc
          ? String(valueA).localeCompare(String(valueB))
          : String(valueB).localeCompare(String(valueA));
        if (primaryComparison !== 0) return primaryComparison;
      }

      // Si les valeurs sont égales, trier par 'name' (par ordre alphabétique croissant)
      const nameA = a.name;
      const nameB = b.name;
      return typeof nameA === 'string' && typeof nameB === 'string'
        ? nameA.localeCompare(nameB)
        : 0;
    });
  }

  return {
    cards,
    editingCard,
    isEditing,
    backImage,
    addCard,
    removeCard,
    updateCard,
    getCardById,
    setEditingCard,
    duplicateCard,
    orderDeck,
    createBackCardUrl
  };
});
