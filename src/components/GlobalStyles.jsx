// src/components/GlobalStyles.jsx
import React from 'react';
import { FONT_LINK } from '../utils/tokens';

const GLOBAL_CSS = `
${FONT_LINK}
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { -webkit-tap-highlight-color: transparent; }
body {
  background: #F7F5F0;
  color: #111827;
  font-family: 'Plus Jakarta Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
}
::-webkit-scrollbar { width: 4px; height: 4px; }
::-webkit-scrollbar-track { background: #F7F5F0; }
::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 99px; }
button { font-family: 'Plus Jakarta Sans', sans-serif; }
input, select { font-family: 'Plus Jakarta Sans', sans-serif; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.6; }
}
@keyframes shimmer {
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
}
@keyframes floatY {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-6px); }
}
.fade-up  { animation: fadeUp  0.35s ease both; }
.scale-in { animation: scaleIn 0.25s ease both; }

.card-grid > *:nth-child(1) { animation-delay: 0.04s; }
.card-grid > *:nth-child(2) { animation-delay: 0.08s; }
.card-grid > *:nth-child(3) { animation-delay: 0.12s; }
.card-grid > *:nth-child(4) { animation-delay: 0.16s; }
.card-grid > *:nth-child(5) { animation-delay: 0.20s; }
.card-grid > *:nth-child(6) { animation-delay: 0.24s; }
.card-grid > *:nth-child(7) { animation-delay: 0.28s; }
.card-grid > *:nth-child(8) { animation-delay: 0.32s; }

.offer-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.10) !important; }
.offer-btn { transition: transform 0.2s ease, box-shadow 0.2s ease; }
.pill-btn:hover { background: #EDE9FE !important; color: #7C3AED !important; }
.pill-btn { transition: background 0.2s, color 0.2s; }
.nav-btn:hover { background: #F3F4F6 !important; }
.nav-btn { transition: background 0.15s; }
.action-btn:hover { opacity: 0.9; transform: translateY(-1px); }
.action-btn { transition: opacity 0.2s, transform 0.2s; }
.check-item:hover .check-box { border-color: #7C3AED !important; }
.check-item { transition: opacity 0.15s; }
`;

export default function GlobalStyles() {
  return <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />;
}
