/* Protótipo local. Sem integrações externas ou servidor. */
(function () {
  'use strict';
  const stages = ['Novo', 'Em preparo', 'Pronto', 'Expedido'];
  const limits = [120000, 900000, 300000];
  const recipe = { pao: 1, carne: 1, bacon: 2, queijo: 1 };
  function createState(now = Date.now()) {
    const state = { sequence: 1048, orders: [], stock: {
      pao: { name: 'Pão de hambúrguer', unit: 'un.', qty: 30, min: 10 },
      carne: { name: 'Hambúrguer', unit: 'un.', qty: 28, min: 10 },
      bacon: { name: 'Bacon', unit: 'fatias', qty: 26, min: 20 },
      queijo: { name: 'Queijo', unit: 'fatias', qty: 40, min: 15 }
    } };
    const seeds = [
      ['1042', 'iFood', 0, 105000, 105000, 2, 'Sem cebola'],
      ['1043', 'Rappi', 0, 45000, 45000, 1, 'Enviar guardanapos'],
      ['1044', '99Food', 1, 790000, 850000, 1, 'Sem observações'],
      ['1045', 'iFood', 1, 950000, 1020000, 2, 'Molho à parte'],
      ['1046', 'Rappi', 2, 320000, 1340000, 1, 'Conferir itens antes de despachar'],
      ['1047', '99Food', 3, 180000, 900000, 1, 'Pedido concluído']
    ];
    for (const [id, platform, stage, elapsed, total, quantity, note] of seeds) {
      const order = { id, platform, stage, enteredAt: now - elapsed, receivedAt: now - total, quantity, note, stockDeducted: stage > 0 };
      if (stage > 0) for (const key of Object.keys(recipe)) state.stock[key].qty -= recipe[key] * quantity;
      if (stage === 3) order.dispatchedAt = order.enteredAt;
      state.orders.push(order);
    }
    return state;
  }
  function receive(state, input, now = Date.now()) {
    if (!['iFood', 'Rappi', '99Food'].includes(input.platform) || !String(input.id || '').trim() || !Number.isInteger(input.quantity) || input.quantity < 1) throw Error('Pedido inválido.');
    if (state.orders.some(o => o.platform === input.platform && o.id === String(input.id))) return false;
    state.orders.push({ id: String(input.id), platform: input.platform, quantity: input.quantity, note: input.note || 'Sem observações', stage: 0, enteredAt: now, receivedAt: now, stockDeducted: false });
    return true;
  }
  function advance(state, platform, id, now = Date.now()) {
    const order = state.orders.find(o => o.platform === platform && o.id === id);
    if (!order || order.stage === 3) return false;
    if (order.stage === 0 && !order.stockDeducted) {
      for (const key of Object.keys(recipe)) if (state.stock[key].qty < recipe[key] * order.quantity) throw Error('Estoque insuficiente. Confira os ingredientes antes de iniciar o preparo.');
      for (const key of Object.keys(recipe)) state.stock[key].qty -= recipe[key] * order.quantity;
      order.stockDeducted = true;
    }
    order.stage += 1;
    order.enteredAt = now;
    if (order.stage === 3) order.dispatchedAt = now;
    return true;
  }
  function status(order, now = Date.now()) {
    if (order.stage === 3) return 'normal';
    const ratio = Math.max(0, now - order.enteredAt) / limits[order.stage];
    return ratio > 1 ? 'late' : ratio >= .8 ? 'attention' : 'normal';
  }
  function sameDay(time, now) { return new Date(time).toDateString() === new Date(now).toDateString(); }
  function metrics(state, now = Date.now()) {
    const today = state.orders.filter(o => sameDay(o.receivedAt, now));
    const dispatched = state.orders.filter(o => o.stage === 3 && sameDay(o.dispatchedAt, now));
    return { total: today.length, late: today.filter(o => status(o, now) === 'late').length,
      average: dispatched.length ? dispatched.reduce((sum, o) => sum + o.dispatchedAt - o.receivedAt, 0) / dispatched.length : null,
      channels: Object.fromEntries(['iFood', 'Rappi', '99Food'].map(p => [p, today.filter(o => o.platform === p).length])) };
  }
  const api = { createState, receive, advance, status, metrics, stages, limits };
  if (typeof module !== 'undefined') module.exports = api;
  if (typeof document === 'undefined') return;
  const key = 'tapronto-prototype-v1';
  let state, filter = 'Todos', currentView = 'pedidos', toastTimeout;
  try { state = JSON.parse(localStorage.getItem(key)); } catch (_) { /* Armazenamento indisponível. */ }
  if (!state || !Array.isArray(state.orders) || !state.stock) state = createState();
  function persist() { try { localStorage.setItem(key, JSON.stringify(state)); } catch (_) { toast('Os dados serão mantidos apenas nesta sessão.'); } }
  const el = id => document.getElementById(id);
  const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const channelClass = p => p === 'iFood' ? 'ifood' : p === '99Food' ? 'food99' : 'rappi';
  const duration = ms => { const seconds = Math.floor(Math.max(0, ms) / 1000); return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`; };
  function toast(message) { el('toast').textContent = message; el('toast').style.display = 'block'; clearTimeout(toastTimeout); toastTimeout = setTimeout(() => el('toast').style.display = 'none', 4500); }
  function render() {
    const now = Date.now();
    el('clock').textContent = new Date(now).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    el('today').textContent = new Date(now).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
    const focus = document.activeElement;
    const focusOrder = focus?.dataset?.index;
    el('board').innerHTML = stages.map((stage, index) => {
      const orders = state.orders.filter(o => o.stage === index && (filter === 'Todos' || o.platform === filter));
      return `<section class="column" aria-label="${stage}"><div class="col-head"><i class="stage-dot stage-${index}"></i><div>${stage}<small>${index < 3 ? 'Limite de ' + limits[index] / 60000 + ' minutos' : 'Fluxo concluído'}</small></div><b>${orders.length}</b></div>${orders.map(o => {
        const s = status(o, now);
        return `<article class="card ${s}"><div class="card-top"><strong>#${escape(o.id)}</strong><span class="channel ${channelClass(o.platform)}">${escape(o.platform)}</span></div><p class="items">${o.quantity} × X-Bacon</p><div class="note">${escape(o.note)}</div><div class="timer"><span>${index === 3 ? 'Tempo total' : s === 'late' ? 'Atrasado' : s === 'attention' ? 'Atenção' : 'Tempo na etapa'}</span><strong>${duration(index === 3 ? o.dispatchedAt - o.receivedAt : now - o.enteredAt)}</strong></div>${index < 3 ? `<button class="advance" data-index="${state.orders.indexOf(o)}">${['Iniciar preparo', 'Marcar como pronto', 'Confirmar expedição'][index]} →</button>` : '<p class="done">✓ Pedido expedido</p>'}</article>`;
      }).join('') || '<p class="empty">Tudo em dia por aqui.<br>Nenhum pedido nesta etapa.</p>'}</section>`;
    }).join('');
    if (focusOrder !== undefined && currentView === 'pedidos') document.querySelector(`[data-index="${focusOrder}"]`)?.focus({ preventScroll: true });
    const low = Object.values(state.stock).filter(s => s.qty <= s.min);
    el('stock-alert').innerHTML = low.length ? `<p class="alert" role="status">Estoque mínimo atingido: ${low.map(s => escape(s.name)).join(', ')}.</p>` : '';
    el('stock').innerHTML = Object.values(state.stock).map(s => `<tr><td>${escape(s.name)}</td><td>${s.qty} ${s.unit}</td><td>${s.min} ${s.unit}</td><td><span class="badge ${s.qty <= s.min ? 'low' : ''}">${s.qty <= s.min ? 'Repor ingrediente' : 'Disponível'}</span></td></tr>`).join('');
    const m = metrics(state, now);
    el('metrics').innerHTML = [[m.total, 'Pedidos recebidos', 'Todos os canais de demonstração'], [m.average === null ? '—' : duration(m.average), 'Tempo médio até a expedição', 'Recebimento → expedição'], [m.late, 'Pedidos atrasados', 'Fora do limite da etapa atual']].map(([value, label, detail]) => `<article class="metric"><span>${label}</span><strong>${value}</strong><small>${detail}</small></article>`).join('');
    el('channels').innerHTML = Object.entries(m.channels).map(([platform, count]) => `<div class="bar-row"><span>${platform}</span><div class="track"><div class="bar ${channelClass(platform)}" style="width:${count / Math.max(1, m.total) * 100}%"></div></div><strong>${count}</strong></div>`).join('');
  }
  document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => {
    currentView = button.dataset.view;
    document.querySelectorAll('.view').forEach(section => section.hidden = section.id !== currentView);
    document.querySelectorAll('[data-view]').forEach(b => b.classList.toggle('active', b === button));
    el('title').textContent = { pedidos: 'Painel de pedidos', estoque: 'Controle de estoque', dashboard: 'Dashboard da operação' }[currentView];
    el('subtitle').textContent = { pedidos: 'Cada pedido no seu tempo. Sua cozinha no controle.', estoque: 'Os ingredientes certos, na quantidade certa.', dashboard: 'Uma visão clara do movimento de hoje.' }[currentView];
    location.hash = currentView;
    render();
  }));
  document.querySelector('.brand').addEventListener('click', event => {
    event.preventDefault();
    document.querySelector('[data-view="pedidos"]').click();
  });
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    filter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(b => b.classList.toggle('selected', b === button)); render();
  }));
  el('board').addEventListener('click', event => {
    const button = event.target.closest('[data-index]'); if (!button) return;
    const order = state.orders[Number(button.dataset.index)];
    try { advance(state, order.platform, order.id); persist(); render(); toast(`Pedido #${order.id}: ${stages[order.stage]}.${order.stage === 1 ? ' Ingredientes descontados.' : ''}`); }
    catch (error) { toast(error.message); }
  });
  el('new').addEventListener('click', () => {
    const platform = ['iFood', 'Rappi', '99Food'][state.sequence % 3];
    const id = String(state.sequence++);
    receive(state, { id, platform, quantity: 1, note: 'Pedido de teste · sem cebola' }); persist(); render();
    toast(`Pedido #${id} recebido pelo canal ${platform}.${filter !== 'Todos' && filter !== platform ? ' Selecione Todos os canais para vê-lo.' : ''}`);
  });
  el('reset').addEventListener('click', () => { if (!confirm('Restaurar os pedidos e saldos de exemplo? As alterações da demonstração serão substituídas.')) return; state = createState(); persist(); render(); toast('Demonstração restaurada.'); });
  const initialView = location.hash.slice(1);
  if (['pedidos', 'estoque', 'dashboard'].includes(initialView)) document.querySelector(`[data-view="${initialView}"]`).click();
  persist(); render(); setInterval(render, 3000);
})();
