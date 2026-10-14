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
    const fechaEvento = new Date("2026-11-14T11:00:00");
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
/* ===== PORTADA (sobre de invitación) ===== */
(function () {
    function iniciar() {
        var portada = document.getElementById("portada");
        if (!portada) return;

        document.body.classList.add("pt-bloqueado");
        var sobre = portada.querySelector(".pt-sobre");
        var abierta = false;

        // Destellos dorados de fondo
        for (var i = 0; i < 14; i++) {
            var b = document.createElement("span");
            b.className = "pt-brillo";
            b.textContent = "✦";
            b.style.left = (6 + Math.random() * 88) + "%";
            b.style.top = (10 + Math.random() * 78) + "%";
            b.style.fontSize = (8 + Math.random() * 12) + "px";
            b.style.animationDelay = (Math.random() * 4) + "s";
            b.style.animationDuration = (2.5 + Math.random() * 2.5) + "s";
            portada.appendChild(b);
        }

        // Chispas que salen del sello al abrir
        function chispas() {
            var total = 18;
            for (var j = 0; j < total; j++) {
                var c = document.createElement("span");
                c.className = "pt-chispa";
                c.textContent = "✦";
                var ang = (Math.PI * 2 * j) / total + Math.random() * 0.4;
                var dist = 70 + Math.random() * 90;
                c.style.setProperty("--dx", Math.cos(ang) * dist + "px");
                c.style.setProperty("--dy", Math.sin(ang) * dist + "px");
                c.style.fontSize = (14 + Math.random() * 14) + "px";
                sobre.appendChild(c);
            }
        }

        function terminar() {
            portada.remove();
            document.body.classList.remove("pt-bloqueado");
            window.scrollTo(0, 0);
        }

        function abrir() {
            if (abierta) return;
            abierta = true;

            var reducido = window.matchMedia &&
                window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            if (reducido) {
                portada.classList.add("pt-puertas");
                setTimeout(terminar, 1600);
                return;
            }

            portada.classList.add("pt-abierta");
            chispas();
            setTimeout(function () { portada.classList.add("pt-despidiendo"); }, 1700);
            setTimeout(function () { portada.classList.add("pt-puertas"); }, 2800);
            setTimeout(terminar, 4500);
        }

        portada.addEventListener("click", abrir);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", iniciar);
    } else {
        iniciar();
    }
})();