const {mostrarHome,mostrarProductos,mostrarCarrito,mostrarCheckout,mostrarRegistro,mostrarLogin,mostrarError404} = require("../controladores/productController");
const express = require("express");
//creamos un objeto routes para manejar rutas
const router = express.Router();
router.get("/",mostrarHome);
router.get("/products",mostrarProductos);
router.get("/cart",mostrarCarrito);
router.get("/checkout",mostrarCheckout);
router.get("/register",mostrarRegistro);
router.get("/login",mostrarLogin);

//si llega hasta aca es porque no existe esa ruta 
router.use(mostrarError404);

module.exports = router;