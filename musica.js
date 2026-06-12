window.addEventListener('DOMContentLoaded', () => {
    // 1. Creamos el elemento de audio
    const audio = new Audio('audio/himno-motero.mp3'); 
    audio.loop = true;

    // 2. Inyectamos los estilos CSS para las animaciones del ecualizador y efectos
    const estilos = document.createElement('style');
    estilos.innerHTML = `
        @keyframes sonar {
            0% { transform: scaleY(0.3); }
            50% { transform: scaleY(1); }
            100% { transform: scaleY(0.3); }
        }
        .barrita {
            width: 3px;
            height: 14px;
            background-color: #fff;
            display: inline-block;
            transform-origin: bottom;
            animation: sonar 1s ease-in-out infinite;
            animation-play-state: paused;
            border-radius: 2px;
        }
        .barrita:nth-child(1) { animation-delay: 0.1s; }
        .barrita:nth-child(2) { animation-delay: 0.4s; }
        .barrita:nth-child(3) { animation-delay: 0.2s; }
        
        .boton-motero-activo .barrita {
            animation-play-state: running;
        }
    `;
    document.head.appendChild(estilos);

    // 3. Creamos el botón flotante visual (Diseño premium tipo Spotify/Moto)
    const botonAudio = document.createElement('button');
    botonAudio.style.position = 'fixed';
    botonAudio.style.bottom = '25px';
    botonAudio.style.right = '25px';
    botonAudio.style.zIndex = '9999';
    botonAudio.style.padding = '12px 20px';
    botonAudio.style.backgroundColor = '#d97706'; // Naranja motero base
    botonAudio.style.color = '#fff';
    botonAudio.style.border = '2px solid rgba(255,255,255,0.1)';
    botonAudio.style.borderRadius = '50px';
    botonAudio.style.cursor = 'pointer';
    botonAudio.style.fontWeight = 'bold';
    botonAudio.style.fontSize = '14px';
    botonAudio.style.fontFamily = 'sans-serif';
    botonAudio.style.letterSpacing = '0.5px';
    botonAudio.style.display = 'flex';
    botonAudio.style.alignItems = 'center';
    botonAudio.style.gap = '10px';
    botonAudio.style.boxShadow = '0px 8px 20px rgba(0,0,0,0.4), inset 0px 1px 0px rgba(255,255,255,0.2)';
    botonAudio.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    
    // Contenido inicial (Texto + Ecualizador visual oculto de fondo)
    const actualizarContenidoBoton = (reproduciendo) => {
        if (reproduciendo) {
            botonAudio.innerHTML = `
                <div style="display: flex; gap: 3px; align-items: flex-end; height: 14px;">
                    <span class="barrita"></span>
                    <span class="barrita"></span>
                    <span class="barrita"></span>
                </div>
                <span>PAUSAR RUTA</span>
            `;
            botonAudio.classList.add('boton-motero-activo');
            botonAudio.style.backgroundColor = '#1c1917'; // Cambia a negro asfalto al sonar
            botonAudio.style.borderColor = '#d97706';
        } else {
            botonAudio.innerHTML = `
                <span>🎵</span>
                <span>REPRODUCIR HIMNO</span>
            `;
            botonAudio.classList.remove('boton-motero-activo');
            botonAudio.style.backgroundColor = '#d97706'; // Vuelve al naranja
            botonAudio.style.borderColor = 'transparent';
        }
    };

    // Efectos Visuales Hover (Al pasar el ratón por encima)
    botonAudio.addEventListener('mouseenter', () => {
        botonAudio.style.transform = 'translateY(-4px) scale(1.03)';
        botonAudio.style.boxShadow = '0px 12px 24px rgba(217, 119, 6, 0.3)';
    });
    botonAudio.addEventListener('mouseleave', () => {
        botonAudio.style.transform = 'translateY(0) scale(1)';
        botonAudio.style.boxShadow = '0px 8px 20px rgba(0,0,0,0.4)';
    });

    document.body.appendChild(botonAudio);

    // 4. Comprobar si la música ya estaba sonando en la página anterior
    const tiempoGuardado = localStorage.getItem('musicaTiempo');
    const estabaSonando = localStorage.getItem('musicaSonando');

    if (tiempoGuardado) {
        audio.currentTime = parseFloat(tiempoGuardado);
    }

    // Inicializar el aspecto del botón
    actualizarContenidoBoton(false);

    if (estabaSonando === 'true') {
        audio.play().then(() => {
            actualizarContenidoBoton(true);
        }).catch(() => {
            localStorage.setItem('musicaSonando', 'false');
            actualizarContenidoBoton(false);
        });
    }

    // 5. Guardar el segundo exacto constantemente
    setInterval(() => {
        if (!audio.paused) {
            localStorage.setItem('musicaTiempo', audio.currentTime);
        }
    }, 500);

    // 6. Evento al hacer clic en el botón (Play / Pausa)
    botonAudio.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            actualizarContenidoBoton(true);
            localStorage.setItem('musicaSonando', 'true');
        } else {
            audio.pause();
            actualizarContenidoBoton(false);
            localStorage.setItem('musicaSonando', 'false');
        }
    });
});