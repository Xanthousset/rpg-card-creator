<template>
  <div class="relative bg-black flex gap-24 rounded-2xl p-12" id="deck-modal">
    <div class="text-2xl">
      <CardPreview :card="card" />
      <PrintCard :card="card" ref="cardPreview" />
    </div>

    <div class="flex flex-col justify-center items-center gap-8">
      <UButton @click.native="sendToEditing" href="/edit">Edit</UButton>

      <div>

        <div>
          <UButton @click="duplicationNumber > 1 ? duplicationNumber-- : duplicationNumber = 1">-</UButton>
          <UInput v-model="duplicationNumber" />
          <UButton @click="duplicationNumber++">+</UButton>
        </div>

        <UButton @click="duplicateCard">Duplicate</UButton>

        <UButton @click="exportCard">Export to png</UButton>

      </div>

      <UButton @click="emit('deleteCard')">Delete</UButton>
    </div>

  </div>
</template>

<script setup lang="ts">

import { Card } from '~/models/Card'
import CardPreview from "~/components/Cards/CardPreview.vue";
import { saveAsPng } from "~/composables/useExports";
import PrintCard from "~/components/Cards/PrintCard.vue";

const props = defineProps<{
  card: Card
}>()

const emit = defineEmits(['deleteCard'])

const deckStore = useDeckStore()

const duplicationNumber = ref<number>(1)
const preview = useTemplateRef<HTMLElement>('cardPreview')

const duplicateCard = () => {
  deckStore.duplicateCard(props.card.id, duplicationNumber.value)
}

const exportCard = () => {
  saveAsPng(preview.value.rootElement, props.card.name)
}

const sendToEditing = () => {
  deckStore.setEditingCard(props.card)
}

</script>

<style scoped>
#deck-modal {
  width: 60vw;
  aspect-ratio: 2/1.5;
}
</style>
