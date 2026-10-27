import {Cart} from './Cart';
import {Product} from './Product';

export interface CartItem {
  id: number;
  quantity: number;
  unitPrice: number;
  cart : Cart ;
  product : Product;
}
