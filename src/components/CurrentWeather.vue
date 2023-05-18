<template>
  <weather-component class="cc" v-if="data != null" type="current" :data="data" />
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {getCurrentWeather} from "@/apis/weather";
import WeatherComponent from "@/components/Weather.vue";

export default defineComponent({
  name: 'CurrentWeather',
  components: {
    WeatherComponent,
  },
  data() {
    return {
      data: null
    }
  },
  async created() {
    this.data = await getCurrentWeather();
  }
})
</script>

<style scoped>
* {
  @apply bg-white/75 rounded-lg my-8 px-6 pt-8 pb-12;
}
</style>