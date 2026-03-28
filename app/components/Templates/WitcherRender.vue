<template>
  <div class="w-full flex flex-col border overflow-hidden card witcher" :class="{'print-mode' : print}">

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
        <NuxtImg class="w-full aspect-square object-center object-cover" :src="card.createImageUrl()"/>
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
  print?: boolean
}>()

const bottomContent = useTemplateRef('bottomContent')

onMounted(() => {
  if(props.print) {
    const r = document.querySelector(':root') as HTMLElement;
    const contentWidth = bottomContent.value?.scrollWidth as number;

    const pointCoord = contentWidth - 10 + 'px'
    const pointCoordBorder = contentWidth - 6 + 'px'
    const pointCoordCadre = contentWidth - 14 + 'px'
    const pointCoordContent = contentWidth - 16 + 'px'


    const polygon = `polygon(10px 0%, ${pointCoord} 0%, 100% 10px, 100% ${pointCoord}, ${pointCoord} 100%, 10px 100%, 0% ${pointCoord}, 0% 10px)`
    const polygonBorder = `polygon(10px 0%, ${pointCoordBorder} 0%, 100% 10px, 100% ${pointCoordBorder}, ${pointCoordBorder} 100%, 10px 100%, 0% ${pointCoordBorder}, 0% 10px)`
    const polygonCadre = `polygon(10px 0%, ${pointCoordCadre} 0%, 100% 10px, 100% ${pointCoordCadre}, ${pointCoordCadre} 100%, 10px 100%, 0% ${pointCoordCadre}, 0% 10px)`
    const polygonContent = `polygon(10px 0%, ${pointCoordContent} 0%, 100% 10px, 100% ${pointCoordContent}, ${pointCoordContent} 100%, 10px 100%, 0% ${pointCoordContent}, 0% 10px)`

    r.style.setProperty('--bottom-shape-print', polygon);
    r.style.setProperty('--bottom-shape-border', polygonBorder);
    r.style.setProperty('--bottom-shape-cadre', polygonCadre);
    r.style.setProperty('--bottom-shape-content', polygonContent);

    console.log(polygon)
    console.log(polygonBorder)
    console.log(polygonCadre)

  }
})


</script>

<style scoped>
.duration__content {
  padding-left : 5cqw;
}
.range__content {
  padding-right : 5cqw;
}

.print-mode {
  .bottom__border {
    clip-path: var(--bottom-shape-border);
  }

  .bottom__content {
    clip-path: var(--bottom-shape-print);
    &::before {
      clip-path: var(--bottom-shape-cadre);
    }
    &::after {
      clip-path: var(--bottom-shape-content);
    }
  }

  .defense__container {
    width: 337.5px;
    height: 104px;
    left: 168.75px;
    bottom: 2px;
    background-image: url("~/assets/img/witcher/Bouclier/Bandeau_Bouclier_avec_contour.svg");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    transform: unset;
    &::before {
      content: '';
      opacity: 0;
    }
  }

  .range__container {
    position: absolute;
    bottom: -17.5px;
    right: 0;
    width: 20%;
    z-index: 10;
    transform: translateY(0);
    &::before {
      content: url("~/assets/img/witcher/Picto_Range/Picto_range_entier.svg");
      display: block;
      position: absolute;
      width: 54px;
      height: 54px;
      top: unset;
      bottom: -8px;
      right: -27px;
      transform: translate(0 , 0);
      z-index: 3;
    }
  }

  .range__content {
    width: 100%;
    z-index: 1;
    padding-right: 37px;
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

}

</style>
