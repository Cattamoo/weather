<template>
  <h2>오늘의 날씨 🌁</h2>
  <div v-if="data != null">
    <ul class="list">
      <li v-for="(key) in Object.keys(data)" :key="key">
        <span class="time">{{moment(key, 'YYYYMMDDHHmm').format('HH:mm')}}</span>
        <WeatherComponent type="today" :data="data[key]" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {getTodayWeather} from "@/apis/weather";
import WeatherComponent from "@/components/Weather.vue";
import moment from "moment";

export default defineComponent({
  name: 'TodayWeather',
  computed: {
    moment() {
      return moment
    }
  },
  components: {
    WeatherComponent
  },
  data() {
    return {
      data: null
    }
  },
  async created() {
    this.data = await getTodayWeather();
  }
})
</script>

<style scoped>
h2 {
  @apply text-lg font-bold m-2 text-amber-800;
}
ul.list {
  @apply flex gap-4 overflow-x-scroll m-2;
}
ul.list::-webkit-scrollbar {
  @apply h-2;
}
ul.list::-webkit-scrollbar-thumb {
  @apply bg-amber-200/50 rounded-lg;
}
.list li {
  @apply text-center p-2 bg-amber-50/50;
}
li .time {
  @apply bg-amber-200 text-sm text-zinc-600 px-1.5 rounded;
}
</style>