<template>
  <div>
    <div>Border Radius</div>
    <USlider
      v-model="settings.borderRadius"
      :step=".5"
      :min="0"
      :max="10"
    />
  </div>
</template>

<script setup lang="ts">

const optionsStore = useOptionsStore()
const settings = optionsStore.options

</script>

<style scoped>

</style>
