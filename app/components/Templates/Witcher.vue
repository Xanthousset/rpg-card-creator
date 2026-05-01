<template>
  <div class="w-full flex flex-col border overflow-hidden card witcher">

    <div class="flex items-center justify-between relative bandeau-titre">

      <div class="losange">

        <UPopover mode="hover" arrow :open-delay="300" :close-delay="100">
          <UInput v-model="card.cost" variant="none" size="sm" placeholder="Cost" :ui="{'base' : 'text-center font-bold witcher-text-color card-info'}" />

          <template #content>
            <p class="p-4">Spell cost (number)</p>
          </template>
        </UPopover>
      </div>

      <div class="flex justify-center w-full ">
        <UPopover mode="hover" arrow :open-delay="300" :close-delay="100">
          <UInput v-model="card.name" variant="none" size="sm" placeholder="Card name" :ui="{'base' : 'placeholder:text-white text-center text-white card-name'}" />

          <template #content>
            <p class="p-4">Name of the spell</p>
          </template>
        </UPopover>
      </div>

      <div class="losange right cursor-pointer">

        <UPopover v-model:open="openElement" :content="{side: 'bottom' , align: 'center'}">

          <template #anchor>
            <div class=" w-full h-full flex justify-center items-center" @click="openElement = true">
              <img class="w-7/12 h-7/12 object-contain object-center" v-show="card.element" :src="card.element" />
              <UPopover mode="hover" arrow :open-delay="300" :close-delay="100">
                <p class="text-center font-bold witcher-text-color card-info" v-show="!card.element" > Elem </p>

                <template #content>
                  <p class="p-4">Spell element, click to open selection</p>
                </template>
              </UPopover>
            </div>
          </template>

          <template #content>
            <ElementSelector :card="card" />
          </template>
        </UPopover>

      </div>

    </div>

    <div class="aspect-square w-full image-container">
      <div class="rounded-full overflow-hidden aspect-square w-full">

        <NuxtImg class="rounded-full card-img-placeholder" src="/img/templates/witcher/front-default.svg" />

        <UFileUpload v-if="!card.image" v-model="card.image" class="w-full aspect-square" :ui="{base: 'bg-transparent cursor-pointer rounded-full' , file: 'rounded-full'}" />

        <ImagePreview v-if="card.image"
                      :key="card.id + '_' + (card.image?.name || card.name)"
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
        <UPopover mode="hover" arrow :open-delay="300" :close-delay="100" :content="{align: 'center',side: 'top',sideOffset: 8}">
          <UInput v-model="card.level" variant="none" size="sm" placeholder="Level" :ui="{'base' : 'placeholder:text-white text-center text-white card-info font-title'}" />

          <template #content>
            <p class="p-4">Spell level (Novice / Companion / Master)</p>
          </template>
        </UPopover>
      </div>

      <div class="defense__container">
        <UPopover mode="hover" arrow :open-delay="300" :close-delay="100" :content="{align: 'center',side: 'top',sideOffset: 8}">
          <UInput v-model="card.defense" variant="none" size="sm" placeholder="Defense type" :ui="{'base' : 'placeholder:text-white text-center text-white card-info font-title'}" />

          <template #content>
            <p class="p-4">Defense type (Physical / Magic)</p>
          </template>
        </UPopover>
      </div>

      <div class="duration__container">

        <div class="duration__content">
          <UPopover mode="hover" arrow :open-delay="300" :close-delay="100" :content="{align: 'center',side: 'top',sideOffset: 8}">
            <UInput v-model="card.duration" variant="none" size="sm" placeholder="Duration" :ui="{'base' : 'placeholder:text-white text-left font-title text-white card-attribute'}" />

            <template #content>
              <p class="p-4">Spell time duration (3 turns, 10 minutes...)</p>
            </template>
          </UPopover>
        </div>
      </div>

      <div class="range__container">
        <div class="range__content">
          <UPopover mode="hover" arrow :open-delay="300" :close-delay="100" :content="{align: 'center',side: 'top',sideOffset: 8}">
            <UInput v-model="card.range" variant="none" size="sm" placeholder="Range" :ui="{'root': 'justify-end' , 'base' : 'placeholder:text-white text-right font-title text-white card-attribute'}" />

            <template #content>
              <p class="p-4">Spell range (self, 9m, very far...)</p>
            </template>
          </UPopover>
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
