/* ================================================================
   TOGGLE — cambiar entre Mundo Real y Otra Madre
   ================================================================ */
function toggleWorld() {
  const body = document.body;
  const staticCanvas = document.getElementById('static-canvas');
  const staticCtx = staticCanvas.getContext('2d');

  staticCanvas.width  = window.innerWidth;
  staticCanvas.height = window.innerHeight;

  let frames = 0;
  const totalFrames = 18;
  staticCanvas.style.opacity = '1';

  function dibujarEstatico() {
    const imageData = staticCtx.createImageData(staticCanvas.width, staticCanvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const valor = Math.random() > 0.5 ? 255 : 0;
      data[i]     = valor;
      data[i + 1] = valor;
      data[i + 2] = valor;
      data[i + 3] = Math.random() * 180 + 60;
    }

    staticCtx.putImageData(imageData, 0, 0);
    frames++;

    if (frames < totalFrames) {
      requestAnimationFrame(dibujarEstatico);
    } else {
      staticCanvas.style.opacity = '0';
    }
  }

  // Cambiar el mundo a la mitad del estático
  setTimeout(() => {
    if (body.classList.contains('mundo-real')) {
      body.classList.replace('mundo-real', 'otra-madre');
    } else {
      body.classList.replace('otra-madre', 'mundo-real');
    }
  }, 150);

  dibujarEstatico();
}
/* ================================================================
   CONFETI
   ================================================================ */
function crearConfeti() {
  const confeti = document.createElement("div");
  confeti.className = "heart";

  const colores = [
    "#ff9ab5", "#ffffff", "#c084d4", "#f472b6",
    "#e879a0", "#a855f7", "#fb7185", "#f9a8d4"
  ];
  const color  = colores[Math.floor(Math.random() * colores.length)];
  const forma  = Math.floor(Math.random() * 3);
  const tamaño = Math.random() * 16 + 8;

  confeti.style.cssText = `
    width: ${tamaño}px;
    height: ${forma === 0 ? tamaño : forma === 1 ? tamaño * 0.4 : tamaño * 0.7}px;
    background: ${color};
    border-radius: ${forma === 0 ? "50%" : "2px"};
    position: fixed;
    left: ${Math.random() * 100}%;
    top: -20px;
    opacity: ${Math.random() * 0.5 + 0.5};
    transform: rotate(${Math.random() * 360}deg);
    pointer-events: none;
    z-index: 9999;
  `;

  document.body.appendChild(confeti);

  const velocidad = Math.random() * 0.8 + 0.4;
  let posY   = -5;
  let posX   = Math.random() * 100;
  let angulo = Math.random() * 360;

  const intervalo = setInterval(() => {
    posY   += velocidad;
    angulo += 2;
    posX   += Math.sin(angulo * Math.PI / 180) * 0.3;
    posX    = Math.max(0, Math.min(100, posX));

    confeti.style.top       = posY + "%";
    confeti.style.left      = posX + "%";
    confeti.style.transform = `rotate(${angulo}deg)`;

    if (posY > 120) { clearInterval(intervalo); confeti.remove(); }
  }, 30);
}

function lanzarConfeti() {
  for (let i = 0; i < 150; i++) setTimeout(crearConfeti, i * 40);
}

/* ================================================================
   TEXTO — efecto máquina de escribir
   ================================================================ */
const texto = "Happy Birthday My Love ❤️";
let charIndex = 0;

function escribir() {
  const msgElement = document.getElementById("msg");
  if (msgElement && charIndex < texto.length) {
    msgElement.innerHTML += texto[charIndex];
    charIndex++;
    setTimeout(escribir, 70);
  }
}

setTimeout(() => {
  escribir();
  lanzarConfeti();
}, 7000);

/* ================================================================
   CIELO ESTRELLADO
   ================================================================ */
(function () {
  const canvas = document.getElementById('stars-canvas');
  const ctx    = canvas.getContext('2d');
  let W, H, stars = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function initStars() {
    stars = Array.from({ length: 180 }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      r:  Math.random() * 1.4 + 0.3,
      a:  Math.random(),
      da: (Math.random() * 0.005 + 0.002) * (Math.random() < .5 ? 1 : -1)
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    stars.forEach(s => {
      s.a += s.da;
      if (s.a > 1 || s.a < 0) s.da *= -1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(240,237,228,${s.a})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  resize(); initStars(); draw();
  window.addEventListener('resize', () => { resize(); initStars(); });
})();

/* ================================================================
   LUCIÉRNAGAS
   ================================================================ */
for (let i = 0; i < 18; i++) {
  const f   = document.createElement('div');
  f.className = 'firefly';
  f.style.cssText = `
    left: ${Math.random() * 100}%;
    top: ${Math.random() * 100}%;
    --dx: ${(Math.random() * 200 - 100).toFixed(0)}px;
    --dy: ${(Math.random() * 200 - 100).toFixed(0)}px;
    animation-duration: ${(Math.random() * 8 + 6).toFixed(1)}s;
    animation-delay: ${(Math.random() * 6).toFixed(1)}s;
  `;
  document.body.appendChild(f);
}

/* ================================================================
   POLILLAS — giran alrededor de la luna
   ================================================================ */
function crearInsectoLuna() {
  const insecto = document.createElement('div');
  
  // Estilo base
  insecto.style.cssText = `
    position: fixed; 
    font-size: 20px;
    pointer-events: none; 
    z-index: 20;
    transition: filter 0.8s ease;
  `;
  document.body.appendChild(insecto);

  let angulo = Math.random() * Math.PI * 2;
  // Añadimos velocidades ligeramente diferentes a cada uno para que no vayan en fila
  const velocidad = 0.008 + Math.random() * 0.006; 
  // Radio de órbita individual para que no se encimen
  const radioX = 75 + Math.random() * 15;
  const radioY = 45 + Math.random() * 10;

  function mover() {
    // 1. Detectar en qué mundo estamos en este preciso frame
    const esOtraMadre = document.body.classList.contains('otra-madre');

    // 2. Cambiar aspecto según el mundo
    if (!esOtraMadre) {
      insecto.innerHTML = '🦋'; // Mariposa en Mundo Real
      insecto.style.filter = 'drop-shadow(0 0 4px #b49fcc)'; // Brillo lila mágico
    } else {
      insecto.innerHTML = '🪲'; // Polilla/Escarabajo en Otra Madre
      insecto.style.filter = 'drop-shadow(0 0 3px #ff3333) brightness(0.6)'; // Brillo rojo tétrico y opaco
    }

    // 3. Cálculo de la órbita alrededor del centro actual de la luna
    angulo += velocidad;
    const luna = document.querySelector('.moon');
    if (luna) {
      const rect = luna.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top  + rect.height / 2;
      
      // Movimiento orbital con el toque errático de aleteo que creaste
      insecto.style.left = (cx + Math.cos(angulo) * radioX + (Math.random() - 0.5) * 15) - 7 + 'px';
      insecto.style.top  = (cy + Math.sin(angulo) * radioY + (Math.random() - 0.5) * 15) - 7 + 'px';
    }

    requestAnimationFrame(mover);
  }
  mover();
}

// Lanzar los insectos (puedes ajustar el tiempo para que coincida con la intro o la carta)
setTimeout(() => { 
  for (let i = 0; i < 4; i++) crearInsectoLuna(); 
}, 7000);

/* ================================================================
   CURSOR PERSONALIZADO — aguja con hilo
   ================================================================ */
const cursorAguja = document.createElement('div');
cursorAguja.id = 'cursor-aguja';
cursorAguja.innerHTML = '🪡';
cursorAguja.style.cssText = `
  position: fixed;
  font-size: 22px;
  pointer-events: none;
  z-index: 99999;
  transform: rotate(90deg);
  transition: transform 0.1s ease;
  filter: drop-shadow(0 0 4px rgba(180, 140, 255, 0.8));
`;
const hiloCanvas = document.createElement('canvas');
hiloCanvas.id = 'hilo-canvas';
hiloCanvas.style.cssText = `
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 99998;
`;
hiloCanvas.width  = window.innerWidth;
hiloCanvas.height = window.innerHeight;
document.body.appendChild(hiloCanvas);
const hiloCtx = hiloCanvas.getContext('2d');

window.addEventListener('resize', () => {
  hiloCanvas.width  = window.innerWidth;
  hiloCanvas.height = window.innerHeight;
});
document.body.appendChild(cursorAguja);

const puntos = [];
const MAX_PUNTOS = 35;

document.addEventListener('mousemove', e => {
  cursorAguja.style.left = (e.clientX - 8) + 'px';
  cursorAguja.style.top  = (e.clientY - 8) + 'px';

  puntos.push({ x: e.clientX, y: e.clientY });
  if (puntos.length > MAX_PUNTOS) puntos.shift();

  hiloCtx.clearRect(0, 0, hiloCanvas.width, hiloCanvas.height);

  if (puntos.length < 2) return;

  hiloCtx.beginPath();
  hiloCtx.moveTo(puntos[0].x, puntos[0].y);

  for (let i = 1; i < puntos.length - 1; i++) {
    const mx = (puntos[i].x + puntos[i + 1].x) / 2;
    const my = (puntos[i].y + puntos[i + 1].y) / 2;
    hiloCtx.quadraticCurveTo(puntos[i].x, puntos[i].y, mx, my);
  }

  hiloCtx.strokeStyle = 'rgba(180, 140, 255, 0.7)';
  hiloCtx.lineWidth   = 1.5;
  hiloCtx.lineCap     = 'round';
  hiloCtx.stroke();
});


/* ================================================================
   OJOS DE LA LUNA — siguen el cursor
   Mundo Real  → mueve .pupil dentro de .eye
   Otra Madre  → mueve .button-pupil dentro de .button-eye
   ================================================================ */
function moverOjosLuna(x, y) {
  const esOtraMadre = document.body.classList.contains('otra-madre');
  const selector    = esOtraMadre ? ".button-pupil" : ".moon .pupil";

  document.querySelectorAll(selector).forEach(pupil => {
    const eye  = pupil.parentElement;
    const rect = eye.getBoundingClientRect();
    const angle = Math.atan2(
      y - (rect.top  + rect.height / 2),
      x - (rect.left + rect.width  / 2)
    );
    pupil.style.position  = 'absolute';
    pupil.style.top       = `calc(50% + ${Math.sin(angle) * 4}px)`;
    pupil.style.left      = `calc(50% + ${Math.cos(angle) * 4}px)`;
    pupil.style.transform = `translate(-50%, -50%)`;
  });
}

document.addEventListener("mousemove", e => moverOjosLuna(e.clientX, e.clientY));
document.addEventListener("touchmove", e => {
  const t = e.touches[0];
  moverOjosLuna(t.clientX, t.clientY);
});

/* ================================================================
   PARPADEO DE LA LUNA
   Mundo Real  → parpadea .moon-eyes (opacidad)
   Otra Madre  → parpadea .button-eye (scaleY)
   ================================================================ */
setInterval(() => {
  const esOtraMadre = document.body.classList.contains('otra-madre');

  if (!esOtraMadre) {
    const eyes = document.querySelector(".moon-eyes");
    if (!eyes) return;
    eyes.classList.add("blink");
    setTimeout(() => eyes.classList.remove("blink"), 150);
  } else {
    const buttonEyes = document.querySelectorAll(".button-eye");
    buttonEyes.forEach(e => e.classList.add("blink-btn"));
    setTimeout(() => buttonEyes.forEach(e => e.classList.remove("blink-btn")), 150);
  }
}, 4000);


/* ================================================================
   MÚSICA DE FONDO — reanuda desde donde quedó en intro.html
   ================================================================ */
const musicaFondo = document.getElementById('musica-fondo');
musicaFondo.volume = 0.4;

const tiempoGuardado = sessionStorage.getItem('musicaTime');
if (tiempoGuardado) {
  musicaFondo.currentTime = parseFloat(tiempoGuardado);
  sessionStorage.removeItem('musicaTime');
}
musicaFondo.play();
// Limpiar 'entered' al cerrar/recargar la página
window.addEventListener('beforeunload', () => {
  sessionStorage.removeItem('entered');
});