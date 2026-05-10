<template>
  <div class="relative bg-gray flex flex-col md:flex-row gap-12 md:gap-24 rounded-2xl p-12" id="deck-modal">

    <div v-if="card && !isBack" class="shrink-0">
      <CardPreview v-if="card" :card="card" />

      <PrintCard v-if="card" :card="card" ref="cardPrint" />
    </div>

    <div v-if="isBack" class="shrink-0">
      <BackPreview v-if="isBack" />
      <PrintBack ref="backPrint"/>
    </div>

    <div class="grow">

      <div v-if="card" class="flex flex-col w-full h-full justify-center items-center gap-6">

        <ButtonCTA @click.native="sendToEditing" to="/editor" text="Edit" />

        <div class="flex  justify-center items-center gap-4">
          <div class="flex justify-center items-center gap-2">

          <UButton @click="duplicationNumber > 1 ? duplicationNumber-- : duplicationNumber = 1">-</UButton>
          <UInput class="w-12" v-model="duplicationNumber" />
          <UButton @click="duplicationNumber++">+</UButton>

          </div>
          <ButtonCTA @click="duplicateCard" text="Duplicate" />
        </div>

        <ButtonCTA @click="exportCard" text="Export to png" />
        <ButtonCTA class="red" text="Delete card"  @click="emit('deleteCard')" />
      </div>

      <div v-if="isBack" class="flex flex-col h-full justify-center items-center gap-6">
        <UButton @click.native="sendToEditingBack" href="/editor">Edit</UButton>
        <UButton  @click="exportBack">Export to png</UButton>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">

import { Card } from '~/models/Card'
import CardPreview from "~/components/Cards/CardPreview.vue";
import { saveAsPng } from "~/composables/useExports";
import PrintCard from "~/components/Cards/PrintCard.vue";
import BackPreview from "~/components/Cards/Back/BackPreview.vue";
import PrintBack from "~/components/Cards/Back/PrintBack.vue";
import ButtonCTA from "~/components/UI/ButtonCTA.vue";

const props = defineProps<{
  card?: Card
  isBack?: boolean
}>()

const emit = defineEmits(['deleteCard'])

const deckStore = useDeckStore()
const optionsStore = useOptionsStore()

const duplicationNumber = ref<number>(1)
const cardPrintRef = useTemplateRef<HTMLElement>('cardPrint')
const backPrintRef = useTemplateRef<HTMLElement>('backPrint')

const duplicateCard = () => {
  deckStore.duplicateCard(props.card?.id, duplicationNumber.value)
}

const exportCard = () => {
  saveAsPng(cardPrintRef.value?.rootElement as HTMLElement, props.card?.name as string)
}

const exportBack = () => {
  saveAsPng(backPrintRef.value?.rootElement as HTMLElement, backPrintRef.value?.name as string)
}

const sendToEditing = () => {
  deckStore.setEditingCard(props.card)
  deckStore.isEditing = true
}

const sendToEditingBack = () => {
  optionsStore.isFront = false
}

</script>

<style scoped>
#deck-modal {
  width: 60vw;
  aspect-ratio: 2/1.5;
  @media (max-width: 768px) {
    aspect-ratio: unset;
    width: 90vw;
    height: 95dvh;
  }
}
</style>
