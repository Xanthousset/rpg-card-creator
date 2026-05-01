<template>
  <div class="p-12 h-screen overflow-y-scroll">

    <DeckFilters />

    <transition-group tag="ul" name="list" class="w-10/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-12">
      <li  v-for="(card , i) in deck" :key="card.id" >
        <SmallCard :card="card" @click="openModal(card)"  />
      </li>

      <li>
        <SmallBackCard @click="openBack" />
      </li>

    </transition-group>

    <UModal v-if="showModal" v-model:open="showModal" :ui="{content: 'bg-transparent flex justify-center items-center w-auto max-w-auto'}">
      <template #content >
        <DeckModal  :card="activeCard" :isBack="isBack" @deleteCard="deleteCard"/>
      </template>
    </UModal>

    <UModal v-if="showExport && deck" v-model:open="showExport" :ui="{content: 'bg-transparent flex justify-center items-center w-auto max-w-auto'}">
      <template #content >
        <ExportModal />
      </template>
    </UModal>

    <div class="fixed bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:bottom-12 md:right-12">
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
