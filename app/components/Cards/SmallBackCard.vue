<template>
  <div class="w-full cursor-pointer hover-3d" >

    <div class="flex flex-col w-full border overflow-hidden card-back">

      <NuxtImg :src="test" />

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

console.log(deckStore.createBackCardUrl)

const test = computed(() => {

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
