<template>
  <v-toolbar color="secondary"  :class="fixed ? 'fixed-header' : ''"  dark flat>
    <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
    <v-toolbar-title to="/">
      <img alt="Vue logo" height="50" src="../assets/logo-footer.bbcd43e.png"
    /></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-bell</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-toolbar>
</template>
<script>
export default {
 data() {
    return {
      fixed: false,
    };
  },

  methods: {
    handleScroll() {
     var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                scrollTop >=50 ? this.fixed = true : this.fixed = false

    }
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>
