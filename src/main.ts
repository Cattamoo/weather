import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import 'tailwindcss/tailwind.css'
import {handelGeolocationError, handelGeolocationSuccess} from "@/utils/geolocation";
import {OhVueIcon, addIcons} from "oh-vue-icons";
import {RiCelsiusFill} from 'oh-vue-icons/icons/ri';
import {BiSunFill, BiCloudSunFill, BiCloudFill, BiCloudRainFill, BiCloudSleetFill, BiCloudSnowFill, BiCloudRainHeavyFill, BiCloudDrizzleFill} from 'oh-vue-icons/icons/bi';

addIcons(RiCelsiusFill, BiSunFill, BiCloudSunFill, BiCloudFill, BiCloudRainFill, BiCloudSleetFill, BiCloudSnowFill, BiCloudRainHeavyFill, BiCloudDrizzleFill);

createApp(App)
	.component('v-icon', OhVueIcon)
	.mount('#app')
;

navigator.geolocation.getCurrentPosition(handelGeolocationSuccess, handelGeolocationError);