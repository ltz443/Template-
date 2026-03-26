import React, { useState } from 'react';
import { OFFRES, CATEGORIES } from '../data/offres';
import { T } from '../utils/tokens';

// — SOUS-COMPOSANTS INTERNES —

function Card({ children, style }) {
  return (
    <div style={{
      background: T.surface,
      borderRadius: T.radius,
      border: `1px solid ${T.border}`,
      boxShadow: T.shadow,
      ...style,
    }}>
      {children}
    </div>
  );
}

function CategoryBadge({ label, color }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      background: T.borderSoft, borderRadius: 99,
      padding: '3px 10px', fontSize: 11, fontWeight: 600, color: T.muted,
    }}>
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
          <div style={{
            width: 20, height: 20, borderRadius: 6,
            border: `2px solid ${checked[i] ? T.primary : T.border}`,
            background: checked[i] ? T.primary : 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            {checked[i] && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <span style={{ fontSize: 14, textDecoration: checked[i] ? 'line-through' : 'none', color: T.slate }}>{c}</span>
        </div>
      ))}
    </div>
  );
}

// — CARTE “BIENTÔT DISPONIBLE” —
function ComingSoonCard() {
  return (
    <div style={{
      background: T.surface,
      border: `1.5px dashed ${T.border}`,
      borderRadius: T.radius,
      padding: 16,
      textAlign: 'left',
      boxShadow: 'none',
      position: 'relative',
      overflow: 'hidden',
      opacity: 0.75,
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${T.primary}44, ${T.accent}44)`,
        borderRadius: `${T.radius} ${T.radius} 0 0`,
      }} />

      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: T.borderSoft,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 22, marginBottom: 10, marginTop: 4,
      }}>🔒</div>

      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        background: T.primaryLight, borderRadius: 99,
        padding: '3px 10px', fontSize: 10, fontWeight: 700,
        color: T.primary, marginBottom: 8,
      }}>
        <span style={{ width: 5, height: 5, borderRadius: '50%', background: T.primary }} />
        Bientôt disponible
      </div>

      <div style={{ height: 14, borderRadius: 6, background: T.borderSoft, marginBottom: 8, width: '80%' }} />
      <div style={{ height: 10, borderRadius: 6, background: T.borderSoft, width: '50%' }} />
    </div>
  );
}

// — COMPOSANT PRINCIPAL —
export default function PageParrainage({ selected, setSelected, filtre, setFiltre }) {
  const filtrees = filtre === 'Tout' ? OFFRES : OFFRES.filter(o => o.categorie === filtre);
  const isCategoryEmpty = filtre !== 'Tout' && filtrees.length === 0;

  if (selected) {
    const o = selected;
    return (
      <div className="fade-up" style={{ maxWidth: 480, margin: '0 auto' }}>
        <button
          onClick={() => setSelected(null)}
          style={{ background: 'none', border: 'none', color: T.primary, fontWeight: 600, marginBottom: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 14 }}
        >
          ← Retour
        </button>

        <Card style={{ overflow: 'hidden' }}>
          <div style={{
            background: `linear-gradient(135deg, ${o.couleur}18, ${o.couleur}08)`,
            borderBottom: `1px solid ${o.couleur}22`,
            padding: '20px 20px 16px',
          }}>
            <div style={{ display: 'flex', gap: 14, marginBottom: 14, alignItems: 'center' }}>
              <div style={{
                width: 56, height: 56, borderRadius: 16,
                background: o.couleurLight, border: `2px solid ${o.couleur}44`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 26, flexShrink: 0,
              }}>{o.emoji}</div>
              <div>
                <CategoryBadge label={o.categorie} color={o.couleur} />
                <h2 style={{ fontSize: 22, fontWeight: 800, color: T.navy, marginTop: 4 }}>{o.nom}</h2>
              </div>
            </div>
            <p style={{ fontSize: 14, color: T.slate, lineHeight: 1.6 }}>{o.description}</p>
          </div>

          <div style={{ padding: '16px 20px 20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 }}>
              <div style={{ background: T.primaryLight, borderRadius: 12, padding: '12px 8px', textAlign: 'center' }}>
                <div style={{ fontSize: 9, color: T.primary, textTransform: 'uppercase', fontWeight: 700, marginBottom: 4 }}>Prix / jour</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: T.primary }}>{o.prix}</div>
              </div>
              <div style={{ background: T.accentLight, borderRadius: 12, padding: '12px 8px', textAlign: 'center' }}>
                <div style={{ fontSize: 9, color: T.warn, textTransform: 'uppercase', fontWeight: 700, marginBottom: 4 }}>Puissance</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: T.warn }}>{o.puissance}</div>
              </div>
              <div style={{ background: '#FEE2E2', borderRadius: 12, padding: '12px 8px', textAlign: 'center' }}>
                <div style={{ fontSize: 9, color: '#DC2626', textTransform: 'uppercase', fontWeight: 700, marginBottom: 4 }}>Caution</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#DC2626' }}>{o.caution}</div>
              </div>
            </div>

            <Checklist offreId={o.id} conditions={o.conditions} />

            {o.type === 'contact' && (
              <div style={{ background: T.borderSoft, borderRadius: 14, padding: '16px', border: `1px solid ${T.border}`, textAlign: 'center' }}>
                <p style={{ fontSize: 13, color: T.slate, marginBottom: 14 }}>{o.note}</p>
                <a
                  href={`https://instagram.com/${o.contact.replace('@', '')}`}
                  target="_blank" rel="noreferrer"
                  style={{
                    display: 'inline-block', background: 'linear-gradient(135deg, #833AB4, #FD1D1D)',
                    borderRadius: 12, color: '#fff', fontSize: 14, fontWeight: 700, padding: '12px 24px', textDecoration: 'none',
                  }}
                >
                  Réserver via Instagram {o.contact}
                </a>
              </div>
            )}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 480, margin: '0 auto' }}>
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 15, scrollbarWidth: 'none' }}>
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setFiltre(cat)} style={{
            background: filtre === cat ? T.primary : T.surface,
            color: filtre === cat ? '#fff' : T.muted,
            border: `1px solid ${filtre === cat ? T.primary : T.border}`,
            borderRadius: 99, padding: '7px 16px',
            fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap',
          }}>{cat}</button>
        ))}
      </div>

      {isCategoryEmpty ? (
        <div className="fade-up">
          <div style={{ textAlign: 'center', padding: '20px 16px 24px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: T.primaryLight, borderRadius: 99, padding: '6px 16px', marginBottom: 10 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: T.primary }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: T.primary }}>Nouveautés en préparation</span>
            </div>
            <p style={{ fontSize: 13, color: T.muted }}>Des véhicules arrivent bientôt dans cette catégorie.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <ComingSoonCard />
            <ComingSoonCard />
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {filtrees.map(o => (
            <button key={o.id} onClick={() => setSelected(o)} className="offer-btn fade-up" style={{
              background: T.surface, border: `1px solid ${T.border}`,
              borderRadius: T.radius, padding: 16, textAlign: 'left',
              cursor: 'pointer', boxShadow: T.shadow, position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: o.couleur, borderRadius: `${T.radius} ${T.radius} 0 0` }} />
              <div style={{ width: 44, height: 44, borderRadius: 12, background: o.couleurLight, border: `1.5px solid ${o.couleur}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 10, marginTop: 4 }}>{o.emoji}</div>
              <div style={{ fontSize: 10, color: T.faint, fontWeight: 700, textTransform: 'uppercase', marginBottom: 3 }}>{o.categorie}</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: T.navy, marginBottom: 6 }}>{o.nom}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
                <span style={{ background: o.couleurLight, color: o.couleur, borderRadius: 99, padding: '3px 10px', fontSize: 13, fontWeight: 800 }}>{o.prix}</span>
                <span style={{ fontSize: 11, color: T.muted, fontWeight: 600 }}>{o.puissance}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
