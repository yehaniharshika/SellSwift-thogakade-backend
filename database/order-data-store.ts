import { PrismaClient } from "@prisma/client";
import Order from "../model/Order";

const prisma = new PrismaClient();

export async function OrderCreate(orderData: Order) {
    try {
        const newOrder = await prisma.order.create({
            data: {
                orderId: orderData.orderId,
                OrderDate: orderData.orderDate,  // Match the schema field name
                id: Number(orderData.id),  // Ensure it's a number
                OrderDetails: {  // Ensure correct case
                    create: orderData.items.map(item => ({
                        code: item.code,
                        getQty: item.getQty,  // Ensure correct case
                        Price: item.price,        // Ensure correct case
                    }))
                }
            },
            include: { OrderDetails: true }  // Match exactly with Prisma schema
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
