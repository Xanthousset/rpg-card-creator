<template>

  <NuxtLink v-if="to"
            :to="to"
            :target="target"
            class="font-medium bouton"
  >
    {{ text }}
  </NuxtLink>

  <button v-else class="font-medium bouton" >
    {{ text }}
  </button>

</template>

<script lang="ts" setup>
const props = defineProps<{
  text: string
  to?: string
  target?: string
}>()
</script>

<style scoped>

.bouton {
  background-color: var(--black);
  padding: 5px 10px;
  border-radius: 5px;
  border: solid 1px var(--black);
  cursor: pointer;
  transition: all .3s ease;

  &:hover , &:focus-visible {
    border: 1px solid var(--ui-primary);
  }

  &.white {
    background-color: #fff;
    color: var(--black);
    &:hover {
      background-color: var(--ui-primary);
    }
  }

  &.red {
    background-color: var(--red);

    &:hover , &:focus-visible {
      background-color: var(--black);
    }

  }

}

</style>
