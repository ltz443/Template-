import React, { useState } from 'react';
import GlobalStyles from './components/GlobalStyles';
import PageParrainage from './components/PageParrainage';
import { T } from './utils/tokens';

export default function App() {
  const [onglet, setOnglet] = useState('parrainage');
  const [filtre, setFiltre] = useState('Tout');
  const [selected, setSelected] = useState(null);

  return (
    <div style={{
      minHeight: '100vh',
      background: T.bg,
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
      paddingBottom: 80,
    }}>
      <GlobalStyles />

      {/* HEADER PREMIUM */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          padding: '22px 20px 18px',
          textAlign: 'center',

          /* Effet verre premium */
          background: 'rgba(12, 4, 28, 0.55)',
          backdropFilter: 'blur(22px) saturate(180%)',
          WebkitBackdropFilter: 'blur(22px) saturate(180%)',

          /* Bordure subtile façon iOS */
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',

          /* Glow très léger */
          boxShadow: '0 4px 22px rgba(0,0,0,0.25)',
        }}
      >
        <h1
          style={{
            fontSize: 26,
            fontWeight: 800,
            color: '#FFFFFF',
            margin: 0,
            fontFamily: "'Sora', sans-serif",
            letterSpacing: '-0.02em',
            textShadow: '0 2px 8px rgba(0,0,0,0.35)',
          }}
        >
          Axis Drive
        </h1>

        <p
          style={{
            margin: '6px 0 0',
            fontSize: 11,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: T.slate,
            opacity: 0.9,
          }}
        >
          Location de véhicules de luxe
        </p>
      </header>

      {/* CONTENU PRINCIPAL */}
      <main style={{ padding: '20px 16px' }}>
        {onglet === 'parrainage' ? (
          <PageParrainage
            selected={selected}
            setSelected={setSelected}
            filtre={filtre}
            setFiltre={setFiltre}
          />
        ) : (
          <div style={{
            textAlign: 'center', padding: 40,
            color: T.muted, fontSize: 14,
          }}>
            ⭐ Avis clients bientôt disponibles
          </div>
        )}
      </main>

      {/* NAVIGATION FLOTTANTE */}
      <nav style={{
        position: 'fixed',
        bottom: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90%',
        maxWidth: 400,
        background: 'rgba(15, 5, 29, 0.80)',
        border: `1px solid ${T.border}`,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: 24,
        display: 'flex',
        padding: '8px',
        gap: 8,
        boxShadow: '0 8px 32px rgba(80, 10, 180, 0.45)',
      }}>
        <button
          onClick={() => { setOnglet('parrainage'); setSelected(null); }}
          style={{
            flex: 1,
            background: onglet === 'parrainage'
              ? `linear-gradient(135deg, ${T.primary}, ${T.primaryDark})`
              : 'transparent',
            color: onglet === 'parrainage' ? '#fff' : T.muted,
            border: 'none',
            borderRadius: 18,
            padding: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 14,
            boxShadow: onglet === 'parrainage' ? `0 4px 16px ${T.primary}60` : 'none',
            transition: 'all 0.2s',
          }}
        >
          🚗 Véhicules
        </button>

        <button
          onClick={() => { setOnglet('avis'); setSelected(null); }}
          style={{
            flex: 1,
            background: onglet === 'avis'
              ? `linear-gradient(135deg, ${T.primary}, ${T.primaryDark})`
              : 'transparent',
            color: onglet === 'avis' ? '#fff' : T.muted,
            border: 'none',
            borderRadius: 18,
            padding: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 14,
            boxShadow: onglet === 'avis' ? `0 4px 16px ${T.primary}60` : 'none',
            transition: 'all 0.2s',
          }}
        >
          ⭐ Avis
        </button>
      </nav>
    </div>
  );
}
