import React, { useState, useEffect } from 'react';
import { OFFRES, CATEGORIES } from './data/offres';
import GlobalStyles from './components/GlobalStyles';
import { FONT_LINK } from './utils/tokens';

// ─── DESIGN TOKENS ───────────────────────────────────────────
const T = {
  bg:           '#F7F5F0',
  surface:      '#FFFFFF',
  border:       '#E5E7EB',
  borderSoft:   '#F3F4F6',
  primary:      '#7C3AED',
  primaryLight: '#EDE9FE',
  primaryDark:  '#5B21B6',
  accent:       '#F59E0B',
  accentLight:  '#FEF3C7',
  navy:         '#111827',
  slate:        '#374151',
  muted:        '#6B7280',
  faint:        '#9CA3AF',
  success:      '#059669',
  successLight: '#D1FAE5',
  warn:         '#D97706',
  shadow:       '0 2px 12px rgba(0,0,0,0.06)',
  radius:       '16px',
  radiusSm:     '10px',
};

// CSS de secours pour les animations (shimmer/pulse)
const EXTRA_CSS = `
  @keyframes shimmer { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
  @keyframes pulse { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.2); } 100% { opacity: 1; transform: scale(1); } }
  .fade-up { animation: fadeUp 0.4s ease-out forwards; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
  .scale-in { animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
  @keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
`;

// ─── UI ATOMS ────────────────────────────────────────────────
function Card({ children, style, className }) {
  return (
    <div className={className} style={{
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
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: color || T.primary, flexShrink: 0 }} />
      {label}
    </span>
  );
}

// ─── CHECKLIST ───────────────────────────────────────────────
function Checklist({ offreId, conditions }) {
  const storageKey = 'checklist_v2_' + offreId;
  const [checked, setChecked] = useState(() => {
    try { const s = localStorage.getItem(storageKey); return s ? JSON.parse(s) : {}; }
    catch { return {}; }
  });

  const toggle = (i) => {
    const next = { ...checked, [i]: !checked[i] };
    setChecked(next);
    try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch { }
  };

  const total = conditions.length;
  const done = Object.values(checked).filter(Boolean).length;
  const pctDone = (done / total) * 100;

  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: T.slate, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Étapes à compléter
        </span>
        <span style={{
          fontSize: 12, fontWeight: 700, padding: '2px 10px', borderRadius: 99,
          background: done === total ? T.successLight : T.borderSoft,
          color: done === total ? T.success : T.muted,
        }}>{done}/{total}</span>
      </div>

      <div style={{ background: T.borderSoft, borderRadius: 99, height: 6, marginBottom: 16, overflow: 'hidden' }}>
        <div style={{
          background: `linear-gradient(90deg, ${T.primary}, ${T.accent})`,
          height: '100%', width: pctDone + '%', borderRadius: 99,
          transition: 'width 0.4s cubic-bezier(0.4,0,0.2,1)',
        }} />
      </div>

      {conditions.map((c, i) => (
        <div key={i} className="check-item" onClick={() => toggle(i)} style={{
          display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 10,
          cursor: 'pointer', padding: '8px 10px', borderRadius: 10,
          background: checked[i] ? T.borderSoft : 'transparent',
          transition: 'background 0.2s',
        }}>
          <div className="check-box" style={{
            width: 20, height: 20, borderRadius: 6, flexShrink: 0, marginTop: 1,
            border: `2px solid ${checked[i] ? T.primary : T.border}`,
            background: checked[i] ? T.primary : 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
          }}>
            {checked[i] && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <span style={{
            fontSize: 14, color: checked[i] ? T.faint : T.slate,
            lineHeight: 1.5, textDecoration: checked[i] ? 'line-through' : 'none',
            transition: 'color 0.2s',
          }}>{c}</span>
        </div>
      ))}

      {done === total && (
        <div className="scale-in" style={{
          background: T.successLight, border: `1px solid ${T.success}`,
          borderRadius: 12, padding: '12px 16px', textAlign: 'center', marginTop: 6,
        }}>
          <span style={{ fontSize: 14, color: T.success, fontWeight: 700 }}>
            🎉 Toutes les étapes complétées !
          </span>
        </div>
      )}
    </div>
  );
}

// ─── SHARE BUTTON ────────────────────────────────────────────
function ShareButton({ offre }) {
  const [shared, setShared] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: `${offre.nom}`, text: offre.shareText, url: offre.shareUrl }); }
      catch { }
    } else {
      try {
        await navigator.clipboard.writeText(`${offre.shareText} ${offre.shareUrl}`);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      } catch { }
    }
  };

  return (
    <button onClick={handleShare} className="action-btn" style={{
      width: '100%', background: T.borderSoft,
      border: `1.5px solid ${T.border}`, borderRadius: 12,
      color: T.slate, fontSize: 14, fontWeight: 600,
      padding: '13px', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      marginTop: 10,
    }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
      {shared ? 'Lien copié !' : 'Partager cette offre'}
    </button>
  );
}

// ─── COMPOSANTS PAGES ────────────────────────────────────────
function PageParrainage({ onSelect, selected, setSelected, filtre, setFiltre }) {
  const [copied, setCopied] = useState(false);
  const filtrees = filtre === 'Tout' ? OFFRES : OFFRES.filter(o => o.categorie === filtre);

  const copier = (texte) => {
    navigator.clipboard.writeText(texte).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  if (selected) {
    const o = selected;
    return (
      <div style={{ maxWidth: 480, margin: '0 auto' }} className="fade-up">
        <button onClick={() => setSelected(null)} style={{
          background: 'none', border: 'none', color: T.primary, fontSize: 14,
          fontWeight: 600, cursor: 'pointer', marginBottom: 16,
          display: 'flex', alignItems: 'center', gap: 6, padding: '4px 0',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Retour aux offres
        </button>

        <Card style={{ marginBottom: 16, overflow: 'hidden' }}>
          <div style={{
            background: `linear-gradient(135deg, ${o.couleur}18, ${o.couleur}08)`,
            borderBottom: `1px solid ${o.couleur}22`,
            padding: '20px 20px 16px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
              <div style={{
                width: 56, height: 56, borderRadius: 16,
                background: o.couleurLight, border: `2px solid ${o.couleur}44`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 26, flexShrink: 0,
              }}>{o.emoji}</div>
              <div>
                <CategoryBadge label={o.categorie} color={o.couleur} />
                <h2 style={{
                  fontSize: 22, fontWeight: 800, color: T.navy, marginTop: 4,
                  fontFamily: "'Sora', sans-serif",
                }}>{o.nom}</h2>
              </div>
            </div>
            <p style={{ fontSize: 14, color: T.slate, lineHeight: 1.6 }}>{o.description}</p>
          </div>
          <div style={{ padding: '16px 20px 0' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
              <div style={{ background: T.primaryLight, borderRadius: 12, padding: '14px', textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: T.primary, textTransform: 'uppercase', fontWeight: 700, marginBottom: 4, letterSpacing: '0.08em' }}>Prix</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: T.primary, fontFamily: "'Sora', sans-serif" }}>{o.prix ?? '—'}</div>
              </div>
              <div style={{ background: T.accentLight, borderRadius: 12, padding: '14px', textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: T.warn, textTransform: 'uppercase', fontWeight: 700, marginBottom: 4, letterSpacing: '0.08em' }}>Puissance</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: T.warn, fontFamily: "'Sora', sans-serif" }}>{o.puissance ?? '—'}</div>
              </div>
            </div>
            <Checklist offreId={o.id} conditions={o.conditions} />
          </div>

          <div style={{ padding: '0 20px 20px' }}>
            {o.type === 'code' && (
              <div style={{
                background: T.borderSoft, borderRadius: 14, padding: '18px',
                border: `1.5px dashed ${T.primary}`, textAlign: 'center', marginBottom: 12,
              }}>
                <div style={{ fontSize: 11, color: T.muted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Code parrainage</div>
                <div style={{
                  fontSize: 30, fontWeight: 800, color: T.primary, letterSpacing: '0.12em',
                  fontFamily: 'monospace', marginBottom: 12,
                }}>{o.code}</div>
                <button onClick={() => copier(o.code)} style={{
                  background: copied ? T.successLight : T.primary,
                  border: 'none', borderRadius: 99,
                  color: copied ? T.success : '#fff',
                  fontSize: 13, fontWeight: 700, padding: '9px 22px', cursor: 'pointer',
                }}>
                  {copied ? '✓ Copié !' : 'Copier le code'}
                </button>
              </div>
            )}

            {o.type === 'lien' && o.lien !== '#' && (
              <a href={o.lien} target="_blank" rel="noreferrer" style={{
                display: 'block', textAlign: 'center',
                background: `linear-gradient(135deg, ${T.primary}, ${T.primaryDark})`,
                borderRadius: 14, color: '#fff',
                fontSize: 15, fontWeight: 700, padding: '15px', textDecoration: 'none',
                boxShadow: `0 4px 20px ${T.primary}40`,
              }}>
                S'inscrire avec mon lien <span style={{ marginLeft: 8 }}>→</span>
              </a>
            )}

            {o.type === 'contact' && (
              <div style={{ background: T.borderSoft, borderRadius: 14, padding: '16px', border: `1px solid ${T.border}`, textAlign: 'center' }}>
                <p style={{ fontSize: 13, color: T.slate, marginBottom: 14, lineHeight: 1.5 }}>{o.note}</p>
                <a
                  href={`https://instagram.com/${o.contact.replace('@', '')}`}
                  target="_blank" rel="noreferrer"
                  style={{
                    display: 'inline-block',
                    background: 'linear-gradient(135deg, #833AB4, #FD1D1D)',
                    borderRadius: 12, color: '#fff',
                    fontSize: 14, fontWeight: 700, padding: '12px 24px', textDecoration: 'none',
                  }}>
                  Contacter {o.contact}
                </a>
              </div>
            )}
            <ShareButton offre={o} />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 480, margin: '0 auto' }}>
      <div style={{ overflowX: 'auto', display: 'flex', gap: 8, paddingBottom: 4, marginBottom: 20, scrollbarWidth: 'none' }}>
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setFiltre(cat)} style={{
            background: filtre === cat ? T.primary : T.surface,
            border: `1.5px solid ${filtre === cat ? T.primary : T.border}`,
            borderRadius: 99, color: filtre === cat ? '#fff' : T.muted,
            fontSize: 12, fontWeight: 700, padding: '7px 16px',
            cursor: 'pointer', whiteSpace: 'nowrap',
            boxShadow: filtre === cat ? `0 2px 12px ${T.primary}30` : 'none',
          }}>{cat}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {filtrees.map(o => (
          <button key={o.id} onClick={() => setSelected(o)} className="fade-up" style={{
            background: T.surface, border: `1px solid ${T.border}`,
            borderRadius: T.radius, padding: '16px 14px', cursor: 'pointer', textAlign: 'left',
            boxShadow: T.shadow, position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: o.couleur, borderRadius: '16px 16px 0 0' }} />
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: o.couleurLight, border: `1.5px solid ${o.couleur}40`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, marginBottom: 10, marginTop: 4,
            }}>{o.emoji}</div>
            <div style={{ fontSize: 10, color: T.faint, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3, fontWeight: 600 }}>{o.categorie}</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: T.navy, marginBottom: 6, fontFamily: "'Sora', sans-serif" }}>{o.nom}</div>
            <div style={{
              display: 'inline-block', background: o.couleurLight,
              color: o.couleur, borderRadius: 99, padding: '3px 10px',
              fontSize: 13, fontWeight: 800,
            }}>{o.prix}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function PageAvis() {
  return (
    <div style={{ maxWidth: 480, margin: '0 auto' }} className="fade-up">
      <Card style={{ padding: '40px 20px', textAlign: 'center', color: T.muted }}>
        <span style={{ fontSize: '48px' }}>⭐</span>
        <h3 style={{ color: T.navy, marginTop: 16 }}>Avis clients</h3>
        <p style={{ marginTop: '10px', fontSize: 14 }}>Les avis de la communauté arrivent bientôt !</p>
      </Card>
    </div>
  );
}

// ─── APP COMPONENT ───────────────────────────────────────────
const NAV_ITEMS = [
  { id: 'parrainage', label: 'Parrainages', emoji: '🎁' },
  { id: 'avis', label: 'Avis', emoji: '⭐' },
];

export default function App() {
  const [onglet, setOnglet] = useState('parrainage');
  const [filtre, setFiltre] = useState('Tout');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const tag = document.createElement('style');
    tag.textContent = EXTRA_CSS;
    document.head.appendChild(tag);
    return () => document.head.removeChild(tag);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 100 }}>
      <GlobalStyles />
      
      {/* ─── HEADER PREMIUM ─────────────────────────────────── */}
      <header style={{
        borderBottom: `1px solid ${T.border}`,
        position: 'sticky', top: 0, zIndex: 50,
        overflow: 'hidden', background: T.surface,
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse 80% 60% at 20% 120%, ${T.primary}18 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% -20%, ${T.accent}14 0%, transparent 60%), ${T.surface}`,
          zIndex: 0,
        }} />
        <div style={{
          position: 'relative', zIndex: 1,
          padding: '14px 16px 12px', textAlign: 'center', backdropFilter: 'blur(10px)',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: `linear-gradient(135deg, ${T.primaryLight}, #fff)`,
            border: `1px solid ${T.primary}30`, borderRadius: 99, padding: '4px 14px', marginBottom: 10,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: T.primary, animation: 'pulse 2s infinite' }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: T.primary, letterSpacing: '0.15em', textTransform: 'uppercase' }}>SÉLECTION EXCLUSIVE</span>
          </div>
          <h1 style={{
            fontSize: 26, fontWeight: 800, color: T.navy,
            fontFamily: "'Sora', sans-serif", letterSpacing: '-0.03em', margin: '0 0 4px 0'
          }}>
            Axis Drive
          </h1>
          <p style={{ color: T.muted, fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', margin: 0 }}>
            Location de véhicules de luxe
          </p>
        </div>
      </header>

      {/* ─── CONTENU PRINCIPAL ──────────────────────────────── */}
      <main style={{ padding: '20px 16px' }}>
        {onglet === 'parrainage' && (
          <PageParrainage 
            selected={selected} 
            setSelected={setSelected} 
            filtre={filtre} 
            setFiltre={setFiltre} 
          />
        )}
        {onglet === 'avis' && <PageAvis />}
      </main>

      {/* ─── NAVIGATION FLOTTANTE ───────────────────────────── */}
      <nav style={{
        position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)',
        width: 'calc(100% - 40px)', maxWidth: 400,
        background: 'rgba(255,255,255,0.9)', border: `1px solid ${T.border}`,
        backdropFilter: 'blur(16px)', borderRadius: 24,
        display: 'flex', zIndex: 100, padding: '8px', gap: 8,
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      }}>
        {NAV_ITEMS.map(item => {
          const active = onglet === item.id;
          return (
            <button
              key={item.id}
              onClick={() => { setOnglet(item.id); setSelected(null); }}
              style={{
                flex: 1, background: active ? T.primary : 'transparent',
                border: 'none', borderRadius: 18,
                padding: '10px 4px', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                transition: 'all 0.3s ease',
              }}>
              <span style={{ fontSize: 20 }}>{item.emoji}</span>
              <span style={{
                fontSize: 10, fontWeight: 700,
                color: active ? '#fff' : T.muted,
                textTransform: 'uppercase',
              }}>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
