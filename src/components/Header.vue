<template>
  <header>
    <current-weather />
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CurrentWeather from "@/components/CurrentWeather.vue";

export default defineComponent({
  name: 'PageHeader',
  components: {
    CurrentWeather
  },
})
</script>

<style scoped>
header {
  @apply bg-amber-100 flex items-center justify-center;
}
</style>