import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/src/stylus/app.styl";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify, {
  iconfont: "md", // 'md' || 'mdi' || 'fa' || 'fa4'
  theme: {
    primary: colors.indigo,
    secondary: colors.teal
  }
});
