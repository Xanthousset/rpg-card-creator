<template>
  <div class="flex justify-center bg-red items-center w-full h-full">
    <client-only>
      <CardEditor />
    </client-only>

    <NuxtLink to="/deck" >DECK</NuxtLink>

  </div>
</template>
<script setup lang="ts">
import CardEditor from "~/components/Cards/CardEditor.vue";
</script>
