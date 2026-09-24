const formulario = document.querySelector(".register-card");

formulario.addEventListener("submit", (evento) => {
    //pedimos variables
    const nombre = formulario.querySelector("#nombre").value;
    const apellido = formulario.querySelector("#apellido").value;
    const contraseña = formulario.querySelector("#contraseña").value;
    const email = formulario.querySelector("#email").value;

    //campos obligatorios
    if (nombre.trim() === "" ||
        apellido.trim() === "" ||
        email.trim() === "" ||
        contraseña.trim() === "") {
        evento.preventDefault();
        alert("Todos los campos son obligatorios");
        return;
    }
    // espacios al principio o al final 
    if (nombre !== nombre.trim() ||
        apellido !== apellido.trim() ||
        email !== email.trim() ||
        contraseña !== contraseña.trim()) {
        evento.preventDefault();
        alert("Los campos no pueden tener espacios al principio o al final");
        return;
    }

    // formato de email
    const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!patronEmail.test(email)) {
        evento.preventDefault();
        alert("Ingresá un email válido");
        return;
    }

    // 4. Validaciones de contraseña
    if (!validarLargoContraseña(contraseña) ||
        !validarContraseñaIncluyaLetra(contraseña) ||
        !validarContraseñaIncluyaNumero(contraseña) ||
        !validarContraseñaIncluyaCaracter(contraseña) ||
        !validarContraseñaPalabrasProhibidas(contraseña, nombre, email)) {

        evento.preventDefault();
        alert("La contraseña no cumple los requisitos");
        return;
    }

    // Si llegó hasta acá, todas las validaciones pasaron.
    console.log("Formulario válido");
});
function validarLargoContraseña(contraseña) {
    if (contraseña.length < 8) {
        return false;
    }
    return true;
}
function validarContraseñaIncluyaLetra(contraseña) {
    const texto = /[a-zA-Z]/
    const bandera = texto.test(contraseña);
    if (!bandera) {
        return false;
    }
    return true;
}
function validarContraseñaIncluyaNumero(contraseña) {
    const numeros = /[0-9]/
    const bandera = numeros.test(contraseña);
    if (!bandera) {
        return false;
    }
    return true;
}
function validarContraseñaIncluyaCaracter(contraseña) {
    const caracteres = /[!@#$%^&*(),.?":{}|<>]/;
    const bandera = caracteres.test(contraseña);
    if (!bandera) {
        return false;
    }
    return true;
}
function validarContraseñaPalabrasProhibidas(contraseña, nombre, email) {
    const texto = contraseña.toLowerCase();
    const nombreNormalizado = nombre.trim().toLowerCase();
    const emailNormalizado = email.trim().toLowerCase();
    const palabrasProhibidas = [
        "password",
        "1234",
        "qwerty",
        "mi ecommerce",
        "miecommerce"
    ];
    // Verificar palabras prohibidas
    for (const palabra of palabrasProhibidas) {
        if (texto.includes(palabra)) {
            return false;
        }
    }
    // Verificar que no contenga el nombre del usuario
    if (nombreNormalizado !== "" && texto.includes(nombreNormalizado)) {
        return false;
    }
    // Verificar que no sea igual al email
    if (texto === emailNormalizado) {
        return false;
    }
    return true;
}
