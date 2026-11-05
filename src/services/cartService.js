const productsService =
    require("./productsService");


// ARMA EL CARRITO COMPLETO PARA LA VISTA
function obtenerCarrito(session) {
    if (session.cart === undefined) {
        session.cart = [];
    }
    const carritoCompleto = [];
    for (let i = 0; i < session.cart.length; i++) {
        const producto =
            productsService.buscarProductoPorId(
                session.cart[i].productId
            );
        if (producto !== null) {
            carritoCompleto.push({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                imagen: producto.imagenPrimaria,
                quantity: session.cart[i].quantity
            });
        }
    }
    return carritoCompleto;
}

// CALCULAR TOTAL
function calcularTotalPrecio(session) {
    const carritoCompleto =
        obtenerCarrito(session);
    let totalPrecio = 0;
    for (let c = 0; c < carritoCompleto.length; c++) {
        totalPrecio +=
            carritoCompleto[c].precio *
            carritoCompleto[c].quantity;

    }
    return totalPrecio;
}

// FUNCIÓN INTERNA
function buscarProductoEnCarrito(
    carrito,
    productId
) {
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].productId === productId) {
            return carrito[i];
        }
    }
    return null;
}

// AGREGAR PRODUCTO
function agregarProducto(
    session,
    productId
) {
    if (session.cart === undefined) {
        session.cart = [];
    }
    const productoReal =
        productsService.buscarProductoPorId(
            productId
        );
    if (productoReal === null) {
        return "NO_EXISTE";
    }
    if (productoReal.stock <= 0) {
        return "SIN_STOCK";
    }
    const productoEnCarrito =
        buscarProductoEnCarrito(
            session.cart,
            productId
        );
    if (productoEnCarrito === null) {
        session.cart.push({
            productId: productId,
            quantity: 1
        });
    } else {
        productoEnCarrito.quantity =
            productoEnCarrito.quantity + 1;
    }
    return "OK";
}

// QUITAR PRODUCTO
function quitarCarrito(
    session,
    productId
) {
    if (session.cart === undefined) {
        session.cart = [];
    }
    for (let i = 0; i < session.cart.length; i++) {
        if (
            session.cart[i].productId === productId
        ) {
            session.cart.splice(i, 1);
            return;
        }
    }
}

// SUMAR CANTIDAD
function sumarProducto(
    session,
    productoId
) {
    if (session.cart === undefined) {
        session.cart = [];
    }
    for (let c = 0; c < session.cart.length; c++) {
        if (
            session.cart[c].productId === productoId
        ) {
            session.cart[c].quantity =
                session.cart[c].quantity + 1;
            return;
        }
    }
}

// RESTAR CANTIDAD
function restarProducto(
    session,
    productoId
) {
    if (session.cart === undefined) {
        session.cart = [];
    }
    for (let c = 0; c < session.cart.length; c++) {
        if (
            session.cart[c].productId === productoId
        ) {
            session.cart[c].quantity =
                session.cart[c].quantity - 1;
            if (
                session.cart[c].quantity === 0
            ) {
                session.cart.splice(c, 1);

            }
            return;
        }
    }
}

module.exports = {
    obtenerCarrito,
    calcularTotalPrecio,
    agregarProducto,
    quitarCarrito,
    sumarProducto,
    restarProducto
};