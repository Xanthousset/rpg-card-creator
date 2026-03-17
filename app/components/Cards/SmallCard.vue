<template>
  <div class="w-full cursor-pointer hover-3d" >

    <div class="w-full  overflow-hidden card ">

      <NuxtImg class="w-full h-6/12 object-center object-cover" :src="card.createImageUrl()"/>

      <div class="w-full text-center p-4">
        <div class="w-full mb-4 card-name"> {{ card.name }} </div>
        <div class="card-text" v-html="card.description"></div>
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

</script>

<style scoped>
.card-text {
  font-size: 5cqw;
}
</style>
