import VueRouter, { NavigationGuardNext, Route } from "vue-router";
import { getLocalToken } from "@/helpers/storage";
// import { IRefreshToken } from "./interfaces/dto";

async function authControl(
  router: VueRouter,
  to: Route,
  next: NavigationGuardNext<Vue>
) {
  const token = getLocalToken();

  if (!token || token === null) {
    return to.meta?.guest !== true ? router.replace("/auth/login") : next();
  }

  if (token && to.meta?.guest === true) {
    router.replace("/");
  } else {
    next();
  }
}

export default authControl;
