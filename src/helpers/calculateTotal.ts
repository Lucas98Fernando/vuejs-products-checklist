import { IProducts } from "@/modules/user/interfaces/dto";

function calculateTotal(productsArray: []): number {
  if (productsArray.length > 0) {
    const getPrice = (el: IProducts) => el.price * el.qtd;
    const sum = (el: number, count: number) => (el += count);
    const result = productsArray.map(getPrice).reduce(sum);
    return result;
  } else {
    return 0;
  }
}

export default calculateTotal;
