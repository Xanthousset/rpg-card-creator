<template>
  <div class="w-full cursor-pointer hover-3d" >

    <div class="w-full  overflow-hidden card ">

      <WitcherRender :card="card" />

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
import WitcherRender from "~/components/Templates/WitcherRender.vue";

const props = defineProps<{
  card: Card
}>()

</script>

<style scoped>
.card-text {
  font-size: 5cqw;
}
</style>
