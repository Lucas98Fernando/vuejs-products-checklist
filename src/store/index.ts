import Vue from "vue";
import Vuex from "vuex";
import { IAuthState } from "@/modules/auth/store/state";
import auth from "@/modules/auth/store";
import { IUserState } from "@/modules/user/store/state";
import user from "@/modules/user/store";

Vue.use(Vuex);

export interface IState {
  auth: IAuthState;
  user: IUserState;
}

export default new Vuex.Store({
  modules: {
    auth,
    user,
  },
});
