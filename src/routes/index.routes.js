import express from "express";

const router = express.Router();

//ruta base
router.get('/', (req, res) => {
    res.send("Hello World ctm!");
  });
  
export default router;
