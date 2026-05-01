<script setup lang="ts">

import Settings from "~/components/Settings/Settings.vue";

const activeItem = ref('info')

const items = computed( () =>
{
  return [
    [
      {
        label: 'Home',
        icon: 'i-lucide-home',
        to: '/',
      },
      {
        label: 'Editor',
        icon: 'i-lucide-pen',
        to: '/editor',
      },
      {
        label: 'Deck',
        icon: 'i-lucide-shield-user',
        to: '/deck',
      },
    ],
  ]
})

</script>

<template>

    <USlideover side="bottom" >
      <UButton class="fixed right-6 bottom-6 z-50" icon="i-lucide-menu" color="neutral" variant="subtle" />

      <template #body>
        <UNavigationMenu v-model="activeItem" orientation="vertical" :items="items" highlight class="flex-1" />
        <Settings/>
      </template>
    </USlideover>



</template>

<style scoped>

</style>
