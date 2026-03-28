<template>

  <div class="overflow-hidden relative card-back" ref="rootElement">

      <NuxtImg class="card-back-image" :src="backUrl" />

  </div>

</template>

<script setup lang="ts">

const deckStore = useDeckStore()

const rootElement = useTemplateRef('rootElement')
const name = 'Back of card'

defineExpose({
  rootElement,
  name
})

const backUrl = computed(() => deckStore.createBackCardUrl)

</script>

<style scoped>
.card-back {
  height: 100%;
}


</style>
