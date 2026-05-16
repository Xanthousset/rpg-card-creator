<template>
  <div class="flex flex-col justify-center items-center w-full h-screen">

    <h1 class="text-4xl font-bold text-primary ">
      RPG CARDS CREATOR
    </h1>

    <img class="w-64 my-12" src="~/assets/img/app/Carte_logo.svg" alt="Carte" />


    <ButtonCTA to="/editor" text="Start creating" class="white"></ButtonCTA>
  </div>
</template>
<script setup lang="ts">

import ButtonCTA from "~/components/UI/ButtonCTA.vue";

definePageMeta({
  layout: 'homepage',
})

</script>
