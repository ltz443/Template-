Import React from 'react';
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
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
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
            <img
              src={o.image}
              alt={o.nom}
              style={{
                display: 'block',
                width: '100%',
                height: 'auto',
                maxHeight: '320px',
                objectFit: 'cover'
              }}
            />
          </div>

          <div style={{ padding: '16px 20px 20px' }}>
            <p style={{ fontSize: 14, color: T.slate, lineHeight: 1.6, marginBottom: 20 }}>{o.description}</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 }}>
              <div style={{ background: T.primaryLight, borderRadius: 12, padding: '12px 8px', textAlign: 'center' }}>
                <div style={{ fontSize: 9, color: T.primary, fontWeight: 700 }}>Prix/j</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: T.primary }}>{o.prix}</div>
              </div>

              <div style={{ background: T.accentLight, borderRadius: 12, padding: '12px 8px', textAlign: 'center' }}>
                <div style={{ fontSize: 9, color: T.warn, fontWeight: 700 }}>Power</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: T.warn }}>{o.puissance}</div>
              </div>

              <div style={{ background: T.dangerLight, borderRadius: 12, padding: '12px 8px', textAlign: 'center' }}>
                <div style={{ fontSize: 9, color: T.danger, fontWeight: 700 }}>Caution</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: T.danger }}>{o.caution}</div>
              </div>
            </div>

            {o.conditions && o.conditions.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                {o.conditions.map((c, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 10,
                    padding: '8px 0',
                    borderBottom: i < o.conditions.length - 1
                      ? `1px solid ${T.borderSoft}`
                      : 'none',
                  }}>
                    <span style={{ color: T.primary, fontSize: 14, flexShrink: 0, marginTop: 1 }}>✓</span>
                    <span style={{ fontSize: 14, color: T.slate, lineHeight: 1.5 }}>{c}</span>
                  </div>
                ))}
              </div>
            )}

            <a
              href={`https://instagram.com/${o.contact.replace('@', '')}`}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'block',
                background: 'linear-gradient(135deg, #833AB4, #FD1D1D)',
                borderRadius: 12,
                color: '#fff',
                fontSize: 14,
                fontWeight: 700,
                padding: '14px',
                textDecoration: 'none',
                textAlign: 'center'
              }}
            >
              Réserver via Instagram
            </a>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 480, margin: '0 auto' }}>
      <div style={{
        display: 'flex', gap: 8, overflowX: 'auto',
        paddingBottom: 14, marginBottom: 16, scrollbarWidth: 'none',
      }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setFiltre(cat)}
            style={{
              background: filtre === cat ? T.primary : 'rgba(255,255,255,0.08)',
              color: filtre === cat ? '#fff' : T.muted,
              border: `1px solid ${filtre === cat ? T.primary : T.border}`,
              borderRadius: 99, padding: '7px 16px',
              fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap',
              fontSize: 13,
              boxShadow: filtre === cat ? `0 2px 16px ${T.primary}60` : 'none',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.2s',
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
            <button
              key={o.id}
              onClick={() => setSelected(o)}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: `1px solid ${T.border}`,
                borderRadius: 20,
                padding: 0,
                textAlign: 'left',
                cursor: 'pointer',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}
            >
              <div style={{ width: '100%', aspectRatio: '16 / 11', overflow: 'hidden' }}>
                <img
                  src={o.image}
                  alt={o.nom}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </div>
              <div style={{ padding: '12px 14px 14px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: 9, color: T.faint, fontWeight: 700, textTransform: 'uppercase' }}>
                  {o.categorie}
                </div>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#fff', marginBottom: 8 }}>
                  {o.nom}
                </div>
                <div style={{ flex: 1 }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ background: `${o.couleur}44`, color: '#fff', padding: '2px 8px', borderRadius: 8, fontSize: 12, fontWeight: 800 }}>
                    {o.prix}
                  </span>
                  <span style={{ fontSize: 10, color: T.muted }}>
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
