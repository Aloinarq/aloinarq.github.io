/**
 * The dresser wall of the scanned bedroom (29 October), front view, in centimetres.
 * Positions come from the rebuilt model: x runs along the door wall, y is height above the floor.
 * TV sizes: the Samsung QE55QN85F from its published drawing; the others are typical 16:9 sizes
 * (screen plus a thin bezel), the same rule the viewer's catalogue uses.
 */
export const ROOM = {
  dresser: { x0: -12, x1: 99.7, top: 80.7 },
  vanity: { x0: -105.9, x1: -17, top: 75 },
  hutch: { x0: -105.9, x1: -62, y0: 75, y1: 120.5 },
  mirror: { x0: -55.2, x1: -18.8, y0: 74.2, y1: 117.4, cx: -37, cy: 95.8, r: 18.2 },
  door: { casingX0: 112.3, x0: 119.8, x1: 188.5, casingX1: 196, top: 201.8, casingTop: 209.3 },
  corner: 205.6,
  ceiling: 267,
};
export const STAND = { lift: 5.48, base: 26.39, neck: 7 };
export const SIZES = [
  { w: 97.2, h: 56.6 },
  { w: 122.76, h: 70.64 },
  { w: 145.9, h: 83.9 },
  { w: 168.0, h: 96.4 },
];
export const DEFAULT_SIZE = 1;
/** slider range on a 0.5 cm grid that contains the centre, so the default sits exactly in the middle */
export const SLIDE = { min: 1.35, max: 86.35, step: 0.5 };
export const DEFAULT_X = (ROOM.dresser.x0 + ROOM.dresser.x1) / 2;

export interface Fit {
  w: number; h: number; x0: number; x1: number; y0: number; y1: number; xc: number;
  gapMirror: number; gapDoor: number; overLeft: number; overRight: number;
  tone: 'fits' | 'tight' | 'hits'; nearest: 'mirror' | 'door';
}

export function compute(size: number, xc: number): Fit {
  const { w, h } = SIZES[size];
  const x0 = xc - w / 2, x1 = xc + w / 2;
  const y0 = ROOM.dresser.top + STAND.lift, y1 = y0 + h;
  const overlapsMirrorHeight = y0 < ROOM.mirror.y1 && y1 > ROOM.mirror.y0;
  const gapMirror = overlapsMirrorHeight ? x0 - ROOM.mirror.x1 : x0 - ROOM.vanity.x1;
  const gapDoor = ROOM.door.casingX0 - x1;
  const nearest = gapMirror <= gapDoor ? 'mirror' : 'door';
  const min = Math.min(gapMirror, gapDoor);
  const tone = min < 0 ? 'hits' : min < 5 ? 'tight' : 'fits';
  return {
    w, h, x0, x1, y0, y1, xc, gapMirror, gapDoor,
    overLeft: Math.max(0, ROOM.dresser.x0 - x0), overRight: Math.max(0, x1 - ROOM.dresser.x1),
    tone, nearest,
  };
}

/** whole centimetres for display; a positive gap under a centimetre still reads as 1 */
export const cm = (n: number, locale: string) => {
  const v = n > 0 && n < 1 ? 1 : Math.round(Math.max(0, n));
  return v.toLocaleString(locale);
};
export const cm1 = (n: number, locale: string) => (Math.round(n * 10) / 10).toLocaleString(locale, { maximumFractionDigits: 1 });

/**
 * Where a gap's "N cm" label goes: always just inside the TV, against the edge next to that gap
 * ('left' for the mirror side, 'right' for the door side), clear of the TV outline. It never sits in
 * the gap itself, so it can't overlap the frame, the mirror or the door, and never jumps.
 */
export function gapLabel(tvEdge: number, side: 'left' | 'right') {
  const PAD = 1.5;
  const FRAME = 1.4; // the TV outline's stroke width
  return side === 'left'
    ? { x: tvEdge + FRAME + PAD, anchor: 'start' as const }
    : { x: tvEdge - FRAME - PAD, anchor: 'end' as const };
}
