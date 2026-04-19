<template>
  <div class="w-full flex flex-col border overflow-hidden card witcher">

    <div class="flex items-center justify-between relative bandeau-titre">

      <div class="losange">
        <div>
          <UInput v-model="card.cost" variant="none" size="sm" placeholder="Cost" :ui="{'base' : 'text-center font-bold witcher-text-color card-info'}" />
        </div>
      </div>

      <div class="flex justify-center w-full ">
        <UInput v-model="card.name" variant="none" size="sm" placeholder="Card name" :ui="{'base' : 'placeholder:text-white text-center text-white card-name'}" />
      </div>

      <div class="losange right cursor-pointer">

        <UPopover v-model:open="openElement" :content="{side: 'bottom' , align: 'center'}">

          <template #anchor>
            <div class=" w-full h-full flex justify-center items-center" @click="openElement = true">
              <img class="w-7/12 h-7/12 object-contain object-center" v-show="card.element" :src="card.element" />
            </div>
          </template>

          <template #content>
            <ElementSelector :card="card" />
          </template>
        </UPopover>


<!--        <div>-->
<!--          <UInput v-model="card.element" variant="none" size="sm" placeholder="Element" :ui="{'base' : 'text-center font-bold witcher-text-color card-info'}" />-->
<!--        </div>-->
      </div>

    </div>

    <div class="aspect-square w-full image-container">
      <div class="rounded-full overflow-hidden aspect-square w-full">

        <NuxtImg class="rounded-full card-img-placeholder" src="/img/templates/witcher/front-default.svg" />

        <UFileUpload v-if="!card.image" v-model="card.image" class="w-full aspect-square" :ui="{base: 'bg-transparent cursor-pointer rounded-full' , file: 'rounded-full'}" />

        <ImagePreview v-if="card.image"
                      :key="card.id + '_' + (card.image?.name || card.image)"
                      :card="card" />

      </div>
    </div>


    <div class="bottom-block">


      <span class="bottom__border"></span>

      <div class="bottom__content">

        <UEditor v-slot="{ editor }" v-model="card.description"
                 content-type="html"
                 placeholder="Card description"
                 class="w-full text-center"
                 :ui="{'base' : 'card-text'}"
        >
          <UEditorToolbar :editor="editor" :items="editorToolBarItems" layout="bubble" />
        </UEditor>
      </div>


      <div class="level__container">
        <UInput v-model="card.level" variant="none" size="sm" placeholder="Level" :ui="{'base' : 'placeholder:text-white text-center text-white card-info font-title'}" />
      </div>

      <div class="defense__container">
        <UInput v-model="card.defense" variant="none" size="sm" placeholder="Defense type" :ui="{'base' : 'placeholder:text-white text-center text-white card-info font-title'}" />
      </div>

      <div class="duration__container">

        <div class="duration__content">
          <UInput v-model="card.duration" variant="none" size="sm" placeholder="Duration" :ui="{'base' : 'placeholder:text-white text-left font-title text-white card-attribute'}" />
        </div>
      </div>

      <div class="range__container">
        <div class="range__content">
          <UInput v-model="card.range" variant="none" size="sm" placeholder="Range" :ui="{'root': 'justify-end' , 'base' : 'placeholder:text-white text-right font-title text-white card-attribute'}" />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">

import {editorToolBarItems} from "~/utils/UiSettings";
import {Card} from "~/models/Card";
import ImagePreview from "~/components/Editor/ImagePreview.vue";
import ElementSelector from "~/components/Editor/ElementSelector.vue";

const props = defineProps<{
  card: Card
}>()

const openElement = ref<boolean>(false)


</script>

<style>

.witcher {

  padding: 5%;
  background-color: var(--white);
  color: var(--brown);
  background-image: url("~/assets/img/witcher/bg/front_bg.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;


}

.image-container {
  position: relative;
  margin-top: 15px;
  z-index: 2;
  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150%;
    aspect-ratio: 1/1;
    background-image: url("~/assets/img/witcher/bg/circle.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    z-index: -1;
  }

}

.bandeau-titre {
  position: relative;
  z-index: 3;
  background-color: var(--brown);
  width: 85%;
  margin: 0 auto;
}

.losange {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1/1;
  height: 100%;
  transform: translateX(-50%) rotate(45deg);
  background-color: var(--white);
  border: solid 2px var(--brown);
  z-index: 2;
  input {
    &::placeholder{
      color: var(--brown);
    }
  }
  &.right {
    left: unset;
    right: 0;
    transform: translateX(50%) rotate(45deg);
    > div {
      position: relative;
      z-index: 3;
      transform: rotate(-45deg);
    }
  }

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 2px;
    left: 2px;
    width: calc(100% - 4px);
    aspect-ratio: 1/1;
    border: solid 1px var(--brown);
    z-index: 1;
  }

  > div {
    position: relative;
    z-index: 3;
    transform: rotate(-45deg);
  }

}

.bottom-block {
  position: absolute;
  width: calc(90%);
  aspect-ratio: 4/2;
  bottom: 5%;
  left: 5%;
  z-index: 5;
}

.bottom__border {
  position: absolute;
  width: calc(100% + 6px);
  height: calc(100% + 6px);
  transform: translate(-3px , -3px);
  background-color: var(--brown);
  clip-path: var(--bottom-shape);
  z-index: -1;
}

.bottom__content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 0;
  clip-path: var(--bottom-shape);
  height: 100%;
  background-color: var(--white);
  z-index: 2;
  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 2px;
    left: 2px;
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    background-color: var(--brown);
    clip-path: var(--bottom-shape);
    z-index: -1;
  }
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 3px;
    left: 3px;
    width: calc(100% - 6px);
    height: calc(100% - 6px);
    background-color: var(--white);
    clip-path: var(--bottom-shape);
    z-index: 1;
  }
  div {
    position: relative;
    z-index: 3;
  }
}

.level__container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  background-color: var(--brown);
  transform: translate(-50%, -50%);
  clip-path: var(--petit-bandeau);
  z-index: 10;
}

.defense__container {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 50%;
  transform: translate(-50%, 50%);
  z-index: 10;
  &::before {
    content: url("~/assets/img/witcher/Bouclier/Bandeau_Bouclier_avec_contour.svg");
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -45%);
  }
}

.duration__container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 20%;
  transform: translateY(50%);
  z-index: 10;
  &::before {
    content: url("~/assets/img/witcher/Picto_durée/Picto_durée_entier.svg");
    display: block;
    position: absolute;
    width: 8cqw;
    height: 8cqw;
    top: 50%;
    left: 0;
    transform: translate(-50%, -50%);
    z-index: 3;
  }
}

.duration__content {
  display: flex;
  align-items: center;
  width: 100%;
  padding-left: 4cqw;
  z-index: 1;
  div {
    position: relative;
    z-index: 5;
  }
  &::before {
    content: '';
    position: absolute;
    top: -1.5px;
    left: 0;
    width: calc(100% + 3px);
    height: calc(100% + 3px);
    background-color: var(--white);
    clip-path: polygon(85% 0, 100% 50%, 85% 100%, 0 100%, 0 0);
    z-index: 2;
  }
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--brown);
    clip-path: polygon(85% 0, 100% 50%, 85% 100%, 0 100%, 0 0);
    z-index: 2;
  }
}

.range__container {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 20%;
  transform: translateY(50%);
  z-index: 10;
  &::before {
    content: url("~/assets/img/witcher/Picto_Range/Picto_range_entier.svg");
    display: block;
    position: absolute;
    width: 8cqw;
    height: 8cqw;
    top: 50%;
    right: 0;
    transform: translate(50%, -50%);
    z-index: 3;
  }
}

.range__content {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  z-index: 1;
  padding-right: 4cqw;
  div {
    position: relative;
    z-index: 5;
  }
  &::before {
    content: '';
    position: absolute;
    top: -1.5px;
    left: 0;
    width: calc(100% + 3px);
    height: calc(100% + 3px);
    background-color: var(--white);
    clip-path: polygon(15% 0, 100% 0, 100% 100%, 15% 100%, 0 50%);
    z-index: 2;
  }
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--brown);
    clip-path: polygon(15% 0, 100% 0, 100% 100%, 15% 100%, 0 50%);
    z-index: 2;
  }
}


</style>
