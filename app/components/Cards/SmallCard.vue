<template>
  <div class="w-full cursor-pointer hover-3d" >

    <div class="w-full bg-black rounded-2xl overflow-hidden card-ratio ">

      <NuxtImg class="w-full h-6/12 object-center object-cover" :src="card.createImageUrl()"/>

      <div class="text-center p-4">
        <div class=" mb-4 text-xl"> {{ card.name }} </div>
        <div> {{ card.description }} </div>
      </div>

    </div>

    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>

  </div>
</template>

<script setup lang="ts">

import { Card } from '~/models/Card'

const props = defineProps<{
  card: Card
}>()

console.log(props.card)


</script>

<style scoped>

</style>
