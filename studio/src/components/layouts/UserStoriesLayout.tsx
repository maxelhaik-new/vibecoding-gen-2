import React from 'react';
import { EditableField } from '../EditableField';
import { SlideFieldRule } from '../../types';

interface LayoutProps {
  content: Record<string, string>;
  onChange: (key: string, value: string) => void;
  rules: Record<string, SlideFieldRule>;
}

export const UserStoriesLayout: React.FC<LayoutProps> = ({ content, onChange, rules }) => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', backgroundColor: 'var(--slide-bg)', padding: '4cqh 5.21cqw', boxSizing: 'border-box' }}>
      {/* Titre */}
      <div style={{ fontSize: '4.2cqw', fontWeight: 900, color: '#18093B', marginBottom: '1.0cqh' }}>
        <EditableField
          fieldKey="Les User Stories"
          value={content['Les User Stories'] || ''}
          onChange={(val) => onChange('Les User Stories', val)}
          rule={rules['Les User Stories']}
          placeholder="Les User Stories"
          style={{ background: 'transparent', border: 'none', color: '#18093B', fontWeight: 900 }}
        />
      </div>

      {/* Intro */}
      <div style={{ fontSize: '2.2cqw', fontWeight: 400, color: '#18093B', marginBottom: '3cqh' }}>
        <EditableField
          fieldKey="Traduire la vision produit en petites étapes testa"
          value={content['Traduire la vision produit en petites étapes testa'] || ''}
          onChange={(val) => onChange('Traduire la vision produit en petites étapes testa', val)}
          rule={rules['Traduire la vision produit en petites étapes testa']}
          placeholder="Traduire la vision produit en petites étapes testables..."
          style={{ background: 'transparent', border: 'none', color: '#18093B' }}
        />
      </div>

      {/* Container Principal (Gauche = MVP Box, Droite = 3 Cards User Stories) */}
      <div style={{ display: 'flex', gap: '3cqw', alignItems: 'center' }}>
        {/* Left MVP Box */}
        <div style={{ width: '26cqw', backgroundColor: '#F3F0FF', borderRadius: '1.5cqw', padding: '2.5cqh 2cqw', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', boxShadow: '0 4px 15px rgba(102,52,217,0.08)' }}>
          
          {/* Icône Rose App (Pomodoro / Minuteur) */}
          <div
            style={{
              width: '4.5cqw',
              height: '4.5cqw',
              borderRadius: '1.2cqw',
              backgroundColor: '#FF5CE8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5cqh',
              boxShadow: '0 6px 16px rgba(255, 92, 232, 0.35)'
            }}
          >
            <svg width="55%" height="55%" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>

          <div style={{ fontSize: '2.4cqw', fontWeight: 900, color: '#18093B', marginBottom: '1cqh' }}>
            <EditableField
              fieldKey="Titre App"
              value={content['Titre App'] || ''}
              onChange={(val) => onChange('Titre App', val)}
              rule={rules['Titre App']}
              placeholder="Chrono-Pomodoro"
              style={{ background: 'transparent', border: 'none', color: '#18093B', fontWeight: 900, textAlign: 'center' }}
            />
          </div>
          <div style={{ fontSize: '1.6cqw', color: '#18093B', lineHeight: '1.25' }}>
            <EditableField
              fieldKey="Description MVP"
              value={content['Description MVP'] || ''}
              onChange={(val) => onChange('Description MVP', val)}
              rule={rules['Description MVP']}
              placeholder="Description du MVP..."
              multiline={true}
              style={{ background: 'transparent', border: 'none', color: '#18093B', textAlign: 'center' }}
            />
          </div>
        </div>

        {/* Right User Stories Cards */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.8cqh' }}>
          {[1, 2, 3].map((num) => {
            const key = `User Story ${num}`;
            return (
              <div key={num} style={{ display: 'flex', alignItems: 'center', gap: '1.5cqw', backgroundColor: '#F3F0FF', borderRadius: '1cqw', padding: '1.2cqw 1.8cqw' }}>
                <div style={{ width: '3.12cqw', height: '3.12cqw', borderRadius: '50%', backgroundColor: '#6634D9', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.6cqw', flexShrink: 0 }}>
                  {num}
                </div>
                <div style={{ flex: 1, fontSize: '1.6cqw', color: '#18093B', lineHeight: '1.25' }}>
                  <EditableField
                    fieldKey={key}
                    value={content[key] || ''}
                    onChange={(val) => onChange(key, val)}
                    rule={rules[key]}
                    placeholder={`User Story ${num}...`}
                    multiline={true}
                    style={{ background: 'transparent', border: 'none', color: '#18093B' }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserStoriesLayout;
