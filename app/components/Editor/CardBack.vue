<template>

    <div class="flex flex-col w-full border  overflow-hidden card-back">

      <div class="w-full h-full">
        <UFileUpload v-model="deckStore.backImage" class="w-full h-full min-h-48" :ui="{base: 'rounded-none' , file: 'no-rounded'}" />
      </div>

    </div>


</template>

<script setup lang="ts">
import { Card } from '~/models/Card'
import {editorToolBarItems} from "~/utils/UiSettings";
const props = defineProps<{
  card: Card
}>()

const deckStore = useDeckStore()


</script>

<style scoped>

</style>
