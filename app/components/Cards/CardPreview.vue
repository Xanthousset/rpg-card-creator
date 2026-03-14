<template>


  <div class="bg-gray-800 rounded-2xl overflow-hidden card-ratio" ref="rootElement">

    <NuxtImg class="w-full h-6/12 object-center object-cover" :src="card.createImageUrl()"/>

    <div class="text-center p-4">
      <div class=" mb-4 text-xl"> {{ card.name }} </div>
      <div> {{ card.description }} </div>
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
.card-ratio {
  height: 100%;
}
</style>
