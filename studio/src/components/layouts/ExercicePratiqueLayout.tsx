import React from 'react';
import { EditableField } from '../EditableField';
import { SlideFieldRule } from '../../types';

interface LayoutProps {
  content: Record<string, string>;
  onChange: (key: string, value: string) => void;
  rules: Record<string, SlideFieldRule>;
}

export const ExercicePratiqueLayout: React.FC<LayoutProps> = ({ content, onChange, rules }) => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', backgroundColor: 'var(--slide-bg)', padding: '3cqh 5.21cqw', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
      {/* Titre */}
      <div style={{ fontSize: '3.8cqw', fontWeight: 900, color: 'var(--slide-text)', marginBottom: '0.8cqh', lineHeight: '1.0' }}>
        <EditableField
          fieldKey="Titre"
          value={content['Titre'] || ''}
          onChange={(val) => onChange('Titre', val)}
          rule={rules['Titre']}
          placeholder="Ce qu’il faut faire"
          style={{ background: 'transparent', border: 'none', color: 'var(--slide-text)', fontWeight: 900 }}
        />
      </div>

      {/* Intro */}
      <div style={{ fontSize: '2.0cqw', fontWeight: 400, color: 'var(--slide-text)', marginBottom: '1.8cqh', lineHeight: '1.2' }}>
        <EditableField
          fieldKey="Intro"
          value={content['Intro'] || ''}
          onChange={(val) => onChange('Intro', val)}
          rule={rules['Intro']}
          placeholder="À vous de jouer..."
          style={{ background: 'transparent', border: 'none', color: 'var(--slide-text)' }}
        />
      </div>

      {/* Bloc 1 (Tâches & Texte 1) */}
      <div style={{ backgroundColor: '#6634D9', borderRadius: '1cqw', padding: '1cqw 1.8cqw', color: '#FFFFFF', marginBottom: '1.8cqh', position: 'relative', flexShrink: 0 }}>
        <div style={{ fontSize: '1.5cqw', fontWeight: 700, color: '#FFFF77', marginBottom: '0.3cqh' }}>
          <EditableField
            fieldKey="Titre 1"
            value={content['Titre 1'] || ''}
            onChange={(val) => onChange('Titre 1', val)}
            rule={rules['Titre 1']}
            placeholder="Tâches à réaliser"
            style={{ background: 'transparent', border: 'none', color: '#FFFF77', fontWeight: 700 }}
          />
        </div>
        <div style={{ fontSize: '1.6cqw', color: '#FFFFFF', lineHeight: '1.2' }}>
          <EditableField
            fieldKey="Texte 1"
            value={content['Texte 1'] || ''}
            onChange={(val) => onChange('Texte 1', val)}
            rule={rules['Texte 1']}
            placeholder="Description des tâches..."
            multiline={true}
            style={{ background: 'transparent', border: 'none', color: '#FFFFFF' }}
          />
        </div>
      </div>

      {/* Section EXERCICE */}
      <div style={{ fontSize: '2.2cqw', fontWeight: 700, color: '#6634D9', marginBottom: '1cqh', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
        EXERCICE
      </div>

      {/* Questions 1 à 4 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1cqh', flex: 1, justifyContent: 'flex-start' }}>
        {[1, 2, 3, 4].map((num) => {
          const key = `Question ${num}`;
          return (
            <div key={num} style={{ display: 'flex', alignItems: 'center', gap: '1.2cqw' }}>
              <div style={{ width: '2.8cqw', height: '2.5cqw', backgroundColor: '#18093B', color: '#FFFF77', borderRadius: '0.4cqw', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.4cqw', flexShrink: 0 }}>
                0{num}
              </div>
              <div style={{ fontSize: '1.5cqw', fontWeight: 600, color: 'var(--slide-text)', flex: 1, lineHeight: '1.2' }}>
                <EditableField
                  fieldKey={key}
                  value={content[key] || ''}
                  onChange={(val) => onChange(key, val)}
                  rule={rules[key]}
                  placeholder={`Question ${num}...`}
                  multiline={true}
                  style={{ background: 'transparent', border: 'none', color: 'var(--slide-text)', fontWeight: 600 }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExercicePratiqueLayout;
