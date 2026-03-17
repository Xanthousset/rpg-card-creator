<template>
  <div class="flex justify-center bg-red items-center w-full h-full">
    <client-only>
      <CardEditor v-if="editedCard" :isEditing="true" :editingCard="editedCard" />
    </client-only>

    <NuxtLink to="/deck" >DECK</NuxtLink>

  </div>
</template>
<script setup lang="ts">
import CardEditor from "~/components/Editor/CardEditor.vue";

const deckStore = useDeckStore();
const editedCard = computed(() => deckStore.editingCard);

</script>
