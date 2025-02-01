import OrderDetails from "./OrderDetails";

export default class Order{
    orderId!:number;
    orderDate!:string;
    id!:number;
    items!:OrderDetails[];
}