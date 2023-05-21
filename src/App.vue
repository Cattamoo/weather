<template>
  <page-header />
  <today-weather />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PageHeader from "@/components/Header.vue";
import TodayWeather from "@/components/TodayWeather.vue";

export default defineComponent({
  name: 'App',
  components: {
    TodayWeather,
    PageHeader
  }
});
</script>

<style>
#app {
}
</style>
