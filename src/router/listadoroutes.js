const express = require('express')
const router = express.Router()
const path = require('path')//sirve para mandar archivos que no estan dentro de la carpeta publica
const controladores = require('../controllers/listadoControllers')

//------------CRUD--------

router.get('/tienda.html', (req, res) => {
    res.sendFile(path.resolve(__dirname + '../../views/tienda.html'));
});

router.get("/tienda", controladores.getListadoTienda);

router.get('/listado.html', (req, res) => {
    res.sendFile(path.resolve(__dirname + '../../views/listado.html'));
});

router.get("/listado", controladores.getListado);

router.post('/listado', controladores.crearRegistro)

router.get('/modificar/:id', controladores.getModificar)

router.put('/modificar', controladores.actualizar)

router.delete('/listado', controladores.eliminar)

module.exports = router