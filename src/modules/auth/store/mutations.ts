import { MutationTree } from "vuex";
import { IAuthState } from "./state";

const mutations: MutationTree<IAuthState> = {
  "AUTH/SET_TOKEN"(state: IAuthState, payload) {
    state.token = payload;
  },
  "AUTH/SET_USER"(state: IAuthState, payload) {
    state.user = payload;
  },
};

export default mutations;
