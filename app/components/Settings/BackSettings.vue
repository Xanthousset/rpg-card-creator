<template>
  <div>
    BACK SETTINGS
    <div>
      <div>Border width</div>
      <USlider
        v-model="settings.borderWidth"
        :min="0"
        :max="10"
      />
    </div>

    <div>
      <div>Border color</div>
      <UInput v-model="settings.borderColor" />
      <UPopover>
        <UButton label="Choose color" color="neutral" variant="outline">
          <template #leading>
            <span :style="chipBorder" class="size-3 rounded-full" />
          </template>
        </UButton>

        <template #content>
          <UColorPicker v-model="settings.borderColor" class="p-2" />
        </template>
      </UPopover>
    </div>

    <div>
      <div>Background color</div>
      <UInput v-model="settings.backgroundColor" />
      <UPopover>
        <UButton label="Choose color" color="neutral" variant="outline">
          <template #leading>
            <span :style="chipBg" class="size-3 rounded-full" />
          </template>
        </UButton>

        <template #content>
          <UColorPicker v-model="settings.backgroundColor" class="p-2" />
        </template>
      </UPopover>
    </div>

  </div>
</template>

<script setup lang="ts">

const optionsStore = useOptionsStore()
const settings = optionsStore.options.back

const chipBorder = computed(() => ({ backgroundColor: settings.borderColor }))
const chipBg = computed(() => ({ backgroundColor: settings.backgroundColor }))

</script>

<style scoped>

</style>
