<template>
  <div>
    <h2>이번주 날씨 🗓️</h2>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'WeeklyWeather'
})
</script>

<style scoped>
h2 {
  @apply text-lg font-bold m-2 text-amber-800;
}
</style>