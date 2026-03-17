<template>
  <div class="flex justify-center bg-red items-center w-full h-full">
    <client-only>
      <CardEditor />
    </client-only>
  </div>
</template>
<script setup lang="ts">
import CardEditor from "~/components/Editor/CardEditor.vue";

</script>
