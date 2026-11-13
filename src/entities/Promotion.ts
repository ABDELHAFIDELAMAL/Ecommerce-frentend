import {Product} from './Product';
import {DiscountType} from '../enums/DiscountType.enum';


export interface Promotion {
  id: number;
  name : string;
  description : string;
  discountValue : number ;
  discountType : DiscountType;
  active : boolean;
  startDate : Date ;
  endDate : Date ;
  products : Product[] ;
}
