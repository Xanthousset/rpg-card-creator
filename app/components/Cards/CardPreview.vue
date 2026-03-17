<template>


  <div class="overflow-hidden card" ref="rootElement">

    <NuxtImg class="w-full h-6/12 object-center object-cover" :src="card.createImageUrl()"/>

    <div class="text-center p-4">
      <div class=" mb-4 card-name"> {{ card.name }} </div>
      <div class="card-text" v-html="card.description"></div>
    </div>

  </div>

</template>

<script setup lang="ts">

import { Card } from '~/models/Card'

const props = defineProps<{
  card: Card
}>()

const rootElement = useTemplateRef('rootElement')
const name = props.card.name

defineExpose({
  rootElement,
  name
})

</script>

<style scoped>
.card {
  height: 100%;
}

</style>
