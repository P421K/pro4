import { getConnection } from "../database.js";

export class User{
    static #connection;

    static async initConnection(){
        if (!User.#connection){
            
            User.#connection = await getConnection();
            // console.log(typeof User.#connection);
        }
    }

    static async getAll(){
        await this.initConnection();

        const [clientes] = await User.#connection.execute(
            "SELECT * FROM `clientes`");
            return clientes;
    }

    static async getById(id){
        await this.initConnection();

        const [result] = await User.#connection.execute(
            "SELECT* FROM `clientes` WHERE `id` = ?",
            [id]
        );
        return result[0];
    
        //
    }

    static async create(data){
        await this.initConnection();

        const { username, first_name, last_name, email } = data;
        const [result] = await User.#connection.execute(
            "INSERT INTO clientes (username, first_name , last_name, email) VALUES (?, ?, ?, ?)",
            [username, first_name, last_name, email]
        );
        return result.insertId;

        //
    }

    static async update(id, data){
        await this.initConnection();

        const { username, first_name, last_name, email } = data;
        const [result] = await User.#connection.execute(
            "UPDATE clientes SET username=?, first_name=?, last_name=?, email=? WHERE id=?",
            [username, first_name, last_name, email, id]
        );
            return result.affectedRows;


        //
    }

    static async delete(id){
        await this.initConnection();


        const [result] = await User.#connection.execute(
            "DELETE FROM clientes WHERE id = ?",
            [id]
        );
        return result.affectedRows;


        //
    }
}