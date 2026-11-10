
const productos = require("../modelos/productModel");

// PRODUCTOS SUGERIDOS
function obtenerProductosSugeridos() {
    const listaSugeridos = [];
    for (let c = 0; c < 5 && c < productos.length; c++) {
        listaSugeridos.push(productos[c]);
    }
    return listaSugeridos;
}

// PRODUCTOS MÁS PEDIDOS
function obtenerProductosMasPedidos() {
    const listaMasPedidos = [];
    for (let c = 0; c < 10 && c < productos.length; c++) {
        listaMasPedidos.push(productos[c]);
    }
    return listaMasPedidos;
}

// BUSCAR PRODUCTO POR ID
function buscarProductoPorId(productId) {
    for (let c = 0; c < productos.length; c++) {
        if (Number(productos[c].id) === Number(productId)) {
            return productos[c];
        }
    }
    return null;
}
//BUSCAR TODOS LOS PRODUCTOS
function mostrarTodosLosProductos() {
    return productos;
}
//Ordenar productos por precio
function ordenarProductosPorPrecio(criterio) {
    const copiaProductos = [...productos];

    if (criterio === "asc") {
        copiaProductos.sort(function (a, b) {
            return a.precio - b.precio;
        });
    }
    //menor a mayor
    if(criterio === "desc"){
        copiaProductos.sort(function (a,b){
            return b.precio-a.precio
        });
    }

    return copiaProductos;
}

// PRODUCTOS RELACIONADOS
function productosRelacionadosFinales(productoId) {
    const producto = buscarProductoPorId(productoId);
    if (producto === null) {
        return [];
    }
    const productosRelacionados = [];
    for (let c = 0; c < productos.length; c++) {
        if (
            producto.categoria === productos[c].categoria &&
            Number(productos[c].id) !== productoId
        ) {
            productosRelacionados.push(productos[c]);
        }
    }
    const copiaRelacionados = [...productosRelacionados];
    const cantidad =
        Math.min(4, copiaRelacionados.length);
    for (let i = 0; i < cantidad; i++) {
        const indiceRandom =
            i + Math.floor(
                Math.random() *
                (copiaRelacionados.length - i)
            );
        const auxiliar =
            copiaRelacionados[i];
        copiaRelacionados[i] =
            copiaRelacionados[indiceRandom];
        copiaRelacionados[indiceRandom] =
            auxiliar;
    }

    const listaFinal = [];
    for (let i = 0; i < cantidad; i++) {
        listaFinal.push(copiaRelacionados[i]);
    }
    return listaFinal;
}

// PRODUCTOS POR CATEGORÍA
function obtenerProductosPorCategoria(categoria) {
    const productosCategoria = [];
    for (let c = 0; c < productos.length; c++) {
        if (categoria === productos[c].categoria) {
            productosCategoria.push(productos[c]);
        }
    }
    return productosCategoria;
}
// BUSCAR PRODUCTO POR NOMBRE
function buscarProductoPorNombre(nombre){
    console.log(nombre)
    let productosEncontrados = []
    for(let c=0;c<productos.length;c++){
        if (productos[c].nombre.toLowerCase().includes(nombre.toLowerCase())) {
            productosEncontrados.push(productos[c]);
        }
    }
    return productosEncontrados;
}

module.exports = {
    obtenerProductosSugeridos,
    obtenerProductosMasPedidos,
    buscarProductoPorId,
    productosRelacionadosFinales,
    obtenerProductosPorCategoria,
    mostrarTodosLosProductos,
    ordenarProductosPorPrecio,
    buscarProductoPorNombre
};