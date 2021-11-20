export interface IUserState {
  productsApi: string[];
}

function state(): IUserState {
  return {
    productsApi: [],
  };
}

export default state;
