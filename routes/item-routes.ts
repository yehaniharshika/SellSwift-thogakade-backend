import express from "express";
import Item from "../model/Item";
import {getAllItems, ItemAdd, ItemDelete, ItemUpdate} from "../database/item-data-store";

const router = express.Router();

router.post("/add", async(req,res) =>{
    console.log(req.body);
    const item:Item = req.body;

    try {
        const addedItem = await ItemAdd(item);
        res.json(addedItem);
    }catch (err){
        console.log("Error adding item",err);
        res.status(400).send("error adding item");
    }
});

router.delete("/delete/:code", async(req,res) =>{
    const code:number = Number(req.params.code);

    try {
        const deletedItem = await ItemDelete(code);
        res.json(deletedItem);
    }catch (err){
        console.log("Error deleting item",err);
    }
});

router.put("/update/:code", async(req,res) =>{
    const code =+ req.params.code;
    const item : Item = req.body;

    try {
        const updatedItem = await ItemUpdate(code,item);
        res.json(updatedItem);
    }catch (err){
        console.log("Error updating item",err);
    }
});

router.get("/view", async(req,res) =>{
    try {
        const getItems = await getAllItems();
        res.json(getItems);
    }catch (err){
        console.log("Error getting all items",err);
    }
});

export default router;