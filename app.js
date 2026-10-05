function mostrarNumero(id, valor) {
    const elemento = document.getElementById(id);

    if (elemento.textContent !== valor) {
        elemento.textContent = valor;
        elemento.classList.remove("cambio");
        void elemento.offsetWidth; // reinicia la animación
        elemento.classList.add("cambio");
    }
}

function mostrarMensaje(texto) {
    document.getElementById("contador").classList.add("oculto");
    document.getElementById("titulo-cuenta").classList.add("oculto");

    const mensaje = document.getElementById("mensaje-dia");
    mensaje.textContent = texto;
    mensaje.classList.remove("oculto");
}

function actualizarCountdown() {
    // Fecha y hora del evento (cambiá la hora por la de la misa)
    const fechaEvento = new Date("2026-11-10T11:00:00");
    const ahora = new Date();

    const mismoDia = ahora.toDateString() === fechaEvento.toDateString();

    // El día de la comunión: mensaje especial
    if (mismoDia) {
        mostrarMensaje("¡Hoy es el gran día!");
        return;
    }

    const diferencia = fechaEvento.getTime() - ahora.getTime();

    // Ya pasó el evento
    if (diferencia <= 0) {
        mostrarMensaje("¡Gracias por acompañarnos!");
        return;
    }

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    mostrarNumero("dias", String(dias).padStart(2, "0"));
    mostrarNumero("horas", String(horas).padStart(2, "0"));
    mostrarNumero("minutos", String(minutos).padStart(2, "0"));
    mostrarNumero("segundos", String(segundos).padStart(2, "0"));
}

actualizarCountdown();
setInterval(actualizarCountdown, 1000);