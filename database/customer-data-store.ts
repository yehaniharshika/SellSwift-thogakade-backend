import {PrismaClient} from '@prisma/client';
import Customer from "../model/Customer";

const prisma = new PrismaClient();

export async function CustomerAdd(c: Customer){
    try{
       const newCustomer  = await prisma.customer.create({
            data:{
                name: c.name,
                nic: c.nic,
                email: c.email,
                phone: c.phone,
            }
        })
        console.log('Customer Added :',newCustomer)
        return newCustomer;
    }catch(err) {
        console.log("error adding customer", err);
    }
}

export async function CustomerDelete(id:number) {
    try{
        const deletedCustomer = await prisma.customer.delete({
            where: {id: id},
        });
        console.log('Customer deleted :',id);
        return deletedCustomer;
    }catch(err){
        console.log("error deleting customer", err);
    }
}

export async function getAllCustomers(){
    try{
        return await prisma.customer.findMany();
    }catch(err){
        console.log("error getting customers from prisma data",err);
    }
}

export async function CustomerUpdate(id: number, c: Customer){
    try{
        const updatedCustomer = await prisma.customer.update({
            where:{ id : c.id},
            data:{
                name: c.name,
                nic: c.nic,
                email: c.email,
                phone: c.phone
            }
        })
        console.log('Customer updated :',updatedCustomer);
        return updatedCustomer;
    }catch(err){
        console.log("error updating customer", err);
    }
}