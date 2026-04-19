<script setup lang="ts">

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
  <div class="block md:hidden">


    <UNavigationMenu v-model="activeItem" orientation="vertical" :items="items" highlight class="flex-1" />


  </div>
</template>

<style scoped>

</style>
