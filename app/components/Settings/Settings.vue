<template>
  <div class="flex flex-col gap-6">

    <div>
      <div>Border width</div>
      <USlider
        v-model="settings.borderWidth"
        :min="0"
        :max="10"
      />
    </div>

    <div>
      <div>Border Radius</div>
      <USlider
        v-model="settings.borderRadius"
        :step=".5"
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

const settings = optionsStore.options

const chipBorder = computed(() => ({ backgroundColor: settings.borderColor }))
const chipBg = computed(() => ({ backgroundColor: settings.backgroundColor }))

onMounted(() => {
  var r = document.querySelector(':root');

  watch(settings , () => {
    r?.style.setProperty('--card-border-width', settings.borderWidth+'px');
    r?.style.setProperty('--card-border-color', settings.borderColor);
    r?.style.setProperty('--card-radius', settings.borderRadius+"%");
    r?.style.setProperty('--card-bg', settings.backgroundColor);
  }, { immediate: true })

})


</script>

<style scoped>

</style>
