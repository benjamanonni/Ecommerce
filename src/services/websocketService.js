let wss = null;

function configurarServidor(servidorWebSocket) {
    wss = servidorWebSocket;
}
const WebSocket = require("ws");

function enviarASesion(sessionID, mensaje) {
    wss.clients.forEach((cliente) => {
        if (
            cliente.sessionID === sessionID &&
            cliente.readyState === WebSocket.OPEN
        ) {
            cliente.send(mensaje);
        }
    });
}
module.exports = {
    configurarServidor,
    enviarASesion
};