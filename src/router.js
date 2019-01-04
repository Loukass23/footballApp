import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/teams",
      name: "Teams",
      component: () => import("./views/Teams.vue")
    },
    {
      path: "/join",
      name: "Join",
      component: () => import("./views/Join.vue")
    },
    {
      path: "/schedule",
      name: "Schedule",
      component: () => import("./views/Schedule.vue")
    },
    {
      path: "/about",
      name: "about"
    }
  ]
});
