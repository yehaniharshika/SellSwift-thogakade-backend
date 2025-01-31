import {PrismaClient} from "@prisma/client";
import Item from "../model/Item";
import e from "express";

const prisma = new PrismaClient();

export async function ItemAdd(i: Item){
    try {
        const newItem = await prisma.item.create({
            data:{
                itemName: i.itemName,
                quantity: Number(i.quantity),
                price: i.price,
            }
        })
        console.log('Item Added: ',newItem);
        return newItem;
    }catch (err){
        console.log("Error adding Item ",err);
    }
}

export async function getAllItems(){
    try {
        return await prisma.item.findMany();
    }catch (err){
        console.log("error getting items from prisma data",err);
    }
}

export async function ItemUpdate(code:number, i: Item){
    try {
        const updatedItem = await prisma.item.update({
            where:{code : i.code},
            data:{
                itemName: i.itemName,
                quantity: Number(i.quantity),
                price: i.price
            }
        })
        console.log("Item Updated: ",updatedItem);
        return updatedItem;
    }catch (err){
        console.log("error updating item",err);
    }
}

export async function ItemDelete(code:number){
    try {
        const deletedItem = await prisma.item.delete({
            where:{code: code},
        });
        console.log("Item deleted: ",code);
        return deletedItem;
    }catch (err){
        console.log("error deleting item",err);
    }
}