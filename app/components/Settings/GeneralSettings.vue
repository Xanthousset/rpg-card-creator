<template>
  <div>

    <div class="flex flex-col gap-4 pt-6 mt-6 border-t border-primary">

      <div class="flex items-center justify-between gap-6">
        <h3 class="font-bold text-xl">
          Global Settings
        </h3>

        <UTooltip :delay-duration="0"
                  v-model:open="openGlobalTooltips"
                  arrow
                  text="These settings are applied to all cards"
                  :content="contentSettings">
          <UIcon class="relative" name="i-lucide-circle-question-mark" @click="openGlobalTooltips = true" />
        </UTooltip>
      </div>

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

<!--    <div class="flex flex-col gap-4 pt-6 mt-6 border-t border-primary">-->

<!--      <div class="flex items-center justify-between gap-6">-->
<!--        <h3 class="font-bold text-xl">-->
<!--          Card Settings-->
<!--        </h3>-->

<!--        <UTooltip :delay-duration="0"-->
<!--                  v-model:open="openSpecificCardTooltips"-->
<!--                  arrow-->
<!--                  text="These settings are only applied to the currently edited card"-->
<!--                  :content="contentSettings">-->
<!--          <UIcon class="relative" name="i-lucide-circle-question-mark" @click="openSpecificCardTooltips = true" />-->
<!--        </UTooltip>-->
<!--      </div>-->

<!--      <UTooltip :delay-duration="0"-->
<!--                arrow-->
<!--                text="Select card description text to format it"-->
<!--                :content="contentSettings">-->
<!--        <UIcon class="relative" name="i-lucide-circle-question-mark" @click="openSpecificCardTooltips = true" />-->
<!--      </UTooltip>-->

<!--    </div>-->

    <div class="flex flex-col gap-4 pt-6 mt-6 border-t border-primary">

      <h3 class="font-bold text-xl">
        Export Settings
      </h3>

      <div class="flex items-center gap-2" >

        <UCheckbox label="Cut lines"
                 v-model="settings.print.cutLines"
                 :ui="{
                      label: 'cursor-pointer',
                      base: 'cursor-pointer ring-primary'
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

const contentSettings = {
  align: 'center',
  side: 'top',
  sideOffset: 8
} as TooltipContentProps

const openGlobalTooltips = ref<boolean>(false)
const openSpecificCardTooltips = ref<boolean>(false)

</script>

