import { Module } from "vuex";
import { IState } from "@/store";
import state, { IUserState } from "./state";
import actions from "./actions";
import mutations from "./mutations";

const AuthModule: Module<IUserState, IState> = {
  namespaced: true,
  actions,
  mutations,
  state,
};

export default AuthModule;
