import { compute, cm, cm1, ROOM, STAND, SLIDE, DEFAULT_SIZE, DEFAULT_X, gapLabel } from './fit';

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
/** Desktop layouts start at 900px, the same breakpoint as the CSS. */
const desktop = matchMedia('(min-width: 900px)');
const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
const fill = (text: string, values: Record<string, string>) => text.replace(/\{(\w+)\}/g, (_, k) => values[k] ?? '');
/** The tab a key moves to, or -1 for any other key: the arrows step (wrapping round), Home and End jump. */
const nextTab = (key: string, i: number, n: number) =>
  key === 'Home' ? 0 : key === 'End' ? n - 1
  : key === 'ArrowRight' || key === 'ArrowDown' ? (i + 1) % n
  : key === 'ArrowLeft' || key === 'ArrowUp' ? (i - 1 + n) % n : -1;

/* ---------- entrances: each part of a section rises once ---------- */
const risers = [...document.querySelectorAll<HTMLElement>('.rise')];
if (!reduced && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
  risers.forEach((el) => io.observe(el));
} else risers.forEach((el) => el.classList.add('in'));

/* ---------- videos: load and play only when on screen and motion is welcome ---------- */
// In the pinned steps all four steps share one spot, so a video in a step that is not on show counts
// as off screen; the steps call syncVideos when they change.
const videos = [...document.querySelectorAll<HTMLVideoElement>('video[data-lazy-video]')];
const onScreen = new Set<HTMLVideoElement>();
const syncVideo = (v: HTMLVideoElement) => {
  if (onScreen.has(v) && !v.closest('.is-pinned [data-step]:not(.is-active)')) {
    if (!v.src) { v.src = v.dataset.src!; v.load(); }
    v.play().catch(() => {});
  } else if (!v.paused) v.pause();
};
const syncVideos = () => videos.forEach(syncVideo);
if (!reduced && !saveData && 'IntersectionObserver' in window) {
  const vio = new IntersectionObserver((entries) => {
    for (const e of entries) {
      const v = e.target as HTMLVideoElement;
      if (e.isIntersecting) onScreen.add(v); else onScreen.delete(v);
      syncVideo(v);
    }
  }, { threshold: 0.2 });
  videos.forEach((v) => vio.observe(v));
}

/* ---------- what you get: tabs ---------- */
const tabsRoot = document.querySelector<HTMLElement>('[data-tabs]');
if (tabsRoot) {
  const list = tabsRoot.querySelector<HTMLElement>('[role=tablist]')!;
  const tabs = [...list.querySelectorAll<HTMLButtonElement>('[role=tab]')];
  const panels = [...tabsRoot.querySelectorAll<HTMLElement>('[data-panel]')];
  const figures = [...tabsRoot.querySelectorAll<HTMLElement>('[data-panel-figure]')];
  list.hidden = false;

  // Desktop: the tab list is a carousel. The selected word sits large in the middle, the next one
  // small to its right, the previous one small to its left, and any other waits out of sight behind
  // the middle, so turning the carousel brings it round. Phones keep the plain row of tabs.
  // The strip spans the whole gap from the picture's right edge to the screen's right edge, with the
  // selected word centred in it; the CSS fades both ends. Each bar belongs to one pair of neighbouring
  // words (bar k sits between word k and word k + 1) and travels with them when the carousel turns;
  // the two beside the middle word show, the others wait just outside the side words, invisible.
  const SIDE = 0.5;
  let current = 0;
  const seps = tabs.map(() => {
    const s = document.createElement('span');
    s.className = 'tab-sep';
    s.setAttribute('aria-hidden', 'true');
    list.append(s);
    return s;
  });
  const place = () => {
    const n = tabs.length;
    if (!desktop.matches) {
      tabs.forEach((t) => { t.style.transform = ''; t.style.opacity = ''; t.style.pointerEvents = ''; t.style.width = ''; });
      list.style.marginLeft = list.style.width = '';
      list.style.removeProperty('--mid');
      return;
    }
    const picture = figures[current].getBoundingClientRect();
    const column = list.parentElement!.getBoundingClientRect();
    const span = document.documentElement.clientWidth - picture.right;
    list.style.marginLeft = `${picture.right - column.left}px`;
    list.style.width = `${span}px`;
    list.style.setProperty('--mid', `${span / 2}px`);
    const gap = parseFloat(getComputedStyle(list).fontSize) * 0.6;
    // Fixed slots: every word gets the longest word's width, text centred, so the three positions
    // and the bars never move and a word in the right slot always sits under the same pointer spot.
    tabs.forEach((t) => { t.style.width = ''; });
    const slot = Math.max(...tabs.map((t) => t.offsetWidth));
    tabs.forEach((t) => { t.style.width = `${slot}px`; });
    const side = slot / 2 + gap + (slot * SIDE) / 2;
    tabs.forEach((t, j) => {
      const d = (j - current + n) % n; // 0 middle, 1 right, n - 1 left, anything else behind
      const x = d === 1 ? side : d === n - 1 ? -side : 0;
      const scale = d === 0 ? 1 : d === 1 || d === n - 1 ? SIDE : 0.3;
      const hidden = d !== 0 && d !== 1 && d !== n - 1;
      t.style.transform = `translateX(calc(-50% + ${x}px)) scale(${scale})`;
      t.style.opacity = hidden ? '0' : '1';
      t.style.pointerEvents = hidden ? 'none' : '';
    });
    const inner = slot / 2 + gap / 2; // between the middle word and a side word
    const outer = side + (slot * SIDE) / 2 + (gap * SIDE) / 2; // just outside a side word
    seps.forEach((s, k) => {
      const d = (k - current + n) % n; // where word k, the bar's left-hand word, now sits
      const x = d === 0 ? inner : d === n - 1 ? -inner : d === 1 ? outer : -outer;
      const shown = d === 0 || d === n - 1;
      s.style.transform = `translate(calc(-50% + ${x}px), -50%) scale(${shown ? 1 : SIDE})`;
      s.style.opacity = shown ? '1' : '0';
    });
  };
  let queued = 0;
  const replace = () => { cancelAnimationFrame(queued); queued = requestAnimationFrame(place); };
  desktop.addEventListener('change', place);
  addEventListener('resize', replace);
  document.fonts?.ready.then(place);

  const show = (i: number, focus = false) => {
    current = i;
    tabs.forEach((t, j) => { t.setAttribute('aria-selected', String(i === j)); t.tabIndex = i === j ? 0 : -1; });
    panels.forEach((p, j) => { p.hidden = i !== j; });
    figures.forEach((f, j) => { f.hidden = i !== j; if (i === j) f.classList.add('in'); });
    place(); // after the figures switch, so the visible picture is the one measured
    if (focus) tabs[i].focus();
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => show(i));
    t.addEventListener('keydown', (e) => {
      // Left/right and up/down both move through the tabs; on desktop each move turns the carousel.
      const n = nextTab(e.key, i, tabs.length);
      if (n < 0) return;
      e.preventDefault();
      show(n, true);
    });
  });
  show(0);
}

/* ---------- who it's for: an index of audiences beside a without / with comparison ---------- */
// Picking an audience swaps its panel in at once. A link to an
// audience's anchor (/ro/#bucatarii, used in the outreach emails) selects it and scrolls to it.
const who = document.querySelector<HTMLElement>('[data-who]');
if (who) {
  const list = who.querySelector<HTMLElement>('[role=tablist]')!;
  const whoTabs = [...list.querySelectorAll<HTMLButtonElement>('[role=tab]')];
  const whoPanels = [...who.querySelectorAll<HTMLElement>('[role=tabpanel]')];
  list.hidden = false;
  // Desktop: the panel is centred on the index. The CSS centres a shorter panel; a taller one is pulled
  // up by half the difference, so the index never moves while the panels change.
  const panelBox = who.querySelector<HTMLElement>('.who-panels')!;
  const centre = () => {
    panelBox.style.marginTop = '';
    if (!desktop.matches) return;
    const diff = list.offsetHeight - panelBox.offsetHeight;
    if (diff < 0) panelBox.style.marginTop = `${diff / 2}px`;
  };
  let centreFrame = 0;
  addEventListener('resize', () => { cancelAnimationFrame(centreFrame); centreFrame = requestAnimationFrame(centre); });
  document.fonts?.ready.then(centre);
  const select = (i: number, focus = false) => {
    whoTabs.forEach((t, j) => { t.setAttribute('aria-selected', String(i === j)); t.tabIndex = i === j ? 0 : -1; });
    whoPanels.forEach((p, j) => { p.hidden = i !== j; });
    centre();
    if (focus) whoTabs[i].focus();
  };
  whoTabs.forEach((t, i) => {
    t.addEventListener('click', () => {
      select(i);
      // on phones the panel sits under the index, so bring it into view
      if (!desktop.matches) whoPanels[i].scrollIntoView({ block: 'nearest', behavior: reduced ? 'auto' : 'smooth' });
    });
    t.addEventListener('keydown', (e) => {
      const n = nextTab(e.key, i, whoTabs.length);
      if (n < 0) return;
      e.preventDefault();
      select(n, true);
    });
  });
  const fromHash = () => {
    const id = decodeURIComponent(location.hash.slice(1));
    const i = whoPanels.findIndex((p) => p.id === id);
    if (i < 0) return;
    select(i);
    requestAnimationFrame(() => who.scrollIntoView({ block: 'start', behavior: reduced ? 'auto' : 'smooth' }));
  };
  addEventListener('hashchange', fromHash);
  select(0);
  fromHash();
}

/* ---------- the phone menu closes after a choice ---------- */
document.querySelectorAll<HTMLDetailsElement>('details.menu').forEach((m) => {
  m.addEventListener('click', (e) => { if ((e.target as HTMLElement).closest('a')) m.open = false; });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && m.open) { m.open = false; m.querySelector('summary')?.focus(); } });
});

/* ---------- will it fit: the dresser wall ---------- */
const board = document.querySelector<HTMLElement>('[data-fit]');
if (board) {
  const s = JSON.parse(board.dataset.strings!);
  const $ = <T extends Element>(sel: string) => board.querySelector<T>(sel)!;
  const Y = (h: number) => ROOM.ceiling - h;
  const set = (el: Element, attrs: Record<string, number | string>) => { for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, String(v)); };
  const sizeButtons = [...board.querySelectorAll<HTMLButtonElement>('[data-size]')];
  const range = $<HTMLInputElement>('#fit-x');
  let size = DEFAULT_SIZE;
  const render = () => {
    const xc = Math.min(SLIDE.max, Math.max(SLIDE.min, Number(range.value) || DEFAULT_X));
    const r = compute(size, xc);
    set($('#fit-panel'), { x: r.x0, y: Y(r.y1), width: r.w, height: r.h });
    set($('#fit-neck'), { x: r.xc - 2.5, y: Y(r.y0) });
    set($('#fit-base'), { x: r.xc - STAND.base / 2 });
    const midY = Y((r.y0 + r.y1) / 2);
    const gm = Math.max(0, r.gapMirror), gd = Math.max(0, r.gapDoor);
    // The gap labels always sit just inside the TV, next to their gap (see gapLabel).
    set($('#gapbar-mirror'), { x: ROOM.mirror.x1, y: midY - 1, width: gm, 'data-warn': String(r.gapMirror < 5) });
    const mirrorText = $<SVGTextElement>('#gaptext-mirror');
    mirrorText.textContent = r.gapMirror < 0 ? '×' : `${cm(r.gapMirror, s.locale)} cm`;
    const ml = gapLabel(r.x0, 'left');
    set(mirrorText, { x: ml.x, y: midY - 5, 'text-anchor': ml.anchor });
    set($('#gapbar-door'), { x: r.x1, y: midY - 1, width: gd, 'data-warn': String(r.gapDoor < 5) });
    const doorText = $<SVGTextElement>('#gaptext-door');
    doorText.textContent = r.gapDoor < 0 ? '×' : `${cm(r.gapDoor, s.locale)} cm`;
    const dl = gapLabel(r.x1, 'right');
    set(doorText, { x: dl.x, y: midY - 5, 'text-anchor': dl.anchor });
    const thing = s.things[r.nearest];
    const gap = r.nearest === 'mirror' ? r.gapMirror : r.gapDoor;
    const status = $<HTMLElement>('#fit-status');
    status.dataset.tone = r.tone;
    // Running into both the mirror and the door frame names both.
    status.textContent = r.gapMirror < 0 && r.gapDoor < 0
      ? fill(s.status.hitsBoth, { mirror: s.things.mirror.into, door: s.things.door.into })
      : fill(s.status[r.tone], { gap: cm(gap, s.locale), near: thing.near, into: thing.into });
    const over = r.overLeft > 0 || r.overRight > 0
      ? fill(s.overhang, { left: cm1(r.overLeft, s.locale), right: cm1(r.overRight, s.locale) })
      : s.noOverhang;
    $('#fit-detail').textContent = `${fill(s.detail, { w: cm1(r.w, s.locale), h: cm1(r.h, s.locale), dresser: s.dresser, mirror: cm(r.gapMirror, s.locale), door: cm(r.gapDoor, s.locale) })} ${over}`;
    // the gauges: the two gaps in large numerals (red under 5 cm, like the bars), then screen and overhang
    const gauge = (name: string, value: number) => {
      const g = $<HTMLElement>(`[data-gauge="${name}"]`);
      g.dataset.warn = String(value < 5);
      g.querySelector('.g-num')!.textContent = value < 0 ? '×' : cm(value, s.locale);
    };
    gauge('mirror', r.gapMirror);
    gauge('door', r.gapDoor);
    $('[data-spec="screen"]').textContent = `${cm1(r.w, s.locale)} × ${cm1(r.h, s.locale)} cm`;
    $('[data-spec="over"]').textContent = `${cm1(r.overLeft, s.locale)} / ${cm1(r.overRight, s.locale)} cm`;
  };
  sizeButtons.forEach((b) => b.addEventListener('click', () => {
    size = Number(b.dataset.size);
    sizeButtons.forEach((o) => o.setAttribute('aria-pressed', String(o === b)));
    render();
  }));
  range.addEventListener('input', render);
  render();
}

/* ---------- the enquiry form ---------- */
const form = document.querySelector<HTMLFormElement>('form[data-enquiry]');
if (form) {
  const msg = JSON.parse(form.dataset.messages!);
  const status = form.querySelector<HTMLElement>('.form-status')!;
  const button = form.querySelector<HTMLButtonElement>('button[type=submit]')!;
  const value = (name: string) => ((form.elements.namedItem(name) as HTMLInputElement | null)?.value ?? '').trim();
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    if (form.dataset.mode === 'mailto') {
      // No form service: open the visitor's email app with the enquiry written out.
      const l = msg.labels;
      const subject = fill(msg.subject, { property: value('property_type'), city: value('city') });
      const body = [
        `${l.name}: ${value('name')}`,
        `${l.contact}: ${value('contact')}`,
        `${l.property}: ${value('property_type')}`,
        `${l.rooms}: ${value('rooms')}`,
        `${l.city}: ${value('city')}`,
        '',
        value('message'),
      ].join('\n');
      location.href = `mailto:${form.dataset.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      status.textContent = msg.opened;
      return;
    }
    button.disabled = true; status.textContent = msg.sending;
    try {
      const res = await fetch(form.dataset.endpoint!, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(String(res.status));
      form.reset(); status.textContent = msg.sent;
    } catch {
      status.textContent = msg.error;
    } finally { button.disabled = false; }
  });
}

/* ---------- the two "from the bed" versions: on desktop, one picture with a divider to drag ---------- */
// The second version sits on top of the first and shows right of the divider. The invisible range
// input covers the picture, so dragging or clicking anywhere moves the divider, and arrow keys work.
// The version names beside the picture glide the divider over to show that version in full; the
// one showing more of the picture is highlighted. Phones keep the two pictures one under the other,
// where a picture-wide slider could trap scrolling.
const compare = document.querySelector<HTMLElement>('[data-compare]');
if (compare) {
  const root = compare.closest<HTMLElement>('.fit-compare')!;
  const divider = compare.querySelector<HTMLInputElement>('.compare-range')!;
  const hint = root.querySelector<HTMLElement>('.compare-hint');
  const versions = [...root.querySelectorAll<HTMLButtonElement>('.version')];
  const setPos = () => {
    const v = Number(divider.value);
    compare.style.setProperty('--pos', `${v}%`);
    versions.forEach((b) => { b.dataset.active = String(b.dataset.show === '0' ? v > 50 : v < 50); });
  };
  const mode = () => {
    const on = desktop.matches;
    compare.classList.toggle('is-wipe', on);
    divider.hidden = !on;
    if (hint) hint.hidden = !on;
    versions.forEach((b) => { b.hidden = !on; });
  };
  let glideFrame = 0;
  const glide = (to: number) => {
    cancelAnimationFrame(glideFrame);
    const from = Number(divider.value);
    const start = performance.now();
    const duration = reduced ? 0 : 450;
    const step = (now: number) => {
      const k = duration ? Math.min(1, (now - start) / duration) : 1;
      divider.value = String(Math.round(from + (to - from) * (1 - (1 - k) ** 3)));
      setPos();
      if (k < 1) glideFrame = requestAnimationFrame(step);
    };
    glideFrame = requestAnimationFrame(step);
  };
  // the first version is on the left, so showing it in full means the divider at the right edge
  versions.forEach((b) => b.addEventListener('click', () => glide(b.dataset.show === '0' ? 100 : 0)));
  divider.addEventListener('input', () => { cancelAnimationFrame(glideFrame); setPos(); });
  desktop.addEventListener('change', mode);
  setPos();
  mode();
}

/* ---------- how it works: on a large screen, the four steps play in place as you scroll ---------- */
// The section gets one screen-height of scroll per step while its stage stays pinned; how far you are
// through that run picks the step on screen and fills the progress line. Past the last step the pin
// lets go and the page scrolls on, and scrolling back up runs the steps in reverse. Phones, short
// windows and reduced motion keep the plain list.
const how = document.querySelector<HTMLElement>('[data-how]');
if (how) {
  const track = how.querySelector<HTMLElement>('.how-track')!;
  const steps = [...how.querySelectorAll<HTMLElement>('[data-step]')];
  const marks = [...how.querySelectorAll<HTMLElement>('[data-mark]')];
  const bar = how.querySelector<HTMLElement>('.how-bar > span');
  const pinnable = matchMedia('(min-width: 900px) and (min-height: 620px)');
  let active = -1;
  const update = () => {
    if (!how.classList.contains('is-pinned')) return;
    const box = track.getBoundingClientRect();
    const run = box.height - innerHeight;
    const progress = run > 0 ? Math.min(1, Math.max(0, -box.top / run)) : 0;
    if (bar) bar.style.transform = `scaleX(${progress})`;
    const i = Math.min(steps.length - 1, Math.floor(progress * steps.length));
    if (i === active) return;
    active = i;
    steps.forEach((s, j) => s.classList.toggle('is-active', j === i));
    marks.forEach((m, j) => { m.classList.toggle('is-done', j < i); m.classList.toggle('is-active', j === i); });
    syncVideos();
  };
  const mode = () => {
    const on = pinnable.matches && !reduced;
    how.classList.toggle('is-pinned', on);
    if (on) steps.forEach((s) => s.classList.add('in')); // the steps swap in place, not rise one by one
    active = -1;
    update();
    syncVideos(); // pinning on or off changes which step videos count as seen
  };
  let howFrame = 0;
  const queue = () => { cancelAnimationFrame(howFrame); howFrame = requestAnimationFrame(update); };
  addEventListener('scroll', queue, { passive: true });
  addEventListener('resize', queue);
  pinnable.addEventListener('change', mode);
  mode();
}

/* ---------- prices: the apartment estimate follows the floor-area slider ---------- */
// The rule is the price list's own: a rate per m², never below the minimum (both from src/config.ts).
const estimateBox = document.querySelector<HTMLElement>('[data-estimate]');
if (estimateBox) {
  const areaInput = estimateBox.querySelector<HTMLInputElement>('input[type=range]')!;
  const areaOut = estimateBox.querySelector<HTMLElement>('[data-area]')!;
  const result = estimateBox.querySelector<HTMLElement>('[data-out]')!;
  const rate = Number(estimateBox.dataset.rate);
  const minimum = Number(estimateBox.dataset.min);
  const money = new Intl.NumberFormat(estimateBox.dataset.locale);
  const updateEstimate = () => {
    const area = Number(areaInput.value);
    areaOut.textContent = String(area);
    result.textContent = fill(estimateBox.dataset.result!, { price: money.format(Math.max(minimum, area * rate)) });
  };
  areaInput.addEventListener('input', updateEstimate);
  updateEstimate();
}

/* ---------- the language menu in the headers: closes on a click outside it or on Escape ---------- */
document.querySelectorAll<HTMLDetailsElement>('details.lang-menu').forEach((menu) => {
  document.addEventListener('click', (e) => { if (menu.open && !menu.contains(e.target as Node)) menu.open = false; });
  menu.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape' || !menu.open) return;
    menu.open = false;
    menu.querySelector('summary')?.focus();
  });
});

/* ---------- development only: switch between the site's palette and the previous graphite and teal ---------- */
// The button exists only under `npm run dev` (Base.astro); the choice is remembered in localStorage.
const devPalette = document.querySelector<HTMLButtonElement>('[data-dev-palette]');
if (devPalette) {
  const root = document.documentElement;
  const label = () => { devPalette.querySelector('[data-dev-palette-name]')!.textContent = root.dataset.palette === 'graphite' ? 'graphite and teal' : 'maroon and vermilion'; };
  devPalette.addEventListener('click', () => {
    const graphite = root.dataset.palette !== 'graphite';
    if (graphite) root.dataset.palette = 'graphite'; else delete root.dataset.palette;
    try { if (graphite) localStorage.setItem('dev-palette', 'graphite'); else localStorage.removeItem('dev-palette'); } catch {}
    label();
  });
  label();
}
