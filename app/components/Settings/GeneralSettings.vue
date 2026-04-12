<template>
  <div>
    <div class="mb-2">Border Radius</div>
    <USlider
      v-model="settings.borderRadius"
      color="primary"
      :step=".5"
      :min="0"
      :max="10"
      :ui="{
        thumb: 'rhombus'
      }"
    />



  </div>
</template>

<script setup lang="ts">

const optionsStore = useOptionsStore()
const settings = optionsStore.options

</script>

