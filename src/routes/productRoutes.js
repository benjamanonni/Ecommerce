const {mostrarHome,mostrarProductos,mostrarCarrito,mostrarCheckout,mostrarRegistro,mostrarLogin} = require("../controladores/productController");
const express = require("express");
//creamos un objeto routes para manejar rutas
const router = express.Router();
router.get("/",mostrarHome);
router.get("/products",mostrarProductos);
router.get("/cart",mostrarCarrito);
router.get("/checkout",mostrarCheckout);
router.get("/register",mostrarRegistro);
router.get("/login",mostrarLogin);

module.exports = router;