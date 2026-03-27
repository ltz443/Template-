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
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      position: 'relative',
      overflow: 'hidden',
      opacity: 0.6,
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${T.primary}66, ${T.accent}66)`,
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
          <div style={{
            height: o.imageFond ? 220 : 'auto',
            position: 'relative',
            borderBottom: `1px solid ${T.border}`,
          }}>
            {o.imageFond ? (
              <>
                <img
                  src={o.imageFond}
                  alt={o.nom}
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    margin: 0,
                    padding: 0,
                    border: 'none',
                    outline: 'none',
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
                    textShadow: '0 2px 8px rgba(0,0,0,0.4)',
                  }}>{o.nom}</h2>
                </div>
              </div>
            </div>
          </div>

          <div style={{ padding: '16px 20px 20px' }}>
            <p style={{ fontSize: 14, color: T.slate, lineHeight: 1.6, marginBottom: 20 }}>{o.description}</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 }}>
              <div style={{ background: T.primaryLight, borderRadius: 12, padding: '12px 8px', textAlign: 'center', border: `1px solid ${T.primary}33` }}>
                <div style={{ fontSize: 9, color: T.primary, textTransform: 'uppercase', fontWeight: 700, marginBottom: 4, letterSpacing: '0.06em' }}>Prix / jour</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: T.primary, fontFamily: "'Sora', sans-serif" }}>{o.prix}</div>
              </div>
              <div style={{ background: T.accentLight, borderRadius: 12, padding: '12px 8px', textAlign: 'center', border: `1px solid ${T.accent}33` }}>
                <div style={{ fontSize: 9, color: T.warn, textTransform: 'uppercase', fontWeight: 700, marginBottom: 4, letterSpacing: '0.06em' }}>Puissance</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: T.warn, fontFamily: "'Sora', sans-serif" }}>{o.puissance}</div>
              </div>
              <div style={{ background: T.dangerLight, borderRadius: 12, padding: '12px 8px', textAlign: 'center', border: `1px solid ${T.danger}33` }}>
                <div style={{ fontSize: 9, color: T.danger, textTransform: 'uppercase', fontWeight: 700, marginBottom: 4, letterSpacing: '0.06em' }}>Caution</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: T.danger, fontFamily: "'Sora', sans-serif" }}>{o.caution}</div>
              </div>
            </div>

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

            {o.type === 'contact' && (
              <div style={{
                background: T.borderSoft, borderRadius: 14,
                padding: '16px', border: `1px solid ${T.border}`, textAlign: 'center',
              }}>
                <p style={{ fontSize: 13, color: T.slate, marginBottom: 14, lineHeight: 1.5 }}>{o.note}</p>
                <a
                  href={`https://instagram.com/${o.contact.replace('@', '')}`}
                  target="_blank" rel="noreferrer"
                  style={{
                    display: 'block',
                    background: 'linear-gradient(135deg, #833AB4, #FD1D1D)',
                    borderRadius: 12, color: '#fff',
                    fontSize: 14, fontWeight: 700, padding: '14px 24px',
                    textDecoration: 'none', textAlign: 'center',
                  }}
                >
                  Réserver via Instagram {o.contact}
                </a>
              </div>
            )}

            {o.type === 'lien' && o.lien !== '#' && (
              <a
                href={o.lien} target="_blank" rel="noreferrer"
                style={{
                  display: 'block', textAlign: 'center',
                  background: `linear-gradient(135deg, ${T.primary}, ${T.primaryDark})`,
                  borderRadius: 14, color: '#fff',
                  fontSize: 15, fontWeight: 700, padding: '15px', textDecoration: 'none',
                  boxShadow: `0 4px 20px ${T.primary}60`,
                }}
              >
                S'inscrire via mon lien →
              </a>
            )}
          </div>
        </Card>
      </div>
    );
  }

// ── Vue liste (VERSION PREMIUM OPTIMISÉE) ──
return (
  <div style={{ maxWidth: 480, margin: '0 auto' }}>
    <div style={{
      display: 'flex',
      gap: 8,
      overflowX: 'auto',
      paddingBottom: 15,
      scrollbarWidth: 'none'
    }}>
      {CATEGORIES.map(cat => (
        <button
          key={cat}
          onClick={() => setFiltre(cat)}
          style={{
            background: filtre === cat ? T.primary : 'rgba(255,255,255,0.08)',
            color: filtre === cat ? '#fff' : T.muted,
            border: `1px solid ${filtre === cat ? T.primary : T.border}`,
            borderRadius: 99,
            padding: '7px 16px',
            fontWeight: 700,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            boxShadow: filtre === cat ? `0 2px 16px ${T.primary}60` : 'none',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.25s ease'
          }}
        >
          {cat}
        </button>
      ))}
    </div>

    {isCategoryEmpty ? (
      <div className="fade-up">
        <div style={{ textAlign: 'center', padding: '20px 16px 24px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: T.primaryLight,
            borderRadius: 99,
            padding: '6px 16px',
            marginBottom: 10
          }}>
            <span style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: T.primary
            }} />
            <span style={{
              fontSize: 12,
              fontWeight: 700,
              color: T.primary
            }}>
              Nouveautés en préparation
            </span>
          </div>

          <p style={{
            fontSize: 13,
            color: T.muted,
            lineHeight: 1.5
          }}>
            Des véhicules arrivent bientôt<br />dans cette catégorie.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 12
        }}>
          <ComingSoonCard />
          <ComingSoonCard />
        </div>
      </div>
    ) : (
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 12
      }}>
        {filtrees.map(o => (
          <button
            key={o.id}
            onClick={() => setSelected(o)}
            className="offer-btn fade-up"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: `1px solid ${T.border}`,
              borderRadius: 20,
              padding: 0,
              textAlign: 'left',
              cursor: 'pointer',

              // Glow premium
              boxShadow: '0 0 28px rgba(139, 92, 246, 0.22)',

              // Verre glossy
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',

              position: 'relative',
              overflow: 'hidden',

              transition: 'transform 0.25s ease, box-shadow 0.25s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 10px 34px rgba(139, 92, 246, 0.32)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0px)';
              e.currentTarget.style.boxShadow = '0 0 28px rgba(139, 92, 246, 0.22)';
            }}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: o.couleur,
              zIndex: 10
            }} />

            <div style={{
              height: 110,
              overflow: 'hidden',
              lineHeight: 0,
              fontSize: 0
            }}>
              {o.image ? (
                <img
                  src={o.image}
                  alt={o.nom}
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    margin: 0,
                    padding: 0,
                    border: 'none',

                    // Ombre studio
                    filter: 'drop-shadow(0 10px 18px rgba(0,0,0,0.38))'
                  }}
                />
              ) : (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  fontSize: 36,
                  background: `${o.couleur}22`
                }}>
                  {o.emoji}
                </div>
              )}
            </div>

            <div style={{ padding: '12px 14px 14px' }}>
              <div style={{
                fontSize: 10,
                color: T.faint,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: 3
              }}>
                {o.categorie}
              </div>

              <div style={{
                fontSize: 15,
                fontWeight: 800,
                color: T.navy,
                marginBottom: 8,
                fontFamily: "'Sora', sans-serif",
                lineHeight: 1.2
              }}>
                {o.nom}
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span style={{
                  display: 'inline-block',
                  background: `${o.couleur}28`,
                  color: o.couleur === '#111827' ? T.primary : o.couleur,
                  borderRadius: 99,
                  padding: '3px 10px',
                  fontSize: 13,
                  fontWeight: 800,
                  border: `1px solid ${o.couleur}44`
                }}>
                  {o.prix}
                </span>

                <span style={{
                  fontSize: 11,
                  color: T.muted,
                  fontWeight: 600
                }}>
                  {o.puissance}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    )}
  </div>
);
}
