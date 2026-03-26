import React, { useState } from 'react';
import { OFFRES, CATEGORIES } from '../data/offres';
import { T } from '../utils/tokens';

// --- SOUS-COMPOSANTS INTERNES ---
function Card({ children, style }) {
  return (
    <div style={{ background: T.surface, borderRadius: T.radius, border: `1px solid ${T.border}`, boxShadow: T.shadow, ...style }}>
      {children}
    </div>
  );
}

function CategoryBadge({ label, color }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: T.borderSoft, borderRadius: 99, padding: '3px 10px', fontSize: 11, fontWeight: 600, color: T.muted }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: color || T.primary }} />
      {label}
    </span>
  );
}

function Checklist({ offreId, conditions }) {
  const [checked, setChecked] = useState(() => {
    try { const s = localStorage.getItem('ck_' + offreId); return s ? JSON.parse(s) : {}; }
    catch { return {}; }
  });

  const toggle = (i) => {
    const next = { ...checked, [i]: !checked[i] };
    setChecked(next);
    localStorage.setItem('ck_' + offreId, JSON.stringify(next));
  };

  const done = Object.values(checked).filter(Boolean).length;
  const pct = (done / conditions.length) * 100;

  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: T.slate, textTransform: 'uppercase' }}>Étapes</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: T.muted }}>{done}/{conditions.length}</span>
      </div>
      <div style={{ background: T.borderSoft, borderRadius: 99, height: 6, marginBottom: 16, overflow: 'hidden' }}>
        <div style={{ background: `linear-gradient(90deg, ${T.primary}, ${T.accent})`, height: '100%', width: pct + '%', transition: 'width 0.4s' }} />
      </div>
      {conditions.map((c, i) => (
        <div key={i} onClick={() => toggle(i)} style={{ display: 'flex', gap: 12, padding: '8px 0', cursor: 'pointer', opacity: checked[i] ? 0.5 : 1 }}>
          <div style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${checked[i] ? T.primary : T.border}`, background: checked[i] ? T.primary : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {checked[i] && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          </div>
          <span style={{ fontSize: 14, textDecoration: checked[i] ? 'line-through' : 'none' }}>{c}</span>
        </div>
      ))}
    </div>
  );
}

// --- COMPOSANT PRINCIPAL ---
export default function PageParrainage({ selected, setSelected, filtre, setFiltre }) {
  const filtrees = filtre === 'Tout' ? OFFRES : OFFRES.filter(o => o.categorie === filtre);

  if (selected) {
    const o = selected;
    return (
      <div className="fade-up" style={{ maxWidth: 480, margin: '0 auto' }}>
        <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: T.primary, fontWeight: 600, marginBottom: 16, cursor: 'pointer' }}>← Retour</button>
        <Card style={{ padding: 20 }}>
          <div style={{ display: 'flex', gap: 14, marginBottom: 14 }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: o.couleurLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>{o.emoji}</div>
            <div>
              <CategoryBadge label={o.categorie} color={o.couleur} />
              <h2 style={{ fontSize: 22, fontWeight: 800, color: T.navy, marginTop: 4 }}>{o.nom}</h2>
            </div>
          </div>
          <Checklist offreId={o.id} conditions={o.conditions} />
          {o.type === 'lien' && (
             <a href={o.lien} target="_blank" rel="noreferrer" style={{ display: 'block', textAlign: 'center', background: T.primary, borderRadius: 14, color: '#fff', padding: '15px', textDecoration: 'none', fontWeight: 700 }}>S'inscrire via mon lien</a>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 480, margin: '0 auto' }}>
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 15, scrollbarWidth: 'none' }}>
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setFiltre(cat)} style={{ background: filtre === cat ? T.primary : T.surface, color: filtre === cat ? '#fff' : T.muted, border: `1px solid ${T.border}`, borderRadius: 99, padding: '7px 16px', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>{cat}</button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {filtrees.map(o => (
          <button key={o.id} onClick={() => setSelected(o)} className="fade-up" style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.radius, padding: 16, textAlign: 'left', cursor: 'pointer', boxShadow: T.shadow }}>
             <div style={{ fontSize: 22, marginBottom: 8 }}>{o.emoji}</div>
             <div style={{ fontSize: 10, color: T.faint, fontWeight: 700 }}>{o.categorie}</div>
             <div style={{ fontSize: 15, fontWeight: 800, color: T.navy }}>{o.nom}</div>
             <div style={{ color: o.couleur, fontWeight: 800, fontSize: 13, marginTop: 5 }}>{o.prix}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
