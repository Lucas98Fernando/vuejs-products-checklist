export interface IProducts {
  id: number;
  name: string;
  price: number;
  qtd: number;
  item: {
    id: number;
    name: string;
    price: number;
    qtd: number;
    status: boolean;
  };
  status: number | boolean;
}
