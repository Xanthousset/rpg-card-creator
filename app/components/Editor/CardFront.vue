<template>



    <div class="w-full flex flex-col border  overflow-hidden card ">

      <div class="w-full">
        <UFileUpload v-model="card.image" class="w-full min-h-48" :ui="{base: 'rounded-none' , file: 'no-rounded'}" />
      </div>

      <div class="grow p-12 rounded-b-2xl">

        <div class="flex justify-center w-full">
          <UInput v-model="card.name" variant="none" size="xl" placeholder="Card name" :ui="{'base' : 'text-center card-name'}" />
        </div>

<!--        <UTextarea v-model="card.description"-->
<!--                   variant="none"-->
<!--                   placeholder="Card description"-->
<!--                   autoresize-->
<!--                   class="w-full "-->
<!--                   :ui="{'base' : 'text-center card-text'}"-->
<!--        />-->

        <UEditor v-slot="{ editor }" v-model="card.description"
                 content-type="html"
                 placeholder="Card description"
                 class="w-full text-center min-h-21"
                 :ui="{'base' : 'card-text'}"
        >
          <UEditorToolbar :editor="editor" :items="editorToolBarItems" layout="bubble" />
        </UEditor>

      </div>
    </div>



</template>

<script setup lang="ts">
import { Card } from '~/models/Card'
import {editorToolBarItems} from "~/utils/UiSettings";
const props = defineProps<{
  card: Card
}>()


</script>

<style scoped>

</style>
