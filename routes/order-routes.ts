import express from "express";

import {getAllOrders, OrderCreate, OrderDelete} from "../database/order-data-store";

const router = express.Router();

router.post("/create", async (req, res) => {
    console.log(req.body);
    const order = req.body;

    try {
        const createdOrder = await OrderCreate(order);
        res.json(createdOrder);

    } catch (err) {
        console.error("Error creating order:", err);
        res.status(500).json({ error: "Error adding order" });
    }
});

router.delete("/delete/:orderId", async(req,res) =>{
    const orderId:number = Number(req.params.orderId);

    try {
        const deletedOrder = await OrderDelete(orderId);
        res.json(deletedOrder);
    }catch (err){
        console.log("Error deleting order ",err);
    }
})

router.get("/view",async(req,res) => {
    try {
        const allOrders = await getAllOrders();
        res.json(allOrders);
    }catch (err){
        console.log("Error getting all orders",err);
    }
})

export default router;