/* ========================================================
   YOGESHWARI PORTFOLIO — script.js
   Interactive terminal, typed text, scroll reveals,
   skill bar animations, spark & ripple effects.
   NOTE: Aurora canvas & swarm animation are handled by
   app.js and swarm-init.js (exact copy from reference portfolio)
   ======================================================== */

'use strict';

// ============ HUD CLOCK ============
(function initClock() {
  const el = document.getElementById('hud-time');
  if (!el) return;
  function tick() {
    const d = new Date();
    el.textContent = d.toLocaleTimeString('en-IN', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
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
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
})();

// ============ SKILL BAR ANIMATION ============
(function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');
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
  });
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
  });
})();

// ============ SPARK / CLICK EFFECT ============
(function initSparkEffect() {
  document.addEventListener('click', function(e) {
    // Don't create sparks on interactive elements
    if (e.target.closest('a, button, input, .cmd-pill')) return;
    createSparks(e.clientX, e.clientY);
  });

  function createSparks(x, y) {
    const count = 6;
    for (let i = 0; i < count; i++) {
      const spark = document.createElement('div');
      spark.style.cssText = `
        position:fixed;
        left:${x}px; top:${y}px;
        width:4px; height:4px;
        border-radius:50%;
        background:${Math.random() > 0.5 ? '#e6193c' : '#f5ee38'};
        pointer-events:none;
        z-index:9999;
        transform-origin:center;
      `;
      document.body.appendChild(spark);
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
      const dist  = 30 + Math.random() * 50;
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist;
      spark.animate([
        { transform: 'translate(-50%,-50%) scale(1)', opacity: 1 },
        { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0)`, opacity: 0 }
      ], { duration: 500 + Math.random() * 200, easing: 'cubic-bezier(0,0.9,0.57,1)' }).onfinish = () => spark.remove();
    }
  }
})();

// ============ INTERACTIVE TERMINAL ============
(function initTerminal() {
  const output  = document.getElementById('term-output');
  const input   = document.getElementById('term-input');
  const pills   = document.querySelectorAll('.cmd-pill');
  if (!output || !input) return;

  const COMMANDS = {
    help: () => [
      { type: 'cyan', text: '// Available commands:' },
      { type: 'out',  text: '  bio       — about me' },
      { type: 'out',  text: '  skills    — tech stack' },
      { type: 'out',  text: '  projects  — my builds' },
      { type: 'out',  text: '  github    — GitHub profile' },
      { type: 'out',  text: '  instagram — Instagram handle' },
      { type: 'out',  text: '  contact   — contact info' },
      { type: 'out',  text: '  quote     — dev quote' },
      { type: 'out',  text: '  clear     — clear terminal' },
    ],
    bio: () => [
      { type: 'bold', text: 'Yogeshwari — Developer & Creator' },
      { type: 'out',  text: 'Location : Tamil Nadu, India' },
      { type: 'out',  text: 'Focus    : Full-Stack Web Development' },
      { type: 'out',  text: 'Passion  : Code · Design · Innovation' },
      { type: 'green',text: 'Status   : AVAILABLE FOR COLLABORATION ⚡' },
    ],
    skills: () => [
      { type: 'cyan', text: '// Tech Stack' },
      { type: 'out',  text: '  Languages : Python · JavaScript · Java · C/C++' },
      { type: 'out',  text: '  Frontend  : HTML · CSS · React.js' },
      { type: 'out',  text: '  Backend   : Node.js · Django · REST APIs' },
      { type: 'out',  text: '  Databases : MySQL · MongoDB' },
      { type: 'out',  text: '  Tools     : Git · GitHub · VS Code · Linux' },
      { type: 'out',  text: '  Learning  : AI / ML Integration ← active' },
    ],
    projects: () => [
      { type: 'cyan',    text: '// Project Queue' },
      { type: 'crimson', text: '  [1] Personal Portfolio (HTML/CSS/JS)' },
      { type: 'out',     text: '  [2] AI Chat Application (Python/Flask)' },
      { type: 'out',     text: '  [3] E-Commerce Platform (React/Node/MongoDB)' },
      { type: 'out',     text: '  [4] Data Analytics Dashboard (Python)' },
      { type: 'out',     text: '  [5] Student Management System (Django)' },
      { type: 'out',     text: '  [6] Weather Forecast App (JS/API)' },
    ],
    github: () => [
      { type: 'bold', text: '→ GitHub Profile' },
      { type: 'cyan', text: '  https://github.com/Yogeshwari2908-max' },
      { type: 'out',  text: '  Username: Yogeshwari2908-max' },
    ],
    instagram: () => [
      { type: 'bold', text: '→ Instagram' },
      { type: 'cyan', text: '  https://www.instagram.com/yog_zzz07_/' },
      { type: 'out',  text: '  Handle: @yog_zzz07_' },
    ],
    contact: () => [
      { type: 'cyan',    text: '// Contact Information' },
      { type: 'out',     text: '  GitHub    : Yogeshwari2908-max' },
      { type: 'out',     text: '  Instagram : @yog_zzz07_' },
      { type: 'out',     text: '  Location  : Tamil Nadu, India' },
      { type: 'green',   text: '  Status    : Open to collaboration & opportunities ⚡' },
    ],
    quote: () => {
      const quotes = [
        '"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." — Martin Fowler',
        '"First, solve the problem. Then, write the code." — John Johnson',
        '"Code is like humor. When you have to explain it, it\'s bad." — Cory House',
        '"The best way to predict the future is to implement it." — Alan Kay',
        '"Simplicity is the soul of efficiency." — Austin Freeman',
      ];
      return [{ type: 'cyan', text: quotes[Math.floor(Math.random() * quotes.length)] }];
    },
    clear: null, // handled separately
    whoami: () => [
      { type: 'bold', text: 'Yogeshwari — Developer & Creator' },
    ],
  };

  function addLine(cls, html) {
    const div = document.createElement('div');
    div.className = `term-line term-out ${cls}`;
    div.innerHTML = html;
    output.appendChild(div);
  }

  function addBlankLine() {
    const div = document.createElement('div');
    div.className = 'term-line';
    div.innerHTML = '&nbsp;';
    output.appendChild(div);
  }

  function addPromptLine(cmd) {
    const div = document.createElement('div');
    div.className = 'term-line';
    div.innerHTML = `<span class="term-prompt">yogeshwari@dev:~$ </span><span class="term-cmd">${escHtml(cmd)}</span>`;
    output.appendChild(div);
  }

  function escHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function runCmd(cmd) {
    const c = cmd.trim().toLowerCase();
    if (!c) return;

    addBlankLine();
    addPromptLine(c);

    if (c === 'clear') {
      output.innerHTML = '';
      return;
    }

    const handler = COMMANDS[c];
    if (handler) {
      const lines = typeof handler === 'function' ? handler() : [];
      lines.forEach(l => addLine(l.type, escHtml(l.text)));
    } else {
      addLine('crimson', `Command not found: '${escHtml(c)}'. Type 'help' for commands.`);
    }

    addBlankLine();
    output.scrollTop = output.scrollHeight;
  }

  // Input handler
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const val = input.value;
      input.value = '';
      runCmd(val);
    }
  });

  // Command pills
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      runCmd(pill.dataset.cmd);
    });
  });

  // Auto-scroll on load
  output.scrollTop = output.scrollHeight;
})();

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

// ============ RIPPLE ON CYBER-BTN CLICK ============
document.querySelectorAll('.cyber-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      position:absolute;
      width:${size}px; height:${size}px;
      left:${e.clientX - rect.left - size/2}px;
      top:${e.clientY - rect.top - size/2}px;
      border-radius:50%;
      background:rgba(0,240,255,0.25);
      pointer-events:none;
      z-index:0;
      transform:scale(0);
    `;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    ripple.animate(
      [{ transform: 'scale(0)', opacity: 1 }, { transform: 'scale(2)', opacity: 0 }],
      { duration: 500, easing: 'ease-out' }
    ).onfinish = () => ripple.remove();
  });
});

// ============ SECTION ACTIVE HIGHLIGHT (NAV) ============
(function initSectionHighlight() {
  const sections = document.querySelectorAll('section[id], .stack[id]');
  const hudLinks = document.querySelectorAll('.hud-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
  });
})();
