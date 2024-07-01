const express = require("express");
const override = require('method-override')
const rutas = require('./src/router/listadoroutes.js')

const app = express();
const port = 8080 || process.env.PORT || 3000;

//Para utilizar un motor de vistas
app.set('view engine', 'ejs') 
app.set('views', (__dirname + '/src/views'))

//Middlewares
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended: true}))
app.use(override('_metodo')) //para cambiar en el html el post por un put
app.use('/', rutas)

//Rutas

app.get("/carrito", (req, res) => {
    res.sendFile(__dirname + '/src/views/carrito.html');
});

app.use((req, res,next) => {
    res.status(404).send(`<h2 style="color: red"> Recurso no encontrado</h2>`)
})




app.listen(port, () => console.log(`Estoy arriba en el puerto: ${port}`));

