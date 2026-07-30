import React from 'react';
import { EditableField } from '../EditableField';
import { SlideFieldRule } from '../../types';

interface LayoutProps {
  content: Record<string, string>;
  onChange: (key: string, value: string) => void;
  rules: Record<string, SlideFieldRule>;
}

export const DemoLayout: React.FC<LayoutProps> = ({ content, onChange, rules }) => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', backgroundColor: 'var(--template-fig)' }}>
      {/* Titre */}
      <div
        style={{
          position: 'absolute',
          left: '5cqw',
          right: '5cqw',
          top: '40cqh',
          bottom: '40cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 900,
          fontSize: '6.25cqw',
          lineHeight: 1.0,
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}
      >
        <EditableField
          fieldKey="Titre"
          value={content['Titre'] || ''}
          onChange={(val) => onChange('Titre', val)}
          rule={rules['Titre']}
          placeholder="DEMO LIVE"
          multiline={false}
          style={{ background: 'transparent', border: 'none', width: '100%', color: '#FFFFFF', fontWeight: 900, textAlign: 'center' }}
        />
      </div>

      {/* Camera placeholder at right bottom */}
      <div style={{ position: 'absolute', right: '3.9cqw', bottom: '6.94cqh', width: '8.91cqw', height: '15.83cqh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '100%', aspectRatio: '1/1', backgroundColor: '#7F7F7F', borderRadius: '50%' }} />
      </div>
    </div>
  );
};

export default DemoLayout;
