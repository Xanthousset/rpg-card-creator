<template>
  <div class="flex justify-center items-center w-full h-full">
    <client-only>
      <CardEditor :isEditing="isEditing" :editingCard="editedCard" />
    </client-only>
  </div>
</template>
<script setup lang="ts">
import CardEditor from "~/components/Editor/CardEditor.vue";

const deckStore = useDeckStore();
const editedCard = computed(() => deckStore.editingCard);
const isEditing = computed(() => deckStore.isEditing);

</script>
