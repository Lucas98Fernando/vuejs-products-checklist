import { MutationTree } from "vuex";
import { IAuthState } from "./state";

const mutations: MutationTree<IAuthState> = {
  "AUTH/SET_TOKEN"(state: IAuthState, payload) {
    state.token = payload;
  },
};

export default mutations;
