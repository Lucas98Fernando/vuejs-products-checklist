import Vue from "vue";
import { colors } from "vuetify/lib";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: colors.yellow,
        accent: colors.grey.darken3,
        secondary: colors.amber.darken3,
        info: colors.teal.lighten1,
        warning: colors.amber.base,
        error: colors.red.base,
        success: colors.green.accent3,
      },
    },
    options: { customProperties: true },
  },
});
