<template>
  <UDashboardGroup>
    <UDashboardSidebar class="bg-gray-800" >
      <SidebarNav/>
    </UDashboardSidebar>
    <UDashboardPanel>
      <slot />
    </UDashboardPanel>
  </UDashboardGroup>
</template>

<script lang="ts">

import {defineComponent} from "vue";
import SidebarNav from "~/components/Nav/SidebarNav.vue";

export default defineComponent({
  components: {SidebarNav}
})
</script>


<style scoped>

</style>
