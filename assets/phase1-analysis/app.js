/**
 * SmartEvent — Phase 1 Analysis Portal
 * نفس فكرة portal/: شريط جانبي + محتوى ديناميكي + بحث + ثيم
 */

const SECTIONS = {
  overview: {
    title: 'Phase 1 — Analysis',
    subtitle: 'نظرة عامة على مرحلة التحليل ومخرجات SmartEvent',
    icon: 'fa-compass',
    iconColor: '#38bdf8',
  },
  requirements: {
    title: 'Requirements',
    subtitle: 'المتطلبات الوظيفية وغير الوظيفية (FR / NFR)',
    icon: 'fa-list-check',
    iconColor: '#10b981',
  },
  user_stories: {
    title: 'User Stories',
    subtitle: 'قصص المستخدم لكل فاعل مع معايير القبول',
    icon: 'fa-users',
    iconColor: '#818cf8',
  },
  database: {
    title: 'Database Design',
    subtitle: 'تصميم قاعدة البيانات — 6 domains، MySQL + Prisma، 3NF',
    icon: 'fa-database',
    iconColor: '#c084fc',
  },
  api: {
    title: 'API Contracts',
    subtitle: 'عقود REST API و WebSocket و AI Internal API',
    icon: 'fa-plug',
    iconColor: '#f59e0b',
  },
  ai: {
    title: 'AI Requirements',
    subtitle: 'متطلبات microservice الذكاء الاصطناعي (FastAPI)',
    icon: 'fa-brain',
    iconColor: '#a855f7',
  },
  workflows: {
    title: 'System Workflows',
    subtitle: 'تدفقات العمل الرئيسية لمسارات المستخدمين (Attendee, Organizer, Vendor)',
    icon: 'fa-diagram-project',
    iconColor: '#ec4899',
  },
  ui_screens: {
    title: 'UI/UX Screen Inventory',
    subtitle: 'دليل وحصر شاشات واجهات المستخدم (78 شاشة مفصلة لمصمم الـ UI)',
    icon: 'fa-palette',
    iconColor: '#06b6d4',
  },
};

let activeSection = 'overview';

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initSearch();
  initTheme();
  initActorTabs();
  initMermaid();
  loadSection('overview');
});

function initNav() {
  document.querySelectorAll('.nav-item').forEach((item) => {
    item.addEventListener('click', () => {
      const id = item.getAttribute('data-id');
      if (!id) return;
      document.querySelectorAll('.nav-item').forEach((i) => i.classList.remove('active'));
      item.classList.add('active');
      loadSection(id);
      if (window.innerWidth <= 900) {
        document.getElementById('sidebar').classList.remove('open');
      }
    });
  });

  const menuBtn = document.getElementById('menuToggle');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      document.getElementById('sidebar').classList.toggle('open');
    });
  }
}

function loadSection(key) {
  activeSection = key;
  const meta = SECTIONS[key];
  if (!meta) return;

  document.getElementById('activeTitle').innerHTML =
    `<i class="fa-solid ${meta.icon}" style="color:${meta.iconColor}"></i> ${meta.title}`;
  document.getElementById('activeSubtitle').textContent = meta.subtitle;

  document.querySelectorAll('.doc-panel').forEach((panel) => {
    panel.classList.toggle('active', panel.getAttribute('data-panel') === key);
  });

  if (key === 'database') {
    renderMermaidInPanel('mermaid-db-domains');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.getElementById('content-viewport').scrollTop = 0;
}

function initSearch() {
  const input = document.getElementById('filterInput');
  if (!input) return;
  input.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    document.querySelectorAll('.nav-item').forEach((item) => {
      const text = item.innerText.toLowerCase();
      item.style.display = !q || text.includes(q) ? 'flex' : 'none';
    });
  });
}

function initTheme() {
  const btn = document.getElementById('themeBtn');
  const body = document.body;
  btn?.addEventListener('click', () => {
    const isDark = body.getAttribute('data-theme') === 'dark';
    body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    btn.innerHTML = isDark
      ? '<i class="fa-solid fa-moon"></i>'
      : '<i class="fa-solid fa-sun"></i>';
  });
}

function initActorTabs() {
  document.querySelectorAll('.actor-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      const actor = tab.getAttribute('data-actor');
      document.querySelectorAll('.actor-tab').forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('.story-block').forEach((block) => {
        block.classList.toggle('active', block.getAttribute('data-actor') === actor);
      });
    });
  });

  document.querySelectorAll('.screen-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      const group = tab.getAttribute('data-screen-group');
      document.querySelectorAll('.screen-tab').forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('.screen-block').forEach((block) => {
        block.classList.toggle('active', block.getAttribute('data-screen-group') === group);
      });
    });
  });
}

function initMermaid() {
  if (typeof mermaid === 'undefined') return;
  mermaid.initialize({
    startOnLoad: false,
    theme: 'neutral',
    securityLevel: 'loose',
    flowchart: { useMaxWidth: true, htmlLabels: true },
  });
}

async function renderMermaidInPanel(elementId) {
  const el = document.getElementById(elementId);
  if (!el || el.dataset.rendered === '1') return;
  const code = el.textContent.trim();
  if (!code || typeof mermaid === 'undefined') return;
  try {
    const { svg } = await mermaid.render('mermaid-' + elementId, code);
    el.innerHTML = svg;
    el.dataset.rendered = '1';
  } catch (err) {
    console.warn('Mermaid render failed:', err);
  }
}

window.loadSection = loadSection;
