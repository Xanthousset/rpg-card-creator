<template>
  <ul class="flex items-center justify-center pb-6 gap-6 flex-wrap">

    <li v-for="(filter , i) in orderFilters" :key="filter.name">

      <UTooltip :delay-duration="0"
                arrow
                :text="filter.tooltip"
                :content="contentSettings">

        <UButton type="button"
                 :icon="filter.asc ? filter.ascIcon : filter.descIcon"
                 class="cursor-pointer"
                 :color="activeIndex === i ? 'primary' : 'neutral'"
                 @click="changeOrder(filter , i)">
        </UButton>

      </UTooltip>

    </li>

  </ul>
</template>

<script lang="ts" setup>

type OrderSetting = {
  name: string
  asc: boolean
  tooltip: string
  ascIcon: string
  descIcon: string
}

const deckStore = useDeckStore()

const contentSettings = {
  align: 'center',
  sideOffset: 8
} as TooltipContentProps

const activeIndex = ref<number | undefined>(undefined)

const orderFilters = reactive<OrderSetting[]>([
  {
    name: 'name',
    asc: false,
    tooltip: 'Order by card name',
    ascIcon : 'i-lucide-a-arrow-up',
    descIcon : 'i-lucide-a-arrow-down',
  },
  {
    name: 'cost',
    asc: false,
    tooltip: 'Order by spell cost',
    ascIcon : 'i-lucide-arrow-up-1-0',
    descIcon : 'i-lucide-arrow-down-0-1',
  }
])


function changeOrder(setting: OrderSetting , index: number) {
  setting.asc = !setting.asc

  activeIndex.value = index

  startOrdering(setting)

}

function startOrdering(setting: OrderSetting) {
  deckStore.orderDeck(setting.name, setting.asc)
}

</script>


<style scoped>



</style>
