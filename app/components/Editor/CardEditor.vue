<template>

  <div class="w-full h-full flex justify-center items-center gap-12">



    <article class="perspective-container">
      <div class="card-container" :class="isFront ? 'is-front' : 'is-back'" ref="cardContainer">
        <CardFront class="front face" :card="card" :aria-hidden="isFront" />
        <CardBack  class="back face" :card="card" :aria-hidden="!isFront" />
      </div>
    </article>



    <div v-if="errorMessage">
      {{ errorMessage }}
    </div>

    <div class="flex flex-col gap-4 items-center">
      <UButton @click="flipCard" > {{ cardSideText }}</UButton>
      <UButton @click="saveCard" > {{ buttonText }}</UButton>
      <UButton href="/deck" > DECK </UButton>
    </div>


  </div>

</template>

<script setup lang="ts">
import { Card } from '~/models/Card'
import CardFront from "~/components/Editor/CardFront.vue";
import CardBack from "~/components/Editor/CardBack.vue";
const props = defineProps<{
  editingCard?: Card
  isEditing?: boolean
}>()


const toast = useToast()

function showToast(message: string) {

  const toastProps = {
    title: message
  }

  toast.add(toastProps)
}

const buttonText = props.isEditing ? 'Save changes' : 'Add to deck'
const router = useRouter()
const deckStore = useDeckStore()
const optionsStore = useOptionsStore()
const card = ref<Card>(props.isEditing && props.editingCard ? props.editingCard : new Card())
const errorMessage = ref<string>()

const isFront = computed(() => optionsStore.isFront)

const cardSideText = computed(() => {
  return 'flip card'
})


function flipCard() {
  optionsStore.isFront = !isFront.value
}


function saveCard(): void {

  errorMessage.value = ''

  if(!card.value.name) {
    errorMessage.value = "Name is required"
    return
  }

  if (props.isEditing) {
    deckStore.updateCard(card.value)
    showToast(`${card.value.name} has been updated`)
    router.push('/deck')
  } else {
    deckStore.addCard(card.value)
    showToast(`${card.value.name} has been added to deck`)
    card.value = new Card()
    optionsStore.isFront = true
  }

}

</script>

<style scoped>
.perspective-container {
  width: 33.3%;
  perspective: 100em; /* creates an illusion of depth */
  perspective-origin: center;
}

.card-container {
  --flip-height: 17.5em;
  --animation-style: cubic-bezier(.79,.14,.15,.86);

  position: relative;
  transform-style: preserve-3d;
  width: 100%;
  transition: all 1s ease;
  box-shadow: rgba(0, 0, 0, 0.55) 0px 14px 28px, rgba(0, 0, 0, 0.52) 0px 10px 10px;
  border-radius: var(--card-radius);

  &.is-front {
    animation: flip-to-front .8s var(--animation-style) forwards;
  }

  &.is-back {
    animation: flip-to-back .8s var(--animation-style) forwards;
  }

}


.face {
  /* Hide the backside of the element, for when it is rotated */
  backface-visibility: hidden;
}

.back {
  /* The front and back elements occupy the same space */
  position: absolute;
  inset: 0;
  transform: rotateY(180deg);
}

@keyframes flip-to-front {
  0% { transform: translateZ(0em) rotateY(180deg); }
  25% { transform: translateZ(var(--flip-height)) rotateY(180deg); }
  50% { transform: translateZ(var(--flip-height)) rotateY(270deg); }
  75% { transform: translateZ(var(--flip-height)) rotateY(360deg); }
  100% { transform: translateZ(0em) rotateY(360deg); }
}

@keyframes flip-to-back {
  0% { transform: translateZ(0em) rotateY(0deg); }
  25% { transform: translateZ(var(--flip-height)); }
  50% { transform: translateZ(var(--flip-height)) rotateY(-90deg); }
  75% { transform: translateZ(var(--flip-height)) rotateY(-180deg); }
  100% { transform: translateZ(0em) rotateY(-180deg); }
}

</style>
