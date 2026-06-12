const SUPABASE_URL = 'https://iyuhvqsyowaqrwjdujpg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5dWh2cXN5b3dhcXJ3amR1anBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1ODcxNjMsImV4cCI6MjA5NjE2MzE2M30.U4-cBqehEe1MXCD6-wlGSjrMh3rKyILKl860JmdPq5A';

let _sb = null;
function initSupabase() {
  if (!_sb) _sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return _sb;
}

function getVendedor() { return localStorage.getItem('vendedor_nombre'); }

function requireAuth() {
  const v = getVendedor();
  if (!v) { window.location.href = 'index.html'; return null; }
  return v;
}

function logout() {
  localStorage.removeItem('vendedor_nombre');
  window.location.href = 'index.html';
}

function showToast(msg, type = '') {
  let t = document.getElementById('_toast');
  if (!t) {
    t = document.createElement('div');
    t.id = '_toast';
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.className = 'toast ' + type + ' show';
  clearTimeout(t._tid);
  t._tid = setTimeout(() => t.classList.remove('show'), 3200);
}

function formatMoney(n) {
  return '$' + (Number(n) || 0).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatDate(d) { return d || '—'; }

function genId() {
  return 'COT-' + Date.now().toString(36).toUpperCase().slice(-5) + Math.random().toString(36).slice(2, 5).toUpperCase();
}

function genPedidoId() {
  return 'PED-' + Date.now().toString(36).toUpperCase().slice(-5) + Math.random().toString(36).slice(2, 5).toUpperCase();
}

function genProspectoId() {
  return 'PROS-' + Date.now().toString(36).toUpperCase().slice(-5);
}

function estatusBadge(e) {
  const map = {
    borrador:    ['badge-gray',   'Borrador'],
    enviada:     ['badge-blue',   'Enviada'],
    aprobada:    ['badge-green',  'Aprobada'],
    rechazada:   ['badge-red',    'Rechazada'],
    pendiente:   ['badge-yellow', 'Pendiente'],
    'en proceso':['badge-blue',   'En Proceso'],
    proceso:     ['badge-blue',   'En Proceso'],
    entregado:   ['badge-green',  'Entregado'],
    cancelado:   ['badge-red',    'Cancelado'],
    lead:        ['badge-gray',   'Lead'],
    contactado:  ['badge-blue',   'Contactado'],
    propuesta:   ['badge-purple', 'Propuesta'],
    negociacion: ['badge-yellow', 'Negociación'],
    cerrado:     ['badge-green',  'Cerrado ✓'],
    perdido:     ['badge-red',    'Perdido'],
  };
  const key = (e || '').toLowerCase();
  const [cls, label] = map[key] || ['badge-gray', e || '—'];
  return `<span class="badge ${cls}">${label}</span>`;
}

function renderSidebarUser() {
  const el = document.getElementById('sidebar-user');
  if (!el) return;
  const v = getVendedor();
  el.innerHTML = `
    <div class="user-info">Vendedor<strong>${v || ''}</strong></div>
    <button class="btn-logout" onclick="logout()">Cerrar sesión</button>`;
}

function setSidebarActive(page) {
  document.querySelectorAll('.nav-item[data-page]').forEach(el =>
    el.classList.toggle('active', el.dataset.page === page)
  );
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function currentMonth() {
  const n = new Date();
  return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, '0')}`;
}
