// import express from "express/lib/response.js";
import { User } from "../models/USer.js";

export class UserController{

    //OBTENER TODOS LOS USUARIOS
    static async getAll(req, res){
    
        try {
            const clientes = await User.getAll();
            res.status(200).json(clientes);
        } catch (error) {
            res.status(500).json({
                message:"errrrror getting clientes", error
            });
            
        }
    }

    //OBTENER CLIENTE POR ID
    static async getById(req, res){
        
                try {
                    const id = req.params.id;
                    const clientes = await User.getById(id);
                    
                    res.status(200).json(clientes);
                } catch (error) {
                    res.status(500).json({
                        message:"errrrror getting users"
                    });
                    
                }
    }
    
    //CREATE
    static async create(req, res){

        try {
            const data = req.body;

            const result = await User.create(data);
            res.status(201).json({ 
                message:"Usuario creado con exito",
                id: result,
        });
        } catch (error) {
            res.status(500).json({
                message:"errrrror creating a users",
            });
            
        }
    }
        
    //UPDATE
    static async update(req, res){
        
        try {
            const id = req.params.id;
            const data = req.body;

            await User.update(id, data);

            res.status(202).json({ 
                message:"Usuario actualizado con exito",
            });
        } catch (error) {
            res.status(500).json({
                message:"errrrror updating  users",
            });
            
        }
    }


    //DELETE
    static async delete(req, res){
    
        try {
            const id = req.params.id;

            await User.delete(id);

            res.status(202).json({ 
                message:"Usuario borrado con exito",
            });
        } catch (error) {
            res.status(500).json({
                message:"errrrror updating  users",
            });
            
        }
    }

}