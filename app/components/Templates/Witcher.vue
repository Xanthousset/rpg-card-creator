<template>
  <div class="w-full flex flex-col border overflow-hidden card witcher">

    <div class="flex items-center justify-between relative bandeau-titre">

      <div class="losange">
        <div>
          <UInput v-model="card.name" variant="none" size="sm" placeholder="Cost" :ui="{'base' : 'text-center card-info'}" />
        </div>
      </div>

      <div class="flex justify-center w-full ">
        <UInput v-model="card.name" variant="none" size="sm" placeholder="Card name" :ui="{'base' : 'text-center text-white card-name'}" />
      </div>

      <div class="losange right">
        <div>
          <UInput v-model="card.name" variant="none" size="sm" placeholder="Element" :ui="{'base' : 'text-center card-info'}" />
        </div>
      </div>

    </div>

    <div class="aspect-square w-full image-container">
      <div class="rounded-full overflow-hidden aspect-square w-full ">
        <UFileUpload v-model="card.image" class="w-full aspect-square" :ui="{base: 'rounded-full' , file: 'rounded-full'}" />
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
        <UInput v-model="card.name" variant="none" size="sm" placeholder="Level" :ui="{'base' : 'text-center text-white card-info font-title'}" />
      </div>

      <div class="defense__container">
        <UInput v-model="card.name" variant="none" size="sm" placeholder="Defense type" :ui="{'base' : 'text-center text-white card-info font-title'}" />
      </div>

      <div class="duration__container">
<!--        <UInput v-model="card.name" variant="none" size="sm" placeholder="Duration" :ui="{'base' : 'text-center text-white card-info'}" />-->
      </div>

      <div class="range__container">
<!--        <UInput v-model="card.name" variant="none" size="sm" placeholder="Duration" :ui="{'base' : 'text-center text-white card-info'}" />-->
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

.witcher {

  --white: #F1F1F1;
  --brown: #413D37;
  --petit-bandeau: polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%);

  padding: 20px 10px;
  background-color: var(--white);
  color: var(--brown);

}

.image-container {
  position: relative;
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
    mix-blend-mode: multiply;
    z-index: -1;
  }

}

.bandeau-titre {
  position: relative;
  z-index: 3;
  background-color: var(--brown);
  width: 80%;
  margin: 0 auto 15px;
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
  &.right {
    left: unset;
    right: 0;
    transform: translateX(50%) rotate(45deg);
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
  --bottom-shape : polygon(10px 0%, calc(100% - 10px) 0%, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0% calc(100% - 10px), 0% 10px);
  position: absolute;
  width: calc(100% - 80px);
  aspect-ratio: 4/2;
  bottom: 40px;
  left: 40px;
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
    z-index: -2;
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
    z-index: -1;
  }
}

.level__container {
  position: absolute;
  top: 0;
  left: 50%;
  background-color: var(--brown);
  transform: translate(-50%, -50%);
  clip-path: var(--petit-bandeau);
  z-index: 10;
}

.defense__container {
  position: absolute;
  bottom: 0;
  left: 50%;
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
  width: 45px;
  height: 45px;
  transform: translate(-50%, 50%);
  z-index: 10;
  &::before {
    content: url("~/assets/img/witcher/Picto_durée/Picto_durée_entier.svg");
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
  }
}

.range__container {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 45px;
  height: 45px;
  transform: translate(50%, 50%);
  z-index: 10;
  &::before {
    content: url("~/assets/img/witcher/Picto_Range/Picto_range_entier.svg");
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
  }
}
</style>
