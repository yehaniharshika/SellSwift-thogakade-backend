import express from "express";

import {OrderCreate, OrderDelete} from "../database/order-data-store";

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

export default router;