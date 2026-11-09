/* ========================================================
   YOGESHWARI PORTFOLIO — script.js
   Terminal, typed text, skill bars, back-to-top, sparks.
   Aurora canvas & swarm animation handled by app.js + swarm-init.js
   ======================================================== */

'use strict';

// ============ HUD CLOCK ============
(function initClock() {
  const el = document.getElementById('hud-time');
  if (!el) return;
  function tick() {
    const d = new Date();
    el.textContent = d.toLocaleTimeString('en-IN', {
      hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
  }
  tick();
  setInterval(tick, 1000);
})();

// ============ TYPED TEXT ============
(function initTyped() {
  const el = document.getElementById('typed-text');
  if (!el) return;
  const lines = [
    'Full-Stack Developer',
    'Python Programmer',
    'React Developer',
    'Problem Solver',
    'Creative Coder',
    'UI/UX Enthusiast',
  ];
  let li = 0, ci = 0, deleting = false;
  const SPEED_TYPE = 70, SPEED_DELETE = 35, PAUSE = 1800;

  function type() {
    const current = lines[li];
    if (!deleting) {
      el.textContent = current.slice(0, ++ci);
      if (ci === current.length) {
        deleting = true;
        setTimeout(type, PAUSE);
        return;
      }
    } else {
      el.textContent = current.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        li = (li + 1) % lines.length;
      }
    }
    setTimeout(type, deleting ? SPEED_DELETE : SPEED_TYPE);
  }
  setTimeout(type, 600);
})();

// ============ SCROLL REVEAL ============
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
})();

// ============ SKILL BAR ANIMATION ============
(function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');
  if (!('IntersectionObserver' in window)) {
    bars.forEach(b => b.classList.add('animated'));
    return;
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('animated');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(b => obs.observe(b));
})();

// ============ BACK TO TOP ============
(function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ============ NAVBAR SCROLL EFFECT ============
(function initNavScroll() {
  const bar = document.querySelector('.cyber-bar');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      bar.style.background = 'rgba(5,6,8,0.98)';
      bar.style.boxShadow = '0 2px 20px rgba(230,25,60,0.12)';
    } else {
      bar.style.background = 'var(--panel)';
      bar.style.boxShadow = 'none';
    }
  }, { passive: true });
})();

// ============ SPARK / CLICK EFFECT ============
(function initSparkEffect() {
  document.addEventListener('click', function (e) {
    if (e.target.closest('a, button, input, .cmd-pill, .cyber-btn')) return;
    createSparks(e.clientX, e.clientY);
  });

  function createSparks(x, y) {
    const count = 6;
    for (let i = 0; i < count; i++) {
      const spark = document.createElement('div');
      const isRed = Math.random() > 0.5;
      spark.style.cssText = `
        position:fixed;left:${x}px;top:${y}px;
        width:4px;height:4px;border-radius:50%;
        background:${isRed ? '#e6193c' : '#f5ee38'};
        pointer-events:none;z-index:9999;
      `;
      document.body.appendChild(spark);
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
      const dist  = 30 + Math.random() * 50;
      spark.animate([
        { transform: 'translate(-50%,-50%) scale(1)', opacity: 1 },
        { transform: `translate(calc(-50% + ${Math.cos(angle) * dist}px), calc(-50% + ${Math.sin(angle) * dist}px)) scale(0)`, opacity: 0 }
      ], {
        duration: 500 + Math.random() * 200,
        easing: 'cubic-bezier(0,0.9,0.57,1)'
      }).onfinish = () => spark.remove();
    }
  }
})();

// ============ RIPPLE ON BUTTONS ============
document.querySelectorAll('.cyber-btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position:absolute;border-radius:50%;pointer-events:none;z-index:0;
      width:${size}px;height:${size}px;
      left:${e.clientX - rect.left - size / 2}px;
      top:${e.clientY - rect.top - size / 2}px;
      background:rgba(0,240,255,0.2);transform:scale(0);
    `;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    ripple.animate(
      [{ transform: 'scale(0)', opacity: 1 }, { transform: 'scale(2.5)', opacity: 0 }],
      { duration: 500, easing: 'ease-out' }
    ).onfinish = () => ripple.remove();
  });
});

// ============ SMOOTH SCROLL FOR ANCHOR LINKS ============
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ============ INTERACTIVE TERMINAL ============
(function initTerminal() {
  const output = document.getElementById('term-output');
  const input  = document.getElementById('term-input');
  const pills  = document.querySelectorAll('.cmd-pill');
  if (!output || !input) return;

  const COMMANDS = {
    help: () => [
      { cls: 'cyan',   text: '// Available commands:' },
      { cls: '',       text: '  bio · skills · projects · github · instagram · contact · quote · clear' },
    ],
    bio: () => [
      { cls: 'bold',   text: 'Yogeshwari — Developer & Creator' },
      { cls: '',       text: 'Location : Tamil Nadu, India' },
      { cls: '',       text: 'Focus    : Full-Stack Web Development' },
      { cls: 'green',  text: 'Status   : AVAILABLE FOR COLLABORATION ⚡' },
    ],
    skills: () => [
      { cls: 'cyan',   text: '// Tech Stack' },
      { cls: '',       text: '  Languages : Python · JavaScript · Java · C/C++' },
      { cls: '',       text: '  Frontend  : HTML · CSS · React.js' },
      { cls: '',       text: '  Backend   : Node.js · Django · REST APIs' },
      { cls: '',       text: '  Databases : MySQL · MongoDB' },
      { cls: '',       text: '  Tools     : Git · GitHub · VS Code · Linux' },
      { cls: '',       text: '  Learning  : AI / ML Integration ← active' },
    ],
    projects: () => [
      { cls: 'cyan',    text: '// Project Queue' },
      { cls: 'crimson', text: '  [1] Personal Portfolio (HTML/CSS/JS)' },
      { cls: '',        text: '  [2] AI Chat Application (Python/Flask)' },
      { cls: '',        text: '  [3] E-Commerce Platform (React/Node/MongoDB)' },
      { cls: '',        text: '  [4] Data Analytics Dashboard (Python)' },
      { cls: '',        text: '  [5] Student Management System (Django)' },
      { cls: '',        text: '  [6] Weather Forecast App (JS/API)' },
    ],
    github: () => [
      { cls: 'bold',   text: '→ GitHub Profile' },
      { cls: 'cyan',   text: '  https://github.com/Yogeshwari2908-max' },
    ],
    instagram: () => [
      { cls: 'bold',   text: '→ Instagram' },
      { cls: 'cyan',   text: '  https://www.instagram.com/yog_zzz07_/' },
      { cls: '',       text: '  Handle: @yog_zzz07_' },
    ],
    contact: () => [
      { cls: 'cyan',   text: '// Contact Information' },
      { cls: '',       text: '  GitHub    : Yogeshwari2908-max' },
      { cls: '',       text: '  Instagram : @yog_zzz07_' },
      { cls: 'green',  text: '  Status    : Open to collaboration ⚡' },
    ],
    quote: () => {
      const quotes = [
        '"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." — Fowler',
        '"First, solve the problem. Then, write the code." — John Johnson',
        '"Code is like humor. When you have to explain it, it\'s bad." — Cory House',
        '"The best way to predict the future is to implement it." — Alan Kay',
        '"Simplicity is the soul of efficiency." — Austin Freeman',
      ];
      return [{ cls: 'cyan', text: quotes[Math.floor(Math.random() * quotes.length)] }];
    },
    whoami: () => [{ cls: 'bold', text: 'Yogeshwari — Developer & Creator' }],
  };

  function esc(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function addBlank() {
    const d = document.createElement('div');
    d.className = 'term-line';
    d.innerHTML = '&nbsp;';
    output.appendChild(d);
  }

  function addPrompt(cmd) {
    const d = document.createElement('div');
    d.className = 'term-line';
    d.innerHTML = `<span class="term-prompt">yogeshwari@dev:~$ </span><span class="term-cmd">${esc(cmd)}</span>`;
    output.appendChild(d);
  }

  function addLine(cls, text) {
    const d = document.createElement('div');
    d.className = `term-line term-out ${cls}`;
    d.textContent = text;
    output.appendChild(d);
  }

  function runCmd(cmd) {
    const c = cmd.trim().toLowerCase();
    if (!c) return;
    addBlank();
    addPrompt(c);
    if (c === 'clear') { output.innerHTML = ''; return; }
    const handler = COMMANDS[c];
    if (handler) {
      handler().forEach(l => addLine(l.cls, l.text));
    } else {
      addLine('crimson', `Command not found: '${c}'. Type 'help'.`);
    }
    addBlank();
    output.scrollTop = output.scrollHeight;
  }

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') { const v = input.value; input.value = ''; runCmd(v); }
  });
  pills.forEach(p => p.addEventListener('click', () => runCmd(p.dataset.cmd)));
  output.scrollTop = output.scrollHeight;
})();
