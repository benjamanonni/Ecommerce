const express = require("express");
const router = require("./src/routes/productRoutes");
const http = require("http");
const WebSocket = require("ws");
const expressLayouts = require('express-ejs-layouts');
const app=express();
const cartService = require("./src/services/cartService");
const websocketService = require("./src/services/websocketService");

app.use(express.urlencoded({ extended: true }))
const session = require("express-session");

//le pasamos al server el app
const server = http.createServer(app);
//crea una instancia del servidor WebSocket.
const wss = new WebSocket.Server({ noServer: true });
websocketService.configurarServidor(wss);

//app.set("nombreDeConfiguracion", "valor")
app.set("view engine","ejs");
//lo paramos en otra raiz
app.set("views", "./src/views");
//configuramos asset como carpeta estatica
app.use(express.static("assets"));
//usamos layout para codigo repetido
app.use(expressLayouts);
//le decimos que layout usar
app.set("layout", "layouts/main");

//configuramos session
const sessionMiddleware = session({
    secret: "secret", //firma de la cokie
    resave: false,//gurdar aun que no cambio 
    saveUninitialized: false //guardar sesion vacia 
});
app.use(sessionMiddleware);
server.on("upgrade", (request, socket, head) => {
    sessionMiddleware(request, {}, (error) => {
        if (error) {
            socket.destroy();
            return;
        }
        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit("connection", ws, request);
        });
    });
});
//cantidad de carrito
app.use((req, res, next) => {
    if (req.session.cart === undefined) {
    req.session.cart = [];
}
    let cantidadCarrito = cartService.calcularCantidadCarrito(req.session);
    //res.locals es un objeto que Express ofrece para guardar variables que después pueden usar las vistas EJS.
    res.locals.cantidadCarrito = cantidadCarrito;
    next();
});
app.use(router);
const puerto = 3000;

//cada vez que se conectan de forma ws envia notifiacion a consola
wss.on("connection", (ws,request) => {
    console.log("Cliente conectado");
     ws.sessionID = request.sessionID;
     console.log("ID de sesión:", request.sessionID);
    ws.on("close", () => {
        console.log("Cliente desconectado");
        console.log("Conexiones activas:", wss.clients.size);
    });
});

//levantamos puerto
server.listen(puerto,()=>console.log("levantando puerto 3000 "));