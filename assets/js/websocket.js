//navegador solicita conexion a server web socket
const socket = new WebSocket("ws://localhost:3000");
//obtenemos elemento document desde el html de la pagina
const indicador = document.getElementById("estadoConexion");
console.log(indicador);
//actualizamos el indicador
socket.addEventListener("open", () => {
    indicador.textContent = "Conectado";
    indicador.classList.remove("estado-desconectado");
    indicador.classList.add("estado-conectado");
});
socket.addEventListener("close", () => {
    indicador.textContent = "desconectado";
    indicador.classList.remove("estado-conectado");
    indicador.classList.add("estado-desconectado");
});
socket.addEventListener("message", (event) => {
    // 1. Convertir el JSON recibido en un objeto
    const mensaje = JSON.parse(event.data);

    // 2. Comprobar que sea una actualización del carrito
    if (mensaje.type === "cartUpdated") {
        const cantidad = mensaje.payload.cantidad;

        // 3. Buscar el contador y actualizar su texto
        const contador = document.querySelector(".header-carrito-cantidad");

        if (contador) {
            contador.textContent = cantidad;
        }
    }
});
const formularios = document.querySelectorAll(".form-agregar-carrito");

formularios.forEach((formulario) => {

    formulario.addEventListener("submit", async (event) => {

        event.preventDefault();

        const datos = new FormData(formulario);

        await fetch(formulario.action, {
            method: "POST",
            body: new URLSearchParams(datos)
        });

    });

});

