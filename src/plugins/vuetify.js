import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: "#006442", // #E53935
            secondary:"#F47320", // #FFCDD2
           
          },
        },
      },
});
