/* ================================================================
   TOGGLE — cambiar entre Mundo Real y Otra Madre
   ================================================================ */
function toggleWorld() {
  const body = document.body;
  if (body.classList.contains('mundo-real')) {
    body.classList.replace('mundo-real', 'otra-madre');
  } else {
    body.classList.replace('otra-madre', 'mundo-real');
  }
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
function crearPolilla() {
  const polilla       = document.createElement('div');
  polilla.innerHTML   = '🪲';
  polilla.style.cssText = `
    position: fixed; font-size: 12px;
    pointer-events: none; z-index: 20;
    filter: drop-shadow(0 0 2px #f5e642);
  `;
  document.body.appendChild(polilla);

  let angulo       = Math.random() * Math.PI * 2;
  const centroX    = window.innerWidth - 120;
  const centroY    = 80;

  function mover() {
    angulo += 0.01;
    polilla.style.left = (centroX + Math.cos(angulo) * 80 + (Math.random() - 0.5) * 20) + 'px';
    polilla.style.top  = (centroY + Math.sin(angulo) * 48 + (Math.random() - 0.5) * 20) + 'px';
    requestAnimationFrame(mover);
  }
  mover();
}
setTimeout(() => { for (let i = 0; i < 3; i++) crearPolilla(); }, 8000);

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
