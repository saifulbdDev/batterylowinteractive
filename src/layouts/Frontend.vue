<template>
  <main>
    <Header/>
    <slot />
    <Footer/>
    <Loader v-if="loader"/>
  </main>
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import Loader from '../components/Loader.vue';
import {  mapState } from "vuex";
export default {
  components: { Header, Footer, Loader },
  name: "Homelayout",

  data: () => ({
  
  }),
    computed: {
    ...mapState("scores", ["loader"]),
    }

};
</script>
