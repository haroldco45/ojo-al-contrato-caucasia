// Robot de Ojo al Contrato · Caucasia
// Corre en GitHub Actions cada 30 minutos: trae del SECOP II (datos.gov.co) los
// contratos sin terminar de Caucasia, detecta cambios y busca noticias.
import { readFile, writeFile, mkdir } from 'node:fs/promises';

const API = 'https://www.datos.gov.co/resource/jbjy-vk9h.json';
const DESDE = '2020-01-01T00:00:00';
const TOKEN = process.env.SOCRATA_APP_TOKEN || '';
const CAMPOS = ['id_contrato','referencia_del_contrato','proceso_de_compra','nombre_entidad','estado_contrato','objeto_del_contrato',
  'descripcion_del_proceso','tipo_de_contrato','modalidad_de_contratacion','fecha_de_firma','fecha_de_inicio_del_contrato',
  'fecha_de_fin_del_contrato','proveedor_adjudicado','documento_proveedor','valor_del_contrato','valor_pagado','valor_facturado',
  'valor_de_pago_adelantado','dias_adicionados','origen_de_los_recursos','urlproceso','ultima_actualizacion'];

async function getJSON(url) {
  const r = await fetch(url, { headers: TOKEN ? { 'X-App-Token': TOKEN } : {} });
  if (!r.ok) throw new Error(`HTTP ${r.status}: ${(await r.text()).slice(0, 300)}`);
  return r.json();
}
async function readJSON(path, def) { try { return JSON.parse(await readFile(path, 'utf8')); } catch { return def; } }

async function traerContratos() {
  const q = new URLSearchParams({
    '$where': `upper(ciudad)='CAUCASIA' AND fecha_de_firma >= '${DESDE}' AND upper(estado_contrato) not in('TERMINADO','CERRADO','CANCELADO','CEDIDO','BORRADOR')`,
    '$order': 'fecha_de_firma DESC', '$limit': '5000'
  });
  let rows;
  try { rows = await getJSON(`${API}?${q}`); }
  catch (e) {
    console.warn('Consulta principal falló, intento simple:', e.message);
    rows = await getJSON(`${API}?${new URLSearchParams({ '$where': "upper(ciudad)='CAUCASIA'", '$order': 'fecha_de_firma DESC', '$limit': '5000' })}`);
    rows = rows.filter(r => !/terminad|cerrad|cancelad|liquidad|cedid|borrador/i.test(r.estado_contrato || '') && (r.fecha_de_firma || '') >= DESDE);
  }
  return rows.map(r => Object.fromEntries(CAMPOS.filter(k => r[k] !== undefined).map(k => [k, r[k]])));
}

function detectarCambios(antes, ahora, t) {
  const prev = new Map(antes.map(r => [r.id_contrato, r]));
  const now = new Map(ahora.map(r => [r.id_contrato, r]));
  const out = [];
  const base = r => ({ t, id: r.id_contrato, ref: r.referencia_del_contrato || '', objeto: (r.objeto_del_contrato || '').slice(0, 160), entidad: r.nombre_entidad || '' });
  if (!antes.length) return out; // primera corrida: no hay con qué comparar
  for (const [id, r] of now) {
    const p = prev.get(id);
    if (!p) { out.push({ ...base(r), tipo: 'nuevo', despues: r.valor_del_contrato }); continue; }
    if (String(p.valor_pagado) !== String(r.valor_pagado)) out.push({ ...base(r), tipo: 'pago', antes: p.valor_pagado, despues: r.valor_pagado });
    if (String(p.dias_adicionados) !== String(r.dias_adicionados)) out.push({ ...base(r), tipo: 'prorroga', antes: p.dias_adicionados, despues: r.dias_adicionados });
    if (p.estado_contrato !== r.estado_contrato) out.push({ ...base(r), tipo: 'estado', antes: p.estado_contrato, despues: r.estado_contrato });
  }
  for (const [id, p] of prev) if (!now.has(id)) out.push({ ...base(p), tipo: 'cerrado' });
  return out;
}

async function traerNoticias() {
  const consultas = ['Caucasia Antioquia contrato', 'Caucasia alcaldía obra', 'Caucasia Contraloría OR Procuraduría'];
  const vistos = new Set(), items = [];
  for (const q of consultas) {
    try {
      const r = await fetch(`https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=es-419&gl=CO&ceid=CO:es-419`);
      const xml = await r.text();
      for (const m of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
        const g = tag => (m[1].match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`)) || [])[1] || '';
        const clean = s => s.replace(/<!\[CDATA\[|\]\]>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
        const titulo = clean(g('title')), link = clean(g('link'));
        if (!titulo || vistos.has(titulo) || !/caucasia/i.test(titulo)) continue;
        vistos.add(titulo);
        items.push({ titulo, link, fuente: clean(g('source')), fecha: new Date(clean(g('pubDate'))).toISOString() });
      }
    } catch (e) { console.warn('Noticias:', e.message); }
  }
  return items.sort((a, b) => b.fecha.localeCompare(a.fecha)).slice(0, 15);
}

const t = new Date().toISOString();
await mkdir('data', { recursive: true });
const anterior = await readJSON('data/contratos.json', { contratos: [] });
const contratos = await traerContratos();
const cambiosNuevos = detectarCambios(anterior.contratos || [], contratos, t);
const cambios = [...cambiosNuevos, ...(await readJSON('data/cambios.json', []))].slice(0, 300);
const noticias = await traerNoticias();

await writeFile('data/contratos.json', JSON.stringify({ actualizado: t, contratos }));
await writeFile('data/cambios.json', JSON.stringify(cambios, null, 1));
if (noticias.length) await writeFile('data/noticias.json', JSON.stringify(noticias, null, 1));
await writeFile('data/meta.json', JSON.stringify({ actualizado: t, total: contratos.length, cambios: cambiosNuevos.length }, null, 1));
console.log(`Listo: ${contratos.length} contratos, ${cambiosNuevos.length} cambios, ${noticias.length} noticias`);
