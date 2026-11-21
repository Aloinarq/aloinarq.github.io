import { compute, cm, cm1, ROOM, STAND, SLIDE, DEFAULT_SIZE, DEFAULT_X } from './fit';

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
const fill = (text: string, values: Record<string, string>) => text.replace(/\{(\w+)\}/g, (_, k) => values[k] ?? '');

/* ---------- entrances: each part of a section rises once ---------- */
const risers = [...document.querySelectorAll<HTMLElement>('.rise')];
if (!reduced && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
  risers.forEach((el) => io.observe(el));
} else risers.forEach((el) => el.classList.add('in'));

/* ---------- videos: load and play only when on screen and motion is welcome ---------- */
const videos = [...document.querySelectorAll<HTMLVideoElement>('video[data-lazy-video]')];
if (!reduced && !saveData && 'IntersectionObserver' in window) {
  const vio = new IntersectionObserver((entries) => {
    for (const e of entries) {
      const v = e.target as HTMLVideoElement;
      if (e.isIntersecting) {
        if (!v.src) { v.src = v.dataset.src!; v.load(); }
        v.play().catch(() => {});
      } else if (!v.paused) v.pause();
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
  const show = (i: number, focus = false) => {
    tabs.forEach((t, j) => { t.setAttribute('aria-selected', String(i === j)); t.tabIndex = i === j ? 0 : -1; });
    panels.forEach((p, j) => { p.hidden = i !== j; });
    figures.forEach((f, j) => { f.hidden = i !== j; if (i === j) f.classList.add('in'); });
    if (focus) tabs[i].focus();
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => show(i));
    t.addEventListener('keydown', (e) => {
      const k = e.key;
      if (k === 'ArrowRight' || k === 'ArrowLeft' || k === 'Home' || k === 'End') {
        e.preventDefault();
        const n = k === 'Home' ? 0 : k === 'End' ? tabs.length - 1 : (i + (k === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
        show(n, true);
      }
    });
  });
  show(0);
}

/* ---------- who it's for: a link to /ro/#bucatarii opens that bar ---------- */
function openFromHash() {
  const id = decodeURIComponent(location.hash.slice(1));
  if (!id) return;
  const el = document.getElementById(id);
  if (el instanceof HTMLDetailsElement && el.classList.contains('bar')) {
    document.querySelectorAll<HTMLDetailsElement>('details.bar').forEach((b) => { b.open = b === el; b.classList.toggle('is-target', b === el); });
    el.closest('li')?.classList.add('in');
    requestAnimationFrame(() => el.scrollIntoView({ block: el.offsetHeight < innerHeight * 0.7 ? 'center' : 'start', behavior: reduced ? 'auto' : 'smooth' }));
  }
}
addEventListener('hashchange', openFromHash);
openFromHash();

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
    set($('#gapbar-mirror'), { x: ROOM.mirror.x1, y: midY - 1, width: gm, fill: r.gapMirror < 5 ? '#8a2f1c' : '#293e42' });
    set($('#gaptext-mirror'), { x: ROOM.mirror.x1 + gm / 2, y: midY - 5 });
    $('#gaptext-mirror').textContent = r.gapMirror < 0 ? '×' : `${cm(r.gapMirror, s.locale)} cm`;
    set($('#gapbar-door'), { x: r.x1, y: midY - 1, width: gd, fill: r.gapDoor < 5 ? '#8a2f1c' : '#293e42' });
    set($('#gaptext-door'), { x: r.x1 + gd / 2, y: midY - 5 });
    $('#gaptext-door').textContent = r.gapDoor < 0 ? '×' : `${cm(r.gapDoor, s.locale)} cm`;
    const thing = s.things[r.nearest];
    const gap = r.nearest === 'mirror' ? r.gapMirror : r.gapDoor;
    const status = $<HTMLElement>('#fit-status');
    status.dataset.tone = r.tone;
    status.textContent = fill(s.status[r.tone], { gap: cm(gap, s.locale), near: thing.near, into: thing.into });
    const over = r.overLeft > 0 || r.overRight > 0
      ? fill(s.overhang, { left: cm1(r.overLeft, s.locale), right: cm1(r.overRight, s.locale) })
      : s.noOverhang;
    $('#fit-detail').textContent = `${fill(s.detail, { w: cm1(r.w, s.locale), h: cm1(r.h, s.locale), dresser: s.dresser, mirror: cm(r.gapMirror, s.locale), door: cm(r.gapDoor, s.locale) })} ${over}`;
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
