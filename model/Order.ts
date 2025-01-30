import OrderDetails from "./OrderDetails";

export default class Order{
    orderId!:number;
    orderDate!:Date;
    id!:number;
    items!:OrderDetails[];
}