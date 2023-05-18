<template>
  <page-header />
  <today-weather />
  <weekly-weather />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PageHeader from "@/components/Header.vue";
import TodayWeather from "@/components/TodayWeather.vue";
import WeeklyWeather from "@/components/WeeklyWeather.vue";

export default defineComponent({
  name: 'App',
  components: {
    WeeklyWeather,
    TodayWeather,
    PageHeader
  }
});
</script>

<style>
#app {
}
</style>
