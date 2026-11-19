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