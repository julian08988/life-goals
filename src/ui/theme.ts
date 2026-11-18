/**
 * Design tokens. Dark-first, one luminous accent, typography-led.
 * See docs/product-concept.md §7 and docs/build-plan.md §2.
 */
export const colors = {
  background: '#07080B',
  surface: '#0E1016',
  surfaceRaised: '#151822',
  hairline: 'rgba(255,255,255,0.08)',
  text: '#F2F3F5',
  textMuted: 'rgba(242,243,245,0.62)',
  textFaint: 'rgba(242,243,245,0.38)',
  accent: '#9FD3FF',
  accentDeep: '#4FA3E3',
  accentGlow: 'rgba(159,211,255,0.16)',
  onAccent: '#07080B',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 40,
  xxl: 64,
} as const;

export const radius = {
  sm: 10,
  md: 16,
  lg: 24,
  pill: 999,
} as const;

export const type = {
  display: { fontSize: 36, lineHeight: 42, fontWeight: '300' as const, letterSpacing: -0.8 },
  title: { fontSize: 26, lineHeight: 32, fontWeight: '400' as const, letterSpacing: -0.5 },
  heading: { fontSize: 20, lineHeight: 26, fontWeight: '500' as const, letterSpacing: -0.3 },
  body: { fontSize: 17, lineHeight: 25, fontWeight: '400' as const },
  bodyMuted: { fontSize: 17, lineHeight: 25, fontWeight: '400' as const },
  label: { fontSize: 13, lineHeight: 18, fontWeight: '500' as const, letterSpacing: 1.1 },
  small: { fontSize: 14, lineHeight: 20, fontWeight: '400' as const },
} as const;

export const motion = {
  breathe: 700,
  quick: 220,
} as const;
