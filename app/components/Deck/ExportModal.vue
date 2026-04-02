<template>
  <div class="relative bg-black flex flex-col items-center gap-24 rounded-2xl p-12" id="deck-modal">
<!--    <div v-if="progress != 100" class="w-full h-10/12">-->

<!--&lt;!&ndash;        <UCarousel v-slot="{ item , index }"&ndash;&gt;-->
<!--&lt;!&ndash;                   :items="cards"&ndash;&gt;-->
<!--&lt;!&ndash;                   :ui="{ item: 'basis-1/3' }"&ndash;&gt;-->
<!--&lt;!&ndash;                   ref="carousel"&ndash;&gt;-->
<!--&lt;!&ndash;                   :containScroll="false"&ndash;&gt;-->

<!--&lt;!&ndash;        >&ndash;&gt;-->
<!--&lt;!&ndash;          <CardPreview :card="item" :key="item.id" class="slide" :class="{'active' : index === currentIndex}" />&ndash;&gt;-->

<!--&lt;!&ndash;        </UCarousel>&ndash;&gt;-->


<!--    </div>-->

    <DeckExportAnimation v-if="progress != 100" :cards="cards" :index="currentIndex" />

    <div v-else >
      Export fini
    </div>

    <PrintCard v-if="currentCard" :card="currentCard" :key="currentCard.id" ref="cardPrint" />
    <PrintBack ref="backPrint"/>


    <div class="h-2/12">

      <UProgress v-model="progress" />

      <UInput v-model="deckName" placeholder="Deck name"></UInput>

      <UButton @click="startExport">Export to PNG</UButton>

      <UButton @click="startExportPDF">Export to PDF</UButton>

    </div>

  </div>
</template>

<script setup lang="ts">
import { Card } from '~/models/Card'
import CardPreview from "~/components/Cards/CardPreview.vue";
import {convertToPng, exportDeckToPDF, prepareCardsPng, zipAndDownload} from "~/composables/useExports";
import PrintCard from "~/components/Cards/PrintCard.vue";
import PrintBack from "~/components/Cards/Back/PrintBack.vue";
import BackPreview from "~/components/Cards/Back/BackPreview.vue";
import DeckExportAnimation from "~/components/Deck/DeckExportAnimation.vue";

const deckStore = useDeckStore()

const cards = computed( () => deckStore.cards)
const currentIndex = ref<number>(0)
const carousel = useTemplateRef('carousel')
const deckName = ref<string>('')
const cardPrintRef = useTemplateRef<HTMLElement>('cardPrint')
const backPrintRef = useTemplateRef<HTMLElement>('backPrint')

const progress = computed(() => {

  if (!currentIndex.value) {
    return 0
  }


  return currentIndex.value / cards.value.length * 100
})

const currentCard = computed(() => cards.value[currentIndex.value])
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const startExport = async () => {
  const deckFiles = [];
  for (const card of cards.value) {
    const file = await convertCardToPng(cardPrintRef.value.rootElement , card.name);
    deckFiles.push(file);
  }

  const backFile = await convertCardToPng(backPrintRef.value.rootElement, backPrintRef.value.name)

  deckFiles.push(backFile);

  zipAndDownload(deckFiles , deckName.value);
};

const startExportPDF = async () => {
  const deckFiles = [];
  for (const card of cards.value) {
    const file = await prepareCardsForPdf(cardPrintRef.value.rootElement , card.name);
    deckFiles.push(file);
  }

  const backFile = await prepareCardsForPdf(backPrintRef.value.rootElement, backPrintRef.value.name)
  deckFiles.push(backFile);

  await exportDeckToPDF(deckFiles , deckName.value)
};

const convertCardToPng = async (element : HTMLElement , name: string) => {
  // Attends que le composant soit mis à jour avec la bonne carte
  await nextTick();
  const cardObject = await convertToPng(element, name);
  currentIndex.value++;
  carousel.value?.emblaApi?.scrollTo(currentIndex.value)
  await delay(500); // Attend 500ms avant de continuer
  return cardObject;
};

const prepareCardsForPdf = async (element: HTMLElement, name: string) => {
  // Attends que le composant soit mis à jour avec la bonne carte
  await nextTick();
  const cardObject = await prepareCardsPng(element, name) as string;
  currentIndex.value++;
  carousel.value?.emblaApi?.scrollTo(currentIndex.value)
  await delay(500); // Attend 500ms avant de continuer
  return cardObject;
};

</script>

<style scoped>

#deck-modal {
  overflow: visible;
  width: 60vw;
  aspect-ratio: 2/1.5;
}

.slide {
  opacity: .5;
  &.active {
    opacity: 1;
  }
}

</style>
