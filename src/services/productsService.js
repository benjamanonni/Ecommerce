const productModel = require("../modelos/productModel");
// PRODUCTOS SUGERIDOS
function obtenerProductosSugeridos() {
    const lista = productModel.obtenerTodosLosProductos();
    let listaSugeridos = []
    for (let c = 0; c < 5 && c < lista.length; c++) {
        listaSugeridos.push(lista[c]);
    }
    return listaSugeridos;
}

// PRODUCTOS MÁS PEDIDOS
function obtenerProductosMasPedidos() {
    const lista = productModel.obtenerTodosLosProductos();
    let listaMasPedidos = []
    for (let c = 0; c < 10 && c < lista.length; c++) {
        listaMasPedidos.push(lista[c]);
    }
    return listaMasPedidos;
}

// BUSCAR PRODUCTO POR ID
function buscarProductoPorId(productId) {
    const producto = productModel.buscarProductoPorId(productId);
    if (producto === undefined) {
        return null;
    }
    return producto
}
//BUSCAR TODOS LOS PRODUCTOS
function mostrarTodosLosProductos() {
    const productos = productModel.obtenerTodosLosProductos();
    return productos;
}

//Ordenar productos por precio
function ordenarProductosPorPrecio(criterio) {
    const copiaProductos = productModel.obtenerTodosLosProductos();

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
    // 1. Buscar el producto original
    const producto = buscarProductoPorId(productoId);
    if (producto === null) {
        return [];
    }
    // 2. Obtener los productos desde SQLite
    const productos = productModel.obtenerTodosLosProductos();
    // 3. Buscar productos de la misma categoría
    const relacionados = [];
    for (let i = 0; i < productos.length; i++) {
        const candidato = productos[i];
        const mismaCategoria =
            candidato.categoria === producto.categoria;
        const distintoProducto =
            Number(candidato.id) !== Number(producto.id);
        if (mismaCategoria && distintoProducto) {
            relacionados.push(candidato);
        }
    }
    // 4. Determinar cuántos vamos a recomendar
    const cantidad = Math.min(4, relacionados.length);
    // 5. Seleccionar aleatoriamente sin repetir
    for (let i = 0; i < cantidad; i++) {
        const indiceAleatorio =
            i + Math.floor(
                Math.random() * (relacionados.length - i)
            );
        const auxiliar = relacionados[i];
        relacionados[i] = relacionados[indiceAleatorio];
        relacionados[indiceAleatorio] = auxiliar;
    }
    // 6. Construir el resultado
    const listaFinal = [];
    for (let i = 0; i < cantidad; i++) {
        listaFinal.push(relacionados[i]);
    }
    return listaFinal;
}
// PRODUCTOS POR CATEGORÍA
function obtenerProductosPorCategoria(categoria) {
    const productosCategoria = productModel.buscarProductoPorCategoria(categoria);
  
    return productosCategoria;
}
// BUSCAR PRODUCTO POR NOMBRE
function buscarProductoPorNombre(nombre){
    let productosEncontrados = productModel.buscarProductosPorNombre(nombre.toLowerCase());
  
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