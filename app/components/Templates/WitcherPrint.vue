<template>
  <div class="w-full flex flex-col border overflow-hidden card witcher" :class="{'print-mode' : print}">

    <div class="bandeau-titre__print">
      <img class="bandeau-titre__bg" src="~/assets/img/witcher/print/title_bg.png" />

      <div class="bandeau-titre__content">
        <div class="text-center font-bold witcher-text-color card-info cost">
          {{ card.cost }}
        </div>

        <div class="flex justify-center w-full text-center text-white card-name ">
          {{ card.name }}
        </div>

        <div class=" w-full h-full flex justify-center items-center element" >
          <img class="w-7/12 h-7/12 object-contain object-center" v-show="card.element" :src="card.element" />
        </div>
      </div>


    </div>


    <div class="aspect-square w-full image-container">
      <div class="rounded-full overflow-hidden aspect-square w-full ">
        <NuxtImg class="w-full aspect-square object-center object-cover"
                 :src="card.createImageUrl()"/>
      </div>
    </div>

    <div class="bottom-block__print">
      <img class="bottom-block__bg" src="~/assets/img/witcher/print/content_bg.png" />

      <div class="bottom-block__content">

        <div v-if="card.level" class="text-center text-white card-info font-title level">
          {{ card.level }}
        </div>

        <div class="mx-auto w-9/10 text-center card-text" v-html="card.description"></div>


        <div class="bottom-block__attributes">


          <div class="text-left font-title text-white duration">
            <div class="relative z-10">
              {{ card.duration }}
            </div>
          </div>

          <div class="text-center text-white card-info font-title defense">
            <div class="relative z-10">
              {{ card.defense }}
            </div>
          </div>

          <div class="text-right font-title text-white range">
            <div class="relative z-10">
              {{ card.range }}
            </div>
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

.bandeau-titre__print {
  width: 100%;
  position: relative;
  z-index: 10;

  .bandeau-titre__content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .card-name {
    position: relative;
    line-height: 1em;
    top: -10px;
  }

  .cost , .element {
    flex-shrink: 0;
    width: 115px;
    text-align: center;
  }

}

.bandeau-titre__bg , .bottom-block__bg {
  width: 100%;
}

.bottom-block__print {
  width: 95%;
  position: absolute;
  left: 2.5%;
  bottom: 0;
  z-index: 10;

  .bottom-block__content {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .level {
    position: absolute;
    top: 5px;
  }

  .defense {
    text-align: center;
  }

  .duration {
    height: 30px;
    width: 150px;
    font-size: 3cqw;
    padding-left: 64px;
  }

  .range {
    height: 30px;
    width: 150px;
    font-size: 3cqw;
    padding-right: 64px;
  }

  .defense {
    position: relative;
    line-height: 1em;
    top: -6px;
  }

  .range , .duration {
    position: relative;
    line-height: 1em;
    top: 0;
  }


  .bottom-block__attributes {
    position: absolute;
    width: 100%;
    height: 75px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    bottom: 25px;
  }

}

</style>
