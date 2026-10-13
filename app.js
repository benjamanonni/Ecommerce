const express = require("express");
const router = require("./src/routes/productRoutes");
const app=express();
app.use(express.urlencoded({ extended: true }))
const session = require("express-session");

//app.set("nombreDeConfiguracion", "valor")
app.set("view engine","ejs");
//lo paramos en otra raiz
app.set("views", "./src/views");
//configuramos asset como carpeta estatica
app.use(express.static("assets"));

//configuramos session
app.use(session({
    secret: "secret", //firma de la cokie
    resave: false,//gurdar aun que no cambio 
    saveUninitialized: false //guardar sesion vacia 
}));
app.use(router);
const puerto = 3000;

//levantamos puerto
app.listen(puerto,()=>console.log("levantando puerto 3000 "));