<template>

  <div class="deck-animation">
    <CardPreview v-for="(item , i) in visibleCards"
                 :card="item.card"
                 :key="item.card.id"
                 class="slide"
                 :class="{
    active: item.realIndex === index,
    leaving: item.realIndex === leavingIndex
  }"
                 :style="getStyle(item.realIndex)"
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

const VISIBLE_RANGE = 4

const leavingIndex = ref<number | null>(null)

watch(() => props.index, (newIndex, oldIndex) => {
  if (oldIndex !== undefined) {
    leavingIndex.value = oldIndex

    // durée de l'anim
    setTimeout(() => {
      leavingIndex.value = null
    }, 1000)
  }
})

const visibleCards = computed(() => {
  const start = Math.max(0, props.index - 1)
  const end = Math.min(props.cards.length, props.index + 5)

  const base = props.cards.slice(start, end).map((card, i) => ({
    card,
    realIndex: start + i
  }))

  // ajouter la carte sortante si besoin
  if (
    leavingIndex.value !== null &&
    !base.find(c => c.realIndex === leavingIndex.value)
  ) {
    base.push({
      card: props.cards[leavingIndex.value],
      realIndex: leavingIndex.value
    })
  }

  return base
})

const getStyle = (i: number) => {

  if (i === leavingIndex.value) {
    return {} // laisse le CSS gérer l'anim
  }

  const offset = i - props.index
  const depth = Math.max(0, Math.min(4, offset))

  return {
    transform: `translate(${depth * 2.5}px, ${depth * 2.5}px)`,
    zIndex: 10 - depth,
    opacity: offset < 0 ? 0 : 1,
    transition: 'all 0.3s ease'
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
  transition: transform 1s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease 0.6s;
  z-index: 1;

  &.active {
    box-shadow: rgba(0, 0, 0, 0.55) 0px 14px 28px, rgba(0, 0, 0, 0.52) 0px 10px 10px;
    z-index: 10;
  }

  &.leaving {
    transform: translate(-35%, 0) rotate(-5deg);
    opacity: 0;
    z-index: 20;
  }

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
