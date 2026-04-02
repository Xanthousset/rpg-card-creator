<template>
  <div v-if="card.image" class=" image-preview" @click="card.image = null" >
    <NuxtImg v-if="card.image" :src="card.createImageUrl()"/>

    <div class="font-title text-white text-3xl remove">
      Remove image
    </div>

  </div>
</template>

<script setup lang="ts">

import {Card} from "~/models/Card";

const props = defineProps<{
  card: Card
}>()

</script>

<style scoped>
.image-preview {
  position: relative;
  z-index: 20;
  width: 100%;
  aspect-ratio: 1/1;
  cursor: pointer;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-position: center;
    object-fit: cover;
  }

  .remove {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba( 65, 61, 55, .7);
    z-index: 5;
    opacity: 0;
    transition: opacity .3s ease;
  }

  &:hover {
    .remove {
      opacity: 1;
    }
  }

}
</style>
