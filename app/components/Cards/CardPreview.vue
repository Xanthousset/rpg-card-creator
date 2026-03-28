<template>


  <div class="overflow-hidden card" ref="rootElement">

    <WitcherRender :card="card" />

  </div>

</template>

<script setup lang="ts">

import { Card } from '~/models/Card'
import WitcherRender from "~/components/Templates/WitcherRender.vue";

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
