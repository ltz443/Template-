import React, { useState } from 'react';
import GlobalStyles from './components/GlobalStyles';
import PageParrainage from './components/PageParrainage';
import { T } from './utils/tokens';

export default function App() {
  const [onglet, setOnglet] = useState('parrainage');
  const [filtre, setFiltre] = useState('Tout');
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 100 }}>
      <GlobalStyles />
      
      {/* HEADER */}
      <header style={{ background: T.surface, borderBottom: `1px solid ${T.border}`, padding: '20px', textAlign: 'center', position: 'sticky', top: 0, zIndex: 50 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: T.navy, margin: 0 }}>Axis Drive</h1>
        <p style={{ color: T.muted, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', margin: 0 }}>Location & Parrainage</p>
      </header>

      {/* CONTENU PRINCIPAL */}
      <main style={{ padding: '20px 16px' }}>
        {onglet === 'parrainage' ? (
          <PageParrainage selected={selected} setSelected={setSelected} filtre={filtre} setFiltre={setFiltre} />
        ) : (
          <div style={{ textAlign: 'center', padding: 40, color: T.muted }}>⭐ Avis clients bientôt disponibles</div>
        )}
      </main>

      {/* NAVIGATION FLOTTANTE */}
      <nav style={{ position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)', width: '90%', maxWidth: 400, background: 'rgba(255,255,255,0.9)', border: `1px solid ${T.border}`, backdropFilter: 'blur(10px)', borderRadius: 24, display: 'flex', padding: '8px', gap: 8, boxShadow: T.shadow }}>
        <button onClick={() => {setOnglet('parrainage'); setSelected(null);}} style={{ flex: 1, background: onglet === 'parrainage' ? T.primary : 'transparent', color: onglet === 'parrainage' ? '#fff' : T.muted, border: 'none', borderRadius: 18, padding: '12px', fontWeight: 700, cursor: 'pointer' }}>🎁 Offres</button>
        <button onClick={() => {setOnglet('avis'); setSelected(null);}} style={{ flex: 1, background: onglet === 'avis' ? T.primary : 'transparent', color: onglet === 'avis' ? '#fff' : T.muted, border: 'none', borderRadius: 18, padding: '12px', fontWeight: 700, cursor: 'pointer' }}>⭐ Avis</button>
      </nav>
    </div>
  );
}
