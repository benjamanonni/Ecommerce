const db = require("../../db/database");

//obtener todos los productos
function obtenerTodosLosProductos(){
   const productos= db.prepare(`
        select *
        from products
    `).all()
    return productos;
}
//buscar productos por id
function buscarProductoPorId(id){
    const producto=db.prepare(`
        select *
        from products
        where id = ?
    `).get(id)
    return producto;
}
//buscar producto por categoria
function buscarProductoPorCategoria(categoria){
    const productos=db.prepare(`
        select *
        from products
        where categoria = ?
    `).all(categoria);
    return productos;
}
//buscar producto por nombre
function buscarProductosPorNombre(nombre){
    const productos=db.prepare(`
        select *
        from products
        where nombre like ?
    `).all(nombre);
    return productos;
}

module.exports = {
    obtenerTodosLosProductos,
    buscarProductoPorId,
    buscarProductoPorCategoria,
    buscarProductosPorNombre
}