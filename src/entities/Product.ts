import {Image} from './Image';
import {Category} from './Category';
import {OrderItem} from './Orderitem';
import {Review} from './Review';


export interface Product{
    id : number ;
    name : string ;
    price : number ;
    quantity : number ;
    description : string ;
    brand : string ;
    reviewCount : number ;
    averageRating : number ;
    active : boolean ;
    category : Category ;
    images : Image[];
    orderItems : OrderItem[] ;
    reviews : Review[] ;
}
