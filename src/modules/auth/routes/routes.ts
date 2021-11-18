export default [
  {
    path: "/auth/login",
    name: "Login",
    meta: {
      title: "Faça o seu login",
      guest: true,
    },
    component: (): Promise<typeof import("*.vue")> =>
      import(/* webpackChunkName: "login" */ "@/modules/auth/pages/Login.vue"),
  },
  {
    path: "/auth/register",
    name: "Cadastro",
    meta: {
      title: "Faça o seu cadastro",
      guest: true,
    },
    component: (): Promise<typeof import("*.vue")> =>
      import(
        /* webpackChunkName: "register" */ "@/modules/auth/pages/Register.vue"
      ),
  },
];
