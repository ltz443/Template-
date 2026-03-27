// src/utils/tokens.js

export const FONT_LINK = “https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap”;

export const T = {
// ── Fond “Cosmic Night” — fixé, ne défile pas ──
bg:           ‘linear-gradient(160deg, #0f051d 0%, #470e9a 55%, #9026de 100%)’,
bgFixed:      true, // signal pour App.jsx : background-attachment: fixed

// ── Cartes : verre sombre semi-transparent ──
surface:      ‘rgba(255, 255, 255, 0.07)’,
surfaceHover: ‘rgba(255, 255, 255, 0.11)’,

// ── Bordures subtiles, visibles sur fond sombre ──
border:       ‘rgba(255, 255, 255, 0.12)’,
borderSoft:   ‘rgba(255, 255, 255, 0.06)’,

// ── Violet électrique — couleur principale ──
primary:      ‘#9B5CFF’,
primaryLight: ‘rgba(155, 92, 255, 0.18)’,
primaryDark:  ‘#6D28D9’,

// ── Ambre — accent chaud ──
accent:       ‘#F59E0B’,
accentLight:  ‘rgba(245, 158, 11, 0.18)’,

// ── Textes — blancs et doux sur fond sombre ──
navy:         ‘#F0EEFF’,   // ex-noir → blanc cassé
slate:        ‘#C4B8E8’,   // ex-gris foncé → lavande claire
muted:        ‘#9B8EC4’,   // ex-gris moyen → violet pâle
faint:        ‘#7A6FA8’,   // ex-gris clair → violet très pâle

// ── États ──
success:      ‘#34D399’,
successLight: ‘rgba(52, 211, 153, 0.15)’,
warn:         ‘#FBBF24’,
danger:       ‘#F87171’,
dangerLight:  ‘rgba(248, 113, 113, 0.15)’,

// ── Ombres lumineuses (glow violet) ──
shadow:       ‘0 4px 24px rgba(110, 40, 220, 0.25)’,
shadowCard:   ‘0 8px 32px rgba(80, 10, 180, 0.35)’,

// ── Géométrie ──
radius:       ‘16px’,
radiusSm:     ‘10px’,
};