let wss = null;

function configurarServidor(servidorWebSocket) {
    wss = servidorWebSocket;
    //cada vez que se conectan de forma ws envia notifiacion a consola
wss.on("connection", (ws,request) => {
    console.log("Cliente conectado");
     ws.sessionID = request.sessionID;
     console.log("ID de sesión:", request.sessionID);
    ws.on("close", () => {
        console.log("Cliente desconectado");
        console.log("Conexiones activas:", wss.clients.size);
    });
});
}
function enviarACliente(cliente, mensaje) {
    if (cliente.readyState === WebSocket.OPEN) {
        cliente.send(mensaje);
    }
}
const WebSocket = require("ws");

function enviarASesion(sessionID, mensaje) {
    wss.clients.forEach((cliente) => {
        if (
            cliente.sessionID === sessionID &&
            cliente.readyState === WebSocket.OPEN
        ) {
            enviarACliente(cliente, mensaje);
        }
    });
}
function enviarATodos(mensaje) {
    wss.clients.forEach((cliente) => {
        enviarACliente(cliente, mensaje);
    });
}
function enviarEventoASesion(sessionID, type, payload) {
    const mensaje = JSON.stringify({
        type: type,
        payload: payload
    });

    enviarASesion(sessionID, mensaje);
}
module.exports = {
    configurarServidor,
    enviarASesion,
    enviarATodos,
    enviarEventoASesion
};