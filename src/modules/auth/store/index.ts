import { Module } from "vuex";
import { IState } from "@/store";
import state, { IAuthState } from "./state";
import actions from "./actions";
import mutations from "./mutations";

const AuthModule: Module<IAuthState, IState> = {
  namespaced: true,
  actions,
  mutations,
  state,
};

export default AuthModule;
