<template>
  <div>

    <div class="flex flex-col gap-4 pt-6 mt-6 border-t border-primary">

      <h3 class="font-semibold text-xl">
        Card Settings
      </h3>

      <h4>
        Border Radius : {{ settings.borderRadius }}%
      </h4>
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

    <div class="flex flex-col gap-4 pt-6 mt-6 border-t border-primary">

      <h3 class="font-semibold text-xl">
        Export Settings
      </h3>

      <div class="flex items-center gap-2" >

        <USwitch label="Cut lines"
                 v-model="settings.print.cutLines"
                 :ui="{
                      label: 'cursor-pointer',
                      base: 'cursor-pointer'
                    }"
        />

        <UIcon name="mdi-scissors-cutting"></UIcon>
      </div>


    </div>




  </div>
</template>

<script setup lang="ts">

const optionsStore = useOptionsStore()
const settings = optionsStore.options

</script>

