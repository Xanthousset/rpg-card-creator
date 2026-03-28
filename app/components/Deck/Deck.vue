<template>
  <div class="p-12 h-screen overflow-y-scroll">
    <div class="w-10/12 mx-auto grid grid-cols-4 gap-12">
      <SmallCard v-for="(card , i) in deck" :key="card.id" :card="card" @click="openModal(card)"  />
      <SmallBackCard @click="openBack" />
    </div>

    <UModal v-model:open="showModal" :ui="{content: 'bg-transparent flex justify-center items-center w-auto max-w-auto'}">
      <template #content >
        <DeckModal v-if="showModal" :card="activeCard" :isBack="isBack" @deleteCard="deleteCard"/>
      </template>
    </UModal>

    <UModal v-model:open="showExport" :ui="{content: 'bg-transparent flex justify-center items-center w-auto max-w-auto'}">
      <template #content >
        <ExportModal v-if="deck" />
      </template>
    </UModal>

    <div class="fixed bottom-12 right-12">
      <UButton @click="exportDeck">Export Deck</UButton>
    </div>

  </div>
</template>

<script setup lang="ts">
import SmallCard from "~/components/Cards/SmallCard.vue";
import DeckModal from "~/components/Deck/DeckModal.vue";
import ExportModal from "~/components/Deck/ExportModal.vue";
import { Card } from "~/models/Card"
import SmallBackCard from "~/components/Cards/Back/SmallBackCard.vue";

const deckStore = useDeckStore();

const deck = computed(() => deckStore.cards);
const showModal = ref<boolean>(false);
const showExport = ref<boolean>(false);
const isBack = ref<boolean>(false);
const activeCard = ref<Card>()

const openModal = (card:Card):void => {
  showModal.value = true;
  isBack.value = false;
  activeCard.value = card;
}

const openBack = () => {
  showModal.value = true;
  isBack.value = true;
  activeCard.value = undefined;
}

const deleteCard = ():void => {
  showModal.value = false

  deckStore.removeCard(activeCard.value?.id);

  activeCard.value = undefined
}

const exportDeck = () => {
  showExport.value = true
}

</script>

<style scoped>

</style>
