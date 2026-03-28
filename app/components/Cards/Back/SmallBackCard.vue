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

const backUrl = computed(() => deckStore.createBackCardUrl)

</script>

<style scoped>
.card-text {
  font-size: 5cqw;
}
</style>
