import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store/index";
import axios from "axios";
import VueAxios from "vue-axios";
import VueMoment from "vue-moment";
import moment from "moment-timezone";
import "./styles/app.scss";

Vue.use(VueMoment, {
  moment,
});
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
