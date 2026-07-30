import React from 'react';
import { EditableField } from '../EditableField';
import { SlideFieldRule } from '../../types';

interface LayoutProps {
  content: Record<string, string>;
  onChange: (key: string, value: string) => void;
  rules: Record<string, SlideFieldRule>;
}

export const Layout2BlocsLayout: React.FC<LayoutProps> = ({ content, onChange, rules }) => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', backgroundColor: 'var(--slide-bg)' }}>
      {/* Titre */}
      <div
        style={{
          position: 'absolute',
          left: '5.21cqw',
          top: '9.26cqh',
          width: '89.58cqw',
          height: '5.46cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 900,
          fontSize: '4.69cqw',
          lineHeight: 1.0,
          color: '#18093B',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <EditableField
          fieldKey="Titre"
          value={content['Titre'] || ''}
          onChange={(val) => onChange('Titre', val)}
          rule={rules['Titre']}
          placeholder="Titre de la slide"
          multiline={false}
          style={{ background: 'transparent', border: 'none', width: '100%', color: '#18093B', fontWeight: 900 }}
        />
      </div>

      {/* Intro */}
      <div
        style={{
          position: 'absolute',
          left: '5.1cqw',
          top: '21.67cqh',
          width: '89.69cqw',
          height: '7.69cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 400,
          fontSize: '2.6cqw',
          lineHeight: 1.0,
          color: '#18093B',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <EditableField
          fieldKey="Intro"
          value={content['Intro'] || ''}
          onChange={(val) => onChange('Intro', val)}
          rule={rules['Intro']}
          placeholder="Texte d'introduction ou sous-titre"
          style={{ background: 'transparent', border: 'none', width: '100%', color: '#18093B' }}
        />
      </div>

      {/* Bloc 1 (Left Side) */}
      <div
        style={{
          position: 'absolute',
          left: '5.1cqw',
          top: '37.69cqh',
          width: '30.94cqw',
          height: '47.69cqh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header Banner A */}
        <div
          style={{
            width: '25.36cqw',
            height: '10.37cqh',
            backgroundColor: '#18093B',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '1.67cqw',
            boxSizing: 'border-box',
            marginBottom: '3cqh'
          }}
        >
          <EditableField
            fieldKey="Titre A"
            value={content['Titre A'] || ''}
            onChange={(val) => onChange('Titre A', val)}
            rule={rules['Titre A']}
            placeholder="Bloc A"
            multiline={false}
            style={{ background: 'transparent', border: 'none', color: '#FFFF77', fontWeight: 900, fontSize: '2.6cqw' }}
          />
        </div>

        {/* Sub-items with Diamond bullets */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5cqh' }}>
          {['Texte 1', 'Texte 2', 'Texte 3'].map((key, i) => (
            <div key={key} style={{ display: 'flex', alignItems: 'flex-start', gap: '1.2cqw' }}>
              <div style={{ width: '1.46cqw', height: '1.46cqw', backgroundColor: '#6634D9', transform: 'rotate(45deg)', marginTop: '0.6cqh', flexShrink: 0 }} />
              <EditableField
                fieldKey={key}
                value={content[key] || ''}
                onChange={(val) => onChange(key, val)}
                rule={rules[key]}
                placeholder={`Texte ${i + 1}`}
                style={{ background: 'transparent', border: 'none', width: '100%', color: '#18093B', fontSize: '1.56cqw', lineHeight: 1.2 }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bloc 2 (Right Side) */}
      <div
        style={{
          position: 'absolute',
          left: '45.78cqw',
          top: '37.69cqh',
          width: '27.25cqw',
          height: '47.69cqh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header Banner B */}
        <div
          style={{
            width: '25.68cqw',
            height: '10.37cqh',
            backgroundColor: '#18093B',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '1.69cqw',
            boxSizing: 'border-box',
            marginBottom: '3cqh'
          }}
        >
          <EditableField
            fieldKey="Titre B"
            value={content['Titre B'] || ''}
            onChange={(val) => onChange('Titre B', val)}
            rule={rules['Titre B']}
            placeholder="Bloc B"
            multiline={false}
            style={{ background: 'transparent', border: 'none', color: '#FFFF77', fontWeight: 900, fontSize: '2.6cqw' }}
          />
        </div>

        {/* Sub-items with Diamond bullets */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5cqh' }}>
          {['Texte 4', 'Texte 5', 'Texte 6'].map((key, i) => (
            <div key={key} style={{ display: 'flex', alignItems: 'flex-start', gap: '1.2cqw' }}>
              <div style={{ width: '1.46cqw', height: '1.46cqw', backgroundColor: '#6634D9', transform: 'rotate(45deg)', marginTop: '0.6cqh', flexShrink: 0 }} />
              <EditableField
                fieldKey={key}
                value={content[key] || ''}
                onChange={(val) => onChange(key, val)}
                rule={rules[key]}
                placeholder={`Texte ${i + 4}`}
                style={{ background: 'transparent', border: 'none', width: '100%', color: '#18093B', fontSize: '1.56cqw', lineHeight: 1.2 }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Camera Vector overlay at the right bottom */}
      <div style={{ position: 'absolute', right: 0, bottom: 0, width: '20.83cqw', height: '37.04cqh', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', right: 0, bottom: 0, width: '20.83cqw', height: '34.72cqh', backgroundColor: '#FFBABB', opacity: 0.8 }} />
        <div style={{ position: 'absolute', right: '3.9cqw', bottom: '6.94cqh', width: '9.38cqw', height: '16.67cqh', backgroundColor: '#7F7F7F', borderRadius: '50%' }} />
      </div>
    </div>
  );
};

export default Layout2BlocsLayout;
