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

  // ── Vue détail ──
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
          {/* Header avec Image de Fond ou dégradé */}
          <div style={{
            height: o.imageFond ? 220 : 'auto',
            backgroundImage: o.imageFond ? `url(${o.imageFond})` : `linear-gradient(135deg, ${o.couleur}18, ${o.couleur}08)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            borderBottom: `1px solid ${o.couleur}22`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '20px',
          }}>
            {/* Overlay sombre si image de fond pour la lisibilité */}
            {o.imageFond && <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(0,0,0,0.7) 0%, transparent 60%)' }} />}
            
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: 14, alignItems: 'center' }}>
              {!o.imageFond && (
                <div style={{
                  width: 56, height: 56, borderRadius: 16,
                  background: o.couleurLight, border: `2px solid ${o.couleur}44`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 26, flexShrink: 0,
                }}>{o.emoji}</div>
              )}
              <div>
                <CategoryBadge label={o.categorie} color={o.couleur} />
                <h2 style={{ 
                  fontSize: 22, 
                  fontWeight: 800, 
                  color: o.imageFond ? '#fff' : T.navy, 
                  marginTop: 4, 
                  fontFamily: "'Sora', sans-serif",
                  textShadow: o.imageFond ? '0 2px 4px rgba(0,0,0,0.3)' : 'none'
                }}>{o.nom}</h2>
              </div>
            </div>
          </div>

          <div style={{ padding: '16px 20px 20px' }}>
            <p style={{ fontSize: 14, color: T.slate, lineHeight: 1.6, marginBottom: 20 }}>{o.description}</p>
            
            {/* 3 tuiles : Prix · Puissance · Caution */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 }}>
              <div style={{ background: T.primaryLight, borderRadius: 12, padding: '12px 8px', textAlign: 'center' }}>
                <div style={{ fontSize: 9, color: T.primary, textTransform: 'uppercase', fontWeight: 700, marginBottom: 4, letterSpacing: '0.06em' }}>Prix / jour</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: T.primary, fontFamily: "'Sora', sans-serif" }}>{o.prix}</div>
              </div>
              <div style={{ background: T.accentLight, borderRadius: 12, padding: '12px 8px', textAlign: 'center' }}>
                <div style={{ fontSize: 9, color: T.warn, textTransform: 'uppercase', fontWeight: 700, marginBottom: 4, letterSpacing: '0.06em' }}>Puissance</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: T.warn, fontFamily: "'Sora', sans-serif" }}>{o.puissance}</div>
              </div>
              <div style={{ background: '#FEE2E2', borderRadius: 12, padding: '12px 8px', textAlign: 'center' }}>
                <div style={{ fontSize: 9, color: '#DC2626', textTransform: 'uppercase', fontWeight: 700, marginBottom: 4, letterSpacing: '0.06em' }}>Caution</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#DC2626', fontFamily: "'Sora', sans-serif" }}>{o.caution}</div>
              </div>
            </div>

            {/* Conditions texte simple */}
            {o.conditions && o.conditions.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                {o.conditions.map((c, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 10,
                    padding: '8px 0',
                    borderBottom: i < o.conditions.length - 1 ? `1px solid ${T.borderSoft}` : 'none',
                  }}>
                    <span style={{ color: T.primary, fontSize: 14, flexShrink: 0, marginTop: 1 }}>✓</span>
                    <span style={{ fontSize: 14, color: T.slate, lineHeight: 1.5 }}>{c}</span>
                  </div>
                ))}
              </div>
            )}

            {/* CTA Instagram */}
            {o.type === 'contact' && (
              <div style={{ background: T.borderSoft, borderRadius: 14, padding: '16px', border: `1px solid ${T.border}`, textAlign: 'center' }}>
                <p style={{ fontSize: 13, color: T.slate, marginBottom: 14, lineHeight: 1.5 }}>{o.note}</p>
                <a
                  href={`https://instagram.com/${o.contact.replace('@', '')}`}
                  target="_blank" rel="noreferrer"
                  style={{
                    display: 'block',
                    background: 'linear-gradient(135deg, #833AB4, #FD1D1D)',
                    borderRadius: 12, color: '#fff',
                    fontSize: 14, fontWeight: 700, padding: '14px 24px', textDecoration: 'none',
                    textAlign: 'center',
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

  // ── Vue liste ──
  return (
    <div style={{ maxWidth: 480, margin: '0 auto' }}>
      {/* Filtres catégories */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 15, scrollbarWidth: 'none' }}>
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setFiltre(cat)} style={{
            background: filtre === cat ? T.primary : T.surface,
            color: filtre === cat ? '#fff' : T.muted,
            border: `1px solid ${filtre === cat ? T.primary : T.border}`,
            borderRadius: 99, padding: '7px 16px',
            fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap',
            boxShadow: filtre === cat ? `0 2px 12px ${T.primary}30` : 'none',
            transition: 'all 0.2s',
          }}>{cat}</button>
        ))}
      </div>

      {/* Catégorie vide ou Grille normale */}
      {isCategoryEmpty ? (
        <div className="fade-up">
          <div style={{ textAlign: 'center', padding: '20px 16px 24px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: T.primaryLight, borderRadius: 99,
              padding: '6px 16px', marginBottom: 10,
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: T.primary }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: T.primary }}>Nouveautés en préparation</span>
            </div>
            <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.5 }}>
              Des véhicules arrivent bientôt<br />dans cette catégorie.
            </p>
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
              background: T.surface, 
              border: `1px solid ${T.border}`,
              borderRadius: T.radius, 
              padding: 0, 
              textAlign: 'left',
              cursor: 'pointer', 
              boxShadow: T.shadow,
              position: 'relative', 
              overflow: 'hidden',
            }}>
              {/* Barre de couleur supérieure */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: o.couleur, zIndex: 3 }} />
              
              {/* Zone Image sans liseré blanc */}
              <div style={{
                height: 110,
                background: o.couleurLight,
                overflow: 'hidden',
                position: 'relative',
                margin: '-1px -1px 0 -1px',
              }}>
                {o.image ? (
                  <img 
                    src={o.image} 
                    alt={o.nom} 
                    style={{ 
                      width: 'calc(100% + 2px)', 
                      height: '100%', 
                      objectFit: 'cover',
                      display: 'block' 
                    }} 
                  />
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: 32 }}>
                    {o.emoji}
                  </div>
                )}
              </div>

              <div style={{ padding: '12px 16px 16px' }}>
                <div style={{ fontSize: 10, color: T.faint, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>{o.categorie}</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: T.navy, marginBottom: 6, fontFamily: "'Sora', sans-serif" }}>{o.nom}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
                  <span style={{
                    display: 'inline-block', background: o.couleurLight,
                    color: o.couleur, borderRadius: 99, padding: '3px 10px',
                    fontSize: 13, fontWeight: 800,
                  }}>{o.prix}</span>
                  <span style={{ fontSize: 11, color: T.muted, fontWeight: 600 }}>{o.puissance}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
