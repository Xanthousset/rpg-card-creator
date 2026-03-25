<template>
  <Witcher :card="card" />
</template>

<script setup lang="ts">
import { Card } from '~/models/Card'
import Witcher from "~/components/Templates/Witcher.vue";
const props = defineProps<{
  card: Card
}>()


</script>

<style scoped>

</style>
