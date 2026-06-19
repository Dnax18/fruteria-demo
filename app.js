// ============================================================
// DATOS — FRUTERÍA DEMO
// ============================================================

const PRODUCTOS = {
  mango:     { nombre: 'Mango',     categoria: 'frutas',     precio: 25,  costo: 16  },
  sandia:    { nombre: 'Sandía',    categoria: 'frutas',     precio: 18,  costo: 11  },
  melon:     { nombre: 'Melón',     categoria: 'frutas',     precio: 22,  costo: 14  },
  papaya:    { nombre: 'Papaya',    categoria: 'frutas',     precio: 20,  costo: 13  },
  tomate:    { nombre: 'Tomate',    categoria: 'verduras',   precio: 15,  costo: 9   },
  cebolla:   { nombre: 'Cebolla',   categoria: 'verduras',   precio: 12,  costo: 7   },
  chile:     { nombre: 'Chile',     categoria: 'verduras',   precio: 10,  costo: 6   },
  papa:      { nombre: 'Papa',      categoria: 'verduras',   precio: 14,  costo: 9   },
  arrachera: { nombre: 'Arrachera', categoria: 'carniceria', precio: 180, costo: 120 },
  milanesa:  { nombre: 'Milanesa',  categoria: 'carniceria', precio: 120, costo: 80  },
  molida:    { nombre: 'Molida',    categoria: 'carniceria', precio: 95,  costo: 63  },
  costilla:  { nombre: 'Costilla',  categoria: 'carniceria', precio: 110, costo: 73  },
};

const CATEGORIAS = [
  { key: 'frutas',     nombre: 'Frutas' },
  { key: 'verduras',   nombre: 'Verduras' },
  { key: 'carniceria', nombre: 'Carnicería' },
];

const MIN_STOCK = 5; // kg

let estado = {
  inventario: {
    mango: 50, sandia: 40, melon: 35, papaya: 30,
    tomate: 60, cebolla: 50, chile: 35, papa: 55,
    arrachera: 15, milanesa: 20, molida: 25, costilla: 18
  },
  ventas: [], recepciones: [], movimientos: [],
  totalVentas: 0, totalGanancia: 0
};

let carrito = {};

// ============================================================
// PERSISTENCIA — localStorage
// ============================================================

const STORAGE_KEY = 'fruteria_demo_estado';

function guardarDatos() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(estado));
  } catch (e) {
    console.error('Error al guardar:', e);
  }
}

function cargarDatos() {
  try {
    const estadoGuardado = localStorage.getItem(STORAGE_KEY);
    if (estadoGuardado) {
      estado = JSON.parse(estadoGuardado);
    }
  } catch (e) {
    console.error('Error al cargar:', e);
  }
}

function formatKg(n) {
  return `${Number(n.toFixed(1))} kg`;
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
    case 'inventario': c.innerHTML = htmlInventario(); break;
    case 'recepcion':  c.innerHTML = htmlRecepcion();  break;
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
          const precio = p.precio * qty;
          return `<div class="sticky-item">
            <div class="sticky-item-left">
              <span class="sticky-nombre">${p.nombre}</span>
            </div>
            <div class="sticky-item-right">
              <button class="sticky-ctrl" onclick="quitarDelCarrito('${key}')">−</button>
              <span class="sticky-qty">${formatKg(qty)}</span>
              <button class="sticky-ctrl" onclick="agregarAlCarrito('${key}')">+</button>
              <span class="sticky-precio">$${precio.toFixed(2)}</span>
            </div>
          </div>`;
        }).join('')}
      </div>
      <div class="sticky-footer">
        <div class="sticky-totales">
          <div class="sticky-total-row"><span>Total</span><span class="sticky-total-num">$${total.toFixed(2)}</span></div>
          <div class="sticky-total-row" style="font-size:11px;color:#8e8e93"><span>Ganancia</span><span>$${ganancia.toFixed(2)}</span></div>
        </div>
        <button class="btn-confirmar" onclick="confirmarVenta()">Confirmar</button>
      </div>
    </div>`;
}

function calcularTotal() {
  let t = 0;
  for (const [key, qty] of Object.entries(carrito)) {
    if (qty <= 0) continue;
    t += PRODUCTOS[key].precio * qty;
  }
  return Math.round(t * 100) / 100;
}

function calcularGanancia() {
  let g = 0;
  for (const [key, qty] of Object.entries(carrito)) {
    if (qty > 0) g += (PRODUCTOS[key].precio - PRODUCTOS[key].costo) * qty;
  }
  return Math.round(g * 100) / 100;
}

function stockDe(key) {
  return estado.inventario[key] || 0;
}

function agregarAlCarrito(key) {
  const enCarrito = carrito[key] || 0;
  if (enCarrito + 0.5 > stockDe(key) + 0.0001) return;
  carrito[key] = Math.round((enCarrito + 0.5) * 10) / 10;
  actualizarCardUI(key);
  actualizarSticky();
}

function quitarDelCarrito(key) {
  const enCarrito = carrito[key] || 0;
  if (enCarrito <= 0) return;
  carrito[key] = Math.round((enCarrito - 0.5) * 10) / 10;
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
  const restante  = Math.round((stockDe(key) - enCarrito) * 10) / 10;
  const sinStock  = restante <= 0;

  stockEl.textContent = sinStock ? 'Sin stock' : `${formatKg(restante)} disp.`;
  stockEl.style.color = sinStock ? '#ff3b30' : '#8e8e93';
  if (btnEl)    btnEl.disabled    = sinStock;
  if (btnMinus) btnMinus.disabled = enCarrito === 0;
  if (btnMinus) btnMinus.className = `btn-card-minus${enCarrito===0?' btn-card-disabled':''}`;
  if (cardEl)   cardEl.classList.toggle('prod-sin-stock', sinStock);
  if (qtyEl)    qtyEl.textContent = enCarrito > 0 ? formatKg(enCarrito) : '';
}

function confirmarVenta() {
  const items = Object.entries(carrito).filter(([,v]) => v > 0);
  if (!items.length) return;
  const total = calcularTotal(), ganancia = calcularGanancia();

  for (const [key, qty] of items) {
    const p = PRODUCTOS[key];
    estado.inventario[key] = Math.round(Math.max(0, (estado.inventario[key]||0) - qty) * 10) / 10;

    estado.ventas.unshift({
      nombre: p.nombre, cantidad: qty,
      ingreso: Math.round(p.precio * qty * 100) / 100,
      hora: new Date().toLocaleTimeString('es-MX',{hour:'2-digit',minute:'2-digit'})
    });

    estado.movimientos.unshift({
      tipo: 'venta', signo: '−',
      texto: `${p.nombre} · ${formatKg(qty)}`,
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

  const secciones = CATEGORIAS.map(cat => {
    const keys = Object.entries(PRODUCTOS).filter(([,p]) => p.categoria === cat.key).map(([k]) => k);
    return `
      <div class="seccion-label">${cat.nombre}</div>
      <div class="grid-2" style="margin-bottom:16px">${keys.map(k => cardProducto(k)).join('')}</div>`;
  }).join('');

  const ultimas = estado.ventas.slice(0,4).map(v => `
    <div class="fila">
      <div><div class="fila-label">${v.nombre} · ${formatKg(v.cantidad)}</div><div class="fila-sub">${v.hora}</div></div>
      <span class="tag-verde">+$${v.ingreso.toFixed(0)}</span>
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
        <span class="meta-titulo">Meta del día</span>
        <span class="meta-num ${faltan===0?'verde':''}">${faltan===0?'Alcanzada':'Faltan $'+faltan.toFixed(0)}</span>
      </div>
      <div class="barra-wrap"><div class="barra-fill" style="width:${pct}%"></div></div>
      <div class="meta-sub">$${estado.totalGanancia.toFixed(0)} de $${meta} ganancia neta</div>
    </div>

    ${secciones}

    <div class="card">
      <div class="card-titulo">Últimas ventas</div>
      ${ultimas}
    </div>`;
}

function cardProducto(key) {
  const p = PRODUCTOS[key];
  const enCarrito = carrito[key] || 0;
  const restante  = Math.round((stockDe(key) - enCarrito) * 10) / 10;
  const sinStock  = restante <= 0;
  return `
    <div class="prod-card ${sinStock?'prod-sin-stock':''}" id="card-${key}">
      <div class="prod-card-nombre">${p.nombre}</div>
      <div class="prod-card-precio">$${p.precio}<span style="font-size:9px;font-weight:400;color:#8e8e93">/kg</span></div>
      <div class="prod-card-stock" id="stock-${key}" style="color:${sinStock?'#ff3b30':'#8e8e93'}">
        ${sinStock?'Sin stock':`${formatKg(restante)} disp.`}
      </div>
      <div class="card-btns">
        <button class="btn-card-minus${enCarrito===0?' btn-card-disabled':''}"
          id="btn-minus-${key}" onclick="quitarDelCarrito('${key}')"
          ${enCarrito===0?'disabled':''}>−</button>
        <span class="card-qty" id="qty-${key}">${enCarrito>0?formatKg(enCarrito):''}</span>
        <button class="btn-add${sinStock?' btn-add-disabled':''}"
          id="btn-${key}" onclick="agregarAlCarrito('${key}')"
          ${sinStock?'disabled':''}>+</button>
      </div>
    </div>`;
}

// ============================================================
// INVENTARIO
// ============================================================

function htmlInventario() {
  const secciones = CATEGORIAS.map(cat => {
    const productos = Object.entries(PRODUCTOS).filter(([,p]) => p.categoria === cat.key);
    const cards = productos.map(([key, p]) => {
      const stock = estado.inventario[key] || 0;
      const s = stock<=0?'sin':stock<MIN_STOCK?'bajo':'ok';
      const l = s==='sin'?'Sin stock':s==='bajo'?'Bajo':'OK';
      return `
        <div class="mp-card">
          <div class="mp-card-top">
            <div>
              <div class="mp-card-nombre">${p.nombre}</div>
              <div class="mp-card-cant" id="stock-cant-${key}">${formatKg(stock)}</div>
            </div>
            <span class="badge ${s}" id="stock-badge-${key}">${l}</span>
          </div>
          <div class="mp-input-row">
            <button class="btn-sm-dark btn-minus" onclick="ajustarStock('${key}',-1)">−</button>
            <input type="number" id="stock-qty-${key}" placeholder="kg" min="0" step="0.5"/>
            <button class="btn-sm-dark" onclick="ajustarStock('${key}',1)">+</button>
          </div>
        </div>`;
    }).join('');
    return `<div class="seccion-label">${cat.nombre}</div><div class="grid-2" style="margin-bottom:16px">${cards}</div>`;
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
    <h2>Stock</h2>
    ${secciones}
    <div class="card">
      <div class="card-titulo">Historial de movimientos</div>
      ${movimientos}
    </div>`;
}

function ajustarStock(key, direccion) {
  const input  = document.getElementById(`stock-qty-${key}`);
  const qty    = parseFloat(input.value) || 0.5;
  const actual = estado.inventario[key] || 0;
  const nuevo  = Math.max(0, actual + direccion * qty);
  estado.inventario[key] = Math.round(nuevo * 10) / 10;
  input.value = '';

  const cantEl  = document.getElementById(`stock-cant-${key}`);
  const badgeEl = document.getElementById(`stock-badge-${key}`);
  if (cantEl) cantEl.textContent = formatKg(estado.inventario[key]);
  if (badgeEl) {
    const s = estado.inventario[key]<=0?'sin':estado.inventario[key]<MIN_STOCK?'bajo':'ok';
    const l = s==='sin'?'Sin stock':s==='bajo'?'Bajo':'OK';
    badgeEl.className = `badge ${s}`;
    badgeEl.textContent = l;
  }

  estado.movimientos.unshift({
    tipo: 'ajuste', signo: direccion > 0 ? '+' : '−',
    texto: `${PRODUCTOS[key].nombre}: ${direccion>0?'+':'−'}${qty} kg`,
    hora: new Date().toLocaleTimeString('es-MX',{hour:'2-digit',minute:'2-digit'})
  });
  guardarDatos();
}

// ============================================================
// RECEPCIÓN DE MERCANCÍA
// ============================================================

function htmlRecepcion() {
  const cards = CATEGORIAS.map(cat => {
    const productos = Object.entries(PRODUCTOS).filter(([,p]) => p.categoria === cat.key);
    const itemCards = productos.map(([key, p]) => `
      <div class="prod-card lote-card-item" id="recepcion-card-${key}">
        <div class="prod-card-nombre">${p.nombre}</div>
        <div class="prod-card-stock">${formatKg(estado.inventario[key]||0)} en stock</div>
        <div class="lote-input-inline">
          <input type="number" id="recepcion-qty-${key}" placeholder="kg recibidos" min="0.5" step="0.5"/>
          <button class="btn-add" onclick="registrarRecepcion('${key}')">+</button>
        </div>
        <div id="recepcion-msg-${key}"></div>
      </div>`).join('');
    return `<div class="seccion-label">${cat.nombre}</div><div class="grid-2" style="margin-bottom:16px">${itemCards}</div>`;
  }).join('');

  const historial = estado.recepciones.slice(0, 10).map(r => `
    <div class="fila">
      <div>
        <div class="fila-label">${r.nombre}</div>
        <div class="fila-sub">${r.hora}</div>
      </div>
      <span class="tag-verde">+${formatKg(r.cantidad)}</span>
    </div>`).join('') || '<p class="texto-vacio">Sin recepciones registradas.</p>';

  return `
    <h2>Recepción de mercancía</h2>
    ${cards}
    <div class="card">
      <div class="card-titulo">Historial</div>
      ${historial}
    </div>`;
}

function registrarRecepcion(key) {
  const input = document.getElementById(`recepcion-qty-${key}`);
  const qty = parseFloat(input.value);
  const p = PRODUCTOS[key];
  if (!qty || qty <= 0) { mostrarMsg(`recepcion-msg-${key}`, 'Cantidad inválida.', 'aviso'); return; }

  estado.inventario[key] = Math.round(((estado.inventario[key] || 0) + qty) * 10) / 10;

  estado.recepciones.unshift({
    nombre: p.nombre,
    cantidad: qty,
    hora: new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
  });

  estado.movimientos.unshift({
    tipo: 'recepcion', signo: '+',
    texto: `Recepción: ${p.nombre} +${formatKg(qty)}`,
    hora: new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
  });

  input.value = '';
  mostrarMsg(`recepcion-msg-${key}`, `+${formatKg(qty)} al inventario`, 'exito');
  guardarDatos();
  setTimeout(() => renderizar('recepcion'), 1600);
}

// ============================================================
// VENTAS
// ============================================================

function htmlVentas() {
  const ventaCards = estado.ventas.slice(0, 20);

  const resumen = ventaCards.length ? ventaCards.map(v => `
    <div class="fila">
      <div>
        <div class="fila-label">${v.nombre} · ${formatKg(v.cantidad)}</div>
        <div class="fila-sub">${v.hora}</div>
      </div>
      <span class="tag-verde">+$${v.ingreso.toFixed(0)}</span>
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
  if (confirm('¿Seguro que quieres borrar todas las ventas, recepciones y movimientos? El inventario actual se mantiene.')) {
    estado.ventas = [];
    estado.recepciones = [];
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
