<template>
  <div class="w-full cursor-pointer card-zoom" >

    <div
      class="card-wrapper"

      ref="cardRef"
    >

      <div class="w-full  overflow-hidden card ">

        <WitcherRender
          :card="card"
          v-memo="[
          card.name,
          card.image,
          card.description,
          card.cost,
          card.element,
          card.level,
          card.defense,
          card.duration,
          card.range
        ]"
        />

      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Card } from '~/models/Card'
import WitcherRender from "~/components/Templates/WitcherRender.vue";

const props = defineProps<{ card: Card }>()

const cardRef = ref<HTMLElement | null>(null)


</script>

<style scoped>

.card-zoom {
  border-radius: var(--card-radius);
  will-change: transform;
  transition: transform 0.4s linear(0, 0.708 15.2%, 0.927 23.6%, 1.067 33%, 1.12 41%, 1.13 50.2%, 1.019 83.2%, 1),
  filter 0.4s linear(0, 0.708 15.2%, 0.927 23.6%, 1.067 33%, 1.12 41%, 1.13 50.2%, 1.019 83.2%, 1);

  &:hover {
    transform: scale(1.05);
    .card {
      filter: drop-shadow(0 10px 15px rgba(173, 164, 106, 0.2));
    }
  }
}

.card-wrapper {
  perspective: 75rem;

  will-change: transform;
  transform-style: preserve-3d;
  transform: translateZ(0);

  transition: transform 0.15s ease-out;
  .card {
    transform-style: preserve-3d;
    transition: box-shadow 0.4s linear(0, 0.708 15.2%, 0.927 23.6%, 1.067 33%, 1.12 41%, 1.13 50.2%, 1.019 83.2%, 1);
  }

}


</style>
