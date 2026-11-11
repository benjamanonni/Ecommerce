const productos = require("./src/modelos/productModel");
const db = require("./db/database");

function agregarProducto(){
    for(let c=0;c<productos.length;c++){
        insertarProducto.run(
            productos[c].nombre,
            productos[c].precio,
            productos[c].imagenPrimaria,
            productos[c].imagenSecundaria,
            productos[c].imagenTerciaria,
            productos[c].descripcion,
            productos[c].categoria,
            productos[c].stock
        )
    }
}
    const insertarProducto = db.prepare(`
    INSERT OR IGNORE INTO products (nombre,precio,imagenPrimaria,imagenSecundaria,ImagenTerciaria,descripcion,categoria,stock)
    VALUES (?,?,?,?,?,?,?,?)
`);
agregarProducto();

