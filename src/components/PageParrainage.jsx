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
            <img
              src={o.image}
              alt={o.nom}
              style={{
                display: 'block',
                width: '100%',
                height: 'auto', // La vue détail s'adapte aussi
                maxHeight: '300px',
                objectFit: 'cover',
                filter: 'drop-shadow(0 10px 18px rgba(0,0,0,0.38))'
              }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(0deg, rgba(10,2,30,0.85) 0%, transparent 60%)',
            }} />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              padding: '20px', zIndex: 2,
            }}>
              <CategoryBadge label={o.categorie} color={o.couleur} />
              <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginTop: 6, fontFamily: "'Sora', sans-serif" }}>{o.nom}</h2>
            </div>
          </div>

          <div style={{ padding: '16px 20px 20px' }}>
            <p style={{ fontSize: 14, color: T.slate, lineHeight: 1.6, marginBottom: 20 }}>{o.description}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 }}>
              <div style={{ background: T.primaryLight, borderRadius: 12, padding: '12px 8px', textAlign: 'center' }}>
                <div style={{ fontSize: 9, color: T.primary, fontWeight: 700, textTransform: 'uppercase' }}>Prix/j</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: T.primary }}>{o.prix}</div>
              </div>
              <div style={{ background: T.accentLight, borderRadius: 12, padding: '12px 8px', textAlign: 'center' }}>
                <div style={{ fontSize: 9, color: T.warn, fontWeight: 700, textTransform: 'uppercase' }}>Power</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: T.warn }}>{o.puissance}</div>
              </div>
              <div style={{ background: T.dangerLight, borderRadius: 12, padding: '12px 8px', textAlign: 'center' }}>
                <div style={{ fontSize: 9, color: T.danger, fontWeight: 700, textTransform: 'uppercase' }}>Caution</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: T.danger }}>{o.caution}</div>
              </div>
            </div>
            {o.type === 'contact' && (
              <a href={`https://instagram.com/${o.contact.replace('@', '')}`} target="_blank" rel="noreferrer" style={{ display: 'block', background: 'linear-gradient(135deg, #833AB4, #FD1D1D)', borderRadius: 12, color: '#fff', fontSize: 14, fontWeight: 700, padding: '14px', textDecoration: 'none', textAlign: 'center' }}>
                Réserver via Instagram
              </a>
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
          <button key={cat} onClick={() => setFiltre(cat)} style={{ background: filtre === cat ? T.primary : 'rgba(255,255,255,0.08)', color: filtre === cat ? '#fff' : T.muted, border: `1px solid ${filtre === cat ? T.primary : T.border}`, borderRadius: 99, padding: '7px 16px', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>
            {cat}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, alignItems: 'start' }}>
        {isCategoryEmpty ? (
          <>
            <ComingSoonCard />
            <ComingSoonCard />
          </>
        ) : (
          filtrees.map(o => (
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
                backdropFilter: 'blur(18px)',
              }}
            >
              {/* L'image ici est en height auto, donc la carte s'adapte à la photo */}
              <img
                src={o.image}
                alt={o.nom}
                style={{
                  display: 'block',
                  width: '100%',
                  height: 'auto', 
                  border: 'none',
                }}
              />
              <div style={{ padding: '12px 14px 14px' }}>
                <div style={{ fontSize: 9, color: T.faint, fontWeight: 700, textTransform: 'uppercase' }}>{o.categorie}</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#fff', marginBottom: 8 }}>{o.nom}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ background: `${o.couleur}44`, color: '#fff', padding: '2px 8px', borderRadius: 8, fontSize: 12, fontWeight: 800 }}>{o.prix}</span>
                  <span style={{ fontSize: 10, color: T.muted }}>{o.puissance}</span>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
