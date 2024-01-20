const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send("Hello World");
});

app.get('/api/clientes', (req,res) => {
    res.send("Clientes")
});

app.get('/api/clientes/:id', (req,res) => {
    const id = req.params.id;
    console.log(req.params);
    res.send(id);
});

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`====> server running 🚀 on ${PORT}  ^.^ <=====`);
});
