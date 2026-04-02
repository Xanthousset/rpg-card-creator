<template>

  <div class="deck-animation">

    <CardPreview v-for="(card , i) in cards"
                 :card="card"
                 :key="card.id"
                 class="slide"
                 :class="{'active' : i === index}"
                 :style="getStyle(i)"
    />

<!--    <BackPreview class="slide" />-->
  </div>

</template>

<script setup lang="ts">

import type {Card} from "~/models/Card";
import BackPreview from "~/components/Cards/Back/BackPreview.vue";
import CardPreview from "~/components/Cards/CardPreview.vue";

const props = defineProps<{
  cards: Card[]
  index: number
}>()

const getStyle = (i: number) => {
  const offset = i - props.index

  // limite à 4 cartes visibles derrière
  const depth = Math.max(0, Math.min(4, offset))

  return {
    // transform: `translate(${depth * 2.5}px, ${depth * 2.5}px)`,
    transform: `
    translate(${depth * 7.5}px, ${depth * 5}px)
    scale(${1 - depth * 0.03})
    rotate(${depth * 1}deg)
  `,
    zIndex: 10 - depth,
    opacity: offset < 0 ? 0 : 1,
    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
  }
}

</script>

<style scoped>
.deck-animation {
  position: relative;
  display: flex;
  width: 350px;
  max-width: 90%;
  aspect-ratio: 2.5/3.5;
}

.slide {
  position: absolute;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 14px 28px, rgba(0, 0, 0, 0.2) 0px 10px 10px;
  transform: translate(12.5px , 12.5px);
  z-index: 1;
/*
  &:nth-child(5) {
    transform: translate(10px , 10px);
  }

  &:nth-child(4) {
    transform: translate(7.5px , 7.5px);
    z-index: 2;
  }

  &:nth-child(3) {
    transform: translate(5px , 5px);
    z-index: 3;
  }

  &:nth-child(2) {
    transform: translate(2.5px , 2.5px);
    z-index: 4;
  }

  &:nth-child(1) {
    transform: translate(0 , 0);
    box-shadow: rgba(0, 0, 0, 0.55) 0px 14px 28px, rgba(0, 0, 0, 0.52) 0px 10px 10px;
    z-index: 5;
  }
*/

}
</style>
