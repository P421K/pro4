import express from "express"; 
import clientesRoutes from "./routes/clientes.routes.js";
import indexRoutes from "./routes/index.routes.js";
//import tatuadoresRoutes from "./routes/tatuadores.routes.js";
//import citasRoutes from "./routes/citas.routes.js";


const router = express.Router();

//rutas base
router.use("/", indexRoutes);


//rutas clientes
router.use("/api/clientes", clientesRoutes);

//rutas tatuadores
//router.use("/api/tatu

//rutas citas//router.use("/api/citas", tatuadoresRoutes);


export default router;