import { Product } from "./Product";


export interface Image{
    id : number ;
    imageUrl : string ;
    fileName : string ;
    altText : string ;
    product : Product ;
}