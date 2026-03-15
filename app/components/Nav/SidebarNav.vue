<script setup lang="ts">

const activeItem = ref('info')

const items = computed( () =>
{
  return [
    [
      {
        label: 'Editor',
        icon: 'i-lucide-pen',
        to: '/',
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
  <div>



    <div class="flex justify-between items-center mb-6">

<!--      <img class="w-16" src="~/assets/img/logo.png" alt="logo" />-->

    </div>


    <UNavigationMenu v-model="activeItem" orientation="vertical" :items="items" highlight class="flex-1" />


  </div>
</template>

<style scoped>

</style>
