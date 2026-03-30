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
          background: 'rgba(12, 4, 28, 0.55)',
          backdropFilter: 'blur(22px) saturate(180%)',
          WebkitBackdropFilter: 'blur(22px) saturate(180%)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
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
      <main style={{ padding: '20px 16px 100px' }}>
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

      {/* NAVIGATION FLOTTANTE - TAILLE RÉDUITE */}
      <nav style={{
        position: 'fixed',
        bottom: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '70%',           // Plus étroit pour l'aspect premium
        maxWidth: 300,          // Limite la largeur max
        background: 'rgba(15, 5, 29, 0.85)',
        border: `1px solid ${T.border}`,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: 40,       // Très arrondi
        display: 'flex',
        padding: '5px',         // Padding minime pour que le bouton remplisse bien
        gap: 4,
        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.5)',
        zIndex: 100,
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
            borderRadius: 35,    // Match avec la nav
            padding: '10px 0',   // Hauteur contrôlée
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 13,        // Texte plus fin
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 5,
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
            borderRadius: 35,
            padding: '10px 0',
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 13,
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 5,
          }}
        >
          ⭐ Avis
        </button>
      </nav>
    </div>
  );
}
