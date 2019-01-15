import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import store from "@/store.js";

Vue.use(Router);

const router = new Router({
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
      name: "Directory",
      component: () => import("./views/Teams.vue")
    },
    {
      path: "/events",
      name: "Events",
      component: () => import("./views/Events.vue")
    },
    {
      path: "/join",
      name: "Join",
      component: () => import("./views/Join.vue")
    },
    {
      path: "/sign-in",
      name: "SignIn",
      component: () => import("./views/SignIn.vue")
    },
    {
      path: "/players",
      name: "Players",
      component: () => import("./views/Players.vue")
    },
    {
      path: "/favteams",
      name: "FavTeams",
      component: () => import("./views/FavTeams.vue"),
      meta: {
        authRequired: true
      }
    },
    {
      path: "/chat",
      name: "Chat",
      component: () => import("./views/Chat.vue"),
      meta: {
        authRequired: true
      }
    },
    {
      path: "/about",
      name: "about"
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
    if (!store.state.user) {
      next({
        path: "/sign-in"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
