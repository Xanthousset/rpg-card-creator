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

const backUrl = computed(() => {

  const backImage = deckStore.backImage

  if(backImage === null || backImage === undefined) {
    return '/img/placeholder.png';
  }
  if(typeof backImage === 'string') {
    return backImage;
  }
  return URL.createObjectURL(backImage)

})

</script>

<style scoped>
.card-back {
  height: 100%;
}


</style>
