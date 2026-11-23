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
    const contador = document.querySelector(".header-carrito-cantidad");

    if (contador) {
        contador.textContent = mensaje.payload.cantidad;
    }

    actualizarVistaCarrito();
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
async function actualizarVistaCarrito() {
    if (!document.querySelector("#lista-productos")) {
        return;
    }

    const respuesta = await fetch("/cart/datos");

    if (!respuesta.ok) {
        console.error("Error al consultar el carrito");
        return;
    }

    const datos = await respuesta.json();

    renderizarCarrito(datos);
}

function conectarWebSocket() {
    const socket = new WebSocket("ws://localhost:3000");
    const indicador = document.getElementById("estadoConexion");

    socket.addEventListener("open", () => {
        console.log("WebSocket conectado");

        indicador.textContent = "Conectado";
        indicador.classList.remove("estado-desconectado");
        indicador.classList.add("estado-conectado");
    });

    socket.addEventListener("close", () => {
        console.log("WebSocket desconectado");

        indicador.textContent = "Desconectado";
        indicador.classList.remove("estado-conectado");
        indicador.classList.add("estado-desconectado");

        setTimeout(() => {
            conectarWebSocket();
        }, 3000);
    });

    socket.addEventListener("message", (event) => {
        const mensaje = JSON.parse(event.data);

        if (mensaje.type === "cartUpdated") {
            const contador = document.querySelector(
                ".header-carrito-cantidad"
            );

            if (contador) {
                contador.textContent = mensaje.payload.cantidad;
            }

            actualizarVistaCarrito();
        }
    });
}

// Iniciar la primera conexión
conectarWebSocket();

conectarWebSocket();
