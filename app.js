const express = require("express");
const app=express();

//app.set("nombreDeConfiguracion", "valor")
app.set("view engine","ejs");

const puerto=3000;

//definimos rutas 

//inicio
app.get("/",(req,res)=>res.render("pages/index.ejs"))
//productos
app.get("/products",(req,res)=>res.render("pages/products.ejs"));
//carta
app.get("/cart",(req,res)=>res.render("pages/cart.ejs"));
//checkout
app.get("/checkout",(req,res)=>res.render("pages/checkout.ejs"));
//register
app.get("/register",(req,res)=>res.render("pages/register.ejs"));
//login
app.get("/login",(req,res)=>res.render("pages/login.ejs"));

//levantamos puerto
app.listen(puerto,()=>console.log("levantando puerto 3000 "));