<template>
  <div class="w-full flex flex-col border overflow-hidden card witcher" >

    <div class="flex items-center justify-between relative bandeau-titre">

      <div class="losange">
        <div class="text-center font-bold witcher-text-color card-info">
          {{ card.cost }}
        </div>
      </div>

      <div class="flex justify-center w-full text-center text-white card-name ">
        {{ card.name }}
      </div>

      <div class="losange right">
        <div class="text-center font-bold witcher-text-color card-info">
          {{ card.element }}
        </div>
      </div>

    </div>

    <div class="aspect-square w-full image-container">
      <div class="rounded-full overflow-hidden aspect-square w-full ">
        <NuxtImg class="w-full aspect-square object-center object-cover"
                 :src="card.createImageUrl()"/>
      </div>
    </div>


    <div class="bottom-block">


      <span class="bottom__border"></span>

      <div class="bottom__content" ref="bottomContent">

        <div class="mx-auto w-9/10 text-center card-text" v-html="card.description"></div>

      </div>


      <div v-if="card.level" class="text-center text-white card-info font-title level__container">
        {{ card.level }}
      </div>

      <div class="text-center text-white card-info font-title defense__container">
        <div class="relative z-10">
          {{ card.defense }}
        </div>
      </div>

      <div v-if="card.duration" class="duration__container">
        <div class="text-left font-title text-white card-attribute duration__content">
          <div class="relative z-10">
            {{ card.duration }}
          </div>
        </div>
      </div>

      <div v-if="card.range" class="range__container">
        <div class="text-right font-title text-white card-attribute range__content">
          <div class="relative z-10">
            {{ card.range }}
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">

import {editorToolBarItems} from "~/utils/UiSettings";
import {Card} from "~/models/Card";

const props = defineProps<{
  card: Card
}>()

</script>

<style scoped>
.duration__content {
  padding-left : 5cqw;
}
.range__content {
  padding-right : 5cqw;
}

</style>
