
function mostrarHome(req,res){
    res.render("pages/index.ejs");
}

function mostrarProductos(req,res){
    res.render("pages/products.ejs");
}

function mostrarCarrito(req,res){
    res.render("pages/cart.ejs");
}

function mostrarCheckout(req,res){
    res.render("pages/checkout.ejs");
}

function mostrarRegistro(req,res){
    res.render("pages/register.ejs");
}

function mostrarLogin(req,res){
    res.render("pages/login.ejs");
}
//exportamos metodos 
module.exports = {
    mostrarHome,
    mostrarProductos,
    mostrarCarrito,
    mostrarCheckout,
    mostrarRegistro,
    mostrarLogin
};