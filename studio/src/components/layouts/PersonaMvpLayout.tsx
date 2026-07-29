import React from 'react';
import { EditableField } from '../EditableField';
import { SlideFieldRule } from '../../types';

interface LayoutProps {
  content: Record<string, string>;
  onChange: (key: string, value: string) => void;
  rules: Record<string, SlideFieldRule>;
}

export const PersonaMvpLayout: React.FC<LayoutProps> = ({ content, onChange, rules }) => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', backgroundColor: 'var(--slide-bg)' }}>
      {/* Titre */}
      <div
        style={{
          position: 'absolute',
          left: '5.21cqw',
          top: '5.0cqh',
          width: '89.58cqw',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 900,
          fontSize: '4.2cqw',
          lineHeight: 1.0,
          color: '#18093B'
        }}
      >
        <EditableField
          fieldKey="Titre"
          value={content['Titre'] || ''}
          onChange={(val) => onChange('Titre', val)}
          rule={rules['Titre']}
          placeholder="Persona et MVP"
          style={{ background: 'transparent', border: 'none', width: '100%', color: '#18093B', fontWeight: 900 }}
        />
      </div>

      {/* Intro */}
      <div
        style={{
          position: 'absolute',
          left: '5.21cqw',
          top: '17.5cqh',
          width: '85cqw',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 400,
          fontSize: '2.1cqw',
          lineHeight: '1.25',
          color: '#18093B'
        }}
      >
        <EditableField
          fieldKey="Intro"
          value={content['Intro'] || ''}
          onChange={(val) => onChange('Intro', val)}
          rule={rules['Intro']}
          placeholder="Définissons la cible utilisateur..."
          style={{ background: 'transparent', border: 'none', width: '100%', color: '#18093B' }}
        />
      </div>

      {/* Card Persona (Gauche) */}
      <div
        style={{
          position: 'absolute',
          left: '5.21cqw',
          top: '36cqh',
          width: '26cqw',
          height: '56cqh',
          backgroundColor: '#18093B',
          borderRadius: '2.0cqw',
          padding: '2.5cqh 1.5cqw 1.5cqh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          boxSizing: 'border-box'
        }}
      >
        {/* Badge Jaune LE PERSONA */}
        <div
          style={{
            position: 'absolute',
            top: '-1.8cqh',
            backgroundColor: '#FFFF77',
            borderRadius: '5.0cqw',
            padding: '0.4cqh 1.5cqw',
            fontWeight: 900,
            fontSize: '1.3cqw',
            color: '#18093B',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}
        >
          LE PERSONA
        </div>

        {/* Prenom */}
        <div style={{ color: '#FFFF77', fontSize: '2.6cqw', fontWeight: 900, marginTop: '1.0cqh', width: '100%', textAlign: 'center' }}>
          <EditableField
            fieldKey="Prenom"
            value={content['Prenom'] || ''}
            onChange={(val) => onChange('Prenom', val)}
            rule={rules['Prenom']}
            placeholder="Thomas"
            style={{ background: 'transparent', border: 'none', color: '#FFFF77', textAlign: 'center', fontWeight: 900 }}
          />
        </div>

        {/* Métier */}
        <div style={{ color: '#FFB2B2', fontSize: '1.6cqw', fontWeight: 700, marginTop: '0.3cqh', width: '100%', textAlign: 'center' }}>
          <EditableField
            fieldKey="Métier"
            value={content['Métier'] || ''}
            onChange={(val) => onChange('Métier', val)}
            rule={rules['Métier']}
            placeholder="Créateur & Freelance"
            style={{ background: 'transparent', border: 'none', color: '#FFB2B2', textAlign: 'center', fontWeight: 700 }}
          />
        </div>

        <div style={{ width: '85%', height: '2px', backgroundColor: 'rgba(255,255,255,0.2)', margin: '1.8cqh 0' }} />

        {/* Attributs Persona */}
        <div style={{ color: '#FFFFFF', fontSize: '1.4cqw', display: 'flex', flexDirection: 'column', gap: '1.2cqh', width: '100%', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6cqw' }}>
            <span>🎂</span>
            <EditableField fieldKey="Age" value={content['Age'] || ''} onChange={(val) => onChange('Age', val)} rule={rules['Age']} placeholder="30 ans" style={{ background: 'transparent', border: 'none', color: '#FFF' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6cqw' }}>
            <span>🌍</span>
            <EditableField fieldKey="Spécificité" value={content['Spécificité'] || ''} onChange={(val) => onChange('Spécificité', val)} rule={rules['Spécificité']} placeholder="Télétravailleur" style={{ background: 'transparent', border: 'none', color: '#FFF' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6cqw' }}>
            <span>✨</span>
            <EditableField fieldKey="Goût" value={content['Goût'] || ''} onChange={(val) => onChange('Goût', val)} rule={rules['Goût']} placeholder="Minimaliste" style={{ background: 'transparent', border: 'none', color: '#FFF' }} />
          </div>
        </div>
      </div>

      {/* Bloc MVP (Droite) */}
      <div style={{ position: 'absolute', left: '36.0cqw', top: '34.0cqh', width: '58.0cqw' }}>
        <div style={{ fontSize: '1.9cqw', fontWeight: 900, color: '#18093B', textTransform: 'uppercase', marginBottom: '2.5cqh' }}>
          LE MVP (CE QU'ON VEUT À MINIMA)
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5cqh' }}>
          <div style={{ display: 'flex', gap: '1.2cqw', alignItems: 'flex-start' }}>
            <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#FFB2B2', marginTop: '0.8cqh', flexShrink: 0 }} />
            <div style={{ fontSize: '1.8cqw', fontWeight: 700, color: '#18093B', flex: 1, lineHeight: '1.25' }}>
              <EditableField
                fieldKey="Texte 1"
                value={content['Texte 1'] || ''}
                onChange={(val) => onChange('Texte 1', val)}
                rule={rules['Texte 1']}
                placeholder="Point 1 du MVP..."
                multiline={true}
                style={{ background: 'transparent', border: 'none', color: '#18093B', fontWeight: 700 }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1.2cqw', alignItems: 'flex-start' }}>
            <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#FFB2B2', marginTop: '0.8cqh', flexShrink: 0 }} />
            <div style={{ fontSize: '1.8cqw', fontWeight: 700, color: '#18093B', flex: 1, lineHeight: '1.25' }}>
              <EditableField
                fieldKey="Texte 2"
                value={content['Texte 2'] || ''}
                onChange={(val) => onChange('Texte 2', val)}
                rule={rules['Texte 2']}
                placeholder="Point 2 du MVP..."
                multiline={true}
                style={{ background: 'transparent', border: 'none', color: '#18093B', fontWeight: 700 }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1.2cqw', alignItems: 'flex-start' }}>
            <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#FFB2B2', marginTop: '0.8cqh', flexShrink: 0 }} />
            <div style={{ fontSize: '1.8cqw', fontWeight: 700, color: '#18093B', flex: 1, lineHeight: '1.25' }}>
              <EditableField
                fieldKey="Texte 3"
                value={content['Texte 3'] || ''}
                onChange={(val) => onChange('Texte 3', val)}
                rule={rules['Texte 3']}
                placeholder="Point 3 du MVP..."
                multiline={true}
                style={{ background: 'transparent', border: 'none', color: '#18093B', fontWeight: 700 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonaMvpLayout;
