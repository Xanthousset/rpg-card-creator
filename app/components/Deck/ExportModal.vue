<template>
  <div class="relative bg-gray flex flex-col items-center gap-12 rounded-2xl p-12" id="deck-modal">
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
    <BackPreview v-else class="final-card" />
    <PrintCard v-if="currentCard" :card="currentCard" :key="currentCard.id" ref="cardPrint" />
    <PrintBack ref="backPrint"/>

    <div class="w-4/12">
      <div class="text-xl text-center mb-4" >
        {{ progressMessage }}
      </div>
      <UProgress v-if="progressMessage.includes('Compressing') || progressMessage.includes('PDF')"   />
      <UProgress v-else v-model="progress"  />
    </div>

    <div class="flex flex-col items-center h-2/12">

      <UInput class="w-full"
              v-model="deckName"
              :ui="{
                base : 'bg-black text-white ring-none'
              }"
              placeholder="Deck name"
      ></UInput>

      <div class="mt-4 flex gap-4 justify-center">
        <ButtonCTA @click="startExport" text="Export to PNG"/>
        <ButtonCTA @click="startExportPDF" text="Export to PDF"/>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import {convertToPng, exportDeckToPDF, prepareCardsPng, zipAndDownload} from "~/composables/useExports";
import PrintCard from "~/components/Cards/PrintCard.vue";
import PrintBack from "~/components/Cards/Back/PrintBack.vue";
import DeckExportAnimation from "~/components/Deck/DeckExportAnimation.vue";
import ButtonCTA from "~/components/UI/ButtonCTA.vue";
import BackPreview from "~/components/Cards/Back/BackPreview.vue";

const deckStore = useDeckStore()

const cards = computed( () => deckStore.cards)
const currentIndex = ref<number>(0)
const carousel = useTemplateRef('carousel')
const deckName = ref<string>('')
const cardPrintRef = useTemplateRef<HTMLElement>('cardPrint')
const backPrintRef = useTemplateRef<HTMLElement>('backPrint')
const progressMessage = ref<string>('')

const progress = computed(() => {

  if (!currentIndex.value) {
    return 0
  }

  return currentIndex.value / (cards.value.length + 1) * 100
})

const currentCard = computed(() => cards.value[currentIndex.value])
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const startExport = async () => {
  const deckFiles = [];
  progressMessage.value = "Converting cards"
  for (const card of cards.value) {
    const file = await convertCardToPng(cardPrintRef.value.rootElement , card.name);
    deckFiles.push(file);
  }
  progressMessage.value = "Compressing cards"

  const backFile = await convertCardToPng(backPrintRef.value.rootElement, backPrintRef.value.name)

  deckFiles.push(backFile);

  await zipAndDownload(deckFiles , deckName.value);

  progressMessage.value = "Export completed"

  currentIndex.value = 0
};

const startExportPDF = async () => {
  progressMessage.value = "Converting cards"
  const deckFiles = [];
  for (const card of cards.value) {
    const file = await prepareCardsForPdf(cardPrintRef.value.rootElement , card.name);
    deckFiles.push(file);
  }
  progressMessage.value = "Exporting to PDF"

  const backFile = await prepareCardsForPdf(backPrintRef.value.rootElement, backPrintRef.value.name)
  deckFiles.push(backFile);

  await exportDeckToPDF(deckFiles , deckName.value)

  progressMessage.value = "Export completed"

  currentIndex.value = 0


};

const convertCardToPng = async (element : HTMLElement , name: string) => {
  await nextTick();
  const cardObject = await convertToPng(element, name);
  currentIndex.value++;
  carousel.value?.emblaApi?.scrollTo(currentIndex.value)
  await delay(500); // Attend 500ms avant de continuer (pour l'animation)
  return cardObject;
};

const prepareCardsForPdf = async (element: HTMLElement, name: string) => {
  await nextTick();
  const cardObject = await prepareCardsPng(element, name) as string;
  currentIndex.value++;
  carousel.value?.emblaApi?.scrollTo(currentIndex.value)
  await delay(500); // Attend 500ms avant de continuer (pour l'animation)
  return cardObject;
};

</script>

<style scoped>

#deck-modal {
  overflow: visible;
  width: 60vw;
  aspect-ratio: 2/1.5;

  @media (max-width: 768px) {
    aspect-ratio: unset;
    width: 90vw;
    height: 95dvh;
  }
}

.final-card {
  position: relative;
  display: flex;
  width: 350px;
  height: unset;
  max-width: 90%;
  aspect-ratio: 2.5/3.5;
}

</style>
