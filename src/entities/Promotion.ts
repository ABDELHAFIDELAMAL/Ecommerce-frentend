import {Product} from './Product';


export interface Promotion {
  id: number;
  discountValue : number ;
  startDate : Date ;
  endDate : Date ;
  products : Product[] ;
}
