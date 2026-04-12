<template>
  <div class="p-4 grid gap-2 grid-cols-3">

    <button
      v-for="el in elements"
      :key="el.name"
      class="bg-shark-800 element"
      :class="{'active' : card?.element === el.src}"
      type="button"
      @click="card.element = el.src"    >
      <img
        class="w-8 h-8 object-center object-contain"
        :src="el.src"
      />
    </button>

  </div>
</template>

<script setup lang="ts">

import {Card} from "~/models/Card";

const props = defineProps({
  card: Card
})

const elementImages = import.meta.glob('~/assets/img/elements/witcher/*.{png,webp,jpg,svg}', {
  eager: true,
  import: 'default'
})

console.log(elementImages)

const elements = Object.entries(elementImages).map(([path, value]) => {
  const name = path.split('/').pop()?.split('.')[0]

  return {
    name,
    src: value as string
  }
})

</script>

<style scoped>
.element {
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: .5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover , &.active {
    background-color: var(--color-shark-900);
  }
}
</style>
