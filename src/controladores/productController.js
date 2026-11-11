const productsService = require("../services/productsService");
const cartService = require("../services/cartService");
const normalizarId = require("../middlewares/normalizeId");

function mostrarHome(req, res) {
    const productosSugeridos =
        productsService.obtenerProductosSugeridos();
    const productosMasPedidos =
        productsService.obtenerProductosMasPedidos();
    res.render("pages/index.ejs", {
        productosSugeridos: productosSugeridos,
        productosMasPedidos: productosMasPedidos
    });
}

function mostrarProductos(req, res) {
    const producto = req.producto;
    const productosRelacionadosFinales = productsService.productosRelacionadosFinales(producto.id);
    res.render("pages/products.ejs", {
        producto: producto,
        productosRelacionadosFinales:
            productosRelacionadosFinales,
    });
}
function mostrarTodosLosProductos(req, res) {
    let productos = productsService.mostrarTodosLosProductos();
    const criterio = req.query.sort;
    if (criterio === "asc" || criterio === "desc") {
        productos =
            productsService.ordenarProductosPorPrecio(
                criterio
            );
    }
    res.render("pages/productlists.ejs", {
        productos: productos
    });
}

function mostrarCarrito(req, res) {
    const carritoCompleto =
        cartService.obtenerCarrito(
            req.session
        );
    const totalPrecio =
        cartService.calcularTotalPrecio(
            req.session
        );
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
    const productId =
        req.body.productId;
    const resultado =
        cartService.agregarProducto(
            req.session,
            productId
        );
    // El producto no existe
    if (resultado === "NO_EXISTE") {

        mostrarError404(req, res);
        return;
    }
    // Producto sin stock
    if (resultado === "SIN_STOCK") {
        res.redirect(
            "/products/" + productId
        );
        return;
    }
    // Producto agregado correctamente
    res.redirect(
        "/products/" + productId
    );
}

function mostrarError404(req, res) {
    res.status(404);
    res.render(
        "pages/error404.ejs"
    );
}

function mostrarError500(
    err,
    req,
    res,
    next
) {
    res.status(500);
    res.render(
        "pages/error500.ejs"
    );
}
function quitarCarrito(req, res) {
    const productId =
        req.body.productId;
    cartService.quitarCarrito(
        req.session,
        productId
    );
    res.redirect("/cart");
}

function sumarProducto(req, res) {
    const productoId =
        req.body.productId;
    cartService.sumarProducto(
        req.session,
        productoId
    );
    res.redirect("/cart");
}

function restarProducto(req, res) {
    const productoId =
        req.body.productId;

    cartService.restarProducto(
        req.session,
        productoId
    );

    res.redirect("/cart");
}

function mostrarCategoria(req, res) {
    const productoCategoria =
        req.params.categoria;
    const productosCategoria =
        productsService.obtenerProductosPorCategoria(
            productoCategoria
        );
    res.render(
        "pages/categories.ejs",
        {
            categoria:
                productoCategoria,
            productosCategoria:
                productosCategoria
        }
    );
}
//controler de busqueda
function buscarProductoPorNombre(req,res){
    const nombreProductoBuscar = req.query.query;
    const productos= productsService.buscarProductoPorNombre(nombreProductoBuscar);
    res.render("pages/productlists.ejs", {
    productos: productos
});
}
module.exports = {
    mostrarHome,
    mostrarProductos,
    mostrarCarrito,
    mostrarCheckout,
    mostrarRegistro,
    mostrarLogin,
    mostrarError404,
    mostrarError500,
    agregarProducto,
    quitarCarrito,
    sumarProducto,
    restarProducto,
    mostrarCategoria,
    mostrarTodosLosProductos,
    buscarProductoPorNombre
};