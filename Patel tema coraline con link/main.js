/* ============================= */
/* 🎊 CONFETI (NUEVO CON FORMAS Y ANIMACIÓN) */
/* ============================= */
function crearConfeti() {
    const confeti = document.createElement("div");
    confeti.className = "heart";

    const colores = [
        "#ff9ab5", "#ffffff", "#c084d4", "#f472b6",
        "#e879a0", "#a855f7", "#fb7185", "#f9a8d4"
    ];
    const color = colores[Math.floor(Math.random() * colores.length)];

    const forma = Math.floor(Math.random() * 3);
    const tamaño = Math.random() * 16 + 8;

    confeti.style.width      = tamaño + "px";
    confeti.style.height     = forma === 0 ? tamaño + "px"
                             : forma === 1 ? tamaño * 0.4 + "px"
                             :               tamaño * 0.7 + "px";
    confeti.style.background   = color;
    confeti.style.borderRadius = forma === 0 ? "50%" : "2px";
    confeti.style.position     = "fixed"; 
    confeti.style.left         = Math.random() * 100 + "%";
    confeti.style.top          = "-20px";
    confeti.style.opacity      = (Math.random() * 0.5 + 0.5).toString();
    confeti.style.transform    = `rotate(${Math.random() * 360}deg)`;
    confeti.style.pointerEvents = "none";
    confeti.style.zIndex       = "9999";

    document.body.appendChild(confeti);  
    const velocidad = Math.random() * 0.8 + 0.4;
    let posY   = -5;
    let posX   = Math.random() * 100;
    let angulo = Math.random() * 360;

    const intervalo = setInterval(() => {
        posY   += velocidad;
        angulo += 2;

        let ondaX = Math.sin(angulo * Math.PI / 180) * 0.3;
        posX += ondaX;

        if (posX < 0) posX = 0;
        if (posX > 100) posX = 100;

        confeti.style.top  = posY + "%";
        confeti.style.left = posX + "%";
        confeti.style.transform = `rotate(${angulo}deg)`;

        if (posY > 120) {
            clearInterval(intervalo);
            confeti.remove();
        }
    }, 30);
}

function lanzarConfeti() {
    for (let i = 0; i < 150; i++) {
        setTimeout(crearConfeti, i * 40);
    }
}


const texto = "Happy Birthday My Love ❤️";
let i = 0;

function escribir() {
  const msgElement = document.getElementById("msg");
  if (msgElement && i < texto.length) {
    msgElement.innerHTML += texto[i];
    i++;
    setTimeout(escribir, 70);
  }
}

setTimeout(() => {
    escribir();
    lanzarConfeti();
}, 7000);
 

// ── CIELO ESTRELLADO ──
(function () {
  const canvas = document.getElementById('stars-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, stars = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function initStars() {
    stars = Array.from({length: 180}, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.4 + 0.3,
      a: Math.random(),
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

  resize();
  initStars();
  draw();
  window.addEventListener('resize', () => { resize(); initStars(); });
})();
// ── LUCIÉRNAGAS ──
for (let i = 0; i < 18; i++) {
  const f = document.createElement('div');
  f.className = 'firefly';

  const dur = (Math.random() * 8 + 6).toFixed(1) + 's';
  const dx  = (Math.random() * 200 - 100).toFixed(0) + 'px';
  const dy  = (Math.random() * 200 - 100).toFixed(0) + 'px';

  f.style.cssText = `
    left: ${Math.random() * 100}%;
    top: ${Math.random() * 100}%;
    --dx: ${dx};
    --dy: ${dy};
    animation-duration: ${dur};
    animation-delay: ${(Math.random() * 6).toFixed(1)}s;
  `;

  document.body.appendChild(f);
}

// Polillas alrededor de la luna
function crearPolilla() {
  const polilla = document.createElement('div');
  polilla.innerHTML = '🪰'; // o usa un emoji de polilla: '🌙' no, mejor '🪰' no, usa '🦋' o un SVG
  polilla.style.position = 'fixed';
  polilla.style.fontSize = '16px';
  polilla.style.pointerEvents = 'none';
  polilla.style.zIndex = '20';
  polilla.style.filter = 'drop-shadow(0 0 2px #f5e642)';
  document.body.appendChild(polilla);

  let angulo = Math.random() * Math.PI * 2;
  const radio = 80;
  const centroX = window.innerWidth - 120; // cerca de la luna (derecha)
  const centroY = 80; // arriba

  function moverPolilla() {
    angulo += 0.01;
    const x = centroX + Math.cos(angulo) * radio + (Math.random() - 0.5) * 20;
    const y = centroY + Math.sin(angulo) * radio * 0.6 + (Math.random() - 0.5) * 20;
    polilla.style.left = x + 'px';
    polilla.style.top = y + 'px';
    requestAnimationFrame(moverPolilla);
  }
  moverPolilla();
}

// Crear 3 polillas al cargar
setTimeout(() => {
  for (let i = 0; i < 3; i++) crearPolilla();
}, 8000);

function moverOjosLuna(x, y) {
  const pupils = document.querySelectorAll(".moon .pupil");

  pupils.forEach(pupil => {
    const eye = pupil.parentElement;
    const rect = eye.getBoundingClientRect();

    const eyeX = rect.left + rect.width / 2;
    const eyeY = rect.top + rect.height / 2;

    const angle = Math.atan2(y - eyeY, x - eyeX);
    const radius = 4;

    // Calculamos el desplazamiento relativo al centro del ojo
    const px = Math.cos(angle) * radius;
    const py = Math.sin(angle) * radius;

    // Usamos top/left en lugar de transform para no perder el centrado
    pupil.style.top  = `calc(50% + ${py}px)`;
    pupil.style.left = `calc(50% + ${px}px)`;
    pupil.style.transform = `translate(-50%, -50%)`;
  });
}

// Desktop
document.addEventListener("mousemove", (e) => {
  moverOjosLuna(e.clientX, e.clientY);
});

// Móvil
document.addEventListener("touchmove", (e) => {
  const t = e.touches[0];
  moverOjosLuna(t.clientX, t.clientY);
});
 //funcion parpadeo
setInterval(() => {
  const eyes = document.querySelector(".moon-eyes");
  if (!eyes) return;

  eyes.style.opacity = "0";
  setTimeout(() => {
    eyes.style.opacity = "1";
  }, 400);
}, 8000);