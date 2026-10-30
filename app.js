/* Ojo al Contrato · Caucasia — Vibras Positivas HM
   Consulta en vivo SECOP II (datos.gov.co, dataset jbjy-vk9h) y, si falla,
   usa la copia que deja el robot de GitHub Actions en data/. */
(() => {
'use strict';

const CFG = {
  api: 'https://www.datos.gov.co/resource/jbjy-vk9h.json',
  ciudad: 'CAUCASIA',
  desde: '2020-01-01T00:00:00',
  appUrl: 'https://ojo-al-contrato-caucasia.netlify.app/',
  tz: 'America/Bogota',
  pageSize: 20
};

/* ---------- Idioma ---------- */
const T = {
  es: {
    veeduria:'Veeduría ciudadana', kicker:'Caucasia, Antioquia · SECOP II en vivo',
    lead:'Todos los contratos del municipio que todavía no se han terminado, con la plata, los plazos y las alertas. Datos oficiales, sin filtro.',
    refresh:'Actualizar ahora', verContratos:'Ver contratos',
    sAbiertos:'contratos sin terminar', sValor:'en juego', sVencidos:'ya vencieron y siguen abiertos', sAlertas:'con alguna alerta',
    hoy:'Hoy', peores:'Los que más preocupan', peoresHint:'Desliza', todos:'Todos los contratos sin terminar',
    buscar:'Busca por obra, contratista, NIT o número…', oRiesgo:'Más alertas primero', oValor:'Más plata primero', oFin:'Vencimiento más cercano', oFirma:'Más recientes',
    verMas:'Ver más', topContratistas:'¿Quién se lleva más contratos?', noticias:'En las noticias',
    comoT:'Cómo hacer veeduría con esta app',
    como1:'Abre un contrato con alerta y mira el plazo, lo pagado y las prórrogas.',
    como2:'Entra al SECOP con el botón del contrato y revisa los informes de supervisión e interventoría.',
    como3:'Ve a la obra, toma fotos y compara con lo que dice el contrato.',
    como4:'Genera el derecho de petición desde la app y radícalo en la Alcaldía. Tienen 15 días hábiles para responder (Ley 1755 de 2015).',
    como5:'Si no responden o hay plata sin obra: Personería, Contraloría General de Antioquia y Procuraduría.',
    notaPagos:'Ojo: si un contrato dice $0 pagado, puede ser que la entidad no ha publicado los pagos en el SECOP. Eso también se puede preguntar en el derecho de petición.',
    fuente:'Fuente: SECOP II – Contratos Electrónicos, datos abiertos de Colombia Compra Eficiente (datos.gov.co). La app no inventa ni modifica datos: muestra lo que las entidades publican.',
    cerrar:'Cerrar',
    cargando:'Consultando el SECOP en vivo…', vivo:'En vivo desde el SECOP · {h}', copia:'Sin conexión al SECOP: mostrando la copia del robot del {h}', error:'No se pudo traer información. Revisa tu conexión y toca Actualizar.',
    todasEnt:'Todas las entidades de Caucasia', soloAlcaldia:'Solo la Alcaldía',
    p2024:'Desde 2024 (alcalde actual)', p2020:'Desde 2020',
    cTodos:'Todos', cVencido:'Vencidos', cProrroga:'Prorrogados', cSuspendido:'Suspendidos', cDirecta:'Contratación directa', cAnticipo:'Con anticipo', cObra:'Solo obras', cConcentra:'Contratista repetido',
    conteo:'{n} contratos · {v}', sinResultados:'No hay contratos con ese filtro.',
    vence:'Vence', firmado:'Firmado', tiempo:'Tiempo usado', pagado:'Pagado',
    aVencido:'Venció hace {d} días y sigue abierto', aSuspendido:'Contrato suspendido', aProrroga:'Prorrogado {d} días', aProrrogaGrave:'Prorrogado {d} días: más de la mitad del plazo original',
    aTarde:'Lleva {t}% del tiempo y solo {p}% pagado', aSinPagos:'Lleva {t}% del tiempo y no hay pagos publicados', aPagadoAntes:'Ya se pagó el {p}% con solo {t}% del tiempo',
    aAnticipo:'Anticipo de {v}', aDirecta:'Contratación directa por {v}', aConcentra:'Este contratista tiene {n} contratos abiertos aquí',
    hVencen:'Vencen esta semana', hVencenP:'Contratos que terminan en los próximos 7 días. Hay que mirar si de verdad se entregan.',
    hVencidos:'Vencidos y sin cerrar', hVencidosP:'Ya pasó la fecha de terminación y en el SECOP siguen abiertos.',
    hNuevos:'Firmados en los últimos 30 días', hNuevosP:'Contratos nuevos que arrancan.',
    hRobot:'Cambios que detectó el robot', hRobotP:'En las últimas 48 horas.', hRobotNada:'Sin cambios en las últimas 48 horas. Último chequeo: {h}.', hRobotNo:'El robot todavía no ha corrido.',
    ninguno:'Ninguno por ahora.',
    entidad:'Entidad', contratista:'Contratista', nit:'NIT / documento', valor:'Valor', vPagado:'Pagado', vFacturado:'Facturado', estado:'Estado', modalidad:'Modalidad', tipo:'Tipo',
    inicio:'Inicio', fin:'Terminación', diasAd:'Días adicionados', origen:'Origen de los recursos', ref:'Referencia', idc:'ID SECOP', alertas:'Alertas', sinAlertas:'Sin alertas por ahora.',
    verSecop:'Ver en el SECOP', peticion:'Generar derecho de petición', compartir:'Compartir este contrato', wa:'Enviar por WhatsApp', copiar:'Copiar texto', copiado:'Copiado',
    petNota:'Completa tus datos donde dice [ ] y radícalo en la Alcaldía o por su correo de PQRSD.',
    robotInfo:'Robot de GitHub: último chequeo {h} · {n} contratos guardados.',
    nContratos:'{n} contratos', compartirTxt:'Mira este contrato de Caucasia en Ojo al Contrato:',
    cambio_nuevo:'Contrato nuevo', cambio_pago:'Cambió lo pagado', cambio_prorroga:'Nueva prórroga', cambio_estado:'Cambió de estado', cambio_cerrado:'Se cerró'
  },
  en: {
    veeduria:'Citizen oversight', kicker:'Caucasia, Antioquia · Live SECOP II data',
    lead:'Every public contract in the municipality that is not finished yet, with the money, the deadlines and the red flags. Official data, unfiltered.',
    refresh:'Refresh now', verContratos:'See contracts',
    sAbiertos:'unfinished contracts', sValor:'at stake', sVencidos:'past due and still open', sAlertas:'with a red flag',
    hoy:'Today', peores:'Most worrying', peoresHint:'Swipe', todos:'All unfinished contracts',
    buscar:'Search by project, contractor, tax ID or number…', oRiesgo:'Most flags first', oValor:'Biggest first', oFin:'Closest deadline', oFirma:'Newest',
    verMas:'Show more', topContratistas:'Who gets the most contracts?', noticias:'In the news',
    comoT:'How to oversee with this app',
    como1:'Open a flagged contract and check the deadline, payments and extensions.',
    como2:'Open it in SECOP and read the supervision reports.',
    como3:'Visit the site, take photos and compare with the contract.',
    como4:'Generate the formal petition (derecho de petición) from the app and file it with the Mayor\'s office. They must reply within 15 business days.',
    como5:'No reply, or money with no work? Go to the Personería, the Antioquia Comptroller and the Procuraduría.',
    notaPagos:'Note: $0 paid may mean the entity has not published payments in SECOP. You can ask about that too.',
    fuente:'Source: SECOP II – Electronic Contracts, open data from Colombia Compra Eficiente (datos.gov.co). The app does not change any data.',
    cerrar:'Close',
    cargando:'Querying SECOP live…', vivo:'Live from SECOP · {h}', copia:'SECOP unreachable: showing the robot copy from {h}', error:'Could not load data. Check your connection and tap Refresh.',
    todasEnt:'All Caucasia entities', soloAlcaldia:'Mayor\'s office only',
    p2024:'Since 2024 (current mayor)', p2020:'Since 2020',
    cTodos:'All', cVencido:'Past due', cProrroga:'Extended', cSuspendido:'Suspended', cDirecta:'Direct award', cAnticipo:'Advance paid', cObra:'Public works only', cConcentra:'Repeat contractor',
    conteo:'{n} contracts · {v}', sinResultados:'No contracts match this filter.',
    vence:'Due', firmado:'Signed', tiempo:'Time used', pagado:'Paid',
    aVencido:'Past due {d} days and still open', aSuspendido:'Contract suspended', aProrroga:'Extended {d} days', aProrrogaGrave:'Extended {d} days: over half the original term',
    aTarde:'{t}% of the time used, only {p}% paid', aSinPagos:'{t}% of the time used and no payments published', aPagadoAntes:'{p}% already paid with only {t}% of the time used',
    aAnticipo:'Advance payment of {v}', aDirecta:'Direct award for {v}', aConcentra:'This contractor holds {n} open contracts here',
    hVencen:'Due this week', hVencenP:'Contracts ending in the next 7 days. Check they are really delivered.',
    hVencidos:'Past due, still open', hVencidosP:'The end date has passed and SECOP still shows them open.',
    hNuevos:'Signed in the last 30 days', hNuevosP:'New contracts starting.',
    hRobot:'Changes spotted by the robot', hRobotP:'In the last 48 hours.', hRobotNada:'No changes in the last 48 hours. Last check: {h}.', hRobotNo:'The robot has not run yet.',
    ninguno:'None for now.',
    entidad:'Entity', contratista:'Contractor', nit:'Tax ID', valor:'Value', vPagado:'Paid', vFacturado:'Invoiced', estado:'Status', modalidad:'Procurement method', tipo:'Type',
    inicio:'Start', fin:'End', diasAd:'Days added', origen:'Source of funds', ref:'Reference', idc:'SECOP ID', alertas:'Red flags', sinAlertas:'No red flags for now.',
    verSecop:'Open in SECOP', peticion:'Generate formal petition (in Spanish)', compartir:'Share this contract', wa:'Send via WhatsApp', copiar:'Copy text', copiado:'Copied',
    petNota:'The petition must be filed in Spanish. Fill in your details where it says [ ].',
    robotInfo:'GitHub robot: last check {h} · {n} contracts stored.',
    nContratos:'{n} contracts', compartirTxt:'Check this Caucasia contract on Ojo al Contrato:',
    cambio_nuevo:'New contract', cambio_pago:'Payment changed', cambio_prorroga:'New extension', cambio_estado:'Status changed', cambio_cerrado:'Closed'
  }
};
let lang = (() => { try { return localStorage.getItem('oac-lang') || 'es'; } catch { return 'es'; } })();
if (!T[lang]) lang = 'es';
const t = (k, v = {}) => (T[lang][k] ?? T.es[k] ?? k).replace(/\{(\w+)\}/g, (_, x) => v[x] ?? '');

/* ---------- Utilidades ---------- */
const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const num = v => { const n = parseFloat(String(v ?? '').replace(/[^0-9.\-]/g, '')); return isFinite(n) ? n : 0; };
const DAY = 864e5;
const todayStr = () => new Intl.DateTimeFormat('en-CA', { timeZone: CFG.tz }).format(new Date());
const TODAY = () => new Date(todayStr() + 'T00:00:00');
const toDate = s => { if (!s) return null; const d = new Date(String(s).slice(0,10) + 'T00:00:00'); return isNaN(d) ? null : d; };
const fDate = d => d ? d.toLocaleDateString(lang === 'es' ? 'es-CO' : 'en-US', { day:'numeric', month:'short', year:'numeric' }) : '—';
const fNow = (d = new Date()) => d.toLocaleString(lang === 'es' ? 'es-CO' : 'en-US', { timeZone: CFG.tz, day:'numeric', month:'short', hour:'numeric', minute:'2-digit' });
function money(v) {
  if (!v) return '$0';
  if (v >= 1e6) {
    const m = (v / 1e6).toLocaleString('es-CO', { maximumFractionDigits: v >= 1e8 ? 0 : 1 });
    return '$' + m + (lang === 'es' ? ' millones' : ' million');
  }
  return '$' + Math.round(v).toLocaleString('es-CO');
}
const moneyShort = v => v >= 1e9 ? '$' + (v/1e9).toLocaleString('es-CO',{maximumFractionDigits:1}) + (lang==='es'?' mil M':' B') : '$' + Math.round(v/1e6).toLocaleString('es-CO') + ' M';
const clamp = (n, a = 0, b = 100) => Math.max(a, Math.min(b, n));
function toast(msg) { const el = $('#toast'); el.textContent = msg; el.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(() => el.hidden = true, 2200); }

/* ---------- Estado ---------- */
const S = { all: [], view: [], shown: CFG.pageSize, chip: 'todos', q: '', ent: 'todas', per: '2024', orden: 'riesgo', meta: null, cambios: [], noticias: [], source: '' };
const CLOSED = /terminad|cerrad|cancelad|liquidad|cedid|borrador/i;

/* ---------- Datos ---------- */
function buildUrl(simple) {
  const p = new URLSearchParams();
  if (simple) {
    p.set('$where', `upper(ciudad)='${CFG.ciudad}'`);
  } else {
    p.set('$where', `upper(ciudad)='${CFG.ciudad}' AND fecha_de_firma >= '${CFG.desde}' AND upper(estado_contrato) not in('TERMINADO','CERRADO','CANCELADO','CEDIDO','BORRADOR')`);
  }
  p.set('$order', 'fecha_de_firma DESC');
  p.set('$limit', '5000');
  return CFG.api + '?' + p.toString();
}
async function getJSON(url, ms = 25000) {
  const c = new AbortController(); const tm = setTimeout(() => c.abort(), ms);
  try { const r = await fetch(url, { signal: c.signal, cache: 'no-store' }); if (!r.ok) throw new Error(r.status); return await r.json(); }
  finally { clearTimeout(tm); }
}
async function fetchLive() {
  try { return await getJSON(buildUrl(false)); }
  catch (e) { console.warn('consulta principal falló, intento simple', e); return await getJSON(buildUrl(true)); }
}
async function fetchLocal(name) {
  try { return await getJSON(`data/${name}?v=${Date.now()}`, 10000); } catch { return null; }
}

function normalize(r) {
  const url = (r.urlproceso && (r.urlproceso.url || r.urlproceso)) || '';
  return {
    id: r.id_contrato || r.referencia_del_contrato || Math.random().toString(36).slice(2),
    ref: r.referencia_del_contrato || '', proceso: r.proceso_de_compra || '',
    entidad: (r.nombre_entidad || '').trim(), estado: r.estado_contrato || '',
    objeto: (r.objeto_del_contrato || r.descripcion_del_proceso || '').trim(),
    tipo: r.tipo_de_contrato || '', modalidad: r.modalidad_de_contratacion || '',
    firma: toDate(r.fecha_de_firma), inicio: toDate(r.fecha_de_inicio_del_contrato), fin: toDate(r.fecha_de_fin_del_contrato),
    proveedor: (r.proveedor_adjudicado || '').trim(), nit: r.documento_proveedor || '',
    valor: num(r.valor_del_contrato), pagado: num(r.valor_pagado), facturado: num(r.valor_facturado),
    anticipo: num(r.valor_de_pago_adelantado), dias: num(r.dias_adicionados),
    origen: r.origen_de_los_recursos || '', url: typeof url === 'string' ? url : '',
    actualizado: r.ultima_actualizacion || ''
  };
}

function analyze(list) {
  const hoy = TODAY();
  const open = list.filter(c => !CLOSED.test(c.estado) && c.firma && c.firma >= toDate(CFG.desde));
  const byNit = {};
  open.forEach(c => { if (c.nit && !/no definido/i.test(c.nit)) byNit[c.nit] = (byNit[c.nit] || 0) + 1; });
  open.forEach(c => {
    const A = [];
    const ini = c.inicio || c.firma;
    const dur = c.fin && ini ? Math.max(1, (c.fin - ini) / DAY) : 0;
    c.tiempoPct = dur ? clamp(Math.round((hoy - ini) / DAY / dur * 100)) : 0;
    c.pagPct = c.valor ? clamp(Math.round(c.pagado / c.valor * 100)) : 0;
    c.vencido = !!(c.fin && c.fin < hoy);
    c.diasVencido = c.vencido ? Math.round((hoy - c.fin) / DAY) : 0;
    c.directa = /directa/i.test(c.modalidad);
    c.obra = /obra/i.test(c.tipo) || /^\s*(construcci|mejoramiento|adecuaci|pavimenta|rehabilita|mantenimiento)/i.test(c.objeto);
    c.suspendido = /suspend/i.test(c.estado);
    c.repetido = byNit[c.nit] || 0;
    if (c.vencido) A.push({ k:'vencido', s:3, x:t('aVencido',{d:c.diasVencido}) });
    if (c.suspendido) A.push({ k:'suspendido', s:3, x:t('aSuspendido') });
    if (c.dias > 0) {
      const orig = dur - c.dias;
      const grave = orig > 0 && c.dias / orig >= .5;
      A.push({ k:'prorroga', s: grave ? 3 : 2, x: t(grave ? 'aProrrogaGrave' : 'aProrroga', { d: Math.round(c.dias) }) });
    }
    if (!c.vencido && c.valor > 0) {
      if (c.pagado === 0 && c.tiempoPct >= 50) A.push({ k:'sinpagos', s:1, x:t('aSinPagos',{t:c.tiempoPct}) });
      else if (c.tiempoPct >= 80 && c.pagPct < 30) A.push({ k:'tarde', s:2, x:t('aTarde',{t:c.tiempoPct,p:c.pagPct}) });
    }
    if (c.pagPct >= 90 && c.tiempoPct < 50) A.push({ k:'antes', s:2, x:t('aPagadoAntes',{p:c.pagPct,t:c.tiempoPct}) });
    if (c.anticipo > 0) A.push({ k:'anticipo', s: c.valor && c.anticipo / c.valor >= .3 ? 2 : 1, x:t('aAnticipo',{v:money(c.anticipo)}) });
    if (c.directa && c.valor >= 2e8) A.push({ k:'directa', s:2, x:t('aDirecta',{v:money(c.valor)}) });
    if (c.repetido >= 3) A.push({ k:'concentra', s: c.repetido >= 6 ? 2 : 1, x:t('aConcentra',{n:c.repetido}) });
    c.alertas = A.sort((a,b) => b.s - a.s);
    c.sev = A.length ? A[0].s : 0;
    c.score = A.reduce((s,a) => s + a.s * a.s, 0) + Math.log10(c.valor + 10) / 3;
  });
  return open;
}

/* ---------- Render ---------- */
function applyI18n() {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => el.textContent = t(el.dataset.i18n));
  document.querySelectorAll('[data-i18n-ph]').forEach(el => el.placeholder = t(el.dataset.i18nPh));
  $('#btnLang').textContent = lang === 'es' ? 'EN' : 'ES';
}

function inPeriod(c) { return S.per === '2020' || (c.firma && c.firma >= new Date('2024-01-01T00:00:00')); }
function inEnt(c) { return S.ent === 'todas' || (S.ent === 'alcaldia' ? /alcald|municipio de caucasia/i.test(c.entidad) : c.entidad === S.ent); }
const CHIPS = [
  ['todos', c => true], ['vencido', c => c.vencido], ['prorroga', c => c.dias > 0], ['suspendido', c => c.suspendido],
  ['directa', c => c.directa], ['anticipo', c => c.anticipo > 0], ['obra', c => c.obra], ['concentra', c => c.repetido >= 3]
];
const chipLabel = { todos:'cTodos', vencido:'cVencido', prorroga:'cProrroga', suspendido:'cSuspendido', directa:'cDirecta', anticipo:'cAnticipo', obra:'cObra', concentra:'cConcentra' };

function base() { return S.all.filter(c => inPeriod(c) && inEnt(c)); }

function renderFilters() {
  const ents = [...new Set(S.all.map(c => c.entidad))].filter(Boolean).sort();
  const fe = $('#fEntidad');
  fe.innerHTML = `<option value="todas">${esc(t('todasEnt'))}</option><option value="alcaldia">${esc(t('soloAlcaldia'))}</option>` +
    ents.map(e => `<option value="${esc(e)}">${esc(e)}</option>`).join('');
  fe.value = S.ent;
  if (!$('#fPeriodo')) {
    const sel = document.createElement('select'); sel.id = 'fPeriodo';
    $('.tools .row').appendChild(sel);
    sel.addEventListener('change', () => { S.per = sel.value; S.shown = CFG.pageSize; renderAll(); });
  }
  $('#fPeriodo').innerHTML = `<option value="2024">${esc(t('p2024'))}</option><option value="2020">${esc(t('p2020'))}</option>`;
  $('#fPeriodo').value = S.per;
}

function renderChips() {
  const b = base();
  $('#chips').innerHTML = CHIPS.map(([k, fn]) => {
    const n = b.filter(fn).length;
    return `<button class="chip ${S.chip === k ? 'on' : ''}" data-chip="${k}">${esc(t(chipLabel[k]))}<small>${n}</small></button>`;
  }).join('');
}

function sevColor(s) { return s >= 3 ? 'var(--red)' : s === 2 ? 'var(--amber)' : s === 1 ? 'var(--blue)' : 'var(--green)'; }
function tagClass(s) { return s >= 3 ? 'r' : s === 2 ? 'a' : 'b'; }

function card(c, i = 0) {
  const tags = c.alertas.slice(0, 3).map(a => `<span class="tag ${tagClass(a.s)}">${esc(a.x)}</span>`).join('') || `<span class="tag g">${esc(c.estado)}</span>`;
  const tc = c.tiempoPct >= 100 ? 'var(--red)' : c.tiempoPct >= 80 ? 'var(--amber)' : 'var(--green)';
  return `<article class="card" data-id="${esc(c.id)}" style="--sev:${sevColor(c.sev)};animation-delay:${Math.min(i,10)*40}ms">
    <div class="ent">${esc(c.entidad)}</div>
    <h3>${esc(c.objeto || c.ref)}</h3>
    <div class="money">${money(c.valor)}</div>
    <div class="who">${esc(c.proveedor || '—')}</div>
    <div class="tags">${tags}</div>
    <div class="bars">
      <div class="bar">${t('tiempo')} ${c.tiempoPct}% · ${t('vence')} ${fDate(c.fin)}<i><b data-w="${c.tiempoPct}" style="--c:${tc}"></b></i></div>
      <div class="bar">${t('pagado')} ${c.pagPct}% · ${money(c.pagado)}<i><b data-w="${c.pagPct}"></b></i></div>
    </div>
  </article>`;
}
function animateBars(root) { requestAnimationFrame(() => root.querySelectorAll('.bar b[data-w]').forEach(b => b.style.width = b.dataset.w + '%')); }

function renderStats() {
  const b = base();
  const vals = { abiertos: b.length, valor: b.reduce((s,c) => s + c.valor, 0), vencidos: b.filter(c => c.vencido).length, alertas: b.filter(c => c.alertas.length).length };
  document.querySelectorAll('[data-count]').forEach(el => {
    const end = vals[el.dataset.count], isM = el.hasAttribute('data-money'), t0 = performance.now();
    const step = now => { const k = Math.min(1, (now - t0) / 900), v = end * (1 - Math.pow(1 - k, 3));
      el.textContent = isM ? moneyShort(v) : Math.round(v).toLocaleString('es-CO'); if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  });
}

function miniList(arr, fmt) {
  if (!arr.length) return `<ul><li>${esc(t('ninguno'))}</li></ul>`;
  return '<ul>' + arr.slice(0, 3).map(c => `<li data-id="${esc(c.id)}">${fmt(c)}</li>`).join('') + '</ul>';
}
function renderHoy() {
  const hoy = TODAY(), b = base();
  $('#hoyFecha').textContent = hoy.toLocaleDateString(lang === 'es' ? 'es-CO' : 'en-US', { weekday:'long', day:'numeric', month:'long' });
  const short = s => esc((s || '').slice(0, 70)) + ((s || '').length > 70 ? '…' : '');
  const vencen = b.filter(c => c.fin && c.fin >= hoy && c.fin - hoy <= 7 * DAY).sort((x,y) => x.fin - y.fin);
  const venc = b.filter(c => c.vencido).sort((x,y) => y.valor - x.valor);
  const nuevos = b.filter(c => c.firma && hoy - c.firma <= 30 * DAY).sort((x,y) => y.firma - x.firma);
  const lim = Date.now() - 48 * 36e5;
  const cambios = (S.cambios || []).filter(x => new Date(x.t).getTime() >= lim);
  const items = [
    { a:'var(--amber)', n:vencen.length, h:t('hVencen'), p:t('hVencenP'), l:miniList(vencen, c => `${short(c.objeto)} · <b>${fDate(c.fin)}</b>`), chip:null },
    { a:'var(--red)', n:venc.length, h:t('hVencidos'), p:t('hVencidosP'), l:miniList(venc, c => `${short(c.objeto)} · <b>${money(c.valor)}</b>`), chip:'vencido' },
    { a:'var(--lime)', n:nuevos.length, h:t('hNuevos'), p:t('hNuevosP'), l:miniList(nuevos, c => `${short(c.objeto)} · <b>${money(c.valor)}</b>`), chip:null },
    { a:'#7dd3fc', n:cambios.length, h:t('hRobot'),
      p: cambios.length ? t('hRobotP') : (S.meta ? t('hRobotNada', { h: fNow(new Date(S.meta.actualizado)) }) : t('hRobotNo')),
      l: cambios.length ? '<ul>' + cambios.slice(0, 4).map(x => `<li data-id="${esc(x.id)}"><b>${esc(t('cambio_' + x.tipo))}</b> · ${short(x.objeto)}</li>`).join('') + '</ul>' : '', chip:null }
  ];
  $('#hoyGrid').innerHTML = items.map((it, i) => `<div class="hoy-item" style="--accent:${it.a};animation-delay:${i*80}ms" ${it.chip ? `data-gochip="${it.chip}"` : ''}>
    <div class="n">${it.n}</div><h3>${esc(it.h)}</h3><p>${esc(it.p)}</p>${it.l}</div>`).join('');
}

function renderPeores() {
  const top = base().filter(c => c.alertas.length).sort((a,b) => b.score - a.score).slice(0, 10);
  $('#peores').innerHTML = top.length ? top.map(card).join('') : `<div class="empty">${esc(t('ninguno'))}</div>`;
  animateBars($('#peores'));
}

function renderList() {
  const fn = CHIPS.find(x => x[0] === S.chip)[1];
  const q = S.q.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  let v = base().filter(fn);
  if (q) v = v.filter(c => (c.objeto + ' ' + c.proveedor + ' ' + c.nit + ' ' + c.ref + ' ' + c.id + ' ' + c.entidad).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').includes(q));
  const sorters = { riesgo:(a,b) => b.score - a.score, valor:(a,b) => b.valor - a.valor, fin:(a,b) => (a.fin || 9e15) - (b.fin || 9e15), firma:(a,b) => (b.firma || 0) - (a.firma || 0) };
  v.sort(sorters[S.orden]);
  S.view = v;
  $('#conteo').textContent = t('conteo', { n: v.length.toLocaleString('es-CO'), v: money(v.reduce((s,c) => s + c.valor, 0)) });
  $('#cards').innerHTML = v.length ? v.slice(0, S.shown).map(card).join('') : `<div class="empty">${esc(t('sinResultados'))}</div>`;
  $('#btnMas').hidden = v.length <= S.shown;
  animateBars($('#cards'));
}

function renderRanking() {
  const g = {};
  base().forEach(c => { const k = c.nit || c.proveedor; if (!k) return; (g[k] ||= { nm:c.proveedor, nit:c.nit, n:0, v:0 }); g[k].n++; g[k].v += c.valor; });
  const arr = Object.values(g).sort((a,b) => b.v - a.v).slice(0, 10);
  const max = arr[0]?.v || 1;
  $('#ranking').innerHTML = arr.map((r, i) => `<div class="rk" data-q="${esc(r.nit || r.nm)}">
    <div class="p">${i + 1}</div><div class="nm">${esc(r.nm || '—')}<small>${esc(r.nit)} · ${esc(t('nContratos',{n:r.n}))}</small></div><div class="v">${money(r.v)}</div>
    <div class="meter"><b style="width:${Math.max(4, r.v / max * 100)}%"></b></div></div>`).join('') || `<div class="empty">${esc(t('ninguno'))}</div>`;
}

function renderNoticias() {
  const n = (S.noticias || []).slice(0, 6);
  $('#noticiasSec').hidden = !n.length;
  $('#noticias').innerHTML = n.map(x => `<a href="${esc(x.link)}" target="_blank" rel="noopener"><b>${esc(x.titulo)}</b><small>${esc(x.fuente || '')} · ${esc(x.fecha ? fNow(new Date(x.fecha)) : '')}</small></a>`).join('');
}

function renderRobotInfo() {
  $('#robotInfo').textContent = S.meta ? t('robotInfo', { h: fNow(new Date(S.meta.actualizado)), n: S.meta.total ?? '—' }) : '';
}

function renderAll() {
  renderChips(); renderStats(); renderHoy(); renderPeores(); renderList(); renderRanking(); renderNoticias(); renderRobotInfo();
}

/* ---------- Detalle ---------- */
function openDetail(id) {
  const c = S.all.find(x => x.id === id); if (!c) return;
  const kv = (k, v, full) => `<div class="${full ? 'full' : ''}"><small>${esc(t(k))}</small><b>${v}</b></div>`;
  const al = c.alertas.length ? c.alertas.map(a => `<div class="alert" style="--c:${sevColor(a.s)}">${esc(a.x)}</div>`).join('') : `<div class="alert" style="--c:var(--green)">${esc(t('sinAlertas'))}</div>`;
  $('#sheetBody').innerHTML = `
    <div class="ent" style="font-size:.75rem;text-transform:uppercase;letter-spacing:.06em;color:var(--muted);font-weight:700">${esc(c.entidad)}</div>
    <h2>${esc(c.objeto)}</h2>
    <div class="money" style="font-family:'Archivo Black';font-size:1.8rem">${money(c.valor)}</div>
    <div class="bars">
      <div class="bar">${t('tiempo')} ${c.tiempoPct}%<i><b data-w="${c.tiempoPct}" style="--c:${c.tiempoPct >= 100 ? 'var(--red)' : 'var(--green)'}"></b></i></div>
      <div class="bar">${t('pagado')} ${c.pagPct}%<i><b data-w="${c.pagPct}"></b></i></div>
    </div>
    <h3 style="margin-top:16px">${esc(t('alertas'))}</h3>
    <div class="alerts">${al}</div>
    <div class="kv">
      ${kv('contratista', esc(c.proveedor || '—'), true)}
      ${kv('nit', esc(c.nit || '—'))}${kv('estado', esc(c.estado || '—'))}
      ${kv('vPagado', money(c.pagado))}${kv('vFacturado', money(c.facturado))}
      ${kv('firmado', fDate(c.firma))}${kv('inicio', fDate(c.inicio))}
      ${kv('fin', fDate(c.fin))}${kv('diasAd', c.dias ? Math.round(c.dias) : '0')}
      ${kv('modalidad', esc(c.modalidad || '—'))}${kv('tipo', esc(c.tipo || '—'))}
      ${kv('ref', esc(c.ref || '—'))}${kv('idc', esc(c.id))}
      ${kv('origen', esc(c.origen || '—'), true)}
    </div>
    <div class="actions">
      ${c.url ? `<a class="btn dark" href="${esc(c.url)}" target="_blank" rel="noopener">${esc(t('verSecop'))}</a>` : ''}
      <button class="btn primary" data-pet="${esc(c.id)}">${esc(t('peticion'))}</button>
      <button class="btn ghost" data-share="${esc(c.id)}" style="color:var(--ink)">${esc(t('compartir'))}</button>
    </div>
    <div id="petBox"></div>`;
  $('#sheet').hidden = false;
  document.body.style.overflow = 'hidden';
  animateBars($('#sheetBody'));
  history.replaceState(null, '', '#c=' + encodeURIComponent(id));
}
function closeDetail() { $('#sheet').hidden = true; document.body.style.overflow = ''; history.replaceState(null, '', location.pathname); }

function peticion(c) {
  const hoy = new Date().toLocaleDateString('es-CO', { timeZone: CFG.tz, day:'numeric', month:'long', year:'numeric' });
  return `Caucasia, ${hoy}

Señores
${c.entidad || 'ALCALDÍA DE CAUCASIA'}
Caucasia, Antioquia

Asunto: Derecho de petición de información sobre el contrato ${c.ref || c.id}

Yo, [NOMBRE COMPLETO], identificado(a) con cédula de ciudadanía No. [NÚMERO], en ejercicio del derecho fundamental de petición consagrado en el artículo 23 de la Constitución Política y regulado por la Ley 1755 de 2015, y del control social a la gestión pública (Ley 850 de 2003 y Ley 1757 de 2015), respetuosamente solicito la siguiente información sobre el contrato:

- Referencia: ${c.ref || '—'} (ID SECOP: ${c.id})
- Objeto: ${c.objeto}
- Contratista: ${c.proveedor || '—'} (NIT/documento ${c.nit || '—'})
- Valor: ${money(c.valor).replace(' million',' millones')} — Estado en SECOP: ${c.estado || '—'}
- Fecha de terminación registrada: ${c.fin ? c.fin.toLocaleDateString('es-CO') : '—'}

Solicito:
1. Porcentaje de avance físico y financiero actual, con el último informe de supervisión y/o interventoría.
2. Relación de pagos realizados al contratista (incluido anticipo, si lo hubo) y su soporte.
3. Copia de las modificaciones, adiciones, prórrogas o suspensiones, con su justificación.
4. Nombre del supervisor y/o interventor del contrato.
5. Fecha prevista de entrega y, si el plazo ya venció, las acciones adelantadas por la entidad (requerimientos, multas, cláusula penal, declaratoria de incumplimiento o liquidación).
6. Razón por la cual esta información no se encuentra completa y actualizada en el SECOP II, si es el caso.

Recibiré respuesta en: [CORREO ELECTRÓNICO] / [DIRECCIÓN] / [TELÉFONO].

Agradezco la respuesta dentro de los quince (15) días hábiles que establece la ley.

Atentamente,

[FIRMA]
[NOMBRE COMPLETO]
C.C. [NÚMERO]`;
}

async function share(c) {
  const url = CFG.appUrl + '#c=' + encodeURIComponent(c.id);
  const text = `${t('compartirTxt')} ${c.objeto.slice(0, 120)} — ${money(c.valor)}`;
  if (navigator.share) { try { await navigator.share({ title: 'Ojo al Contrato · Caucasia', text, url }); return; } catch {} }
  window.open('https://wa.me/?text=' + encodeURIComponent(text + '\n' + url), '_blank');
}

/* ---------- Carga ---------- */
async function load() {
  const btn = $('#btnRefresh'); btn.classList.add('loading'); btn.disabled = true;
  $('#status').textContent = t('cargando');
  const [meta, cambios, noticias] = await Promise.all([fetchLocal('meta.json'), fetchLocal('cambios.json'), fetchLocal('noticias.json')]);
  S.meta = meta; S.cambios = Array.isArray(cambios) ? cambios : []; S.noticias = Array.isArray(noticias) ? noticias : [];
  let rows = null;
  try { rows = await fetchLive(); S.source = 'live'; }
  catch (e) {
    console.warn('SECOP en vivo no disponible', e);
    const local = await fetchLocal('contratos.json');
    if (local && Array.isArray(local.contratos) && local.contratos.length) { rows = local.contratos; S.source = 'robot'; }
  }
  btn.classList.remove('loading'); btn.disabled = false;
  if (!rows) { $('#status').textContent = t('error'); S.all = []; renderFilters(); renderAll(); return; }
  S.all = analyze(rows.map(normalize));
  $('#status').innerHTML = S.source === 'live'
    ? `<span class="live"></span>${esc(t('vivo', { h: fNow() }))}`
    : esc(t('copia', { h: meta ? fNow(new Date(meta.actualizado)) : '—' }));
  renderFilters(); renderAll();
  const m = location.hash.match(/#c=(.+)/); if (m) openDetail(decodeURIComponent(m[1]));
}

/* ---------- Eventos ---------- */
document.addEventListener('click', e => {
  const el = e.target.closest('[data-id],[data-chip],[data-gochip],[data-close],[data-pet],[data-share],[data-q]');
  if (!el) return;
  if (el.dataset.close !== undefined) return closeDetail();
  if (el.dataset.chip) { S.chip = el.dataset.chip; S.shown = CFG.pageSize; renderChips(); renderList(); return; }
  if (el.dataset.pet) {
    const c = S.all.find(x => x.id === el.dataset.pet);
    const txt = peticion(c);
    $('#petBox').innerHTML = `<p class="nota" style="opacity:1;color:var(--muted);margin-top:14px">${esc(t('petNota'))}</p>
      <textarea class="pet">${esc(txt)}</textarea>
      <div class="actions"><button class="btn dark" id="petCopy">${esc(t('copiar'))}</button>
      <a class="btn wa" target="_blank" rel="noopener" href="https://wa.me/?text=${encodeURIComponent(txt)}">${esc(t('wa'))}</a></div>`;
    $('#petCopy').onclick = async () => { const v = $('#petBox textarea').value; try { await navigator.clipboard.writeText(v); } catch { $('#petBox textarea').select(); document.execCommand('copy'); } toast(t('copiado')); };
    $('#petBox textarea').scrollIntoView({ behavior:'smooth', block:'center' });
    return;
  }
  if (el.dataset.share) return share(S.all.find(x => x.id === el.dataset.share));
  if (el.dataset.gochip) { S.chip = el.dataset.gochip; renderChips(); renderList(); $('#lista').scrollIntoView({ behavior:'smooth' }); return; }
  if (el.dataset.q) { S.q = el.dataset.q; $('#q').value = S.q; S.chip = 'todos'; renderChips(); renderList(); $('#lista').scrollIntoView({ behavior:'smooth' }); return; }
  if (el.dataset.id) openDetail(el.dataset.id);
});
let qT; $('#q').addEventListener('input', e => { clearTimeout(qT); qT = setTimeout(() => { S.q = e.target.value; S.shown = CFG.pageSize; renderList(); }, 180); });
$('#fEntidad').addEventListener('change', e => { S.ent = e.target.value; S.shown = CFG.pageSize; renderAll(); });
$('#fOrden').addEventListener('change', e => { S.orden = e.target.value; renderList(); });
$('#btnMas').addEventListener('click', () => { S.shown += CFG.pageSize; renderList(); });
$('#btnRefresh').addEventListener('click', load);
$('#btnLang').addEventListener('click', () => {
  lang = lang === 'es' ? 'en' : 'es'; try { localStorage.setItem('oac-lang', lang); } catch {}
  applyI18n();
  if (S.all.length) { S.all = analyze(S.all.map(c => c)); renderFilters(); renderAll(); }
  if (S.source) $('#status').innerHTML = S.source === 'live' ? `<span class="live"></span>${esc(t('vivo',{h:fNow()}))}` : esc(t('copia',{h:S.meta ? fNow(new Date(S.meta.actualizado)) : '—'}));
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDetail(); });
document.addEventListener('visibilitychange', () => { if (!document.hidden && S.loadedAt && Date.now() - S.loadedAt > 10 * 6e4) { S.loadedAt = Date.now(); load(); } });

/* Carrusel de fotos del encabezado */
const slides = document.querySelectorAll('.slide'); let si = 0;
setInterval(() => { slides[si].classList.remove('on'); si = (si + 1) % slides.length; slides[si].classList.add('on'); }, 7000);

if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
applyI18n();
S.loadedAt = Date.now();
load();
})();
