// ═══════════════════════════════════════════════════════════════
//  4P RENTALS — Luxury Fleet System
//  Système complet avec Checklist persistante & Partage
// ═══════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

const FONT_LINK = `@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');`;

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
@keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
.fade-up { animation: fadeUp 0.35s ease both; }
.card-grid > *:nth-child(1) { animation-delay: 0.04s; }
.card-grid > *:nth-child(2) { animation-delay: 0.08s; }
.offer-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.10) !important; }
.offer-btn { transition: all 0.2s ease; }
.action-btn:hover { opacity: 0.9; transform: translateY(-1px); }
.action-btn { transition: all 0.2s; }
`;

const T = {
  bg: '#F7F5F0',
  surface: '#FFFFFF',
  border: '#E5E7EB',
  primary: '#111827',
  accent: '#7C3AED',
  gold: '#B45309',
  goldLight: '#FEF3C7',
  muted: '#6B7280',
  success: '#059669',
  successLight: '#D1FAE5',
  shadow: '0 2px 12px rgba(0,0,0,0.06)',
  radius: '16px',
};

// ─── DONNÉES DE LA FLOTTE (Transposées du système parrainage) ───
const VEHICULES = [
  {
    id: 'golf-8r',
    nom: 'Volkswagen Golf 8R',
    categorie: 'Sportive',
    emoji: '🏎️',
    couleur: '#111827',
    couleurLight: '#F3F4F6',
    bonus: '150€/j', // Affiché comme le "Bonus"
    moteur: '320 ch',
    transmission: 'DSG7',
    description: "La polyvalence par excellence. Un look sobre, une puissance redoutable et quatre roues motrices pour une sécurité totale.",
    conditions: [
      'Âge minimum : 21 ans',
      'Permis de conduire (2 ans min)',
      'Dépôt de garantie : 2000€',
      'Justificatif de domicile -3 mois',
    ],
    type: 'contact',
    contact: '@parrain_4p',
    shareText: 'Loue la Golf 8R chez 4P RENTALS !',
    shareUrl: 'https://4p-rentals.vercel.app',
  },
  {
    id: 'mercedes-a45',
    nom: 'Mercedes A45 S AMG',
    categorie: 'Luxe',
    emoji: '🏁',
    couleur: '#B45309',
    couleurLight: '#FEF3C7',
    bonus: '250€/j',
    moteur: '421 ch',
    transmission: 'AMG Speedshift',
    description: "Le 4 cylindres le plus puissant du monde. Une expérience sonore et dynamique incomparable pour vos sorties.",
    conditions: [
      'Âge minimum : 25 ans',
      'Permis de conduire (3 ans min)',
      'Dépôt de garantie : 3500€',
      'Pièce d\'identité + Permis',
    ],
    type: 'contact',
    contact: '@parrain_4p',
    shareText: 'Mercedes A45 S AMG disponible chez 4P RENTALS !',
    shareUrl: 'https://4p-rentals.vercel.app',
  }
];

const CATEGORIES = ['Tout', 'Sportive', 'Luxe', 'SUV', 'Citadine'];

// ─── SYSTÈME DE CHECKLIST (Persistant) ───────────────────────
function Checklist({ vehiculeId, conditions }) {
  const storageKey = '4p_rent_check_' + vehiculeId;
  const [checked, setChecked] = useState(() => {
    try { const s = localStorage.getItem(storageKey); return s ? JSON.parse(s) : {}; }
    catch { return {}; }
  });

  const toggle = (i) => {
    const next = { ...checked, [i]: !checked[i] };
    setChecked(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
  };

  const done = Object.values(checked).filter(Boolean).length;
  const pct = (done / conditions.length) * 100;

  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontSize: 11, fontWeight: 800, color: T.primary, textTransform: 'uppercase' }}>Dossier de location</span>
        <span style={{ fontSize: 11, fontWeight: 800, color: T.muted }}>{done}/{conditions.length}</span>
      </div>
      <div style={{ background: '#E5E7EB', height: 4, borderRadius: 2, marginBottom: 16 }}>
        <div style={{ width: `${pct}%`, background: T.gold, height: '100%', borderRadius: 2, transition: '0.3s' }} />
      </div>
      {conditions.map((c, i) => (
        <div key={i} onClick={() => toggle(i)} style={{ display: 'flex', gap: 10, marginBottom: 8, cursor: 'pointer', alignItems: 'center' }}>
          <div style={{ 
            width: 18, height: 18, border: `2px solid ${checked[i] ? T.gold : T.border}`, 
            background: checked[i] ? T.gold : 'none', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            {checked[i] && <span style={{ color: '#fff', fontSize: 12 }}>✓</span>}
          </div>
          <span style={{ fontSize: 14, color: checked[i] ? T.muted : T.primary, textDecoration: checked[i] ? 'line-through' : 'none' }}>{c}</span>
        </div>
      ))}
    </div>
  );
}

// ─── SYSTÈME DE PARTAGE ──────────────────────────────────────
function ShareButton({ item }) {
  const handleShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: item.nom, text: item.shareText, url: item.shareUrl }); } catch {}
    } else {
      navigator.clipboard.writeText(`${item.shareText} ${item.shareUrl}`);
      alert('Lien copié !');
    }
  };
  return (
    <button onClick={handleShare} className="action-btn" style={{ 
      width: '100%', background: '#F3F4F6', border: 'none', padding: '12px', borderRadius: 12, 
      fontWeight: 700, fontSize: 13, marginTop: 10, cursor: 'pointer' 
    }}>
      📤 Partager ce véhicule
    </button>
  );
}

// ─── PAGE PRINCIPALE ─────────────────────────────────────────
function PageFlotte() {
  const [filtre, setFiltre] = useState('Tout');
  const [selected, setSelected] = useState(null);

  const filtrees = filtre === 'Tout' ? VEHICULES : VEHICULES.filter(v => v.categorie === filtre);

  if (selected) {
    const v = selected;
    return (
      <div className="fade-up" style={{ maxWidth: 480, margin: '0 auto', padding: 16 }}>
        <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', fontWeight: 700, marginBottom: 16, cursor: 'pointer', color: T.gold }}>← Retour à la flotte</button>
        <div style={{ background: '#FFF', borderRadius: 24, border: `1px solid ${T.border}`, overflow: 'hidden', boxShadow: T.shadow }}>
          <div style={{ padding: 30, textAlign: 'center', background: v.couleurLight }}>
            <div style={{ fontSize: 50 }}>{v.emoji}</div>
            <h2 style={{ fontFamily: 'Sora', fontSize: 24, fontWeight: 800 }}>{v.nom}</h2>
          </div>
          <div style={{ padding: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
              <div style={{ background: '#F9FAFB', padding: 12, borderRadius: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: T.muted }}>MOTEUR</div>
                <div style={{ fontWeight: 800 }}>{v.moteur}</div>
              </div>
              <div style={{ background: T.goldLight, padding: 12, borderRadius: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: T.gold }}>TARIF</div>
                <div style={{ fontWeight: 800, color: T.gold }}>{v.bonus}</div>
              </div>
            </div>
            <Checklist vehiculeId={v.id} conditions={v.conditions} />
            <a href={`https://instagram.com/${v.contact.replace('@','')}`} target="_blank" className="action-btn" style={{ 
              display: 'block', textAlign: 'center', background: T.primary, color: '#FFF', 
              padding: 16, borderRadius: 14, textDecoration: 'none', fontWeight: 700 
            }}>Réserver via Instagram</a>
            <ShareButton item={v} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: 16 }}>
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 15, scrollbarWidth: 'none' }}>
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setFiltre(c)} style={{
            padding: '8px 16px', borderRadius: 99, border: `1px solid ${filtre === c ? T.primary : T.border}`,
            background: filtre === c ? T.primary : '#FFF', color: filtre === c ? '#FFF' : T.muted,
            fontSize: 12, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap'
          }}>{c}</button>
        ))}
      </div>
      <div className="card-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {filtrees.map(v => (
          <button key={v.id} onClick={() => setSelected(v)} className="offer-btn fade-up" style={{
            background: '#FFF', border: `1px solid ${T.border}`, borderRadius: 20,
            padding: 16, textAlign: 'left', cursor: 'pointer', position: 'relative'
          }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>{v.emoji}</div>
            <div style={{ fontSize: 10, color: T.gold, fontWeight: 800, textTransform: 'uppercase' }}>{v.categorie}</div>
            <div style={{ fontSize: 14, fontWeight: 800, fontFamily: 'Sora', height: 40 }}>{v.nom}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.primary, marginTop: 5 }}>{v.bonus}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── APP SHELL ───────────────────────────────────────────────
export default function App() {
  const [onglet, setOnglet] = useState('flotte');

  useEffect(() => {
    const s = document.createElement('style'); s.innerHTML = GLOBAL_CSS; document.head.appendChild(s);
  }, []);

  return (
    <div style={{ minHeight: '100vh', paddingBottom: 80 }}>
      <header style={{ background: '#FFF', borderBottom: `1px solid ${T.border}`, padding: '20px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: T.goldLight, padding: '4px 12px', borderRadius: 99, marginBottom: 8 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: T.gold, animation: 'pulse 2s infinite' }} />
          <span style={{ fontSize: 9, fontWeight: 800, color: T.gold, textTransform: 'uppercase' }}>Agence Premium</span>
        </div>
        <h1 style={{ fontFamily: 'Sora', fontSize: 22, fontWeight: 800 }}>4P RENTALS</h1>
      </header>

      <main>{onglet === 'flotte' ? <PageFlotte /> : <div style={{ padding: 40, textAlign: 'center' }}>Avis clients bientôt disponibles.</div>}</main>

      <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#FFF', borderTop: `1px solid ${T.border}`, display: 'flex', padding: 10, zIndex: 100 }}>
        <button onClick={() => setOnglet('flotte')} style={{ flex: 1, border: 'none', background: onglet === 'flotte' ? '#F3F4F6' : 'none', padding: 12, borderRadius: 12, fontWeight: 700, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: 20 }}>🚗</span><span style={{ fontSize: 10 }}>FLOTTE</span>
        </button>
        <button onClick={() => setOnglet('avis')} style={{ flex: 1, border: 'none', background: onglet === 'avis' ? '#F3F4F6' : 'none', padding: 12, borderRadius: 12, fontWeight: 700, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: 20 }}>⭐</span><span style={{ fontSize: 10 }}>AVIS</span>
        </button>
      </nav>
    </div>
  );
}

const container = document.getElementById('root');
if (container) { const root = createRoot(container); root.render(<App />); }
