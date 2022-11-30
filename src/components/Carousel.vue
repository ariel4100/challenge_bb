<script setup>
import axios from "axios";
import { ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import CardActivity from '../components/CardActivity.vue'

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const props = defineProps({
  images: {
    type: Array,
  }
})
const modules = [Pagination, Navigation]; 
</script>
<template>
  <div class=""> 
    <swiper
      :modules="modules"
      :pagination="{
        clickable: true,
      }"
      :navigation="true"
    >
      <swiper-slide v-for="(item,index) in images" :key="index">
        <img :src="item" alt="" class="rounded">
      </swiper-slide> 
    </swiper>
  </div>

</template>
 
