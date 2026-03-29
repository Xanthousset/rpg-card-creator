<template>


  <div class="overflow-hidden print-card card" ref="rootElement">

    <WitcherPrint :card="card" />

  </div>

</template>

<script setup lang="ts">

import { Card } from '~/models/Card'
import WitcherPrint from "~/components/Templates/WitcherPrint.vue";

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
