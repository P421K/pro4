import express, { json } from "express";
import { getConnection } from "./database.js";
// import { get } from "express/lib/response.js";
const app = express()

const PORT = 4000;



//middleware
app.use(json());

//ruta base
app.get('/', (req, res) => {
  res.send("Hello World");
});

/*
//Ruta para crear cliente
app.post ("/api/clientes/", async (req,res) =>{
    const connection = await getConnection();
    
    const{ username, nombre, apellido, email } = req.body;

    const [result] = await connection.execute(
        "INSERT INTO clientes (username, nombre, apellido, email) VALUES (?, ?, ?, ?)", [username, nombre, apellido, email]
    );

    res.status(201).json({
        message: "usuario creado",
        id: result.insertId,
    });
    // console.log(`se ha creado un usuario`);


});
*/

//ruta para obtener todos  usuarios
app.get('/api/clientes', async (req,res) => {
    const connection = await getConnection();
    const [rows] = await connection.execute(
        "SELECT * FROM `clientes`",
    );
    res.send(rows);
});

// //ruta obtener usuarios por nombre
// app.get('/api/clientes/search', async (req,res) => {
//     const connection = await getConnection();
//     const name = req.query.name; 

//     app.get('/api/clientes/search', (req,res) => {
//         const name = req.query.name;
//         app.get('/api/clientes/search', (req,res) => {
//             const name = req.query.name;
//         );
//     console.log(req.query);
//     res.send(name);
// });
    

 
//ruta obtener usuarios por id
app.get('/api/clientes/:id', async (req,res) => {
    const id = req.params.id;

    const connection = await getConnection();
    const [rows] = await connection.execute(
        "SELECT* FROM `clientes` WHERE `id` = ?",
        [id]
    );

    console.log(req.params);
    res.json(rows[0]);  
});

//registrar cliente
app.post("/api/clientes", async (req, res) => {
    const connection = await getConnection();

 
    const { username, first_name, last_name, email } = req.body;
    // console.log(body);

    const [result] = await connection.execute(
        "INSERT INTO clientes (username, first_name , last_name, email) VALUES (?, ?, ?, ?)",
        [username, first_name, last_name, email]
    );

    res.status(201).json({
        message: "user successfully created... =)",
        id: result.insertId,
    });
    console.log(`se ha creado un usuario`)

});


//actualizar ficha cliente por ID. se combinan ambas formas
app.patch('/api/clientes/:id', async (req, res) => {
    const connection = await getConnection();

    const id = req.params.id;

    const { username, first_name, last_name, email } = req.body;
    // console.log(body);

    const [result] = await connection.execute(
        "UPDATE clientes SET username=?, first_name=?, last_name=?, email=? WHERE id=?",
        [username, first_name, last_name, email, id]
    );
    res.status(202).json({
        message: "user successfully updated... =)",
        result: result.affectedRows > 0,
    });
    console.log(`se ha actualizado un usuario`)
});


//borrar usuario por id
app.delete('/api/clientes/:id', async (req, res) => {
    const connection = await getConnection();

    const id = req.params.id;

    const [result] = await connection.execute(
        "DELETE FROM clientes WHERE id=?", [id,]
    );
    res.status(200).json({
        message: "user successfully deleted... =)",
        result: result.affectedRows > 0,
    });
    console.log(`se ha borrado un usuario`)

});
//
 

const testConnection = async() => {
    try {
        await getConnection();
        console.log('====> DaTaBaSe CoNNeCTeD! O.O <=====');   
    } catch (error) {
        console.log(error.message);
    }

};

testConnection();

//iniciando servidor

app.listen(PORT, () => {
    console.log(`====> server running 🚀 on ${PORT}  ^.^ <=====`);
});
