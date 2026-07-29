import React from 'react';
import { EditableField } from '../EditableField';
import { SlideFieldRule } from '../../types';

interface LayoutProps {
  content: Record<string, string>;
  onChange: (key: string, value: string) => void;
  rules: Record<string, SlideFieldRule>;
}

export const BriefAltLayout: React.FC<LayoutProps> = ({ content, onChange, rules }) => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', backgroundColor: 'var(--slide-bg)' }}>
      {/* Titre */}
      <div
        style={{
          position: 'absolute',
          left: '5.21cqw',
          top: '5.46cqh',
          width: '83.54cqw',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 900,
          fontSize: '4.69cqw',
          lineHeight: 1.0,
          color: '#18093B',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <EditableField
          fieldKey="Titre"
          value={content['Titre'] || ''}
          onChange={(val) => onChange('Titre', val)}
          rule={rules['Titre']}
          placeholder="Le Chrono-Pomodoro & Tracker d'Énergie"
          multiline={false}
          style={{ background: 'transparent', border: 'none', width: '100%', color: '#18093B', fontWeight: 900 }}
        />
      </div>

      {/* Bloc Image (Gauche) */}
      <div
        style={{
          position: 'absolute',
          left: '5.21cqw',
          top: '21.67cqh',
          width: '34.58cqw',
          height: '69.07cqh',
          backgroundColor: '#EFE8FF',
          boxShadow: '-0.52cqw 0.93cqh 0px #FCB3AD',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '1cqw'
        }}
      >
        <div style={{ fontSize: '2.5cqw', color: '#6634D9', fontWeight: 700 }}>🎨 VISUEL</div>
      </div>

      {/* Source */}
      <div
        style={{
          position: 'absolute',
          left: '5.21cqw',
          top: '92.96cqh',
          width: '34.58cqw',
          fontFamily: 'var(--font-family-slides)',
          fontSize: '1.04cqw',
          color: '#FFB2B2'
        }}
      >
        <EditableField
          fieldKey="Source"
          value={content['Source'] || ''}
          onChange={(val) => onChange('Source', val)}
          rule={rules['Source']}
          placeholder="Source : Image générée par IA - Pinterest"
          style={{ background: 'transparent', border: 'none', width: '100%', color: '#FFB2B2' }}
        />
      </div>

      {/* Bloc Intro (Badge Haut Droite) */}
      <div
        style={{
          position: 'absolute',
          left: '43.54cqw',
          top: '21.76cqh',
          padding: '0.8cqh 1.8cqw',
          backgroundColor: '#18093B',
          borderRadius: '0.4cqw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <EditableField
          fieldKey="Intro"
          value={content['Intro'] || ''}
          onChange={(val) => onChange('Intro', val)}
          rule={rules['Intro']}
          placeholder="LE BRIEF"
          style={{ background: 'transparent', border: 'none', color: '#FFFF77', fontWeight: 700, fontSize: '3.12cqw', textTransform: 'uppercase' }}
        />
      </div>

      {/* Texte 1 (Problème Métier) */}
      <div
        style={{
          position: 'absolute',
          left: '43.54cqw',
          top: '36.94cqh',
          width: '52.86cqw',
          fontFamily: 'var(--font-family-slides)',
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: '2.08cqw',
          lineHeight: '1.2',
          color: '#6634D9'
        }}
      >
        <EditableField
          fieldKey="Texte 1"
          value={content['Texte 1'] || ''}
          onChange={(val) => onChange('Texte 1', val)}
          rule={rules['Texte 1']}
          placeholder="Mise en situation et problème..."
          multiline={true}
          style={{ background: 'transparent', border: 'none', width: '100%', color: '#6634D9', fontStyle: 'italic' }}
        />
      </div>

      {/* Texte 2 (Objectif de l'app) */}
      <div
        style={{
          position: 'absolute',
          left: '43.54cqw',
          top: '58.24cqh',
          width: '50.0cqw',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 600,
          fontSize: '2.08cqw',
          lineHeight: '1.2',
          color: '#18093B'
        }}
      >
        <EditableField
          fieldKey="Texte 2"
          value={content['Texte 2'] || ''}
          onChange={(val) => onChange('Texte 2', val)}
          rule={rules['Texte 2']}
          placeholder="Objectif de l'application..."
          multiline={true}
          style={{ background: 'transparent', border: 'none', width: '100%', color: '#18093B', fontWeight: 600 }}
        />
      </div>
    </div>
  );
};

export default BriefAltLayout;
