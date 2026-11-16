import {User} from './User';
import {Product} from './Product';

export interface Review {
  id: number;
  rating: number;
  comment: string;
  createdAt: string;
  user: User;
  product: Product;
}
