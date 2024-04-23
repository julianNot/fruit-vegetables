export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  category: Category;
  totalPrice?: number;
}

export enum Category {
  Fruit = 'Fruta',
  Vegetable = 'Verdura'
}

export interface ProductResponse {
  [key: string]: {
    category: string;
    description: string;
    id: string;
    image: string;
    name: string;
    price: number;
    quantity: number;
  };
}
