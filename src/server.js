import express, { json } from "express";
import { getConnection } from "./database.js";
import { User } from "./models/USer.js";
import { UserController } from "./controllers/UserController.js";
// import { get } from "express/lib/response.js";
const app = express()

const PORT = 4000;

//middleware
app.use(json());

//ruta base
app.get('/', (req, res) => {
  res.send("Hello World");
});

//ruta para obtener todos  usuarios
app.get('/api/clientes', UserController.getAll);

//ruta obtener usuarios por id
app.get('/api/clientes/:id', async (req,res) => {
    const id = req.params.id;

    const clientes = await User.getById(id);
    res.status(200).json(clientes);  
});

//registrar cliente
app.post("/api/clientes", async (req, res) => {
    const data = req.body;
    const result = await User.create(data);

    res.status(201).json({
        message: "user successfully created... =)",
        id: result,
    });
    console.log(`se ha creado un usuario`)

});


//actualizar ficha cliente por ID. se combinan ambas formas
app.patch('/api/clientes/:id', async (req, res) => {

    const result = await User.update(data);
    const id = req.params.id;

    // console.log(body);

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

//rutas no encontradas
app.use((req,res) =>{
    res.status(404).json({
        message:"UPS!There is nothing here",
    });
});
 
//funcion anonima que se define y se auto ejecuta
(async() => {
    try {
        //conexion base de datos
        await getConnection();
        console.log(`=================================`);
        console.log(' 🛢️ DaTaBaSe CoNNeCTeD! O.O ');   

        //iniciando servidor

        app.listen(PORT, () => {
            console.log(` server running 🚀 on ${PORT}  ^.^`);
            console.log(`=================================`);
        });


    } catch (error) {
        console.log(error.message);
    }

})();

