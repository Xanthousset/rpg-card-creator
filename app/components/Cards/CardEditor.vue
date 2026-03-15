<template>

  <div class="w-full h-full flex justify-center items-center gap-12">


    <div class="flex flex-col w-4/12 bg-black rounded-2xl overflow-hidden card-ratio">

      <div class="w-full">
        <UFileUpload v-model="card.image" class="w-full min-h-48" :ui="{base: 'rounded-none' , file: 'no-rounded'}" />
      </div>

      <div class="grow bg-black p-12 rounded-b-2xl">

        <div class="flex justify-center w-full">
          <UInput v-model="card.name" variant="none" size="xl" placeholder="Card name" :ui="{'base' : 'text-3xl text-center'}" />
        </div>

        <UTextarea v-model="card.description"
                   variant="none"
                   placeholder="Card description"
                   autoresize
                   class="w-full"
        />

      </div>
    </div>


    <div v-if="errorMessage">
      {{ errorMessage }}
    </div>

    <div class="flex flex-col gap-4 items-center">
      <UButton @click="saveCard" > {{ buttonText }}</UButton>
      <UButton href="/deck" > DECK </UButton>
    </div>


  </div>

</template>

<script setup lang="ts">
import { Card } from '~/models/Card'

const props = defineProps<{
  editingCard?: Card
  isEditing?: boolean
}>()

const buttonText = props.isEditing ? 'Save changes' : 'Add to deck'
const router = useRouter()
const deckStore = useDeckStore()
const card = ref<Card>(props.isEditing && props.editingCard ? props.editingCard : new Card())
const errorMessage = ref<string>()

function saveCard(): void {

  errorMessage.value = ''

  if(!card.value.name) {
    errorMessage.value = "Name is required"
    return
  }

  if (props.isEditing) {
    deckStore.updateCard(card.value)
    router.push('/deck')
  } else {
    deckStore.addCard(card.value)
    card.value = new Card()
  }

}

</script>

<style scoped>

</style>
