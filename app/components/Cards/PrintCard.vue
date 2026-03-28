<template>


  <div class="overflow-hidden print-card card" ref="rootElement">

    <WitcherRender :card="card" print />

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
.print-card {
  position: fixed;
  top: 100%;
  width: 750px;
  height: 1050px;
}
</style>
