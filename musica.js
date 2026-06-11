window.addEventListener('DOMContentLoaded', () => {
    // 1. Creamos el elemento de audio
    const audio = new Audio('audio/himno-motero.mp3'); // <-- Asegúrate de que la ruta sea correcta
    audio.loop = true;

    // 2. Creamos un botón flotante visual para que el usuario pueda pausar/reproducir
    const botonAudio = document.createElement('button');
    botonAudio.innerHTML = '🎵 Reproducir Música';
    botonAudio.style.position = 'fixed';
    botonAudio.style.bottom = '20px';
    botonAudio.style.right = '20px';
    botonAudio.style.zIndex = '9999';
    botonAudio.style.padding = '10px 15px';
    botonAudio.style.backgroundColor = '#d97706'; // Color naranja/dorado a juego con tu web
    botonAudio.style.color = '#fff';
    botonAudio.style.border = 'none';
    botonAudio.style.borderRadius = '25px';
    botonAudio.style.cursor = 'pointer';
    botonAudio.style.fontWeight = 'bold';
    botonAudio.style.boxShadow = '0px 4px 10px rgba(0,0,0,0.3)';
    
    document.body.appendChild(botonAudio);

    // 3. Comprobar si la música ya estaba sonando en la página anterior
    const tiempoGuardado = localStorage.getItem('musicaTiempo');
    const estabaSonando = localStorage.getItem('musicaSonando');

    if (tiempoGuardado) {
        audio.currentTime = parseFloat(tiempoGuardado);
    }

    // Si ya estaba sonando antes de cambiar de página, intentamos reproducirla automáticamente
    if (estabaSonando === 'true') {
        audio.play().then(() => {
            botonAudio.innerHTML = '⏸️ Pausar Música';
        }).catch(() => {
            // Si el navegador la bloquea, dejamos el botón en "Reproducir"
            localStorage.setItem('musicaSonando', 'false');
        });
    }

    // 4. Guardar el segundo exacto de la canción constantemente
    setInterval(() => {
        if (!audio.paused) {
            localStorage.setItem('musicaTiempo', audio.currentTime);
        }
    }, 500); // Guarda cada medio segundo

    // 5. Evento al hacer clic en el botón (Play / Pausa)
    botonAudio.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            botonAudio.innerHTML = '⏸️ Pausar Música';
            localStorage.setItem('musicaSonando', 'true');
        } else {
            audio.pause();
            botonAudio.innerHTML = '🎵 Reproducir Música';
            localStorage.setItem('musicaSonando', 'false');
        }
    });
});