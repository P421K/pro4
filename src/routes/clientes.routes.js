import express from "express";
import { UserController } from "../controllers/UserController.js";


const router = express.Router();


//ruta para obtener todos  usuarios
router.get('/', UserController.getAll);

//ruta obtener usuarios por id
router.get('/:id', UserController.getById);

//registrar cliente
router.post('/', UserController.create);


//actualizar ficha cliente por ID. se combinan ambas formas
router.patch('/:id', UserController.update);


//borrar usuario por id
router.delete('/:id', UserController.delete);


export default router;
