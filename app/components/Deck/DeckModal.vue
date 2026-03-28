<template>
  <div class="relative bg-black flex gap-24 rounded-2xl p-12" id="deck-modal">
    <div v-if="card && !isBack">
      <CardPreview v-if="card" :card="card" />
      <PrintCard v-if="card" :card="card" ref="cardPrint" />
    </div>

    <div v-if="isBack">
      <BackPreview v-if="isBack" />
      <PrintBack ref="backPrint"/>
    </div>

    <div class="flex flex-col justify-center items-center gap-8">

      <div v-if="card">
        <UButton @click.native="sendToEditing" href="/editor">Edit</UButton>

        <div>
          <UButton @click="duplicationNumber > 1 ? duplicationNumber-- : duplicationNumber = 1">-</UButton>
          <UInput v-model="duplicationNumber" />
          <UButton @click="duplicationNumber++">+</UButton>
        </div>
        <UButton @click="duplicateCard">Duplicate</UButton>
        <UButton @click="exportCard">Export to png</UButton>
        <UButton  @click="emit('deleteCard')">Delete</UButton>
      </div>

      <div v-if="isBack">
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
}
</style>
