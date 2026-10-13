const productos = require("../modelos/productModel");//array completo
function mostrarHome(req, res) {
    res.render("pages/index.ejs");
}

function mostrarProductos(req, res) {
    res.render("pages/products.ejs");
}

function mostrarCarrito(req, res) {
    const carritoCompleto = [];
    let totalPrecioProducto = 0;
    let totalPrecio=0;
    if (req.session.cart === undefined) {
        req.session.cart = [];
    }
    const carrito = req.session.cart;
    for (let i = 0; i < carrito.length; i++) {
        //buscamos objetos coincidentes por id
        for (let c = 0; c < productos.length; c++) {
            if (carrito[i].productId === productos[c].id) {
                //no sirve solo hacer push de producto[c] debido a que no tiene la cantidad 
                carritoCompleto.push({
                    id: productos[c].id,
                    nombre: productos[c].nombre,
                    precio: productos[c].precio,
                    imagen: productos[c].imagen,
                    quantity: carrito[i].quantity
                });
                totalPrecioProducto = productos[c].precio*carrito[i].quantity;
                totalPrecio +=totalPrecioProducto;
            }
        }
    }
    //calculamos total
    res.render("pages/cart.ejs", {
        carrito: carritoCompleto,
        total: totalPrecio
    });
}

function mostrarCheckout(req, res) {
    res.render("pages/checkout.ejs");
}

function mostrarRegistro(req, res) {
    res.render("pages/register.ejs");
}

function mostrarLogin(req, res) {
    res.render("pages/login.ejs");
}
function agregarProducto(req, res) {
    const productId = req.body.productId;
    if (req.session.cart === undefined) {
        req.session.cart = [];
    }
    //verificamos que ya este ese producto 
    let productoEncontrado = null;
    //buscamos el producto dentro del array si lo encuentra lo almacenamos 
    for (let i = 0; i < req.session.cart.length; i++) {
        if (req.session.cart[i].productId === productId) {
            productoEncontrado = req.session.cart[i];
        }
    }
    //si no lo encontro entonces lo añadimos 
    if (productoEncontrado === null) {
        req.session.cart.push({
            productId: productId,
            quantity: 1
        });
    }
    //si lo encontro lo sumamos 
    else {
        productoEncontrado.quantity = productoEncontrado.quantity + 1;
    }
    console.log(productId);
    //si nunca le respondiera nunca terminaria el req 
    res.redirect("/products");
}
function mostrarError404(req, res) {
    res.render("pages/error404.ejs");
}
function quitarCarrito(req, res) {
    const carritoCompleto = [];
    if (req.session.cart === undefined) {
        req.session.cart = [];
    }
    const carrito = req.session.cart;
    
    //obtenemos el id1
    const productId = req.body.productId;
    //recorremos lista de productos
    for (let c = 0; c < carrito.length; c++) {
        if (carrito[c].productId == productId) {
            carrito.splice(c, 1);//posicion a eleminar y cuantos elementos
            break;
        }
    }
    res.redirect("/cart");
}
function sumarProducto(req, res) {
    const carritoCompleto = [];
    if (req.session.cart === undefined) {
        req.session.cart = [];
    }
    const carrito = req.session.cart;
    //obtenemos id
    const productoId = req.body.productId;
    //si cordina sumamos cantidad
    for (let c = 0; c < carrito.length; c++) {
        if (carrito[c].productId === productoId) {
            carrito[c].quantity = carrito[c].quantity + 1;
            break;
        }
    }
    res.redirect("/cart");
}
function restarProducto(req, res) {
    const carritoCompleto = [];
    if (req.session.cart === undefined) {
        req.session.cart = [];
    }
    const carrito = req.session.cart;
    //obtenemos id
    const productoId = req.body.productId;
    //si cordina sumamos cantidad
    for (let c = 0; c < carrito.length; c++) {
        if (carrito[c].productId === productoId) {
            carrito[c].quantity = carrito[c].quantity - 1;
            if (carrito[c].quantity === 0) {
                carrito.splice(c, 1); //eleminamos posicion y cantidad
            }
            break;
        }
    }
    res.redirect("/cart");
}
//exportamos metodos 
module.exports = {
    mostrarHome,
    mostrarProductos,
    mostrarCarrito,
    mostrarCheckout,
    mostrarRegistro,
    mostrarLogin,
    mostrarError404,
    agregarProducto,
    quitarCarrito,
    sumarProducto,
    restarProducto
};