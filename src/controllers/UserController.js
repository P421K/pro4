import { User } from "../models/USer.js";

export class UserController{

    static async getAll(req, res){
    //
        try {
            const clientes = await User.getAll();
            res.status(200).json(clientes);
        } catch (error) {
            res.status(500).json({message:"errrrror getting users", error});
            
        }
    }
    static async getById(req, res){
        //
    }
    static async create(req, res){
        //
    }
    static async update(req, res){
        //
    }
    static async delete(req, res){
        //
    }




}