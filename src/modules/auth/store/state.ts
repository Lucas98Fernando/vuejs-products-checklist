export interface IAuthState {
  token: string;
}

function state(): IAuthState {
  return {
    token: "",
  };
}

export default state;
