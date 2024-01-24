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
app.get('/api/clientes/:id', UserController.getById);

//registrar cliente
app.post('/api/clientes', UserController.create);


//actualizar ficha cliente por ID. se combinan ambas formas
app.patch('/api/clientes/:id', UserController.update);


//borrar usuario por id
app.delete('/api/clientes/:id', UserController.delete);

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

