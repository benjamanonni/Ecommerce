const productsService = require("../services/productsService");
function normalizarId(id) {
    if (/[^0-9]/.test(id)) {
        return null;
    }
    id = parseInt(id, 10);
    return id;
}
function verificarIdEnBase(id){
    const producto = productsService.buscarProductoPorId(id);
    if(producto===undefined){
        return null;
    }
    return producto;
}
function verificarId(req,res,next){
    //actua como middleware
    const id = req.params.id
    const idVerificado = normalizarId(id);
    if(idVerificado ===null){
         return res.status(400).send("id invalido");
    }
    const producto = verificarIdEnBase(id);
    if(producto===null){
         mostrarError404(req, res);
                return;
    }
    req.producto = producto;
    next();
}
module.exports = verificarId;