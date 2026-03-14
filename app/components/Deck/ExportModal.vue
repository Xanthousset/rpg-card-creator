<template>
  <div class="relative bg-black flex flex-col items-center gap-24 rounded-2xl p-12" id="deck-modal">
    <div v-if="progress != 100" class="h-10/12">
      <CardPreview v-if="currentCard" :card="currentCard" :key="currentCard.id" />





    </div>

    <div v-else >
      Export fini
    </div>

    <PrintCard v-if="currentCard" :card="currentCard" :key="currentCard.id" ref="cardPreview" />


    <div class="h-2/12">

      <UProgress v-model="progress" />

      <UInput v-model="deckName" placeholder="Deck name"></UInput>

      <UButton @click="startExport">START EXPORT</UButton>

      <UButton @click="startExportPDF">Export to PDF</UButton>

    </div>

  </div>
</template>

<script setup lang="ts">
import { Card } from '~/models/Card'
import CardPreview from "~/components/Cards/CardPreview.vue";
import {convertToPng, exportDeckToPDF, prepareCardsPng, zipAndDownload} from "~/composables/useExports";
import PrintCard from "~/components/Cards/PrintCard.vue";

const deckStore = useDeckStore()

const cards = computed( () => deckStore.cards)
const currentIndex = ref<number>(0)
const deckName = ref<string>('')
const preview = useTemplateRef<HTMLElement>('cardPreview')

const progress = computed(() => {

  if (!currentIndex.value) {
    return 0
  }


  return currentIndex.value / cards.value.length * 100
})

const currentCard = computed(() => cards.value[currentIndex.value])

const startExport = async () => {
  const deckFiles = [];
  for (const card of cards.value) {
    const file = await convertCardToPng(card);
    deckFiles.push(file);
  }
  zipAndDownload(deckFiles , deckName.value);
};

const startExportPDF = async () => {
  const deckFiles = [];
  for (const card of cards.value) {
    const file = await prepareCardsForPdf(card);
    deckFiles.push(file);
  }
  console.log(deckFiles);

  await exportDeckToPDF(deckFiles , deckName.value)

};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const convertCardToPng = async (card: Card) => {
  // Attends que le composant soit mis à jour avec la bonne carte
  await nextTick();
  const cardObject = await convertToPng(preview.value.rootElement, card.name);

  currentIndex.value++;
  await delay(500); // Attend 500ms avant de continuer
  return cardObject;
};

const prepareCardsForPdf = async (card: Card) => {
  // Attends que le composant soit mis à jour avec la bonne carte
  await nextTick();
  const cardObject = await prepareCardsPng(preview.value.rootElement, card.name) as string;

  console.log('aaaa')
  currentIndex.value++;
  await delay(500); // Attend 500ms avant de continuer
  return cardObject;
};




</script>

<style scoped>
#deck-modal {
  width: 60vw;
  aspect-ratio: 2/1.5;
}
</style>
