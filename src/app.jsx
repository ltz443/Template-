// ═══════════════════════════════════════════════════════════════
//  PARRAIN 4P — Redesign “Luxury Fintech Light”
//  Palette   : Crème #F7F5F0 · Navy #111827 · Violet #7C3AED · Ambre #F59E0B
//  Typo      : Sora (titres) + Plus Jakarta Sans (corps)
//  Style     : Cartes blanches, ombres douces, pill-nav flottante
// ═══════════════════════════════════════════════════════════════

import React, { useState, useEffect, useCallback } from 'react';
import { createRoot } from 'react-dom/client';

// ─── INJECT GOOGLE FONTS ──────────────────────────────────────
const FONT_LINK = `@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');`;

// ─── GLOBAL STYLES ────────────────────────────────────────────
const GLOBAL_CSS = `
${FONT_LINK}
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { -webkit-tap-highlight-color: transparent; }
body {
background: #F7F5F0;
color: #111827;
font-family: 'Plus Jakarta Sans', sans-serif;
-webkit-font-smoothing: antialiased;
}
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }
select { -webkit-appearance: none; appearance: none; }
::-webkit-scrollbar { width: 4px; height: 4px; }
::-webkit-scrollbar-track { background: #F7F5F0; }
::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 99px; }
button { font-family: 'Plus Jakarta Sans', sans-serif; }
input, select { font-family: 'Plus Jakarta Sans', sans-serif; }

@keyframes fadeUp {
from { opacity: 0; transform: translateY(16px); }
to   { opacity: 1; transform: translateY(0); }
}
@keyframes scaleIn {
from { opacity: 0; transform: scale(0.95); }
to   { opacity: 1; transform: scale(1); }
}
@keyframes pulse {
0%, 100% { opacity: 1; }
50%       { opacity: 0.6; }
}
.fade-up  { animation: fadeUp  0.35s ease both; }
.scale-in { animation: scaleIn 0.25s ease both; }

/* Staggered card animation */
.card-grid > *:nth-child(1) { animation-delay: 0.04s; }
.card-grid > *:nth-child(2) { animation-delay: 0.08s; }
.card-grid > *:nth-child(3) { animation-delay: 0.12s; }
.card-grid > *:nth-child(4) { animation-delay: 0.16s; }
.card-grid > *:nth-child(5) { animation-delay: 0.20s; }
.card-grid > *:nth-child(6) { animation-delay: 0.24s; }
.card-grid > *:nth-child(7) { animation-delay: 0.28s; }
.card-grid > *:nth-child(8) { animation-delay: 0.32s; }

.offer-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.10) !important; }
.offer-btn { transition: transform 0.2s ease, box-shadow 0.2s ease; }
.pill-btn:hover { background: #EDE9FE !important; color: #7C3AED !important; }
.pill-btn { transition: background 0.2s, color 0.2s; }
.nav-btn:hover { background: #F3F4F6 !important; }
.nav-btn { transition: background 0.15s; }
.action-btn:hover { opacity: 0.9; transform: translateY(-1px); }
.action-btn { transition: opacity 0.2s, transform 0.2s; }
.check-item:hover .check-box { border-color: #7C3AED !important; }
.check-item { transition: opacity 0.15s; }
`;

// ─── DESIGN TOKENS ───────────────────────────────────────────
const T = {
bg:       '#F7F5F0',
surface:  '#FFFFFF',
border:   '#E5E7EB',
borderSoft: '#F3F4F6',
primary:  '#7C3AED',
primaryLight: '#EDE9FE',
primaryDark: '#5B21B6',
accent:   '#F59E0B',
accentLight: '#FEF3C7',
navy:     '#111827',
slate:    '#374151',
muted:    '#6B7280',
faint:    '#9CA3AF',
success:  '#059669',
successLight: '#D1FAE5',
danger:   '#DC2626',
dangerLight: '#FEE2E2',
warn:     '#D97706',
warnLight: '#FEF3C7',
shadow:   '0 2px 12px rgba(0,0,0,0.06)',
shadowMd: '0 4px 24px rgba(0,0,0,0.09)',
shadowLg: '0 8px 40px rgba(0,0,0,0.12)',
radius:   '16px',
radiusSm: '10px',
radiusLg: '24px',
};

// ─── DONNÉES PARRAINAGE ──────────────────────────────────────
const OFFRES = [
{
id: "hellobank",
nom: 'Hello Bank',
categorie: 'Banque',
emoji: '🏦',
couleur: '#2563EB',
couleurLight: '#DBEAFE',
bonus: '80€',
bonusFilleul: '40€ + 40€',
bonusParrain: '80€',
description: 'Ouvre un compte Hello One et reçois 40€ sans dépôt, puis 40€ de plus dès le 10e achat carte.',
conditions: [
"1ère ouverture d'un compte de dépôt Hello One",
'40€ offerts sans dépôt minimum',
'40€ supplémentaires au 10e achat carte bancaire',
'Délai : 72 heures',
],
type: 'contact',
contact: '@parrain_4p',
note: 'Pour recevoir ton invitation, envoie ton prénom + adresse email sur Instagram',
shareText: 'Ouvre un compte Hello Bank et reçois 80€ ! Contacte @parrain_4p sur Instagram.',
shareUrl: 'https://parrain-4p.vercel.app',
},
{
id: 'joko',
nom: 'Joko',
categorie: 'Cashback',
emoji: '💸',
couleur: '#EA580C',
couleurLight: '#FFEDD5',
bonus: '1€ + cashback',
bonusFilleul: '1€ à l\'inscription',
bonusParrain: '3€ + 10% cashback filleul',
description: 'Joko transforme tes achats quotidiens en micro-économies automatiques en connectant ton compte bancaire.',
conditions: [
'Télécharger l\'app Joko',
'Connecter son compte bancaire',
'1€ offert à l\'inscription avec le code',
'Délai : instantané',
],
type: 'code',
code: 'skevdw',
shareText: 'Rejoins Joko avec mon code skevdw et gagne 1€ + du cashback automatique !',
shareUrl: 'https://parrain-4p.vercel.app',
},
{
id: 'coinbase',
nom: 'Coinbase',
categorie: 'Crypto',
emoji: '₿',
couleur: '#0052FF',
couleurLight: '#DBEAFE',
bonus: '20€',
bonusFilleul: '20€ en Bitcoin',
bonusParrain: '20€',
description: 'Coinbase est la plateforme de référence pour acheter, vendre et stocker des cryptomonnaies en toute sécurité.',
conditions: [
'S\'inscrire via le lien de parrainage',
'Valider son identité (KYC)',
'Déposer 20€',
'Acheter 20€ de Bitcoin (BTC)',
'Reçois 20€ de Bitcoin après 24h — retirable intégralement',
],
type: 'lien',
lien: 'https://coinbase.com/join/954EBFS?src=ios-link',
shareText: 'Inscris-toi sur Coinbase via mon lien et reçois 20€ en Bitcoin !',
shareUrl: 'https://coinbase.com/join/954EBFS?src=ios-link',
},
{
id: 'veracash',
nom: 'VeraCash',
categorie: 'Or & Épargne',
emoji: '🥇',
couleur: '#B45309',
couleurLight: '#FEF3C7',
bonus: '10€ parrain',
bonusFilleul: 'Frais réduits',
bonusParrain: '10€',
description: 'VeraCash permet d\'épargner et payer avec de l\'or et de l\'argent physique. Une alternative solide aux banques classiques.',
conditions: [
'S\'inscrire via le lien de parrainage',
'Vérifier son identité',
'Déposer 10€ (retirable immédiatement)',
'Frais de gestion réduits à vie',
],
type: 'lien',
lien: 'https://www.veracash.com/fr/inscription?sponsorMemberPseudo=DEVOMIZO',
shareText: 'Épargne en or avec VeraCash ! Inscris-toi via mon lien pour des frais réduits à vie.',
shareUrl: 'https://www.veracash.com/fr/inscription?sponsorMemberPseudo=DEVOMIZO',
},
{
id: 'robinhood',
nom: 'Robinhood',
categorie: 'Crypto Exchange',
emoji: '🏹',
couleur: '#16A34A',
couleurLight: '#D1FAE5',
bonus: '10€',
bonusFilleul: '10€',
bonusParrain: '10€',
description: 'Robinhood est un exchange crypto simple et intuitif pour acheter et vendre des cryptomonnaies sans frais cachés.',
conditions: [
'S\'inscrire via le lien de parrainage',
'Valider son identité',
'Déposer 10€ (retirable immédiatement)',
'Délai : immédiat',
],
type: 'lien',
lien: 'https://join.robinhood.com/eu_crypto/leot-ad308a260/',
shareText: 'Rejoins Robinhood et reçois 10€ ! Dépôt retirable immédiatement.',
shareUrl: 'https://join.robinhood.com/eu_crypto/leot-ad308a260/',
},
{
id: 'winamax',
nom: 'Winamax',
categorie: 'Paris Sportifs',
emoji: '⚽',
couleur: '#DC2626',
couleurLight: '#FEE2E2',
bonus: '40€',
bonusFilleul: '40€',
bonusParrain: '40€',
description: 'Winamax est la référence des paris sportifs en France. Inscris-toi avec le code parrainage et reçois 40€.',
conditions: [
'S\'inscrire avec le code parrainage',
'Valider son inscription',
'Déposer 10€',
'Prime filleul : 40€ — Prime parrain : 40€',
],
type: 'code',
code: 'LTZXVU',
shareText: 'Inscris-toi sur Winamax avec le code LTZXVU et reçois 40€ !',
shareUrl: 'https://parrain-4p.vercel.app',
},
{
id: 'betsson',
nom: 'Betsson',
categorie: 'Paris Sportifs',
emoji: '🎯',
couleur: '#7C3AED',
couleurLight: '#EDE9FE',
bonus: '10€ Betboost',
bonusFilleul: '10€ Betboost',
bonusParrain: '10€ Betboost',
description: 'Betsson est une plateforme de paris sportifs internationale. Reçois 10€ Betboost en parrainant.',
conditions: [
'S\'inscrire via le lien',
'Vérifier son compte',
'Déposer 10€',
'Prime filleul : 10€ Betboost — Prime parrain : 10€ Betboost',
],
type: 'lien',
lien: 'https://betsson.fr/fr/%23register?language=fr&referralCode=8LAFsK',
shareText: 'Inscris-toi sur Betsson via mon lien et reçois 10€ Betboost !',
shareUrl: 'https://betsson.fr/fr/%23register?language=fr&referralCode=8LAFsK',
},
{
id: 'unibet',
nom: 'Unibet',
categorie: 'Paris Sportifs',
emoji: '💰',
couleur: '#0891B2',
couleurLight: '#CFFAFE',
bonus: '30€',
bonusFilleul: '30€ Freebets',
bonusParrain: '30€ Freebets',
description: 'Unibet est une plateforme de paris sportifs internationale. Reçois 30€.',
conditions: [
'S\'inscrire via le lien',
'Vérifier son compte',
'Déposer 10€',
'Prime filleul : 30€ Freebets — Prime parrain : 30€ Freebets',
],
type: 'lien',
lien: 'https://www.unibet.fr/inscription/?campaign=240326&parrain=AC1330D7A4D09111',
shareText: 'Inscris-toi sur Unibet via mon lien et reçois 30€ en Freebets !',
shareUrl: 'https://www.unibet.fr/inscription/?campaign=240326&parrain=AC1330D7A4D09111',
},
];

const CATEGORIES = ['Tout', 'Banque', 'Cashback', 'Crypto', 'Or & Épargne', 'Crypto Exchange', 'Paris Sportifs'];

const STRIPE_LINK = 'https://buy.stripe.com/14A8wPadZ2MmbRF0A4a3u00';
const TAUX_OPTIONS = [
{ label: 'Auto-entrepreneur — Prestation de services (21.2%)', value: 21.2 },
{ label: 'Auto-entrepreneur — Vente de marchandises (12.8%)', value: 12.8 },
{ label: 'EIRL / EI au réel (estimation 45%)', value: 45 },
{ label: 'Personnalisé', value: null },
];

// ─── HELPERS ─────────────────────────────────────────────────
const fmt = (n) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n || 0);
const pct = (n) => `${(n || 0).toFixed(1)}%`;

function calcul(f) {
const prixVente  = parseFloat(f.prixVente)  || 0;
const matieres   = parseFloat(f.matieres)   || 0;
const transport  = parseFloat(f.transport)  || 0;
const outillage  = parseFloat(f.outillage)  || 0;
const autresFrais= parseFloat(f.autresFrais)|| 0;
const heures     = parseFloat(f.heures)     || 0;
const tauxHoraire= parseFloat(f.tauxHoraire)|| 0;
const taux       = parseFloat(f.tauxCotisations) || 0;
const coutMain   = heures * tauxHoraire;
const cotisations= (prixVente * taux) / 100;
const totalCharges = matieres + transport + outillage + autresFrais + coutMain + cotisations;
const beneficeNet  = prixVente - totalCharges;
const marge        = prixVente > 0 ? (beneficeNet / prixVente) * 100 : 0;
let sante = 'Déficitaire';
if (marge >= 20)     sante = 'Rentable';
else if (marge >= 0) sante = 'À risque';
return { prixVente, matieres, transport, outillage, autresFrais, coutMain, cotisations, totalCharges, beneficeNet, marge, sante };
}

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

function InputField({ label, value, onChange, placeholder, prefix, hint }) {
const [focused, setFocused] = useState(false);
return (
<div style={{ marginBottom: 14 }}>
<label style={{
display: 'block', fontSize: 12, fontWeight: 600, color: T.slate,
marginBottom: 6, letterSpacing: '0.01em',
}}>{label}</label>
<div style={{ position: 'relative' }}>
<span style={{
position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)',
color: focused ? T.primary : T.faint, fontSize: 13, fontWeight: 700,
transition: 'color 0.2s', userSelect: 'none',
}}>{prefix || '€'}</span>
<input
type="number" min="0" step="0.01" value={value}
onChange={(e) => onChange(e.target.value)}
onFocus={() => setFocused(true)}
onBlur={() => setFocused(false)}
placeholder={placeholder || '0'}
inputMode="decimal"
style={{
width: '100%', background: focused ? '#FAFBFF' : T.borderSoft,
border: `1.5px solid ${focused ? T.primary : T.border}`,
borderRadius: T.radiusSm, color: T.navy, fontSize: 15, fontWeight: 600,
padding: '11px 13px 11px 32px', outline: 'none', boxSizing: 'border-box',
transition: 'border-color 0.2s, background 0.2s',
}}
/>
</div>
{hint && <p style={{ fontSize: 11, color: T.faint, marginTop: 5, paddingLeft: 2 }}>{hint}</p>}
</div>
);
}

function FormSection({ title, icon, children }) {
return (
<Card style={{ padding: '20px', marginBottom: 12 }}>
<div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
<div style={{
width: 32, height: 32, borderRadius: 9, background: T.primaryLight,
display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15,
}}>{icon}</div>
<h3 style={{ fontSize: 13, fontWeight: 700, color: T.navy, letterSpacing: '0.03em', textTransform: 'uppercase' }}>{title}</h3>
</div>
{children}
</Card>
);
}

function Checklist({ offreId, conditions }) {
const storageKey = 'checklist_v2_' + offreId;
const [checked, setChecked] = useState(() => {
try { const s = localStorage.getItem(storageKey); return s ? JSON.parse(s) : {}; }
catch { return {}; }
});

const toggle = (i) => {
const next = { ...checked, [i]: !checked[i] };
setChecked(next);
try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch {}
};

const total = conditions.length;
const done  = Object.values(checked).filter(Boolean).length;
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
            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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

function ShareButton({ offre }) {
const [shared, setShared] = useState(false);

const handleShare = async () => {
if (navigator.share) {
try {
await navigator.share({ title: `${offre.nom} — ${offre.bonus}`, text: offre.shareText, url: offre.shareUrl });
} catch {}
} else {
try {
await navigator.clipboard.writeText(`${offre.shareText} ${offre.shareUrl}`);
setShared(true);
setTimeout(() => setShared(false), 2000);
} catch {}
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
<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
<line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
</svg>
{shared ? 'Lien copié !' : 'Partager cette offre'}
</button>
);
}

function PageParrainage() {
const [filtre, setFiltre]   = useState('Tout');
const [selected, setSelected] = useState(null);
const [copied, setCopied]   = useState(false);

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
<div style={{ maxWidth: 480, margin: '0 auto', padding: '16px' }} className="fade-up">
<button onClick={() => setSelected(null)} style={{
background: 'none', border: 'none', color: T.primary, fontSize: 14,
fontWeight: 600, cursor: 'pointer', marginBottom: 16,
display: 'flex', alignItems: 'center', gap: 6, padding: '4px 0',
}}>
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
<path d="M19 12H5M12 5l-7 7 7 7"/>
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
            background: o.couleurLight,
            border: `2px solid ${o.couleur}44`,
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
          <div style={{
            background: T.primaryLight, borderRadius: 12, padding: '14px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 10, color: T.primary, textTransform: 'uppercase', fontWeight: 700, marginBottom: 4, letterSpacing: '0.08em' }}>Prime parrain</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: T.primary, fontFamily: "'Sora', sans-serif" }}>{o.bonusParrain}</div>
          </div>
          <div style={{
            background: T.accentLight, borderRadius: 12, padding: '14px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 10, color: T.warn, textTransform: 'uppercase', fontWeight: 700, marginBottom: 4, letterSpacing: '0.08em' }}>Filleul reçoit</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: T.warn, fontFamily: "'Sora', sans-serif" }}>{o.bonusFilleul}</div>
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
            <button onClick={() => copier(o.code)} className="action-btn" style={{
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
          <a href={o.lien} target="_blank" rel="noreferrer" className="action-btn" style={{
            display: 'block', textAlign: 'center',
            background: `linear-gradient(135deg, ${T.primary}, ${T.primaryDark})`,
            borderRadius: 14, color: '#fff',
            fontSize: 15, fontWeight: 700, padding: '15px', textDecoration: 'none',
            boxShadow: `0 4px 20px ${T.primary}40`,
            marginBottom: 0,
          }}>
            S'inscrire avec mon lien
            <span style={{ marginLeft: 8 }}>→</span>
          </a>
        )}

        {o.type === 'contact' && (
          <div style={{ background: T.borderSoft, borderRadius: 14, padding: '16px', border: `1px solid ${T.border}`, textAlign: 'center' }}>
            <p style={{ fontSize: 13, color: T.slate, marginBottom: 14, lineHeight: 1.5 }}>{o.note}</p>
            <a
              href={`https://instagram.com/${o.contact.replace('@', '')}`}
              target="_blank" rel="noreferrer" className="action-btn"
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
<div style={{ maxWidth: 480, margin: '0 auto', padding: '16px' }}>
<div style={{ overflowX: 'auto', display: 'flex', gap: 8, paddingBottom: 4, marginBottom: 20, scrollbarWidth: 'none' }}>
{CATEGORIES.map(cat => (
<button key={cat} onClick={() => setFiltre(cat)} className="pill-btn" style={{
background: filtre === cat ? T.primary : T.surface,
border: `1.5px solid ${filtre === cat ? T.primary : T.border}`,
borderRadius: 99, color: filtre === cat ? '#fff' : T.muted,
fontSize: 12, fontWeight: 700, padding: '7px 16px',
cursor: 'pointer', whiteSpace: 'nowrap',
boxShadow: filtre === cat ? `0 2px 12px ${T.primary}30` : 'none',
}}>{cat}</button>
))}
</div>

  <div className="card-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
    {filtrees.map(o => (
      <button key={o.id} onClick={() => setSelected(o)} className="offer-btn fade-up" style={{
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
        }}>{o.bonus}</div>
      </button>
    ))}
  </div>

  <Card style={{ padding: '22px', textAlign: 'center' }}>
    <div style={{
      width: 40, height: 40, borderRadius: 12, background: T.accentLight,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 20, margin: '0 auto 12px',
    }}>📥</div>
    <h3 style={{ fontSize: 16, fontWeight: 800, color: T.navy, marginBottom: 6, fontFamily: "'Sora', sans-serif" }}>
      Newsletter Exclusive
    </h3>
    <p style={{ fontSize: 13, color: T.muted, marginBottom: 18, lineHeight: 1.5 }}>
      Reçois les nouveaux bons plans avant tout le monde.
    </p>
    <div style={{ display: 'flex', gap: 8 }}>
      <input
        type="email"
        placeholder="Ton adresse email..."
        style={{
          flex: 1, background: T.borderSoft, border: `1.5px solid ${T.border}`,
          borderRadius: 10, color: T.navy, padding: '11px 14px', outline: 'none',
          fontSize: 14,
        }}
      />
      <button className="action-btn" style={{
        background: T.primary, border: 'none', borderRadius: 10,
        color: '#fff', fontWeight: 700, padding: '0 18px', cursor: 'pointer',
        fontSize: 14,
      }}>OK</button>
    </div>
  </Card>
</div>
);
}

function PageAvis() {
const avis = [
{ nom: 'Lucas', date: 'Il y a 2 jours', texte: "Super rapide pour Hello Bank, j’ai reçu mes 80€ comme prévu !", note: 5 },
{ nom: 'Sarah', date: 'La semaine dernière', texte: 'Le calculateur ProfitMaster est bluffant de précision.', note: 5 },
{ nom: 'Tom', date: 'Il y a 1 mois', texte: 'Déjà 120€ de gains cumulés grâce aux offres crypto. Top !', note: 5 },
];

return (
<div style={{ maxWidth: 480, margin: '0 auto', padding: '16px' }} className="fade-up">
<Card style={{ padding: '20px', marginBottom: 20, textAlign: 'center', background: `linear-gradient(135deg, ${T.primaryLight}, ${T.accentLight})` }}>
<div style={{ fontSize: 36, fontWeight: 800, color: T.navy, fontFamily: "'Sora', sans-serif", lineHeight: 1 }}>4.9</div>
<div style={{ color: T.accent, fontSize: 20, margin: '6px 0' }}>★★★★★</div>
<div style={{ fontSize: 13, color: T.muted, fontWeight: 500 }}>Note moyenne · 3 avis vérifiés</div>
</Card>
  <h2 style={{ fontSize: 18, fontWeight: 800, color: T.navy, marginBottom: 16, fontFamily: "'Sora', sans-serif" }}>
    Avis de la Communauté
  </h2>
  {avis.map((a, i) => (
    <Card key={i} style={{ padding: '18px', marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 99, background: T.primaryLight,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, fontSize: 14, color: T.primary, fontFamily: "'Sora', sans-serif",
          }}>{a.nom[0]}</div>
          <div>
            <div style={{ fontWeight: 700, color: T.navy, fontSize: 14 }}>{a.nom}</div>
            <div style={{ fontSize: 11, color: T.faint }}>{a.date}</div>
          </div>
        </div>
        <div style={{ color: T.accent, fontSize: 13 }}>{'★'.repeat(a.note)}</div>
      </div>
      <p style={{ fontSize: 14, color: T.slate, lineHeight: 1.6, fontStyle: 'italic' }}>"{a.texte}"</p>
    </Card>
  ))}
</div>
);
}

function PageCalculateur() {
const [fields, setFields] = useState({
prixVente: '', matieres: '', transport: '', outillage: '', autresFrais: '',
heures: '', tauxHoraire: '', tauxCotisations: '21.2', tauxPersonnalise: '', tauxOption: '21.2',
});
const [showPaywall, setShowPaywall] = useState(false);
const [pdfPaid, setPdfPaid] = useState(false);

const setField = (key) => (val) => setFields(prev => ({ ...prev, [key]: val }));
const res = calcul(fields);

useEffect(() => {
const params = new URLSearchParams(window.location.search);
if (params.get('paid') === 'true') setPdfPaid(true);
}, []);

const handlePDFClick = useCallback(() => {
if (pdfPaid) alert('Fonctionnalité PDF disponible');
else setShowPaywall(true);
}, [pdfPaid]);

const tauxActuel = fields.tauxOption === 'custom'
? (parseFloat(fields.tauxPersonnalise) || 0)
: parseFloat(fields.tauxOption);

useEffect(() => {
setFields(prev => ({ ...prev, tauxCotisations: String(tauxActuel) }));
}, [tauxActuel]);

const santeColor  = res.sante === 'Rentable' ? T.success : res.sante === 'À risque' ? T.warn : T.danger;
const santeBg     = res.sante === 'Rentable' ? T.successLight : res.sante === 'À risque' ? T.warnLight : T.dangerLight;
const santeEmoji  = res.sante === 'Rentable' ? '✅' : res.sante === 'À risque' ? '⚠️' : '🔴';

return (
<div style={{ maxWidth: 480, margin: '0 auto', padding: '16px' }} className="fade-up">
<FormSection title="Revenus" icon="💰">
<InputField
label="Prix de vente estimé"
value={fields.prixVente}
onChange={setField('prixVente')}
hint="Le montant facturé au client"
/>
</FormSection>

  <FormSection title="Coûts directs" icon="📦">
    <InputField label="Matières premières" value={fields.matieres} onChange={setField('matieres')} />
    <InputField label="Transport / Essence" value={fields.transport} onChange={setField('transport')} />
    <InputField label="Outillage" value={fields.outillage} onChange={setField('outillage')} />
    <InputField label="Autres frais" value={fields.autresFrais} onChange={setField('autresFrais')} />
  </FormSection>

  <FormSection title="Temps passé" icon="🕐">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
      <InputField label="Heures" prefix="h" value={fields.heures} onChange={setField('heures')} />
      <InputField label="Taux / heure" value={fields.tauxHoraire} onChange={setField('tauxHoraire')} />
    </div>
    <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>
      Coût main-d'œuvre : <strong style={{ color: T.slate }}>{fmt(res.coutMain)}</strong>
    </div>
  </FormSection>

  <FormSection title="Fiscalité" icon="🏛️">
    <div style={{ position: 'relative', marginBottom: 12 }}>
      <select
        value={fields.tauxOption}
        onChange={(e) => setFields(prev => ({ ...prev, tauxOption: e.target.value }))}
        style={{
          width: '100%', background: T.borderSoft,
          border: `1.5px solid ${T.border}`, borderRadius: T.radiusSm,
          color: T.navy, fontSize: 13, fontWeight: 500,
          padding: '11px 40px 11px 14px', outline: 'none', cursor: 'pointer',
        }}>
        {TAUX_OPTIONS.map(o => (
          <option key={o.label} value={o.value === null ? 'custom' : String(o.value)}>{o.label}</option>
        ))}
      </select>
      <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: T.muted, pointerEvents: 'none', fontSize: 12 }}>▼</span>
    </div>
    {fields.tauxOption === 'custom' && (
      <InputField label="Taux personnalisé (%)" prefix="%" value={fields.tauxPersonnalise} onChange={setField('tauxPersonnalise')} />
    )}
    <div style={{ fontSize: 12, color: T.muted }}>
      Cotisations : <strong style={{ color: T.slate }}>{fmt(res.cotisations)}</strong>
    </div>
  </FormSection>

  {res.prixVente > 0 ? (
    <div>
      <div style={{ fontSize: 11, fontWeight: 700, color: T.muted, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
        Résultats en temps réel
      </div>
      <div style={{
        background: santeBg, border: `1.5px solid ${santeColor}44`,
        borderRadius: 14, padding: '14px 16px',
        display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14,
      }}>
        <span style={{ fontSize: 22 }}>{santeEmoji}</span>
        <div>
          <div style={{ fontSize: 10, color: T.muted, textTransform: 'uppercase', fontWeight: 600, marginBottom: 2 }}>Santé du projet</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: santeColor, fontFamily: "'Sora', sans-serif" }}>{res.sante}</div>
        </div>
        <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
          <div style={{ fontSize: 10, color: T.muted, marginBottom: 2 }}>Marge nette</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: santeColor, fontFamily: "'Sora', sans-serif" }}>{pct(res.marge)}</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
        {[
          { label: 'Bénéfice Net', value: fmt(res.beneficeNet), highlight: true },
          { label: 'Total Charges', value: fmt(res.totalCharges), highlight: false },
          { label: 'Cotisations', value: fmt(res.cotisations), highlight: false },
          { label: 'Coût MO', value: fmt(res.coutMain), highlight: false },
        ].map(({ label, value, highlight }) => (
          <Card key={label} style={{
            padding: '14px 16px',
            background: highlight ? T.primaryLight : T.surface,
            border: `1.5px solid ${highlight ? T.primary + '44' : T.border}`,
          }}>
            <div style={{ fontSize: 10, color: highlight ? T.primary : T.muted, textTransform: 'uppercase', fontWeight: 600, marginBottom: 4 }}>{label}</div>
            <div style={{ fontSize: highlight ? 20 : 16, fontWeight: 800, color: highlight ? T.primary : T.navy, fontFamily: "'Sora', sans-serif" }}>{value}</div>
          </Card>
        ))}
      </div>
      <Card style={{ padding: '18px', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: T.accentLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>🚀</div>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: T.navy, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Simulation mensuelle</h3>
        </div>
        {[5, 10, 20, 30, 50].map((nb) => (
          <div key={nb} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '11px 14px', marginBottom: 6, borderRadius: 10,
            background: res.beneficeNet * nb >= 2000 ? T.successLight : T.borderSoft,
            border: `1px solid ${res.beneficeNet * nb >= 2000 ? T.success + '44' : T.border}`,
          }}>
            <span style={{ fontSize: 13, color: T.slate }}>
              <strong style={{ color: T.navy, fontWeight: 700 }}>{nb} clients</strong> / mois
            </span>
            <span style={{
              fontSize: 15, fontWeight: 800, fontFamily: "'Sora', sans-serif",
              color: res.beneficeNet * nb >= 2000 ? T.success : T.navy,
            }}>{fmt(res.beneficeNet * nb)}</span>
          </div>
        ))}
      </Card>
      <button onClick={handlePDFClick} className="action-btn" style={{
        width: '100%',
        background: pdfPaid ? `linear-gradient(135deg, ${T.success}, #047857)` : `linear-gradient(135deg, ${T.primary}, ${T.primaryDark})`,
        border: 'none', borderRadius: 14, color: '#fff',
        fontSize: 14, fontWeight: 700, padding: '15px', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        boxShadow: `0 4px 20px ${T.primary}35`,
      }}>
        <span style={{ fontSize: 16 }}>📄</span>
        {pdfPaid ? 'Télécharger mon Bilan PDF' : 'Télécharger le Bilan PDF — 2,00 €'}
      </button>
    </div>
  ) : (
    <Card style={{ padding: '40px 20px', textAlign: 'center' }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>📊</div>
      <p style={{ fontSize: 15, color: T.muted, lineHeight: 1.6 }}>
        Renseignez votre prix de vente<br/>pour voir vos résultats.
      </p>
    </Card>
  )}

  {showPaywall && (
    <div className="scale-in" style={{
      position: 'fixed', inset: 0, zIndex: 999,
      background: 'rgba(17,24,39,0.6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20, backdropFilter: 'blur(12px)',
    }}>
      <Card style={{ maxWidth: 360, width: '100%', padding: '32px 28px', position: 'relative', boxShadow: T.shadowLg }}>
        <button onClick={() => setShowPaywall(false)} style={{
          position: 'absolute', top: 16, right: 16,
          background: T.borderSoft, border: 'none', borderRadius: 99,
          color: T.muted, width: 30, height: 30, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16,
        }}>✕</button>
        <div style={{ fontSize: 36, marginBottom: 14 }}>🔒</div>
        <h2 style={{ color: T.navy, fontSize: 20, fontWeight: 800, marginBottom: 6, fontFamily: "'Sora', sans-serif" }}>
          Sécurisez votre projet
        </h2>
        <p style={{ fontSize: 13, color: T.muted, marginBottom: 20, lineHeight: 1.5 }}>
          Exportez votre bilan en PDF professionnel, prêt à partager avec un comptable ou un client.
        </p>
        <div style={{
          background: T.primaryLight, borderRadius: 14,
          padding: '18px', marginBottom: 20, textAlign: 'center',
        }}>
          <div style={{ fontSize: 38, fontWeight: 800, color: T.primary, fontFamily: "'Sora', sans-serif" }}>2,00 €</div>
          <div style={{ fontSize: 12, color: T.muted, marginTop: 4 }}>Paiement sécurisé via Stripe</div>
        </div>
        <button
          onClick={() => { window.open(STRIPE_LINK, '_blank'); setShowPaywall(false); }}
          className="action-btn"
          style={{
            width: '100%',
            background: `linear-gradient(135deg, ${T.primary}, ${T.primaryDark})`,
            border: 'none', borderRadius: 12, color: '#fff',
            fontSize: 16, fontWeight: 700, padding: '15px', cursor: 'pointer',
            boxShadow: `0 4px 20px ${T.primary}40`,
          }}>
          Payer et Télécharger
        </button>
      </Card>
    </div>
  )}
</div>
);
}

// ─── APP ROOT ────────────────────────────────────────────────

const NAV_ITEMS = [
{ id: 'parrainage', label: 'Parrainages', emoji: '🎁' },
{ id: 'avis',       label: 'Avis',        emoji: '⭐' },
{ id: 'calculateur',label: 'Calculateur', emoji: '📊' },
];

export default function App() {
const [onglet, setOnglet] = useState('parrainage');

useEffect(() => {
const tag = document.createElement('style');
tag.textContent = GLOBAL_CSS;
document.head.appendChild(tag);
return () => document.head.removeChild(tag);
}, []);

return (
<div style={{ minHeight: '100vh', background: T.bg, paddingBottom: 84 }}>
  <header style={{
    background: T.surface,
    borderBottom: `1px solid ${T.border}`,
    padding: '18px 20px 16px',
    textAlign: 'center',
    position: 'sticky', top: 0, zIndex: 50,
    backdropFilter: 'blur(10px)',
  }}>
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      background: T.primaryLight, borderRadius: 99, padding: '4px 14px',
      marginBottom: 8,
    }}>
      <div style={{ width: 6, height: 6, borderRadius: '50%', background: T.primary, animation: 'pulse 2s infinite' }} />
      <span style={{ fontSize: 10, fontWeight: 700, color: T.primary, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Hub Financier</span>
    </div>
    <h1 style={{
      fontSize: 24, fontWeight: 800, color: T.navy,
      fontFamily: "'Sora', sans-serif", letterSpacing: '-0.02em',
    }}>
      Parrain 4P
    </h1>
    <p style={{ color: T.muted, fontSize: 12, marginTop: 3, fontWeight: 500 }}>
      Parrainages · Calculateur de Rentabilité
    </p>
  </header>

  <main>
    {onglet === 'parrainage'  && <PageParrainage />}
    {onglet === 'avis'        && <PageAvis />}
    {onglet === 'calculateur' && <PageCalculateur />}
  </main>

  <nav style={{
    position: 'fixed', bottom: 0, left: 0, right: 0,
    background: 'rgba(255,255,255,0.95)',
    borderTop: `1px solid ${T.border}`,
    backdropFilter: 'blur(16px)',
    display: 'flex', zIndex: 100,
    padding: '8px 8px 12px',
    gap: 4,
  }}>
    {NAV_ITEMS.map(item => {
      const active = onglet === item.id;
      return (
        <button
          key={item.id}
          onClick={() => setOnglet(item.id)}
          className="nav-btn"
          style={{
            flex: 1, background: active ? T.primaryLight : 'transparent',
            border: 'none', borderRadius: 12,
            padding: '10px 4px 8px',
            cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
          }}>
          <span style={{ fontSize: 20 }}>{item.emoji}</span>
          <span style={{
            fontSize: 10, fontWeight: 700,
            color: active ? T.primary : T.muted,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}>{item.label}</span>
        </button>
      );
    })}
  </nav>
</div>
);
}

// ─── MOUNT ───────────────────────────────────────────────────
const container = document.getElementById('root');
if (container) {
const root = createRoot(container);
root.render(<App />);
}
