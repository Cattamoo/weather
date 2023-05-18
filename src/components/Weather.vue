<template>
  <div :class="`weather ${type}`">
    <div class="icon" v-if="data.PTY.fcstValue === '0'">
      <v-icon v-if="data.SKY.fcstValue < 6" name="bi-sun-fill" :scale="type === 'current' ? '6' : '2'" />
      <v-icon v-else-if="data.SKY.fcstValue < 9" name="bi-cloud-sun-fill" :scale="type === 'current' ? '6' : '2'" />
      <v-icon v-else name="bi-cloud-fill" scale="6" />
    </div>
    <div class="icon" v-else>
      <v-icon v-if="data.PTY.fcstValue === '1'" name="bi-cloud-rain-fill" :scale="type === 'current' ? '6' : '2'" />
      <v-icon v-if="data.PTY.fcstValue === '2'" name="bi-cloud-sleet-fill" :scale="type === 'current' ? '6' : '2'" />
      <v-icon v-if="data.PTY.fcstValue === '3'" name="bi-cloud-snow-fill" :scale="type === 'current' ? '6' : '2'" />
      <v-icon v-if="data.PTY.fcstValue === '4'" name="bi-cloud-rain-heavy-fill" :scale="type === 'current' ? '6' : '2'" />
      <v-icon v-if="data.PTY.fcstValue === '5'" name="bi-cloud-drizzle-fill" :scale="type === 'current' ? '6' : '2'" />
    </div>
    <div>
      <span class="text">{{ Number(data.T1H.fcstValue) }}</span>
      <v-icon class="celsius" name="ri-celsius-fill" :scale="type === 'current' ? '3' : '0.75'" />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {OhVueIcon} from "oh-vue-icons";

export default defineComponent({
  name: 'WeatherComponent',
  props: {
    data: Object,
    type: String,
  },
  components: {
    'v-icon': OhVueIcon
  },
})
</script>

<style scoped>
.weather {
  @apply flex items-center justify-center;
}
.weather.today {
  @apply flex-col text-xl w-20;
}
.weather.current {
  @apply flex-col sm:flex-row;
}
.current .text {
  @apply  text-7xl sm:text-9xl font-bold;
}
.current .icon {
  @apply mr-2;
}
.current .celsius {
  @apply self-end;
}
</style>