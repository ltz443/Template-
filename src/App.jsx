// ═══════════════════════════════════════════════════════════════
//  4P RENTALS — Agence de Location Premium
//  Palette   : Crème #F7F5F0 · Navy #111827 · Gold #D4AF37 · Slate #374151
// ═══════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

const FONT_LINK = `@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');`;

const GLOBAL_CSS = `
${FONT_LINK}
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
body {
  background: #F7F5F0;
  color: #111827;
  font-family: 'Plus Jakarta Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
}
@keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
.fade-up { animation: fadeUp 0.35s ease both; }
.card-grid > *:nth-child(1) { animation-delay: 0.05s; }
.card-grid > *:nth-child(2) { animation-delay: 0.10s; }
.card-grid > *:nth-child(3) { animation-delay: 0.15s; }
.offer-btn:hover { transform: translateY(-3px); box-shadow: 0 12px 30px rgba(0,0,0,0.08) !important; }
.offer-btn { transition: all 0.25s ease; }
`;

const T = {
  bg: '#F7F5F0',
  surface: '#FFFFFF',
  border: '#E5E7EB',
  primary: '#111827', // Navy profond pour le luxe
  accent: '#7C3AED',  // Violet pour le bouton d'action
  gold: '#B45309',
  muted: '#6B7280',
  shadow: '0 4px 20px rgba(0,0,0,0.05)',
  radius: '20px'
};

// ─── DONNÉES VÉHICULES ────────────────────────────────────────
const VEHICULES = [
  {
    id: 'golf-8r',
    nom: 'Volkswagen Golf 8R',
    categorie: 'Sportive',
    emoji: '🏎️',
    moteur: '320 ch',
    transmission: 'Auto',
    prix: '150€',
    description: 'La polyvalence par excellence. Un look sobre, une puissance redoutable et quatre roues motrices pour une sécurité totale.',
    conditions: [
      'Âge minimum : 21 ans',
      'Permis de conduire (2 ans min)',
      'Dépôt de garantie : 2000€',
      'Pièce d'identité valide'
    ],
    contact: '@parrain_4p'
  },
  {
    id: 'mercedes-a45',
    nom: 'Mercedes A45 S AMG',
    categorie: 'Luxe',
    emoji: '🏁',
    moteur: '421 ch',
    transmission: 'Auto',
    prix: '250€',
    description: 'Le 4 cylindres le plus puissant du monde. Une expérience sonore et dynamique incomparable.',
    conditions: [
      'Âge minimum : 25 ans',
      'Permis de conduire (3 ans min)',
      'Dépôt de garantie : 3500€',
      'Justificatif de domicile'
    ],
    contact: '@parrain_4p'
  }
];

const CATEGORIES = ['Tout', 'Citadine', 'Sportive', 'Luxe', 'SUV'];

// ─── COMPOSANTS ───────────────────────────────────────────────

function Checklist({ conditions }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <p style={{ fontSize: 12, fontWeight: 700, color: T.primary, textTransform: 'uppercase', marginBottom: 12 }}>Documents & Conditions</p>
      {conditions.map((c, i) => (
        <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, fontSize: 14, color: T.muted }}>
          <span style={{ color: T.accent }}>✓</span> {c}
        </div>
      ))}
    </div>
  );
}

function PageFlotte() {
  const [filtre, setFiltre] = useState('Tout');
  const [selected, setSelected] = useState(null);

  const filtrees = filtre === 'Tout' ? VEHICULES : VEHICULES.filter(v => v.categorie === filtre);

  if (selected) {
    const v = selected;
    return (
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '16px' }} className="fade-up">
        <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', fontWeight: 700, marginBottom: 16, cursor: 'pointer' }}>← Retour</button>
        <div style={{ background: '#FFF', borderRadius: T.radius, overflow: 'hidden', border: `1px solid ${T.border}`, boxShadow: T.shadow }}>
          <div style={{ padding: '30px', textAlign: 'center', background: '#F9FAFB' }}>
            <div style={{ fontSize: 60, marginBottom: 10 }}>{v.emoji}</div>
            <h2 style={{ fontFamily: 'Sora', fontSize: 24 }}>{v.nom}</h2>
          </div>
          <div style={{ padding: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
              <div style={{ background: '#F3F4F6', padding: '10px', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: T.muted }}>MOTEUR</div>
                <div style={{ fontWeight: 700 }}>{v.moteur}</div>
              </div>
              <div style={{ background: '#F3F4F6', padding: '10px', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: T.muted }}>TARIF / JOUR</div>
                <div style={{ fontWeight: 700, color: T.gold }}>{v.prix}</div>
              </div>
            </div>
            <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.6, marginBottom: 20 }}>{v.description}</p>
            <Checklist conditions={v.conditions} />
            <a href={`https://instagram.com/parrain_4p`} style={{ display: 'block', textAlign: 'center', background: T.primary, color: '#fff', padding: '16px', borderRadius: '14px', textDecoration: 'none', fontWeight: 700 }}>
              Réserver sur Instagram
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '16px' }}>
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 15 }}>
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setFiltre(c)} style={{
            padding: '8px 16px', borderRadius: '99px', border: `1px solid ${filtre === c ? T.primary : T.border}`,
            background: filtre === c ? T.primary : '#FFF', color: filtre === c ? '#FFF' : T.muted,
            fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap'
          }}>{c}</button>
        ))}
      </div>

      <div className="card-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
        {filtrees.map(v => (
          <button key={v.id} onClick={() => setSelected(v)} className="offer-btn fade-up" style={{
            background: '#FFF', border: `1px solid ${T.border}`, borderRadius: T.radius,
            padding: '20px', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 16
          }}>
            <div style={{ fontSize: 32, background: '#F3F4F6', width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '15px' }}>{v.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: T.gold, fontWeight: 700, textTransform: 'uppercase' }}>{v.categorie}</div>
              <div style={{ fontSize: 17, fontWeight: 800, fontFamily: 'Sora' }}>{v.nom}</div>
              <div style={{ fontSize: 14, color: T.muted }}>À partir de <span style={{ fontWeight: 700, color: T.primary }}>{v.prix}</span></div>
            </div>
            <div style={{ color: T.border }}>→</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── APP ROOT ────────────────────────────────────────────────
export default function App() {
  const [onglet, setOnglet] = useState('flotte');

  return (
    <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 80 }}>
      <style>{GLOBAL_CSS}</style>
      <header style={{ background: '#FFF', borderBottom: `1px solid ${T.border}`, padding: '24px 20px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'Sora', fontSize: 22, fontWeight: 800, letterSpacing: '-0.03em' }}>4P RENTALS</h1>
        <p style={{ fontSize: 12, color: T.muted, marginTop: 4 }}>Location de véhicules d'exception</p>
      </header>

      <main>
        {onglet === 'flotte' ? <PageFlotte /> : <div style={{ padding: 40, textAlign: 'center', color: T.muted }}>Aucun avis client pour le moment.</div>}
      </main>

      <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#FFF', borderTop: `1px solid ${T.border}`, display: 'flex', padding: '12px' }}>
        <button onClick={() => setOnglet('flotte')} style={{ flex: 1, border: 'none', background: onglet === 'flotte' ? '#F3F4F6' : 'none', padding: '12px', borderRadius: '12px', fontWeight: 700 }}>🚗 La Flotte</button>
        <button onClick={() => setOnglet('avis')} style={{ flex: 1, border: 'none', background: onglet === 'avis' ? '#F3F4F6' : 'none', padding: '12px', borderRadius: '12px', fontWeight: 700 }}>⭐ Avis</button>
      </nav>
    </div>
  );
}

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
