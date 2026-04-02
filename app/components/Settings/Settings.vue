<template>
  <div class="flex flex-col gap-6">


    <GeneralSettings/>


<!--    <FrontSettings v-show="isFront"/>-->


    <BackSettings v-show="!isFront"/>



  </div>
</template>

<script setup lang="ts">

import GeneralSettings from "~/components/Settings/GeneralSettings.vue";
import FrontSettings from "~/components/Settings/FrontSettings.vue";
import BackSettings from "~/components/Settings/BackSettings.vue";

const optionsStore = useOptionsStore()

const isFront = computed(() => optionsStore.isFront)

const settings = optionsStore.options


onMounted(() => {
  const r = document.querySelector(':root') as HTMLElement;

  watch(settings , () => {
    r.style.setProperty('--card-radius', settings.borderRadius+"%");

    r.style.setProperty('--card-f-border-width', settings.front.borderWidth+'px');
    r.style.setProperty('--card-f-border-color', settings.front.borderColor);
    r.style.setProperty('--card-f-bg', settings.front.backgroundColor);

    r.style.setProperty('--card-b-border-width', settings.back.borderWidth+'px');
    r.style.setProperty('--card-b-border-color', settings.back.borderColor);
    r.style.setProperty('--card-b-bg', settings.back.backgroundColor);


  }, { immediate: true })

})


</script>

<style scoped>

</style>
