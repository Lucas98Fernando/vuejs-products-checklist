export interface IAuthState {
  token: string;
  user: string[];
}

function state(): IAuthState {
  return {
    token: "",
    user: [],
  };
}

export default state;
