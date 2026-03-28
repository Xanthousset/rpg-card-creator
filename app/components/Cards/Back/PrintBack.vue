<template>


  <div class="overflow-hidden print-card card-back" ref="rootElement">

    <NuxtImg class="card-back-image" :src="backUrl" />

  </div>

</template>

<script setup lang="ts">

const deckStore = useDeckStore()

const rootElement = useTemplateRef('rootElement')
const name = "Back of card"

defineExpose({
  rootElement,
  name
})

const backUrl = computed(() => deckStore.createBackCardUrl)


</script>

<style scoped>
.print-card {
  position: fixed;
  top: 100%;
  width: 750px;
  height: 1050px;
}
</style>
