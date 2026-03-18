<template>
  <div class="w-full cursor-pointer hover-3d" >

    <div class="relative flex flex-col w-full border overflow-hidden card-back">

      <NuxtImg class="card-back-image" :src="backUrl" />

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

const deckStore = useDeckStore()

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
.card-text {
  font-size: 5cqw;
}
</style>
