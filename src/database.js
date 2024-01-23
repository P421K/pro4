import mysql from "mysql2/promise";

//configuracion de la conexion base datos
const dbConfig ={
    host: 'localhost',
    port: 3309,
    user:'root',
    password: 'root',
    database: 'negocioTatuajes',
};


export const getConnection = async () => {
    const connection = await mysql.createConnection(dbConfig);
   //se retorna la conex para que pueda ser usada en otros modulos
    return connection;
};