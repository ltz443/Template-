import React from 'react';
import { OFFRES, CATEGORIES } from '../data/offres';
import { T } from '../utils/tokens';

// — SOUS-COMPOSANTS INTERNES —
function Card({ children, style }) {
  return (
    <div style={{
      background: T.surface,
      borderRadius: T.radius,
      border: `1px solid ${T.border}`,
      boxShadow: T.shadowCard,
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
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
      background: 'rgba(255,255,255,0.1)', borderRadius: 99,
      padding: '3px 10px', fontSize: 11, fontWeight: 600, color: '#E0D8FF',
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: color || T.primary }} />
      {label}
    </span>
  );
}

function ComingSoonCard() {
  return (
    <div style={{
      background: T.surface,
      border: `1.5px dashed ${T.border}`,
      borderRadius: T.radius,
      padding: 16,
      textAlign: 'left',
      opacity: 0.6,
    }}>
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

export default function PageParrainage({ selected, setSelected, filtre, setFiltre }) {
  const filtrees = filtre === 'Tout' ? OFFRES : OFFRES.filter(o => o.categorie === filtre);
  const isCategoryEmpty = filtre !== 'Tout' && filtrees.length === 0;

  if (selected) {
    const o = selected;
    return (
      <div className="fade-up" style={{ maxWidth: 480, margin: '0 auto' }}>
        <button
          onClick={() => setSelected(null)}
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: `1px solid ${T.border}`,
            borderRadius: 99,
            color: '#fff', fontWeight: 600, marginBottom: 16,
            cursor: 'pointer', display: 'flex', alignItems: 'center',
            gap: 6, fontSize: 14, padding: '8px 16px',
            backdropFilter: 'blur(8px)',
          }}
        >
          ← Retour
        </button>

        <Card style={{ overflow: 'hidden' }}>
          <div style={{ position: 'relative', borderBottom: `1px solid ${T.border}` }}>
            {o.imageFond ? (
              <>
                <img
                  src={o.image}
                  alt={o.nom}
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '220px',
                    objectFit: 'cover',
                    objectPosition: 'center 60%',
                    filter: 'drop-shadow(0 10px 18px rgba(0,0,0,0.38))'
                  }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(0deg, rgba(10,2,30,0.85) 0%, transparent 60%)',
                }} />
              </>
            ) : (
              <div style={{
                background: `linear-gradient(135deg, ${o.couleur}33, ${o.couleur}11)`,
                padding: '24px 20px 20px',
              }} />
            )}

            <div style={{
              position: o.imageFond ? 'absolute' : 'relative',
              bottom: 0, left: 0, right: 0,
              padding: '20px',
              zIndex: 2,
            }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                {!o.imageFond && (
                  <div style={{
                    width: 56, height: 56, borderRadius: 16,
                    background: o.couleurLight + '22',
                    border: `2px solid ${o.couleur}44`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 26, flexShrink: 0,
                  }}>{o.emoji}</div>
                )}
                <div>
                  <CategoryBadge label={o.categorie} color={o.couleur} />
                  <h2 style={{
                    fontSize: 22, fontWeight: 800,
                    color: '#fff',
                    marginTop: 6, fontFamily: "'Sora', sans-serif",
                  }}>{o.nom}</h2>
                </div>
              </div>
            </div>
          </div>

          <div style={{ padding: '16px 20px 20px' }}>
            <p style={{ fontSize: 14, color: T.slate, lineHeight: 1.6, marginBottom: 20 }}>{o.description}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1
