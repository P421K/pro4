import express, { json } from "express";
import { getConnection } from "./database.js";
import router from "./router.js";
// import { User } from "./models/USer.js";
// import { UserController } from "./controllers/UserController.js";
// import { get } from "express/lib/response.js";
const app = express()

const PORT = 4000;

//middleware
app.use(json());

//rutas
app.use(router);

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

