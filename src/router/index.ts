import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import AuthRoutes from "@/modules/auth/routes/routes";
import authControl from "@/middlewares/auth";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "main-layout" */ "@/layouts/Main.vue"),
    children: [
      {
        path: "/",
        name: "Home",
        meta: {
          title: "Início",
        },
        component: () =>
          import(
            /* webpackChunkName: "home" */ "@/modules/user/pages/Home.vue"
          ),
      },
    ],
  },
  {
    path: "/auth",
    redirect: "/auth/login",
    component: () =>
      import(/* webpackChunkName: "auth-layout" */ "@/layouts/Auth.vue"),
    children: [...AuthRoutes],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta?.title;
  authControl(router, to, next);
  // next();
});

export default router;
