// ============================================================
// DATOS — SABOR Y CAPRICHO
// ============================================================

const PRODUCTOS = {
  mango:   { nombre: 'Mango Coco',       tipo: 'vasito', precio: 55,  precio2x: 100, costo: 29.10 },
  limon:   { nombre: 'Lemon Fresh',      tipo: 'vasito', precio: 55,  precio2x: 100, costo: 24.73 },
  oreo:    { nombre: 'Postre Oreo',      tipo: 'vasito', precio: 55,  precio2x: 100, costo: 29.81 },
  rol_ind: { nombre: 'Rol individual',   tipo: 'rol',    precio: 22,  costo: 12.86  },
  rol_4:   { nombre: 'Charola 4 roles',  tipo: 'rol',    precio: 80,  costo: 51.46, unidades: 4  },
  rol_6:   { nombre: 'Charola 6 roles',  tipo: 'rol',    precio: 120, costo: 77.18, unidades: 6  },
};

const RECETAS = {
  roles: {
    nombre: 'Roles glaseados', rinde: '6 charolas / 24 roles',
    costo_lote: 321.62, unidades_por_lote: 24, tipo: 'rol',
    descuento_mp: { charolas:5, capacillos:22, harina:638, leche:400, levadura:10, azucar_est:107, huevos:4, azucar_masc:250, vainilla:8, miel:4, crema_batir:110, sal:5, mantequilla:235, canela:15, queso_crema:150, azucar_glass:150 },
    ingredientes: [
      {nombre:'Harina',cantidad:'638g'},{nombre:'Leche',cantidad:'400ml'},{nombre:'Levadura',cantidad:'10g'},
      {nombre:'Azúcar estándar',cantidad:'107g'},{nombre:'Huevos',cantidad:'4 pz'},{nombre:'Azúcar mascabado',cantidad:'250g'},
      {nombre:'Vainilla',cantidad:'8ml'},{nombre:'Miel',cantidad:'4g'},{nombre:'Crema para batir',cantidad:'110ml'},
      {nombre:'Sal',cantidad:'5g'},{nombre:'Mantequilla',cantidad:'235g'},{nombre:'Canela',cantidad:'15g'},
      {nombre:'Queso crema',cantidad:'150g'},{nombre:'Azúcar glass',cantidad:'150g'},{nombre:'Charolas',cantidad:'5 pz'},{nombre:'Capacillos',cantidad:'22 pz'}
    ]
  },
  mango: {
    nombre: 'Mango Coco', rinde: '5 vasitos',
    costo_lote: 145.48, unidades_por_lote: 5, tipo: 'vasito',
    descuento_mp: { vasos:5, tapas:5, servilletas:10, cucharas:5, galleta_maria:170, mantequilla:80, queso_crema:250, crema_batir:150, azucar_glass:17, leche_cond:50, vainilla:2, azucar_est:25, mango:260, coco_rallado:20, limon:8 },
    ingredientes: [
      {nombre:'Galleta María',cantidad:'170g'},{nombre:'Mantequilla',cantidad:'80g'},{nombre:'Queso crema',cantidad:'250g'},
      {nombre:'Crema para batir',cantidad:'150ml'},{nombre:'Azúcar glass',cantidad:'17g'},{nombre:'Leche condensada',cantidad:'50g'},
      {nombre:'Vainilla',cantidad:'2ml'},{nombre:'Azúcar estándar',cantidad:'25g'},{nombre:'Mango',cantidad:'260g'},
      {nombre:'Coco rallado',cantidad:'20g'},{nombre:'Limón mermelada',cantidad:'8ml'}
    ]
  },
  limon: {
    nombre: 'Lemon Fresh', rinde: '5 vasitos',
    costo_lote: 123.64, unidades_por_lote: 5, tipo: 'vasito',
    descuento_mp: { vasos:5, tapas:5, servilletas:10, cucharas:5, galleta_maria:170, mantequilla:80, queso_crema:250, crema_batir:170, azucar_glass:17, leche_cond:53, vainilla:1, azucar_est:33, limon:142 },
    ingredientes: [
      {nombre:'Galleta María',cantidad:'170g'},{nombre:'Mantequilla',cantidad:'80g'},{nombre:'Queso crema',cantidad:'250g'},
      {nombre:'Crema para batir',cantidad:'170ml'},{nombre:'Azúcar glass',cantidad:'17g'},{nombre:'Leche condensada',cantidad:'53g'},
      {nombre:'Vainilla',cantidad:'1ml'},{nombre:'Azúcar estándar',cantidad:'33g'},{nombre:'Limón relleno',cantidad:'75ml'},{nombre:'Limón mermelada',cantidad:'67ml'}
    ]
  },
  oreo: {
    nombre: 'Postre Oreo', rinde: '5 vasitos',
    costo_lote: 149.06, unidades_por_lote: 5, tipo: 'vasito',
    descuento_mp: { vasos:5, tapas:5, servilletas:10, cucharas:5, galleta_oreo:230, mantequilla:30, queso_crema:250, crema_batir:200, azucar_glass:33, cocoa:10, leche_cond:83, vainilla:4, jarabe_choc:40 },
    ingredientes: [
      {nombre:'Galleta Oreo',cantidad:'230g'},{nombre:'Mantequilla',cantidad:'30g'},{nombre:'Queso crema',cantidad:'250g'},
      {nombre:'Crema para batir',cantidad:'200ml'},{nombre:'Azúcar glass',cantidad:'33g'},{nombre:"Cocoa Hershey's",cantidad:'10g'},
      {nombre:'Leche condensada',cantidad:'83g'},{nombre:'Vainilla',cantidad:'4ml'},{nombre:'Jarabe de chocolate',cantidad:'40g'}
    ]
  }
};

const MATERIA_PRIMA = {
  vasos:        {nombre:'Vasos',            cantidad:50,   unidad:'pz',  minimo:10 },
  tapas:        {nombre:'Tapas',            cantidad:100,  unidad:'pz',  minimo:10 },
  cucharas:     {nombre:'Cucharas',         cantidad:100,  unidad:'pz',  minimo:10 },
  servilletas:  {nombre:'Servilletas',      cantidad:450,  unidad:'pz',  minimo:50 },
  galleta_maria:{nombre:'Galleta María',    cantidad:3060, unidad:'g',   minimo:170},
  galleta_oreo: {nombre:'Galleta Oreo',     cantidad:1260, unidad:'g',   minimo:230},
  mantequilla:  {nombre:'Mantequilla',      cantidad:1000, unidad:'g',   minimo:100},
  queso_crema:  {nombre:'Queso crema',      cantidad:1900, unidad:'g',   minimo:250},
  crema_batir:  {nombre:'Crema para batir', cantidad:0,    unidad:'ml',  minimo:150},
  leche_cond:   {nombre:'Leche condensada', cantidad:3000, unidad:'g',   minimo:50 },
  vainilla:     {nombre:'Vainilla',         cantidad:150,  unidad:'ml',  minimo:5  },
  azucar_glass: {nombre:'Azúcar glass',     cantidad:400,  unidad:'g',   minimo:30 },
  cocoa:        {nombre:"Cocoa Hershey's",  cantidad:200,  unidad:'g',   minimo:10 },
  jarabe_choc:  {nombre:'Jarabe chocolate', cantidad:3400, unidad:'g',   minimo:40 },
  coco_rallado: {nombre:'Coco rallado',     cantidad:100,  unidad:'g',   minimo:20 },
  azucar_est:   {nombre:'Azúcar estándar',  cantidad:4000, unidad:'g',   minimo:30 },
  mango:        {nombre:'Mango',            cantidad:2000, unidad:'g',   minimo:260},
  limon:        {nombre:'Limón',            cantidad:1000, unidad:'ml',  minimo:75 },
  harina:       {nombre:'Harina',           cantidad:2500, unidad:'g',   minimo:638},
  leche:        {nombre:'Leche',            cantidad:1000, unidad:'ml',  minimo:400},
  levadura:     {nombre:'Levadura',         cantidad:450,  unidad:'g',   minimo:10 },
  azucar_masc:  {nombre:'Azúcar mascabado', cantidad:400,  unidad:'g',   minimo:250},
  sal:          {nombre:'Sal',              cantidad:1000, unidad:'g',   minimo:5  },
  miel:         {nombre:'Miel',             cantidad:2000, unidad:'g',   minimo:5  },
  huevos:       {nombre:'Huevos',           cantidad:30,   unidad:'pz',  minimo:4  },
  canela:       {nombre:'Canela',           cantidad:203,  unidad:'g',   minimo:15 },
  charolas:     {nombre:'Charolas',         cantidad:25,   unidad:'pz',  minimo:5  },
  capacillos:   {nombre:'Capacillos',       cantidad:240,  unidad:'pz',  minimo:22 },
};

let estado = {
  inventario: { mango:0, limon:0, oreo:0, roles:12 },
  ventas: [], lotes: [], movimientos: [],
  totalVentas: 0, totalGanancia: 0
};

let carrito = {};

// ============================================================
// PERSISTENCIA — localStorage
// ============================================================

const STORAGE_KEY = 'sabor_y_capricho_estado';
const STORAGE_KEY_MP = 'sabor_y_capricho_materia_prima';

function guardarDatos() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(estado));
    localStorage.setItem(STORAGE_KEY_MP, JSON.stringify(MATERIA_PRIMA));
  } catch (e) {
    console.error('Error al guardar:', e);
  }
}

function cargarDatos() {
  try {
    const estadoGuardado = localStorage.getItem(STORAGE_KEY);
    const mpGuardada = localStorage.getItem(STORAGE_KEY_MP);

    if (estadoGuardado) {
      estado = JSON.parse(estadoGuardado);
    }
    if (mpGuardada) {
      const mpParseada = JSON.parse(mpGuardada);
      for (const key in mpParseada) {
        if (MATERIA_PRIMA[key]) MATERIA_PRIMA[key].cantidad = mpParseada[key].cantidad;
      }
    }
  } catch (e) {
    console.error('Error al cargar:', e);
  }
}

// ============================================================
// NAVEGACIÓN
// ============================================================

function iniciarNav() {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      carrito = {};
      renderizar(btn.dataset.section);
    });
  });
}

function renderizar(seccion) {
  const c = document.getElementById('contenido');
  const sticky = document.getElementById('sticky-order');
  sticky.style.display = 'none';
  switch (seccion) {
    case 'dashboard':  c.innerHTML = htmlDashboard();  actualizarSticky(); break;
    case 'recetas':    c.innerHTML = htmlRecetas();    break;
    case 'inventario': c.innerHTML = htmlInventario(); break;
    case 'lotes':      c.innerHTML = htmlLotes();      break;
    case 'ventas':     c.innerHTML = htmlVentas();     break;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  cargarDatos();
  iniciarNav();
  renderizar('dashboard');
});

// ============================================================
// STICKY ORDER
// ============================================================

function actualizarSticky() {
  const sticky = document.getElementById('sticky-order');
  const items = Object.entries(carrito).filter(([,v]) => v > 0);
  if (items.length === 0) { sticky.style.display = 'none'; return; }

  const total = calcularTotal();
  const ganancia = calcularGanancia();
  sticky.style.display = 'block';

  sticky.innerHTML = `
    <div class="sticky-inner">
      <div class="sticky-items">
        ${items.map(([key, qty]) => {
          const p = PRODUCTOS[key];
          let precio = p.precio * qty;
          let tag = '';
          if (p.tipo === 'vasito' && qty >= 2) {
            const pares = Math.floor(qty/2), sueltos = qty%2;
            precio = pares * p.precio2x + sueltos * p.precio;
            if (pares > 0) tag = `<span class="descuento-tag">2×$${p.precio2x}</span>`;
          }
          return `<div class="sticky-item">
            <div class="sticky-item-left">
              <span class="sticky-nombre">${p.nombre}${tag}</span>
            </div>
            <div class="sticky-item-right">
              <button class="sticky-ctrl" onclick="quitarDelCarrito('${key}')">−</button>
              <span class="sticky-qty">${qty}</span>
              <button class="sticky-ctrl" onclick="agregarAlCarrito('${key}')">+</button>
              <span class="sticky-precio">$${precio}</span>
            </div>
          </div>`;
        }).join('')}
      </div>
      <div class="sticky-footer">
        <div class="sticky-totales">
          <div class="sticky-total-row"><span>Total</span><span class="sticky-total-num">$${total}</span></div>
          <div class="sticky-total-row" style="font-size:11px;color:#8e8e93"><span>Ganancia</span><span>$${ganancia.toFixed(0)}</span></div>
        </div>
        <button class="btn-confirmar" onclick="confirmarVenta()">Confirmar</button>
      </div>
    </div>`;
}

function calcularTotal() {
  let t = 0;
  for (const [key, qty] of Object.entries(carrito)) {
    if (qty <= 0) continue;
    const p = PRODUCTOS[key];
    if (p.tipo === 'vasito' && qty >= 2) {
      t += Math.floor(qty/2)*p.precio2x + (qty%2)*p.precio;
    } else { t += p.precio * qty; }
  }
  return t;
}

function calcularGanancia() {
  let g = 0;
  for (const [key, qty] of Object.entries(carrito)) {
    if (qty > 0) g += (PRODUCTOS[key].precio - PRODUCTOS[key].costo) * qty;
  }
  return g;
}

function stockDe(key) {
  if (['mango','limon','oreo'].includes(key)) return estado.inventario[key] || 0;
  const r = estado.inventario.roles || 0;
  if (key === 'rol_ind') return r;
  if (key === 'rol_4') return Math.floor(r/4);
  if (key === 'rol_6') return Math.floor(r/6);
  return 0;
}

function agregarAlCarrito(key) {
  const enCarrito = carrito[key] || 0;
  if (enCarrito >= stockDe(key)) return;
  carrito[key] = enCarrito + 1;
  actualizarCardUI(key);
  actualizarSticky();
}

function quitarDelCarrito(key) {
  const enCarrito = carrito[key] || 0;
  if (enCarrito <= 0) return;
  carrito[key] = enCarrito - 1;
  actualizarCardUI(key);
  actualizarSticky();
}

function actualizarCardUI(key) {
  const stockEl  = document.getElementById(`stock-${key}`);
  const btnEl    = document.getElementById(`btn-${key}`);
  const btnMinus = document.getElementById(`btn-minus-${key}`);
  const cardEl   = document.getElementById(`card-${key}`);
  const qtyEl    = document.getElementById(`qty-${key}`);
  if (!stockEl) return;
  const enCarrito = carrito[key] || 0;
  const restante  = stockDe(key) - enCarrito;
  const sinStock  = restante <= 0;

  stockEl.textContent = sinStock ? 'Sin stock' : `${restante} disp.`;
  stockEl.style.color = sinStock ? '#ff3b30' : '#8e8e93';
  if (btnEl)    btnEl.disabled    = sinStock;
  if (btnMinus) btnMinus.disabled = enCarrito === 0;
  if (btnMinus) btnMinus.className = `btn-card-minus${enCarrito===0?' btn-card-disabled':''}`;
  if (cardEl)   cardEl.classList.toggle('prod-sin-stock', sinStock);
  if (qtyEl)    qtyEl.textContent = enCarrito > 0 ? enCarrito : '';
}

function confirmarVenta() {
  const items = Object.entries(carrito).filter(([,v]) => v > 0);
  if (!items.length) return;
  const total = calcularTotal(), ganancia = calcularGanancia();

  for (const [key, qty] of items) {
    if (key === 'mango' || key === 'limon' || key === 'oreo')
      estado.inventario[key] = Math.max(0, (estado.inventario[key]||0) - qty);
    else if (key === 'rol_ind') estado.inventario.roles = Math.max(0, estado.inventario.roles - qty);
    else if (key === 'rol_4')   estado.inventario.roles = Math.max(0, estado.inventario.roles - qty*4);
    else if (key === 'rol_6')   estado.inventario.roles = Math.max(0, estado.inventario.roles - qty*6);

    estado.ventas.unshift({
      nombre: PRODUCTOS[key].nombre, cantidad: qty,
      ingreso: PRODUCTOS[key].precio * qty,
      hora: new Date().toLocaleTimeString('es-MX',{hour:'2-digit',minute:'2-digit'})
    });

    estado.movimientos.unshift({
      tipo: 'venta', signo: '−',
      texto: `${PRODUCTOS[key].nombre} ×${qty}`,
      hora: new Date().toLocaleTimeString('es-MX',{hour:'2-digit',minute:'2-digit'})
    });
  }

  estado.totalVentas   += total;
  estado.totalGanancia += ganancia;
  carrito = {};
  guardarDatos();
  renderizar('dashboard');
}

// ============================================================
// DASHBOARD
// ============================================================

function htmlDashboard() {
  const meta = 3000;
  const pct  = Math.min(100, Math.round((estado.totalGanancia/meta)*100));
  const faltan = Math.max(0, meta - estado.totalGanancia);

  const vasitos = ['mango','limon','oreo'].map(k => cardProducto(k)).join('');
  const roles   = ['rol_ind','rol_4','rol_6'].map(k => cardProducto(k)).join('');

  const ultimas = estado.ventas.slice(0,4).map(v => `
    <div class="fila">
      <div><div class="fila-label">${v.nombre} ×${v.cantidad}</div><div class="fila-sub">${v.hora}</div></div>
      <span class="tag-verde">+$${v.ingreso}</span>
    </div>`).join('') || '<p class="texto-vacio">Sin ventas aún.</p>';

  return `
    <div class="metricas-top">
      <div class="metrica-chip">
        <span class="metrica-chip-label">Ingresos</span>
        <span class="metrica-chip-valor">$${estado.totalVentas.toFixed(0)}</span>
      </div>
      <div class="metrica-chip">
        <span class="metrica-chip-label">Ganancia neta</span>
        <span class="metrica-chip-valor verde">$${estado.totalGanancia.toFixed(0)}</span>
      </div>
    </div>

    <div class="meta-card">
      <div class="meta-header">
        <span class="meta-titulo">Meta 18 jun</span>
        <span class="meta-num ${faltan===0?'verde':''}">${faltan===0?'Alcanzada':'Faltan $'+faltan.toFixed(0)}</span>
      </div>
      <div class="barra-wrap"><div class="barra-fill" style="width:${pct}%"></div></div>
      <div class="meta-sub">$${estado.totalGanancia.toFixed(0)} de $${meta} ganancia neta</div>
    </div>

    <div class="seccion-label">Postres</div>
    <div class="grid-3">${vasitos}</div>

    <div class="seccion-label">Roles de canela</div>
    <div class="grid-3">${roles}</div>

    <div class="card">
      <div class="card-titulo">Últimas ventas</div>
      ${ultimas}
    </div>`;
}

function cardProducto(key) {
  const p = PRODUCTOS[key];
  const enCarrito = carrito[key] || 0;
  const restante  = stockDe(key) - enCarrito;
  const sinStock  = restante <= 0;
  return `
    <div class="prod-card ${sinStock?'prod-sin-stock':''}" id="card-${key}">
      <div class="prod-card-nombre">${p.nombre}</div>
      <div class="prod-card-precio">$${p.precio}</div>
      <div class="prod-card-stock" id="stock-${key}" style="color:${sinStock?'#ff3b30':'#8e8e93'}">
        ${sinStock?'Sin stock':`${restante} disp.`}
      </div>
      <div class="card-btns">
        <button class="btn-card-minus${enCarrito===0?' btn-card-disabled':''}"
          id="btn-minus-${key}" onclick="quitarDelCarrito('${key}')"
          ${enCarrito===0?'disabled':''}>−</button>
        <span class="card-qty" id="qty-${key}">${enCarrito>0?enCarrito:''}</span>
        <button class="btn-add${sinStock?' btn-add-disabled':''}"
          id="btn-${key}" onclick="agregarAlCarrito('${key}')"
          ${sinStock?'disabled':''}>+</button>
      </div>
    </div>`;
}

// ============================================================
// RECETAS
// ============================================================

function htmlRecetas() {
  const tabs = Object.entries(RECETAS).map(([k,r],i) =>
    `<button class="tab-btn ${i===0?'active':''}" onclick="verReceta('${k}')" id="tab-${k}">${r.nombre}</button>`
  ).join('');
  return `
    <h2>Recetas</h2>
    <div class="tabs">${tabs}</div>
    <div id="receta-detalle">${bloqueReceta(RECETAS[Object.keys(RECETAS)[0]])}</div>`;
}

function bloqueReceta(r) {
  return `
    <div class="card">
      <div class="card-titulo">${r.nombre}</div>
      <div class="hint" style="margin-bottom:12px">${r.rinde}</div>
      <div class="grid-2" style="margin-bottom:14px">
        <div class="costo-chip"><div class="costo-chip-label">Costo lote</div><div class="costo-chip-valor">$${r.costo_lote.toFixed(2)}</div></div>
        <div class="costo-chip"><div class="costo-chip-label">Por unidad</div><div class="costo-chip-valor">$${(r.costo_lote/r.unidades_por_lote).toFixed(2)}</div></div>
      </div>
      <div class="card-titulo" style="margin-bottom:8px">Ingredientes</div>
      ${r.ingredientes.map(i=>`<div class="fila"><span class="fila-label">${i.nombre}</span><span class="fila-valor">${i.cantidad}</span></div>`).join('')}
    </div>`;
}

function verReceta(key) {
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById('tab-'+key).classList.add('active');
  document.getElementById('receta-detalle').innerHTML = bloqueReceta(RECETAS[key]);
}

// ============================================================
// INVENTARIO
// ============================================================

// ============================================================
// INVENTARIO V2 — reemplaza htmlInventario y agregarMP
// ============================================================

function htmlInventario() {
  const ptCards = [
    {label:'Mango Coco',  key:'mango', val:estado.inventario.mango},
    {label:'Lemon Fresh', key:'limon', val:estado.inventario.limon},
    {label:'Postre Oreo', key:'oreo',  val:estado.inventario.oreo},
    {label:'Roles',       key:'roles', val:estado.inventario.roles},
  ].map(item => `
    <div class="prod-card" id="card-pt-${item.key}">
      <div class="prod-card-nombre">${item.label}</div>
      <div class="prod-card-precio ${item.val===0?'rojo':''}" id="pt-val-${item.key}">${item.val}</div>
      <div class="prod-card-stock">disponibles</div>
    </div>`).join('');

  const mpCards = Object.entries(MATERIA_PRIMA).map(([key, mp]) => {
    const s = mp.cantidad<=0?'sin':mp.cantidad<mp.minimo?'bajo':'ok';
    const l = s==='sin'?'Sin stock':s==='bajo'?'Bajo':'OK';
    return `
      <div class="mp-card">
        <div class="mp-card-top">
          <div>
            <div class="mp-card-nombre">${mp.nombre}</div>
            <div class="mp-card-cant" id="mp-cant-${key}">${mp.cantidad} ${mp.unidad}</div>
          </div>
          <span class="badge ${s}" id="mp-badge-${key}">${l}</span>
        </div>
        <div class="mp-input-row">
          <button class="btn-sm-dark btn-minus" onclick="ajustarMP('${key}',-1)">−</button>
          <input type="number" id="mp-qty-${key}" placeholder="cant" min="0" step="0.1"/>
          <button class="btn-sm-dark" onclick="ajustarMP('${key}',1)">+</button>
        </div>
      </div>`;
  }).join('');

  const movimientos = estado.movimientos.slice(0, 15).map(m => `
    <div class="fila">
      <div class="fila-label">${m.texto}</div>
      <div style="display:flex;align-items:center;gap:8px">
        <span class="fila-sub">${m.hora}</span>
        <span class="${m.signo==='+'?'tag-verde':'tag-rojo'}" style="font-size:15px">${m.signo}</span>
      </div>
    </div>`).join('') || '<p class="texto-vacio">Sin movimientos registrados.</p>';

  return `
    <h2>Inventario</h2>
    <div class="seccion-label">Producto terminado</div>
    <div class="grid-2" style="margin-bottom:16px">${ptCards}</div>
    <div class="seccion-label">Materia prima</div>
    <div class="grid-2" style="margin-bottom:16px">${mpCards}</div>
    <div class="card">
      <div class="card-titulo">Historial de movimientos</div>
      ${movimientos}
    </div>`;
}

function ajustarMP(key, direccion) {
  const input  = document.getElementById(`mp-qty-${key}`);
  const qty    = parseFloat(input.value) || 1;
  const actual = MATERIA_PRIMA[key].cantidad;
  const nuevo  = Math.max(0, actual + direccion * qty);
  MATERIA_PRIMA[key].cantidad = parseFloat(nuevo.toFixed(1));
  input.value = '';

  const cantEl  = document.getElementById(`mp-cant-${key}`);
  const badgeEl = document.getElementById(`mp-badge-${key}`);
  if (cantEl) cantEl.textContent = `${MATERIA_PRIMA[key].cantidad} ${MATERIA_PRIMA[key].unidad}`;
  if (badgeEl) {
    const s = nuevo<=0?'sin':nuevo<MATERIA_PRIMA[key].minimo?'bajo':'ok';
    const l = s==='sin'?'Sin stock':s==='bajo'?'Bajo':'OK';
    badgeEl.className = `badge ${s}`;
    badgeEl.textContent = l;
  }

  estado.movimientos.unshift({
    tipo: 'ajuste', signo: direccion > 0 ? '+' : '−',
    texto: `${MATERIA_PRIMA[key].nombre}: ${direccion>0?'+':'−'}${qty} ${MATERIA_PRIMA[key].unidad}`,
    hora: new Date().toLocaleTimeString('es-MX',{hour:'2-digit',minute:'2-digit'})
  });
  guardarDatos();
}

// ============================================================
// LOTES
// ============================================================

function htmlLotes() {
  const loteCards = Object.entries(RECETAS).map(([key, r]) => `
    <div class="prod-card lote-card-item" id="lote-card-${key}">
      <div class="prod-card-nombre">${r.nombre}</div>
      <div class="prod-card-precio">$${r.costo_lote.toFixed(0)}<span style="font-size:10px;font-weight:400;color:#8e8e93"> /lote</span></div>
      <div class="prod-card-stock">${r.rinde}</div>
      <div class="lote-input-inline">
        <input type="number" id="lote-qty-${key}" placeholder="# lotes" min="1"/>
        <button class="btn-add" onclick="registrarLote('${key}')">+</button>
      </div>
      <div id="lote-msg-${key}"></div>
    </div>`).join('');

  const historial = estado.lotes.slice(0, 10).map(l => `
    <div class="fila">
      <div>
        <div class="fila-label">${l.nombre}</div>
        <div class="fila-sub">${l.unidades} · ${l.hora}</div>
      </div>
      <span class="tag-rojo">-$${l.costo_lote.toFixed(0)}</span>
    </div>`).join('') || '<p class="texto-vacio">Sin lotes registrados.</p>';

  return `
    <h2>Lotes</h2>
    <div class="grid-2" style="margin-bottom:16px">${loteCards}</div>
    <div class="card">
      <div class="card-titulo">Historial</div>
      ${historial}
    </div>`;
}

function registrarLote(key) {
  const qty = parseInt(document.getElementById(`lote-qty-${key}`).value);
  const r   = RECETAS[key];
  if (isNaN(qty) || qty < 1) { mostrarMsg(`lote-msg-${key}`, 'Cantidad inválida.', 'aviso'); return; }

  for (const [mpk, cant] of Object.entries(r.descuento_mp)) {
    if (MATERIA_PRIMA[mpk]) MATERIA_PRIMA[mpk].cantidad = Math.max(0, MATERIA_PRIMA[mpk].cantidad - cant * qty);
  }

  const unidades = r.unidades_por_lote * qty;
  if (r.tipo === 'rol') estado.inventario.roles = (estado.inventario.roles || 0) + unidades;
  else estado.inventario[key] = (estado.inventario[key] || 0) + unidades;

  estado.lotes.unshift({
    nombre: r.nombre,
    unidades: `${unidades} ${r.tipo === 'rol' ? 'roles' : 'vasitos'}`,
    costo_lote: r.costo_lote * qty,
    hora: new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
  });

  estado.movimientos.unshift({
    tipo: 'lote', signo: '+',
    texto: `Lote: ${r.nombre} +${unidades} ${r.tipo === 'rol' ? 'roles' : 'vasitos'}`,
    hora: new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
  });

  document.getElementById(`lote-qty-${key}`).value = '';
  mostrarMsg(`lote-msg-${key}`, `+${unidades} al inventario`, 'exito');
  guardarDatos();
  setTimeout(() => renderizar('lotes'), 1600);
}

// ============================================================
// VENTAS
// ============================================================

function htmlVentas() {
  const ventaCards = estado.ventas.slice(0, 20);

  const resumen = ventaCards.length ? ventaCards.map(v => `
    <div class="fila">
      <div>
        <div class="fila-label">${v.nombre} ×${v.cantidad}</div>
        <div class="fila-sub">${v.hora}</div>
      </div>
      <span class="tag-verde">+$${v.ingreso}</span>
    </div>`).join('') : '<p class="texto-vacio">Sin ventas registradas.</p>';

  return `
    <h2>Ventas</h2>
    <div class="grid-2" style="margin-bottom:16px">
      <div class="metrica-chip">
        <span class="metrica-chip-label">Total cobrado</span>
        <span class="metrica-chip-valor">$${estado.totalVentas.toFixed(0)}</span>
      </div>
      <div class="metrica-chip">
        <span class="metrica-chip-label">Ganancia neta</span>
        <span class="metrica-chip-valor verde">$${estado.totalGanancia.toFixed(0)}</span>
      </div>
    </div>
    <div class="card">
      <div class="card-titulo">Historial del día</div>
      ${resumen}
    </div>
    <button class="btn" style="color:#ff3b30;margin-top:4px" onclick="confirmarReinicio()">Reiniciar día (borra todo)</button>`;
}

function confirmarReinicio() {
  if (confirm('¿Seguro que quieres borrar todas las ventas, lotes y movimientos? El inventario de materia prima y producto terminado se mantiene.')) {
    estado.ventas = [];
    estado.lotes = [];
    estado.movimientos = [];
    estado.totalVentas = 0;
    estado.totalGanancia = 0;
    guardarDatos();
    renderizar('ventas');
  }
}

// ============================================================
// UTILS
// ============================================================

function mostrarMsg(id, texto, tipo) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = `<div class="alerta ${tipo}">${texto}</div>`;
  setTimeout(() => { if (el) el.innerHTML = ''; }, 2000);
}