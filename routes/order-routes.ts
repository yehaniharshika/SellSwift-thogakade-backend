import express from "express";

import {OrderCreate} from "../database/order-data-store";

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

export default router;