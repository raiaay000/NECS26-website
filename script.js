/*
  NECS 2026 Main JavaScript
  honestly this took way longer than it should have
  todo: clean up the cart code later
  update: added music tabs functionality
  update 2: cart now persists (so checkout total doesn’t reset)
*/

// ==============================
// Small helpers
// ==============================
const CART_KEY = 'necs_cart'; // keep your original key so nothing breaks
let cartReady = false;
let pendingCartHydrate = null;
let pendingBackendPull = false;
let pendingBackendPush = false;

const BACKEND_BASE_URL = 'http://localhost:8787';

function requestCartHydration(options = {}) {
  pendingCartHydrate = options;
  if (cartReady) hydrateCartForUser(pendingCartHydrate);
}

function requestBackendPull() {
  pendingBackendPull = true;
  if (cartReady) void pullBackendState();
}

function requestBackendPush() {
  pendingBackendPush = true;
  if (cartReady) void pushBackendState();
}

function safeParse(json, fallback) {
  try { return JSON.parse(json); } catch { return fallback; }
}

const byId = (id) => document.getElementById(id);
const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function formatMoney(n) {
  const num = Number(n || 0);
  return '$' + num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// toast helper (KEEP yours)
const toast = byId('toast');
function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ==============================
// auth helpers (Google via Firebase)
// ==============================
const AUTH_USER_KEY = 'necs_auth_user';
let authUser = safeParse(localStorage.getItem(AUTH_USER_KEY) || 'null', null);

const authLoginBtn = byId('authLoginBtn');
const authLoginLabel = byId('authLoginLabel');
const authMenu = byId('authMenu');
const authMenuRemindersBtn = byId('authMenuRemindersBtn');
const authMenuFavoritesBtn = byId('authMenuFavoritesBtn');
const authMenuFollowedTeamsBtn = byId('authMenuFollowedTeamsBtn');
const authMenuFollowedPlayersBtn = byId('authMenuFollowedPlayersBtn');
const authMenuLogoutBtn = byId('authMenuLogoutBtn');

function cacheAuthUser(user) {
  authUser = user
    ? {
        uid: user.uid,
        displayName: user.displayName || '',
        email: user.email || ''
      }
    : null;
  if (authUser) localStorage.setItem(AUTH_USER_KEY, JSON.stringify(authUser));
  else localStorage.removeItem(AUTH_USER_KEY);
}

function currentUserId() {
  return authUser?.uid || 'guest';
}

function userScopedKey(base) {
  return `${base}:${currentUserId()}`;
}

function currentUserLabel() {
  return authUser?.displayName || authUser?.email || '';
}

function canSyncBackend() {
  return currentUserId() !== 'guest';
}

async function backendFetch(path, options) {
  try {
    const res = await fetch(`${BACKEND_BASE_URL}${path}`, options);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

function mergeRemindersByKey(baseList = [], extraList = []) {
  const map = new Map();
  [...baseList, ...extraList].forEach((r) => {
    if (!r || typeof r.key !== 'string') return;
    map.set(r.key, r);
  });
  return Array.from(map.values()).sort((a, b) => Number(a.startsAt || 0) - Number(b.startsAt || 0));
}

function mergeStringSets(baseList = [], extraList = []) {
  return Array.from(new Set([...(baseList || []), ...(extraList || [])]));
}

async function pullBackendState() {
  pendingBackendPull = false;
  if (!cartReady || !canSyncBackend()) return;
  const uid = currentUserId();
  const data = await backendFetch(`/api/state?uid=${encodeURIComponent(uid)}`);
  if (!data) return;

  // Merge backend state with local state, preferring "union" behavior.
  const mergedCart = mergeCartInto(data.cart || {}, cart || {});
  const mergedReminders = mergeRemindersByKey(data.reminders || [], getReminders());
  const mergedMusicLikes = mergeStringSets(data.musicLikes || [], getMusicLikes());

  cart = mergedCart;
  saveCart();
  saveReminders(mergedReminders);
  saveMusicLikes(mergedMusicLikes);
  renderCart();
  renderReminderBadges(mergedReminders);
  renderSongLikes(mergedMusicLikes);

  // Push merged state back so backend matches the latest union.
  requestBackendPush();
}

async function pushBackendState() {
  pendingBackendPush = false;
  if (!cartReady || !canSyncBackend()) return;
  const uid = currentUserId();
  await backendFetch(`/api/state?uid=${encodeURIComponent(uid)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      cart,
      reminders: getReminders(),
      musicLikes: getMusicLikes()
    })
  });
}

function updateAuthUI() {
  if (!authLoginBtn || !authLoginLabel) return;
  const label = currentUserLabel();
  if (label) {
    authLoginBtn.classList.add('is-authenticated');
    authLoginLabel.textContent = label;
  } else {
    authLoginBtn.classList.remove('is-authenticated');
    authLoginLabel.textContent = 'Log In';
    closeAuthMenu();
  }
  authLoginBtn.setAttribute('aria-expanded', 'false');
}

function openAuthMenu() {
  if (!authLoginBtn || !authMenu || !currentUserLabel()) return;
  authLoginBtn.classList.add('open');
  authMenu.hidden = false;
  authLoginBtn.setAttribute('aria-expanded', 'true');
}

function closeAuthMenu() {
  if (!authLoginBtn || !authMenu) return;
  authLoginBtn.classList.remove('open');
  authMenu.hidden = true;
  authLoginBtn.setAttribute('aria-expanded', 'false');
}

function toggleAuthMenu() {
  if (!authMenu || !currentUserLabel()) return;
  if (authMenu.hidden) openAuthMenu();
  else closeAuthMenu();
}

function initAuthMenu() {
  authMenu?.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  authMenuRemindersBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    closeAuthMenu();
  });

  authMenuFavoritesBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    closeAuthMenu();
  });

  authMenuFollowedTeamsBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    closeAuthMenu();
    showToast('Showing followed teams');
  });

  authMenuFollowedPlayersBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    closeAuthMenu();
    showToast('Showing followed players');
  });

  document.addEventListener('click', () => {
    closeAuthMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAuthMenu();
  });
}

function initFirebaseAuth() {
  updateAuthUI();
  initAuthMenu();

  const hasFirebase = Boolean(window.firebase && window.firebase.auth);
  const hasConfig = Boolean(window.NECS_FIREBASE_CONFIG);

  if (!hasFirebase || !hasConfig) {
    authLoginBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (currentUserLabel()) toggleAuthMenu();
      else showToast('Google login requires Firebase config');
    });
    authMenuLogoutBtn?.addEventListener('click', () => {
      cacheAuthUser(null);
      closeAuthMenu();
      requestCartHydration({ mergeGuest: false });
      hydrateMusicLikesForUser({ mergeGuest: false });
      hydrateFollowStateForUser({ mergeGuest: false });
      updateAuthUI();
      renderReminderBadges();
    });
    return;
  }

  try {
    if (!firebase.apps.length) firebase.initializeApp(window.NECS_FIREBASE_CONFIG);
    const auth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();

    async function signInWithGoogle() {
      try {
        await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        await auth.signInWithPopup(provider);
      } catch (err) {
        console.error(err);
        const code = err?.code || '';
        if (code.includes('popup') || code.includes('cancelled')) {
          try {
            await auth.signInWithRedirect(provider);
            return;
          } catch (redirectErr) {
            console.error(redirectErr);
          }
        }
        showToast('Google sign-in failed — check Firebase config/domain');
      }
    }

    auth.onAuthStateChanged((user) => {
      cacheAuthUser(user);
      requestCartHydration({ mergeGuest: true });
      hydrateMusicLikesForUser({ mergeGuest: true });
      hydrateFollowStateForUser({ mergeGuest: true });
      requestBackendPull();
      updateAuthUI();
      renderReminderBadges();
    });

    authLoginBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (currentUserLabel()) {
        toggleAuthMenu();
        return;
      }
      signInWithGoogle();
    });

    authMenuLogoutBtn?.addEventListener('click', async () => {
      try {
        await auth.signOut();
        closeAuthMenu();
      } catch (err) {
        console.error(err);
        showToast('Logout failed');
      }
    });
  } catch (err) {
    console.error(err);
    authLoginBtn?.addEventListener('click', () => {
      showToast('Firebase init failed');
    });
  }
}

initFirebaseAuth();

// ==============================
// nav scroll (KEEP)
// ==============================
const nav = byId('nav');
window.addEventListener('scroll', () => {
  if (!nav) return;
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ==============================
// countdown timer (KEEP)
// ==============================
const eventDate = new Date('May 6, 2026 10:00:00 CDT').getTime();

function updateCountdown() {
  const daysEl = byId('days');
  const hoursEl = byId('hours');
  const minutesEl = byId('minutes');
  const secondsEl = byId('seconds');
  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  const now = Date.now();
  const diff = Math.max(0, eventDate - now);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  daysEl.textContent = String(days).padStart(2, '0');
  hoursEl.textContent = String(hours).padStart(2, '0');
  minutesEl.textContent = String(minutes).padStart(2, '0');
  secondsEl.textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ==============================
// cart system (UPGRADED, but same UI behavior)
// ==============================
const tickets = {
  day:  { name: 'Day Pass',        price: 45,  desc: 'Single day general admission' },
  full: { name: 'Full Event Pass', price: 149, desc: 'All 5 days with priority seating' },
  vip:  { name: 'VIP Experience',  price: 399, desc: 'Premium access with exclusive perks' },
  'merch-smash-tee': { name: 'Smash Collage Tee', price: 45, desc: 'Full-print character collage tee' },
  'merch-rocket-hoodie': { name: 'Rocket League Glow Hoodie', price: 79, desc: 'Neon crest hoodie with fleece lining' },
  'merch-valorant-jersey': { name: 'Valorant Champions Jersey', price: 89, desc: 'Gradient 2024 jersey with crest patch' },
  'merch-bundle': { name: 'Merch Bundle', price: 199, desc: 'All three merch items in one bundle' }
};

const CART_BASE_KEY = CART_KEY;

function cartKeyFor(userId = currentUserId()) {
  return `${CART_BASE_KEY}:${userId}`;
}

function readCart(userId = currentUserId()) {
  const key = cartKeyFor(userId);
  const raw = localStorage.getItem(key);
  if (raw) return safeParse(raw, {}) || {};

  // one-time migration for existing carts saved under the legacy key
  if (userId === 'guest') {
    const legacyRaw = localStorage.getItem(CART_BASE_KEY);
    if (legacyRaw) {
      const legacyCart = safeParse(legacyRaw, {}) || {};
      localStorage.setItem(key, JSON.stringify(legacyCart));
      localStorage.removeItem(CART_BASE_KEY);
      return legacyCart;
    }
  }

  return {};
}

function writeCart(cartObj, userId = currentUserId()) {
  localStorage.setItem(cartKeyFor(userId), JSON.stringify(cartObj || {}));
}

// cart is still an object like before: { day: 2, vip: 1 }
let cart = readCart();

// elements (home page)
const cartBtn = byId('cartBtn');
const cartOverlay = byId('cartOverlay');
const cartDrawer = byId('cartDrawer');
const cartClose = byId('cartClose');
const cartBody = byId('cartBody');
const cartCount = byId('cartCount');
const cartTotal = byId('cartTotal');
const checkoutBtn = byId('checkoutBtn');

function saveCart() {
  writeCart(cart);
  if (canSyncBackend()) requestBackendPush();
}

function mergeCartInto(baseCart, extraCart) {
  const merged = { ...(baseCart || {}) };
  Object.entries(extraCart || {}).forEach(([id, qty]) => {
    const nQty = Number(qty || 0);
    if (!nQty || !tickets[id]) return;
    merged[id] = (Number(merged[id]) || 0) + nQty;
  });
  return merged;
}

function hydrateCartForUser({ mergeGuest = true } = {}) {
  const userId = currentUserId();
  let nextCart = readCart(userId);

  if (userId !== 'guest' && mergeGuest) {
    const guestCart = readCart('guest');
    const hasGuestItems = cartEntries(guestCart).length > 0;
    if (hasGuestItems) {
      nextCart = mergeCartInto(nextCart, guestCart);
      localStorage.removeItem(cartKeyFor('guest'));
    }
  }

  cart = nextCart;
  saveCart();
  renderCart();
}

function cartEntries(cartObj = cart) {
  return Object.entries(cartObj).filter(([id, qty]) => Number(qty) > 0 && tickets[id]);
}

function summarizeCart(cartObj = cart) {
  let count = 0;
  let total = 0;
  const items = cartEntries(cartObj);

  items.forEach(([id, qty]) => {
    const nQty = Number(qty);
    count += nQty;
    total += tickets[id].price * nQty;
  });

  const rowsHtml = items.map(([id, qty]) => {
    const line = tickets[id].price * Number(qty);
    return `<div class="summary-row"><span>${tickets[id].name} × ${qty}</span><strong>${formatMoney(line)}</strong></div>`;
  }).join('');

  return { items, count, total, rowsHtml };
}

function openCart() {
  if (!cartOverlay || !cartDrawer) return;
  cartOverlay.classList.add('open');
  cartDrawer.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  if (!cartOverlay || !cartDrawer) return;
  cartOverlay.classList.remove('open');
  cartDrawer.classList.remove('open');
  document.body.style.overflow = '';
}

function renderCart() {
  // If you’re not on index page, just stop (prevents errors on checkout/game pages)
  if (!cartBody || !cartCount || !cartTotal) return;

  const { items, count, total } = summarizeCart();
  cartCount.textContent = count;
  cartTotal.textContent = formatMoney(total);

  if (items.length === 0) {
    cartBody.innerHTML =
      '<div class="cart-empty"><p><strong>Your cart is empty</strong></p><p style="font-size:13px;margin-top:8px">Add tickets or merch to get started</p></div>';
    return;
  }

  cartBody.innerHTML = items.map(([id, qty]) => {
    const ticket = tickets[id];
    const line = ticket.price * qty;

    return (
      '<div class="cart-item">' +
        '<div class="cart-item-header">' +
          '<span class="cart-item-name">' + ticket.name + '</span>' +
          '<span class="cart-item-price">' + formatMoney(line) + '</span>' +
        '</div>' +
        '<div class="cart-item-desc">' + ticket.desc + '</div>' +
        '<div class="cart-item-controls">' +
          '<div class="qty-controls">' +
            '<button class="qty-btn" data-action="dec" data-id="' + id + '">-</button>' +
            '<span class="qty-value">' + qty + '</span>' +
            '<button class="qty-btn" data-action="inc" data-id="' + id + '">+</button>' +
          '</div>' +
          '<button class="remove-btn" data-action="remove" data-id="' + id + '">Remove</button>' +
        '</div>' +
      '</div>'
    );
  }).join('');
}

// open/close listeners (only if elements exist)
cartBtn?.addEventListener('click', openCart);
cartOverlay?.addEventListener('click', closeCart);
cartClose?.addEventListener('click', closeCart);

cartBody?.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;

  const id = btn.dataset.id;
  const action = btn.dataset.action;
  if (!tickets[id]) return;

  if (action === 'inc') cart[id] = (cart[id] || 0) + 1;
  else if (action === 'dec' && cart[id] > 1) cart[id] -= 1;
  else if (action === 'remove') delete cart[id];

  saveCart();
  renderCart();
});

qsa('[data-ticket]').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.ticket;
    if (!tickets[id]) return;

    cart[id] = (cart[id] || 0) + 1;
    saveCart();
    renderCart();
    showToast(tickets[id].name + ' added to cart');
    openCart();
  });
});

checkoutBtn?.addEventListener('click', () => {
  const { items } = summarizeCart();

  if (!items.length) {
    showToast('Your cart is empty');
    return;
  }

  // Save cart data for checkout page (already in localStorage, but keep this for safety)
  saveCart();

  window.location.href = 'checkout.html';
});

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  closeCart();
  if (eventModal?.classList.contains('open')) eventModal.classList.remove('open');
  if (venueVideoModal?.classList.contains('open')) closeVenueVideo();
});

renderCart();
cartReady = true;
if (pendingCartHydrate) hydrateCartForUser(pendingCartHydrate);
if (pendingBackendPull) void pullBackendState();
if (pendingBackendPush) void pushBackendState();

// ==============================
// event modal (KEEP)
// ==============================
const eventModal = byId('eventModal');
const modalClose = byId('modalClose');
const modalTitle = byId('modalTitle');
const modalTime = byId('modalTime');
const modalStage = byId('modalStage');
const modalNotify = byId('modalNotify');
const modalCalendar = byId('modalCalendar');
const scheduleControls = byId('scheduleControls');

const REMINDERS_BASE_KEY = 'necs_schedule_reminders';
const DAY_DATES = {
  wed: '2026-05-06',
  thu: '2026-05-07',
  fri: '2026-05-08',
  sat: '2026-05-09',
  sun: '2026-05-10'
};

let currentScheduleEvent = null;

function remindersKey() {
  return userScopedKey(REMINDERS_BASE_KEY);
}

function parseTimeToParts(timeStr) {
  const match = String(timeStr || '').trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;
  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const period = match[3].toUpperCase();
  if (period === 'PM' && hours < 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  return { hours, minutes };
}

function scheduleEventDate(eventEl) {
  const dayKey = eventEl?.dataset.day;
  const dateStr = DAY_DATES[dayKey];
  const timeStr = eventEl?.dataset.time;
  if (!dateStr || !timeStr) return null;
  const parts = parseTimeToParts(timeStr);
  if (!parts) return null;
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day, parts.hours, parts.minutes, 0, 0);
}

function toICSDate(dt) {
  const pad = (n) => String(n).padStart(2, '0');
  return [
    dt.getFullYear(),
    pad(dt.getMonth() + 1),
    pad(dt.getDate())
  ].join('') + 'T' + [
    pad(dt.getHours()),
    pad(dt.getMinutes()),
    pad(dt.getSeconds())
  ].join('');
}

function buildICS({ title, start, end, description, location }) {
  const uid = `necs-${start.getTime()}-${Math.random().toString(16).slice(2, 8)}`;
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//NECS 2026//Schedule//EN',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${toICSDate(new Date())}`,
    `DTSTART:${toICSDate(start)}`,
    `DTEND:${toICSDate(end)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ];
  return lines.join('\r\n');
}

function downloadICS(filename, contents) {
  const blob = new Blob([contents], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function reminderKey(eventEl) {
  if (!eventEl) return '';
  const { event, day, time } = eventEl.dataset;
  return [event, day, time].join('|');
}

function getReminders() {
  return safeParse(localStorage.getItem(remindersKey()) || '[]', []);
}

function saveReminders(reminders) {
  localStorage.setItem(remindersKey(), JSON.stringify(reminders));
  if (canSyncBackend()) requestBackendPush();
}

function reminderSetFor(eventEl, reminders = getReminders()) {
  const key = reminderKey(eventEl);
  return Boolean(key && reminders.some((r) => r.key === key));
}

function renderReminderBadges(reminders = getReminders()) {
  qsa('.schedule-event').forEach((eventEl) => {
    const hasReminder = reminderSetFor(eventEl, reminders);
    eventEl.classList.toggle('has-reminder', hasReminder);

    const gameBadge = eventEl.querySelector('.event-badge');
    if (gameBadge) gameBadge.hidden = hasReminder;

    const existing = eventEl.querySelector('.event-reminder');
    if (hasReminder && !existing) {
      const badge = document.createElement('span');
      badge.className = 'event-reminder';
      badge.textContent = '★';
      badge.setAttribute('aria-label', 'Reminder set');
      if (gameBadge) eventEl.insertBefore(badge, gameBadge);
      else eventEl.appendChild(badge);
    }
    if (!hasReminder && existing) existing.remove();
  });
}

function updateReminderButton(eventEl) {
  if (!modalNotify) return;
  const reminderSet = reminderSetFor(eventEl);
  modalNotify.textContent = reminderSet ? 'Remove Reminder' : 'Set Reminder';
}

function setReminder(eventEl) {
  const start = scheduleEventDate(eventEl);
  if (!start) return showToast('Reminder not available for this event');
  const key = reminderKey(eventEl);
  const reminders = getReminders();
  const existingIndex = reminders.findIndex((r) => r.key === key);

  if (existingIndex >= 0) {
    reminders.splice(existingIndex, 1);
    saveReminders(reminders);
    renderReminderBadges(reminders);
    updateReminderButton(eventEl);
    showToast('Reminder removed');
    return;
  }

  reminders.push({
    key,
    title: eventEl.dataset.event || 'NECS Event',
    day: eventEl.dataset.day || '',
    time: eventEl.dataset.time || '',
    stage: eventEl.dataset.stage || '',
    startsAt: start.getTime(),
    createdAt: Date.now()
  });
  saveReminders(reminders);
  renderReminderBadges(reminders);
  updateReminderButton(eventEl);
  showToast('Reminder set for this event');
}

function addEventToCalendar(eventEl) {
  const start = scheduleEventDate(eventEl);
  if (!start) return showToast('Calendar entry not available');
  const end = new Date(start.getTime() + 90 * 60 * 1000);
  const title = eventEl.dataset.event || 'NECS Event';
  const stage = eventEl.dataset.stage || 'NECS Arena';
  const desc = `NECS 2026 • ${title} • ${eventEl.dataset.time || ''} CT`;
  const ics = buildICS({
    title,
    start,
    end,
    description: desc,
    location: stage
  });
  const safeName = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  downloadICS(`${safeName || 'necs-event'}.ics`, ics);
  showToast('Calendar download started');
}

function initScheduleFilters() {
  if (!scheduleControls) return;
  const state = { game: 'all', day: 'all', stage: 'all' };
  const events = qsa('.schedule-event');
  const days = qsa('.schedule-day');

  function matchesFilter(eventEl) {
    const gameOk = state.game === 'all' || eventEl.dataset.game === state.game;
    const dayOk = state.day === 'all' || eventEl.dataset.day === state.day;
    const stageOk = state.stage === 'all' || eventEl.dataset.stageType === state.stage;
    return gameOk && dayOk && stageOk;
  }

  function applyScheduleFilters() {
    events.forEach((eventEl) => {
      eventEl.classList.toggle('is-hidden', !matchesFilter(eventEl));
    });

    days.forEach((dayEl) => {
      const anyVisible = qsa('.schedule-event', dayEl).some((ev) => !ev.classList.contains('is-hidden'));
      dayEl.classList.toggle('is-hidden', !anyVisible);
    });
  }

  scheduleControls.addEventListener('click', (e) => {
    const btn = e.target.closest('.schedule-filter');
    if (!btn) return;
    const filter = btn.dataset.filter;
    const value = btn.dataset.value;
    if (!filter || !value) return;
    state[filter] = value;

    qsa(`.schedule-filter[data-filter="${filter}"]`, scheduleControls)
      .forEach((b) => b.classList.toggle('active', b === btn));

    applyScheduleFilters();
  });

  applyScheduleFilters();
}

initScheduleFilters();
renderReminderBadges();

function openEventModal(eventEl) {
  if (!eventModal || !modalTitle || !modalTime || !modalStage || !eventEl) return;
  modalTitle.textContent = eventEl.dataset.event || '';
  modalTime.textContent = eventEl.dataset.time || '';
  modalStage.textContent = eventEl.dataset.stage || '';
  currentScheduleEvent = eventEl;
  updateReminderButton(eventEl);
  eventModal.classList.add('open');
}

function closeEventModal() {
  eventModal?.classList.remove('open');
}

document.addEventListener('click', (e) => {
  const eventEl = e.target.closest('.schedule-event');
  if (!eventEl) return;
  openEventModal(eventEl);
});

modalClose?.addEventListener('click', () => {
  closeEventModal();
});

eventModal?.addEventListener('click', (e) => {
  if (e.target === eventModal) closeEventModal();
});

modalNotify?.addEventListener('click', () => {
  if (!currentScheduleEvent) return;
  setReminder(currentScheduleEvent);
});

modalCalendar?.addEventListener('click', () => {
  if (!currentScheduleEvent) return;
  addEventToCalendar(currentScheduleEvent);
});

// ==============================
// venue video modal
// ==============================
const venueVideoModal = byId('venueVideoModal');
const venueVideoTrigger = byId('venueVideoTrigger');
const venueVideoCloseBtn = byId('venueVideoCloseBtn');
const venueVideo = byId('venueVideo');
const venueVideoSpeed = byId('venueVideoSpeed');
const venueChapterButtons = qsa('.venue-chapter');
const venueVideoTag = byId('venueVideoTag');
let venueSegments = [];
const venueSkipRanges = [
  { start: 15, end: 35 }
];

function buildVenueSegments() {
  const points = venueChapterButtons
    .map((btn) => ({
      label: (btn.textContent || '').trim(),
      start: Number(btn.dataset.time || 0)
    }))
    .filter((p) => Number.isFinite(p.start))
    .sort((a, b) => a.start - b.start);

  venueSegments = points.map((point, idx) => ({
    label: point.label || 'Section',
    start: point.start,
    end: points[idx + 1] ? points[idx + 1].start : Infinity
  }));
}

function updateVenueOverlay(time) {
  if (!venueVideoTag || !venueSegments.length) return;
  const current = venueSegments.find((seg) => time >= seg.start && time < seg.end);
  if (current && venueVideoTag.textContent !== current.label) {
    venueVideoTag.textContent = current.label;
  }
}

function openVenueVideo() {
  if (!venueVideoModal || !venueVideo) return;
  venueVideo.muted = true;
  venueVideo.volume = 0;
  venueVideo.playbackRate = Number(venueVideoSpeed?.value || 1);
  venueVideoModal.classList.add('open');
  venueVideoModal.setAttribute('aria-hidden', 'false');
  venueVideo.play().catch(() => {});
  updateVenueOverlay(venueVideo.currentTime || 0);
}

function closeVenueVideo() {
  if (!venueVideoModal || !venueVideo) return;
  venueVideo.pause();
  venueVideo.currentTime = 0;
  venueVideoModal.classList.remove('open');
  venueVideoModal.setAttribute('aria-hidden', 'true');
}

venueVideoTrigger?.addEventListener('click', openVenueVideo);
venueVideoTrigger?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    openVenueVideo();
  }
});

venueVideoCloseBtn?.addEventListener('click', closeVenueVideo);
venueVideoModal?.addEventListener('click', (e) => {
  if (e.target === venueVideoModal) closeVenueVideo();
});

venueVideoSpeed?.addEventListener('change', () => {
  if (!venueVideo) return;
  venueVideo.playbackRate = Number(venueVideoSpeed.value || 1);
});

buildVenueSegments();

venueVideo?.addEventListener('loadedmetadata', () => {
  updateVenueOverlay(venueVideo?.currentTime || 0);
});

venueVideo?.addEventListener('timeupdate', () => {
  if (!venueVideo) return;
  const currentTime = venueVideo.currentTime || 0;
  const skip = venueSkipRanges.find((range) => currentTime >= range.start && currentTime < range.end);
  if (skip) {
    venueVideo.currentTime = skip.end;
    updateVenueOverlay(skip.end);
    return;
  }
  updateVenueOverlay(currentTime);
});

venueChapterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (!venueVideo) return;
    const time = Number(btn.dataset.time || 0);
    if (Number.isFinite(time) && time >= 0) {
      venueVideo.currentTime = time;
      updateVenueOverlay(time);
      if (venueVideoModal && !venueVideoModal.classList.contains('open')) {
        openVenueVideo();
      } else {
        venueVideo.play().catch(() => {});
      }
    }
  });
});

// ==============================
// game card clicks -> game details page (KEEP)
// ==============================
qsa('.game-card').forEach(card => {
  card.addEventListener('click', () => {
    const g = card.dataset.game;
    if (!g) return;
    window.location.href = 'game.html?g=' + encodeURIComponent(g);
  });
});

// ==============================
// team card clicks (KEEP)
// ==============================
const TEAM_ROSTERS = {
  Sentinels: {
    game: 'Valorant',
    region: 'North America',
    players: [
      { name: 'TenZ', role: 'Duelist', stats: { Rating: '1.18', 'ACS': '238', 'K/D': '1.22' } },
      { name: 'Zekken', role: 'Entry', stats: { Rating: '1.12', 'ACS': '224', 'K/D': '1.15' } },
      { name: 'Johnqt', role: 'IGL', stats: { Rating: '1.05', 'ACS': '198', 'K/D': '1.04' } },
      { name: 'bang', role: 'Flex', stats: { Rating: '1.08', 'ACS': '210', 'K/D': '1.10' } },
      { name: 'Sacy', role: 'Support', stats: { Rating: '1.03', 'ACS': '185', 'K/D': '1.02' } }
    ]
  },
  LOUD: {
    game: 'Valorant',
    region: 'Brazil',
    players: [
      { name: 'aspas', role: 'Duelist', stats: { Rating: '1.20', 'ACS': '241', 'K/D': '1.26' } },
      { name: 'Less', role: 'Controller', stats: { Rating: '1.11', 'ACS': '206', 'K/D': '1.14' } },
      { name: 'tuyz', role: 'Sentinel', stats: { Rating: '1.07', 'ACS': '199', 'K/D': '1.09' } },
      { name: 'cauanzin', role: 'Initiator', stats: { Rating: '1.10', 'ACS': '214', 'K/D': '1.12' } },
      { name: 'qck', role: 'Flex', stats: { Rating: '1.04', 'ACS': '195', 'K/D': '1.03' } }
    ]
  },
  'G2 Esports': {
    game: 'Rocket League',
    region: 'Europe',
    players: [
      { name: 'Jknaps', role: 'Striker', stats: { 'Goals/Game': '1.1', 'Assists/Game': '0.7', 'Saves/Game': '1.3' } },
      { name: 'Chicago', role: 'Playmaker', stats: { 'Goals/Game': '0.9', 'Assists/Game': '0.9', 'Saves/Game': '1.0' } },
      { name: 'Atomic', role: 'Hybrid', stats: { 'Goals/Game': '1.0', 'Assists/Game': '0.8', 'Saves/Game': '1.1' } }
    ]
  },
  'NRG Esports': {
    game: 'Rocket League',
    region: 'North America',
    players: [
      { name: 'jstn', role: 'Striker', stats: { 'Goals/Game': '1.2', 'Assists/Game': '0.6', 'Saves/Game': '1.1' } },
      { name: 'Squishy', role: 'Support', stats: { 'Goals/Game': '0.8', 'Assists/Game': '0.9', 'Saves/Game': '1.4' } },
      { name: 'GarrettG', role: 'Captain', stats: { 'Goals/Game': '0.9', 'Assists/Game': '0.8', 'Saves/Game': '1.2' } }
    ]
  },
  'T1 Esports': {
    game: 'Smash Ultimate',
    region: 'Mexico',
    players: [
      { name: 'MkLeo', role: 'Main: Joker', stats: { 'Win %': '71', 'Avg. Place': '2.1', 'Clutch': 'A' } }
    ]
  },
  'Team Falcons': {
    game: 'Smash Ultimate',
    region: 'Mexico',
    players: [
      { name: 'Sparg0', role: 'Main: Cloud', stats: { 'Win %': '69', 'Avg. Place': '2.4', 'Edgeguard': 'A+' } }
    ]
  }
};

const TEAM_FAVORITES_KEY = 'necs_favorite_teams';
const PLAYER_FAVORITES_KEY = 'necs_favorite_players';

const teamRosterModal = byId('teamRosterModal');
const rosterModalClose = byId('rosterModalClose');
const rosterTeamName = byId('rosterTeamName');
const rosterTeamMeta = byId('rosterTeamMeta');
const rosterTeamFavoriteBtn = byId('rosterTeamFavoriteBtn');
const rosterList = byId('rosterList');
let currentRosterTeam = '';

function favoritesKeyFor(baseKey, userId = currentUserId()) {
  return `${baseKey}:${userId}`;
}

function getFavoriteTeams(userId = currentUserId()) {
  return safeParse(localStorage.getItem(favoritesKeyFor(TEAM_FAVORITES_KEY, userId)) || '[]', []);
}

function getFavoritePlayers(userId = currentUserId()) {
  return safeParse(localStorage.getItem(favoritesKeyFor(PLAYER_FAVORITES_KEY, userId)) || '[]', []);
}

function saveFavoriteTeams(list, userId = currentUserId()) {
  localStorage.setItem(favoritesKeyFor(TEAM_FAVORITES_KEY, userId), JSON.stringify(list));
}

function saveFavoritePlayers(list, userId = currentUserId()) {
  localStorage.setItem(favoritesKeyFor(PLAYER_FAVORITES_KEY, userId), JSON.stringify(list));
}

function teamIsFavorite(teamName, favorites = getFavoriteTeams()) {
  return favorites.includes(teamName);
}

function playerKey(teamName, playerName) {
  return `${teamName}|${playerName}`;
}

function playerIsFavorite(teamName, playerName, favorites = getFavoritePlayers()) {
  return favorites.includes(playerKey(teamName, playerName));
}

function toggleTeamFavorite(teamName) {
  const favorites = getFavoriteTeams();
  const idx = favorites.indexOf(teamName);
  if (idx >= 0) favorites.splice(idx, 1);
  else favorites.push(teamName);
  saveFavoriteTeams(favorites);
  renderTeamFollowButton(teamName, favorites);
  updateFollowIndicators(favorites);
  updateFollowMenuLabels();
  showToast(idx >= 0 ? 'Unfollowed team' : 'Following team');
}

function togglePlayerFavorite(teamName, playerName) {
  const favorites = getFavoritePlayers();
  const key = playerKey(teamName, playerName);
  const idx = favorites.indexOf(key);
  if (idx >= 0) favorites.splice(idx, 1);
  else favorites.push(key);
  saveFavoritePlayers(favorites);
  renderRosterPlayers(teamName);
  updateFollowMenuLabels();
  showToast(idx >= 0 ? `Unfollowed ${playerName}` : `Following ${playerName}`);
}

function renderTeamFollowButton(teamName, favorites = getFavoriteTeams()) {
  if (!rosterTeamFavoriteBtn) return;
  const followed = favorites.includes(teamName);
  rosterTeamFavoriteBtn.classList.toggle('is-favorite', followed);
  rosterTeamFavoriteBtn.setAttribute('aria-pressed', followed ? 'true' : 'false');
  rosterTeamFavoriteBtn.textContent = followed ? 'Following' : 'Follow Team';
}

function rosterFallbackPlayers(card) {
  const names = qsa('.roster-player', card)
    .map((el) => el.textContent.trim())
    .filter(Boolean);
  return names.map((name) => ({
    name,
    icon: playerIconFor(name),
    role: 'Player',
    stats: { 'Form': '—', 'Impact': '—', 'Clutch': '—' }
  }));
}

function playerIconFor(name = '') {
  const cleaned = name.replace(/[^a-z0-9]/gi, '').toUpperCase();
  if (!cleaned) return '??';
  if (cleaned.length === 1) return cleaned + cleaned;
  return cleaned.slice(0, 2);
}

function playerIconBackground(name = '') {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `linear-gradient(135deg, hsl(${hue} 75% 70%), hsl(${(hue + 35) % 360} 70% 55%))`;
}

function renderRosterPlayers(teamName) {
  if (!rosterList) return;
  const teamData = TEAM_ROSTERS[teamName];
  const players = teamData?.players || [];
  const favorites = getFavoritePlayers();

  rosterList.innerHTML = players.map((player) => {
    const isFav = favorites.includes(playerKey(teamName, player.name));
    const iconText = player.icon || playerIconFor(player.name);
    const iconBg = player.iconBg || playerIconBackground(player.name);
    const statsHtml = Object.entries(player.stats || {}).map(([key, value]) =>
      `<span class="roster-stat">${key}: ${value}</span>`
    ).join('');

    return (
      '<div class="roster-player-row">' +
        '<div class="roster-player-info">' +
          '<div class="roster-avatar" style="background:' + iconBg + '" aria-hidden="true">' + iconText + '</div>' +
          '<div class="roster-player-text">' +
            '<div class="roster-player-name">' + player.name + '</div>' +
            '<div class="roster-player-role">' + (player.role || 'Player') + '</div>' +
            '<div class="roster-stats">' + statsHtml + '</div>' +
          '</div>' +
        '</div>' +
        '<button class="favorite-toggle' + (isFav ? ' is-favorite' : '') + '" data-player="' + player.name + '" aria-pressed="' + (isFav ? 'true' : 'false') + '" type="button">' +
          (isFav ? 'Following' : 'Follow') +
        '</button>' +
      '</div>'
    );
  }).join('');
}

function openRosterModal(teamCard) {
  if (!teamRosterModal || !rosterTeamName || !rosterTeamMeta) return;
  const teamName = teamCard?.dataset.team || teamCard?.querySelector('h3')?.textContent?.trim() || 'Team';
  const teamData = TEAM_ROSTERS[teamName];
  if (!teamData) {
    TEAM_ROSTERS[teamName] = {
      game: teamCard?.dataset.game || '',
      region: teamCard?.dataset.region || '',
      players: rosterFallbackPlayers(teamCard)
    };
  }
  const finalData = TEAM_ROSTERS[teamName];
  const region = teamCard?.dataset.region || finalData?.region || 'Region';
  const game = teamCard?.dataset.game || finalData?.game || 'Game';

  currentRosterTeam = teamName;
  rosterTeamName.textContent = teamName;
  rosterTeamMeta.textContent = `${region} • ${game}`;
  renderTeamFollowButton(teamName);
  renderRosterPlayers(teamName);

  teamRosterModal.classList.add('open');
  teamRosterModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeRosterModal() {
  if (!teamRosterModal) return;
  teamRosterModal.classList.remove('open');
  teamRosterModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function updateFollowIndicators(favorites = getFavoriteTeams()) {
  qsa('.team-card').forEach((card) => {
    const teamName = card.dataset.team || card.querySelector('h3')?.textContent?.trim() || '';
    const isFollowed = favorites.includes(teamName);
    card.classList.toggle('is-following', isFollowed);
  });
}

function updateFollowMenuLabels() {
  if (authMenuFollowedTeamsBtn) {
    const count = getFavoriteTeams().length;
    authMenuFollowedTeamsBtn.textContent = `Followed Teams (${count})`;
  }
  if (authMenuFollowedPlayersBtn) {
    const count = getFavoritePlayers().length;
    authMenuFollowedPlayersBtn.textContent = `Followed Players (${count})`;
  }
}

function hydrateFollowStateForUser({ mergeGuest = true } = {}) {
  const userId = currentUserId();
  let teams = getFavoriteTeams(userId);
  let players = getFavoritePlayers(userId);

  if (userId !== 'guest' && mergeGuest) {
    const guestTeams = getFavoriteTeams('guest');
    const guestPlayers = getFavoritePlayers('guest');
    if (guestTeams.length) {
      teams = mergeStringSets(teams, guestTeams);
      localStorage.removeItem(favoritesKeyFor(TEAM_FAVORITES_KEY, 'guest'));
    }
    if (guestPlayers.length) {
      players = mergeStringSets(players, guestPlayers);
      localStorage.removeItem(favoritesKeyFor(PLAYER_FAVORITES_KEY, 'guest'));
    }
  }

  saveFavoriteTeams(teams, userId);
  saveFavoritePlayers(players, userId);
  updateFollowIndicators(teams);
  updateFollowMenuLabels();
}

qsa('.team-card').forEach(card => {
  card.addEventListener('click', () => openRosterModal(card));
});

rosterModalClose?.addEventListener('click', closeRosterModal);
teamRosterModal?.addEventListener('click', (e) => {
  if (e.target === teamRosterModal) closeRosterModal();
});
rosterTeamFavoriteBtn?.addEventListener('click', () => {
  if (!currentRosterTeam) return;
  toggleTeamFavorite(currentRosterTeam);
});
rosterList?.addEventListener('click', (e) => {
  const btn = e.target.closest('.favorite-toggle');
  if (!btn || !currentRosterTeam) return;
  const playerName = btn.dataset.player;
  if (!playerName) return;
  togglePlayerFavorite(currentRosterTeam, playerName);
});

updateFollowIndicators();
updateFollowMenuLabels();

// ==============================
// music tabs (KEEP)
// ==============================
const musicTabs = qsa('.music-tab');
const musicLists = qsa('.music-list');

musicTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const targetId = tab.dataset.tab;

    musicTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    musicLists.forEach(list => {
      list.classList.remove('active');
      if (list.id === targetId) list.classList.add('active');
    });
  });
});

// song clicks (KEEP)
const MUSIC_LIKES_BASE_KEY = 'necs_music_likes';

function musicLikesKeyFor(userId = currentUserId()) {
  return `${MUSIC_LIKES_BASE_KEY}:${userId}`;
}

function getMusicLikes() {
  return safeParse(localStorage.getItem(musicLikesKeyFor()) || '[]', []);
}

function saveMusicLikes(likes) {
  localStorage.setItem(musicLikesKeyFor(), JSON.stringify(likes));
  if (canSyncBackend()) requestBackendPush();
}

function songLikeKey(songEl) {
  const list = songEl.closest('.music-list');
  const tabId = list?.id || 'music';
  const title = songEl.querySelector('.song-title')?.textContent?.trim() || 'song';
  return `${tabId}|${title}`;
}

function isSongLiked(songEl, likes = getMusicLikes()) {
  const key = songLikeKey(songEl);
  return likes.includes(key);
}

function renderSongLikes(likes = getMusicLikes()) {
  qsa('.song-item').forEach((songEl) => {
    const heart = songEl.querySelector('.song-heart');
    if (!heart) return;
    const liked = isSongLiked(songEl, likes);
    heart.classList.toggle('liked', liked);
    heart.setAttribute('aria-pressed', liked ? 'true' : 'false');
    heart.setAttribute('title', liked ? 'Remove from liked songs' : 'Like this song');
    heart.innerHTML = '<span aria-hidden="true">♥</span>';
  });
}

function toggleSongLike(songEl) {
  const key = songLikeKey(songEl);
  const likes = getMusicLikes();
  const idx = likes.indexOf(key);
  const title = songEl.querySelector('.song-title')?.textContent?.trim() || 'song';

  if (idx >= 0) {
    likes.splice(idx, 1);
    saveMusicLikes(likes);
    renderSongLikes(likes);
    showToast(`Removed: ${title}`);
    return;
  }

  likes.push(key);
  saveMusicLikes(likes);
  renderSongLikes(likes);
  showToast(`Liked: ${title}`);
}

function hydrateMusicLikesForUser({ mergeGuest = true } = {}) {
  const userId = currentUserId();
  let nextLikes = getMusicLikes();

  if (userId !== 'guest' && mergeGuest) {
    const guestLikes = safeParse(localStorage.getItem(musicLikesKeyFor('guest')) || '[]', []);
    if (guestLikes.length) {
      nextLikes = mergeStringSets(nextLikes, guestLikes);
      localStorage.removeItem(musicLikesKeyFor('guest'));
    }
  }

  saveMusicLikes(nextLikes);
  renderSongLikes(nextLikes);
}

// enhance songs with heart buttons + keep existing click toast
qsa('.song-item').forEach((item) => {
  if (!item.querySelector('.song-heart')) {
    const heartBtn = document.createElement('button');
    heartBtn.type = 'button';
    heartBtn.className = 'song-heart';
    heartBtn.setAttribute('aria-label', 'Like this song');
    heartBtn.setAttribute('aria-pressed', 'false');
    heartBtn.innerHTML = '<span aria-hidden="true">♥</span>';
    item.appendChild(heartBtn);
  }

  const heart = item.querySelector('.song-heart');
  heart?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleSongLike(item);
  });

  item.addEventListener('click', () => {
    const title = item.querySelector('.song-title')?.textContent || 'song';
    showToast('Playing: ' + title);
  });
});

renderSongLikes();

// mobile menu (KEEP)
const mobileMenuBtn = byId('mobileMenuBtn');
mobileMenuBtn?.addEventListener('click', () => {
  showToast('Use the links below to navigate');
});

// ==============================
// ===== Checkout Page Init (UPGRADED) =====
// ==============================
(function initCheckout() {
  const summary = byId('summary');
  const totalEl = byId('total');
  const payTotalEl = byId('payTotal'); // from the upgraded checkout.html
  const nameEl = byId('name');
  const emailEl = byId('email');
  const dayChoice = byId('dayChoice');
  const payBtn = byId('payBtn');
  const clearBtn = byId('clearBtn');

  // payment fields (new)
  const cardNumber = byId('cardNumber');
  const cardExp = byId('cardExp');
  const cardCvc = byId('cardCvc');
  const cardZip = byId('cardZip');

  if (!summary || !totalEl || !payBtn) return; // not on checkout.html

  const stored = readCart();
  const { items, total, rowsHtml } = summarizeCart(stored);

  summary.innerHTML = items.length
    ? rowsHtml
    : '<div class="muted">Cart is empty. Go back and add tickets.</div>';

  totalEl.textContent = formatMoney(total);
  if (payTotalEl) payTotalEl.textContent = formatMoney(total);

  // simple input formatting so it feels real
  function onlyDigits(s) { return (s || '').replace(/\D/g, ''); }
  function fmtCard(v) { return onlyDigits(v).slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 '); }
  function fmtExp(v) {
    const d = onlyDigits(v).slice(0, 4);
    if (d.length <= 2) return d;
    return d.slice(0, 2) + '/' + d.slice(2);
  }
  function fmtCvc(v) { return onlyDigits(v).slice(0, 4); }
  function fmtZip(v) { return onlyDigits(v).slice(0, 10); }

  cardNumber?.addEventListener('input', e => e.target.value = fmtCard(e.target.value));
  cardExp?.addEventListener('input', e => e.target.value = fmtExp(e.target.value));
  cardCvc?.addEventListener('input', e => e.target.value = fmtCvc(e.target.value));
  cardZip?.addEventListener('input', e => e.target.value = fmtZip(e.target.value));

  clearBtn?.addEventListener('click', () => {
    localStorage.removeItem(cartKeyFor());
    cart = {};
    showToast('Cart cleared');
    setTimeout(() => window.location.href = 'index.html#tickets', 650);
  });

  payBtn.addEventListener('click', () => {
    if (!items.length) return showToast('Cart is empty');

    const name = (nameEl?.value || '').trim();
    const email = (emailEl?.value || '').trim();

    if (name.length < 2) return showToast('Enter your name');
    if (!email.includes('@')) return showToast('Enter a valid email');

    // payment required (demo validation)
    const cn = (cardNumber?.value || '').replace(/\s/g, '');
    const exp = (cardExp?.value || '').trim();
    const cvc = (cardCvc?.value || '').trim();
    const zip = (cardZip?.value || '').trim();

    if (cn.length < 13) return showToast('Enter a valid card number');
    if (exp.length < 4) return showToast('Enter expiry (MM/YY)');
    if (cvc.length < 3) return showToast('Enter CVC');
    if (zip.length < 5) return showToast('Enter billing ZIP');

    const payload = {
      name,
      email,
      dayChoice: dayChoice?.value || '',
      cart: stored,
      total,
      createdAt: Date.now(),
      orderId: 'NECS-' + Math.random().toString(16).slice(2, 10).toUpperCase()
    };

    localStorage.setItem('necs_ticket_payload', JSON.stringify(payload));

    // clear cart after purchase
    localStorage.removeItem(cartKeyFor());
    cart = {};

    window.location.href = 'confirmation.html';
  });
})();

// ==============================
// ===== Game Page Init (KEEP) =====
// ==============================
(function initGamePage() {
  const gTitle = byId('gTitle');
  const gSub = byId('gSub');
  const gImg = byId('gImg');
  const gVideo = byId('gVideo');
  const gFacts = byId('gFacts');
  const gAbout = byId('gAbout');
  const followBtn = byId('followBtn');
  const volumeRange = byId('volumeRange');
  const mediaWrap = document.querySelector('.game-media');
  const soundToggle = byId('soundToggle');

  if (!gTitle || !gImg || !gFacts || !gAbout || !followBtn) return;

  const params = new URLSearchParams(location.search);
  const g = (params.get('g') || '').toLowerCase();

  const data = {
    valorant: {
      title: 'Valorant Champions',
      sub: '5v5 tactical showdown • main stage energy',
      img: 'images/img-1-f1a1305d46.png',
      video: 'videos/valorant.mp4',
      audio: 'Music/valorant.mp3',
      facts: [['Teams', '16'], ['Prize', '$200,000'], ['Style', 'Best-of series'], ['Stage', 'Main Arena']],
      about: `Expect clutch rounds, loud crowds, and a broadcast-style experience. If you're new, watch the first map — you'll pick up the rhythm fast.`
    },
    rocket: {
      title: 'RLCS Championship',
      sub: 'Fast matches • aerial plays • nonstop momentum swings',
      img: 'images/img-2-828f7bcd7e.png',
      video: 'videos/rocket.mp4',
      audio: 'Music/rocket.mp3',
      facts: [['Teams', '12'], ['Prize', '$150,000'], ['Style', 'Best-of series'], ['Stage', 'Arena / Featured']],
      about: `Rocket League is the "easy to understand, hard to master" bracket. Matches move fast, so check the schedule to catch your favorite teams.`
    },
    smash: {
      title: 'SSBU Invitational',
      sub: '64-player bracket • character variety • crowd reactions go crazy',
      img: 'images/img-3-fcdd53f857.png',
      video: 'videos/smash.mp4',
      audio: 'Music/smash.mp3',
      facts: [['Players', '64'], ['Prize', '$150,000'], ['Format', 'Pools → Top Cut'], ['Stage', 'Featured Stage']],
      about: `Expect hype moments, surprise picks, and brutal upsets. Even early sets can be legendary.`
    }
  };

  const info = data[g];
  if (!info) {
    gTitle.textContent = 'Game not found';
    gSub.textContent = 'Go back and choose a game.';
    gImg.alt = '';
    gImg.src = '';
    if (gVideo) {
      gVideo.removeAttribute('src');
      gVideo.load();
    }
    gFacts.innerHTML = `<li><span>Tip</span><strong>Try ?g=valorant</strong></li>`;
    gAbout.textContent = '';
    followBtn.style.display = 'none';
    return;
  }

  gTitle.textContent = info.title;
  gSub.textContent = info.sub;
  gImg.src = info.img;
  gImg.alt = info.title;
  let gAudio = null;

  if (gVideo) {
    gVideo.src = info.video;
    gVideo.load();
  }

  if (info.audio) {
    gAudio = new Audio(info.audio);
    gAudio.preload = 'metadata';
    gAudio.loop = true;
  }

  const hero = document.querySelector('.game-hero');
  let audioEnabled = false;
  let audioUnlocked = false;
  let volume = Number(volumeRange?.value || 0.6);

  function applyVolume(nextVolume) {
    if (!gVideo) return;
    volume = Math.max(0, Math.min(1, Number(nextVolume)));
    gVideo.volume = volume;
    if (audioEnabled) gVideo.muted = volume === 0;
    if (gAudio) gAudio.volume = volume;
  }

  function startPlayback(withAudio) {
    if (!gVideo || !mediaWrap) return;
    const wantsAudio = Boolean(withAudio && audioUnlocked);
    gVideo.volume = volume;

    if (wantsAudio) {
      audioEnabled = true;
      gVideo.muted = volume === 0;
      const playAttempt = gVideo.play();
      if (playAttempt && typeof playAttempt.catch === 'function') {
        playAttempt.catch(() => {
          showToast('Audio blocked — click again to enable');
        });
      }
      if (gAudio) {
        gAudio.currentTime = gVideo.currentTime || 0;
        const audioAttempt = gAudio.play();
        if (audioAttempt && typeof audioAttempt.catch === 'function') {
          audioAttempt.catch(() => {
            showToast('Audio blocked — click again to enable');
          });
        }
      }
    } else {
      gVideo.muted = true;
      const playAttempt = gVideo.play();
      if (playAttempt && typeof playAttempt.catch === 'function') {
        playAttempt.catch(() => {});
      }
    }

    mediaWrap.classList.add('is-playing');
  }

  function startAudioIfPlaying() {
    if (!gVideo || !gAudio) return;
    if (gVideo.paused) return;
    gVideo.muted = volume === 0;
    gAudio.volume = volume;
    gAudio.currentTime = gVideo.currentTime || 0;
    const audioAttempt = gAudio.play();
    if (audioAttempt && typeof audioAttempt.catch === 'function') {
      audioAttempt.catch(() => {
        showToast('Audio blocked — click again to enable');
      });
    }
  }

  function stopPlayback() {
    if (!gVideo || !mediaWrap) return;
    gVideo.pause();
    gVideo.currentTime = 0;
    if (gAudio) {
      gAudio.pause();
      gAudio.currentTime = 0;
    }
    if (!audioEnabled) gVideo.muted = true;
    mediaWrap.classList.remove('is-playing');
  }

  function unlockAudio() {
    audioUnlocked = true;
    audioEnabled = true;
    startAudioIfPlaying();
    soundToggle?.classList.add('is-hidden');
  }

  document.addEventListener('pointerdown', unlockAudio, { once: true });

  hero?.addEventListener('mouseenter', () => startPlayback(true));
  hero?.addEventListener('mouseleave', stopPlayback);
  hero?.addEventListener('dblclick', () => {
    unlockAudio();
    startPlayback(true);
  });
  hero?.addEventListener('click', () => {
    unlockAudio();
    startPlayback(true);
  });
  hero?.addEventListener('touchstart', () => startPlayback(true), { passive: true });

  mediaWrap?.addEventListener('click', () => startPlayback(true), true);
  soundToggle?.addEventListener('click', (e) => {
    e.stopPropagation();
    unlockAudio();
    startPlayback(true);
  });

  volumeRange?.addEventListener('input', (e) => {
    audioEnabled = true;
    applyVolume(e.target.value);
    if (gVideo) gVideo.muted = volume === 0;
  });

  gFacts.innerHTML = info.facts
    .map(([k, v]) => `<li><span>${k}</span><strong>${v}</strong></li>`)
    .join('');

  gAbout.textContent = info.about;

  followBtn.addEventListener('click', () => {
    window.location.href = 'follow.html?g=' + encodeURIComponent(g);
  });
})();

// ==============================
// ===== Follow Updates Page Init =====
// ==============================
(function initFollowPage() {
  const form = byId('followForm');
  const nameEl = byId('followName');
  const emailEl = byId('followEmail');
  const phoneEl = byId('followPhone');
  const gameEl = byId('followGame');
  const emailOpt = byId('followEmailOpt');
  const smsOpt = byId('followSmsOpt');
  const gameLabel = byId('followGameLabel');
  const backLink = byId('followBack');

  if (!form || !gameEl) return;

  const FOLLOW_BASE_KEY = 'necs_follow_signup';
  const params = new URLSearchParams(location.search);
  const g = (params.get('g') || '').toLowerCase();
  const gameNames = {
    valorant: 'Valorant Champions',
    rocket: 'Rocket League',
    smash: 'Smash Invitational'
  };

  if (g && gameNames[g]) {
    gameEl.value = g;
    if (gameLabel) gameLabel.textContent = gameNames[g];
    if (backLink) backLink.href = 'game.html?g=' + encodeURIComponent(g);
  }

  function validEmail(value) {
    return value.includes('@') && value.includes('.');
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = (nameEl?.value || '').trim();
    const email = (emailEl?.value || '').trim();
    const phone = (phoneEl?.value || '').trim();
    const wantsEmail = Boolean(emailOpt?.checked);
    const wantsSms = Boolean(smsOpt?.checked);

    if (!email && !phone) return showToast('Enter email or phone');
    if (email && !validEmail(email)) return showToast('Enter a valid email');
    if (!wantsEmail && !wantsSms) return showToast('Pick email or text updates');

    const payload = {
      name,
      email,
      phone,
      game: gameEl.value,
      wantsEmail,
      wantsSms,
      createdAt: Date.now()
    };

    const key = userScopedKey(FOLLOW_BASE_KEY);
    const existing = safeParse(localStorage.getItem(key) || '[]', []);
    existing.push({ ...payload, uid: currentUserId() });
    localStorage.setItem(key, JSON.stringify(existing));
    form.reset();
    gameEl.value = g && gameNames[g] ? g : '';
    if (emailOpt) emailOpt.checked = true;
    showToast('You are on the list!');
  });
})();
// ===== Confirmation Page Init (NO canvas / no QR) =====
(function initConfirmation() {
  const cName = byId('cName');
  const cEmail = byId('cEmail');
  const cOrder = byId('cOrder');
  const cTotal = byId('cTotal');
  const cTickets = byId('cTickets');

  if (!cName || !cEmail || !cOrder || !cTotal || !cTickets) return;

  const payload = safeParse(localStorage.getItem('necs_ticket_payload') || '{}', {});
  if (!payload.name) {
    showToast('Missing confirmation info');
    setTimeout(() => (location.href = 'index.html#tickets'), 800);
    return;
  }

  cName.textContent = payload.name || '—';
  cEmail.textContent = payload.email || '—';
  cOrder.textContent = payload.orderId || '—';
  cTotal.textContent = formatMoney(payload.total || 0);

  const { items, rowsHtml } = summarizeCart(payload.cart || {});
  cTickets.innerHTML = items.length ? rowsHtml : '<div class="muted">No tickets found.</div>';
})();
