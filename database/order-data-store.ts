import { PrismaClient } from "@prisma/client";
import Order from "../model/Order";

const prisma = new PrismaClient();

export async function OrderCreate(orderData: Order) {
    try {
        const newOrder = await prisma.order.create({
            data: {
                orderId: orderData.orderId,
                OrderDate: orderData.orderDate,
                id: Number(orderData.id),
                OrderDetails: {
                    create: orderData.items.map(item => ({
                        code: item.code,
                        getQty: item.getQty,
                        Price: item.price,
                        totalPrice: item.totalPrice.toString()
                    }))
                }
            },
            include: { OrderDetails: true }
        });
        for (const item of orderData.items){
            const existingItem = await prisma.item.findUnique({
                where: {code: item.code}
            });

            if (!existingItem){
                throw new Error(`Item with code ${item.code} not found`);
            }

            const newQuantity = existingItem.quantity - item.getQty;

            if (newQuantity< 0){
                throw new Error(`Not enough stock for item code ${item.code}`);
            }

            await prisma.item.update({
                where: {code: item.code},
                data: {quantity: newQuantity}
            });
        }

        console.log("Order added success:", newOrder);
        return newOrder;
    } catch (err) {
        console.error("Error creating order", err);
        throw new Error("Failed to create order");
    }
}

export async function OrderDelete(orderId:number){
    try {
        const order = await prisma.order.findUnique({
            where: { orderId },
            include: { OrderDetails: true } // Include order items
        });

        if (!order) {
            throw new Error(`Order with ID ${orderId} not found`);
        }

        for (const item of order.OrderDetails) {
            await prisma.item.update({
                where: { code: item.code },
                data: { quantity: { increment: item.getQty } } // Add back the qty
            });
        }
        const deletedOrder = await prisma.order.delete({
            where: {orderId: orderId}
        });

        console.log("Order deleted: ",orderId);
        return deletedOrder;
    }catch (err){
        console.log("error deleting order",err);
    }
}

export async function getAllOrders(){
    try {
        return await prisma.order.findMany({
            select: {
                orderId: true,
                OrderDate: true, 
                id: true,
                OrderDetails: {
                    select: {
                        code: true,
                        getQty: true,
                        Price: true
                    }
                }
            }
        });
    }catch (err){
        console.log("error getting orders: ",err);
    }
}
