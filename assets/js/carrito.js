
function crearFormularioCarrito(ruta, productoId, texto) {
    const formulario = document.createElement("form");
    formulario.action = ruta;
    formulario.method = "post";

    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "productId";
    input.value = productoId;

    const boton = document.createElement("button");
    boton.type = "submit";
    boton.textContent = texto;

    if (texto === "Quitar") {
        formulario.classList.add("producto-carrito-quitar-form");
        boton.classList.add("producto-carrito-quitar");
    }

    if (texto === "+") {
        boton.setAttribute("aria-label", "Sumar una unidad");
    }

    if (texto === "−") {
        boton.setAttribute("aria-label", "Restar una unidad");
    }

    formulario.appendChild(input);
    formulario.appendChild(boton);

    return formulario;
}

function renderizarCarrito(datos) {
    const lista = document.querySelector("#lista-productos");

    if (!lista) {
        return;
    }

    // Actualizar total general
    const total = document.querySelector("#total-carrito");

    if (total) {
        total.textContent = datos.total;
    }

    // Eliminar las tarjetas anteriores
    lista.replaceChildren();

    // Mostrar carrito vacío
    if (datos.carrito.length === 0) {
        const mensaje = document.createElement("h2");
        mensaje.textContent = "Carrito vacío";

        const enlace = document.createElement("a");
        enlace.href = "/";
        enlace.classList.add("boton-pagar");
        enlace.textContent = "Volver al inicio";

        lista.appendChild(mensaje);
        lista.appendChild(enlace);

        return;
    }

    // Crear las tarjetas actualizadas
    datos.carrito.forEach((producto) => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("producto-carrito");

        // Imagen
        const imagen = document.createElement("img");
        imagen.src = producto.imagen;
        imagen.alt = producto.nombre;
        imagen.classList.add("producto-carrito-imagen");

        // Nombre
        const info = document.createElement("div");
        info.classList.add("producto-carrito-info");

        const titulo = document.createElement("h2");
        titulo.textContent = producto.nombre;
        info.appendChild(titulo);

        // Quitar producto
        const formularioQuitar = crearFormularioCarrito(
            "/cart/quitar",
            producto.id,
            "Quitar"
        );

        // Controles de cantidad
        const controles = document.createElement("div");
        controles.classList.add("producto-carrito-cantidad");

        const formularioSumar = crearFormularioCarrito(
            "/cart/sumar",
            producto.id,
            "+"
        );

        const cantidad = document.createElement("span");
        cantidad.textContent = producto.quantity;

        const formularioRestar = crearFormularioCarrito(
            "/cart/restar",
            producto.id,
            "−"
        );

        controles.appendChild(formularioSumar);
        controles.appendChild(cantidad);
        controles.appendChild(formularioRestar);

        // Subtotal calculado por cartService
        const subtotal = document.createElement("p");
        subtotal.classList.add("producto-carrito-puntos");
        subtotal.textContent = `Subtotal: $${producto.subtotal}`;

        // Construir tarjeta completa
        tarjeta.appendChild(imagen);
        tarjeta.appendChild(info);
        tarjeta.appendChild(formularioQuitar);
        tarjeta.appendChild(controles);
        tarjeta.appendChild(subtotal);

        // Insertar tarjeta en la lista
        lista.appendChild(tarjeta);
    });
}

// Interceptar formularios del carrito para evitar recargas
document.addEventListener("submit", async (event) => {
    const formulario = event.target;

    if (!formulario.matches("#lista-productos form")) {
        return;
    }

    event.preventDefault();

    try {
        const respuesta = await fetch(formulario.action, {
            method: "POST",
            body: new URLSearchParams(new FormData(formulario))
        });

        if (!respuesta.ok) {
            console.error("Error al modificar el carrito");
        }
    } catch (error) {
        console.error("Error de conexión:", error);
    }
});
