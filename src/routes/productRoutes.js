const {mostrarHome,mostrarProductos,mostrarCarrito,mostrarCheckout,mostrarRegistro,mostrarLogin,mostrarError404,mostrarError500,agregarProducto,sumarProducto,restarProducto,mostrarCategoria, quitarCarrito} = require("../controladores/productController");

const express = require("express");
//creamos un objeto routes para manejar rutas
const router = express.Router();
router.get("/",mostrarHome);
router.get("/products/:id",mostrarProductos);
router.get("/cart",mostrarCarrito);
router.get("/checkout",mostrarCheckout);
router.get("/register",mostrarRegistro);
router.get("/login",mostrarLogin);
//creamos categoria dinamica
router.get("/categorias/:categoria",mostrarCategoria);

//agregamos para recibir id del carrito
router.post ("/cart",agregarProducto);
//quitar desde carrito
router.post("/cart/quitar",quitarCarrito);
//Sumar cantidad
router.post("/cart/sumar",sumarProducto);
//restar cantidad
router.post("/cart/restar",restarProducto);

router.use(mostrarError500);
//si llega hasta aca es porque no existe esa ruta 
router.use(mostrarError404);




module.exports = router;