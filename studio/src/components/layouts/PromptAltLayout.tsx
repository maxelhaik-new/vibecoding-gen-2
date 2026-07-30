import React from 'react';
import { EditableField } from '../EditableField';
import { SlideFieldRule } from '../../types';

interface LayoutProps {
  content: Record<string, string>;
  onChange: (key: string, value: string) => void;
  rules: Record<string, SlideFieldRule>;
}

export const PromptAltLayout: React.FC<LayoutProps> = ({ content, onChange, rules }) => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', backgroundColor: 'var(--slide-bg)' }}>
      {/* Titre */}
      <div
        style={{
          position: 'absolute',
          left: '5.21cqw',
          top: '9.26cqh',
          width: '67.19cqw',
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
          left: '5.21cqw',
          top: '22.78cqh',
          width: '85.62cqw',
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

      {/* Bloc 1 (Left Column - Prompt template) */}
      <div
        style={{
          position: 'absolute',
          left: '5.0cqw',
          top: '36.3cqh',
          width: '37.08cqw',
          height: '55.0cqh',
          backgroundColor: '#F5F5F5',
          borderRadius: '12px',
          padding: '1.5cqw',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5cqh',
          border: '1px solid rgba(0,0,0,0.05)'
        }}
      >
        {/* Role & Context Row */}
        <div style={{ display: 'flex', gap: '0.8cqw', alignItems: 'center', height: '18cqh' }}>
          <div style={{ width: '3.3cqw', height: '3.3cqw', borderRadius: '50%', backgroundColor: '#D1BAF0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6634D9', fontWeight: 900, fontSize: '1.6cqw', flexShrink: 0 }}>
            💬
          </div>
          <div style={{ flex: 1, height: '100%', backgroundColor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px', padding: '0.5cqh 0.8cqw', display: 'flex', alignItems: 'center' }}>
            <EditableField
              fieldKey="Texte 1"
              value={content['Texte 1'] || ''}
              onChange={(val) => onChange('Texte 1', val)}
              rule={rules['Texte 1']}
              placeholder="Rôle ou Contexte du prompt..."
              style={{ background: 'transparent', border: 'none', width: '100%', color: '#18093B', fontSize: '1.4cqw', lineHeight: 1.1 }}
            />
          </div>
        </div>

        {/* Instructions / Prompt Content */}
        <div style={{ flex: 1, backgroundColor: '#EFEFEF', border: '1px solid rgba(0,0,0,0.15)', borderRadius: '8px', padding: '1cqh 1cqw', display: 'flex', flexDirection: 'column', gap: '0.5cqh' }}>
          <div style={{ fontFamily: 'monospace', fontSize: '1cqw', color: '#6D727D', opacity: 0.8 }}>
            PROMPT:
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <EditableField
              fieldKey="Texte 2"
              value={content['Texte 2'] || ''}
              onChange={(val) => onChange('Texte 2', val)}
              rule={rules['Texte 2']}
              placeholder="Consignes et instructions détaillées..."
              style={{ background: 'transparent', border: 'none', width: '100%', color: '#18093B', fontSize: '1.2cqw', fontFamily: 'monospace', lineHeight: 1.2 }}
            />
          </div>
        </div>
      </div>

      {/* Bloc Bulle 1 (Right top bubble) */}
      <div style={{ position: 'absolute', left: '45.0cqw', top: '38.52cqh', width: '31cqw', display: 'flex', alignItems: 'center' }}>
        {/* Dashed Connecting Line */}
        <div style={{ flex: 1, borderTop: '4px dashed #18093B', height: '0px' }} />
        {/* Bulle box */}
        <div
          style={{
            width: '24cqw',
            height: '16.3cqh',
            backgroundColor: '#18093B',
            borderRadius: '12px',
            border: '1px solid #18093B',
            display: 'flex',
            alignItems: 'center',
            padding: '1.5cqh 1.2cqw',
            gap: '1cqw',
            boxSizing: 'border-box',
            marginLeft: '-1px'
          }}
        >
          <div style={{ fontFamily: 'var(--font-family-slides)', fontWeight: 900, fontSize: '4.69cqw', color: '#FFFFFF', lineHeight: 1 }}>
            1
          </div>
          <div style={{ flex: 1, height: '100%', display: 'flex', alignItems: 'center' }}>
            <EditableField
              fieldKey="Texte Bulle"
              value={content['Texte Bulle'] || ''}
              onChange={(val) => onChange('Texte Bulle', val)}
              rule={rules['Texte Bulle']}
              placeholder="Explication ou analyse 1..."
              style={{ background: 'transparent', border: 'none', width: '100%', color: '#FFFFFF', fontSize: '1.4cqw', fontWeight: 700, lineHeight: 1.1 }}
            />
          </div>
        </div>
      </div>

      {/* Bloc Bulle 2 (Right bottom bubble) */}
      <div style={{ position: 'absolute', left: '45.0cqw', top: '74.17cqh', width: '31cqw', display: 'flex', alignItems: 'center' }}>
        {/* Dashed Connecting Line */}
        <div style={{ flex: 1, borderTop: '4px dashed #18093B', height: '0px' }} />
        {/* Bulle box */}
        <div
          style={{
            width: '24cqw',
            height: '16.3cqh',
            backgroundColor: '#18093B',
            borderRadius: '12px',
            border: '1px solid #18093B',
            display: 'flex',
            alignItems: 'center',
            padding: '1.5cqh 1.2cqw',
            gap: '1cqw',
            boxSizing: 'border-box',
            marginLeft: '-1px'
          }}
        >
          <div style={{ fontFamily: 'var(--font-family-slides)', fontWeight: 900, fontSize: '4.69cqw', color: '#FFFFFF', lineHeight: 1 }}>
            2
          </div>
          <div style={{ flex: 1, height: '100%', display: 'flex', alignItems: 'center' }}>
            <EditableField
              fieldKey="Texte Bulle 2"
              value={content['Texte Bulle 2'] || ''}
              onChange={(val) => onChange('Texte Bulle 2', val)}
              rule={rules['Texte Bulle 2']}
              placeholder="Explication ou analyse 2..."
              style={{ background: 'transparent', border: 'none', width: '100%', color: '#FFFFFF', fontSize: '1.4cqw', fontWeight: 700, lineHeight: 1.1 }}
            />
          </div>
        </div>
      </div>

      {/* Camera Vector overlay at the right bottom */}
      <div style={{ position: 'absolute', right: 0, bottom: 0, width: '20.83cqw', height: '37.04cqh', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', right: 0, bottom: 0, width: '18.3cqw', height: '32.56cqh', backgroundColor: '#FFBABB', opacity: 0.8 }} />
        <div style={{ position: 'absolute', right: '3.9cqw', bottom: '6.94cqh', width: '9.38cqw', height: '16.67cqh', backgroundColor: '#7F7F7F', borderRadius: '50%' }} />
      </div>
    </div>
  );
};

export default PromptAltLayout;
