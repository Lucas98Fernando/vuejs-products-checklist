import Vue from "vue";
import Vuex from "vuex";
import { IAuthState } from "@/modules/auth/store/state";
import auth from "@/modules/auth/store";

Vue.use(Vuex);

export interface IState {
  auth: IAuthState;
}

export default new Vuex.Store({
  modules: {
    auth,
  },
});
