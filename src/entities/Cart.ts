import {User} from './User';
import {CartItem} from './CartItem';

export interface Cart {
  id: number;
  createAt: Date ;
  totalPrice : number ;
  user : User ;
  cartItems : CartItem[];
}
