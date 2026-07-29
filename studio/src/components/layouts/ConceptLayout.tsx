import React from 'react';
import { EditableField } from '../EditableField';
import { SlideFieldRule } from '../../types';

interface LayoutProps {
  content: Record<string, string>;
  onChange: (key: string, value: string) => void;
  rules: Record<string, SlideFieldRule>;
}

export const ConceptLayout: React.FC<LayoutProps> = ({ content, onChange, rules }) => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', backgroundColor: 'var(--slide-bg)' }}>
      {/* Blanc */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          background: '#FFFFFF',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Titre */}
      <div
        style={{
          position: 'absolute',
          left: '5.21cqw',
          top: '9.26cqh',
          bottom: '85.28cqh',
          width: '89.58cqw',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 900,
          fontSize: '4.69cqw',
          lineHeight: 1.0,
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
          placeholder="Titre"
          multiline={false}
          style={{

            textAlign: 'left',
            padding: '0px',
            background: 'transparent',
            border: 'none',
            width: '100%',
            whiteSpace: 'nowrap',
          }}
        />
      </div>
      {/* Fig */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          color: '#18093B',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Bloc 2 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '6.35cqw',
          top: '35.74cqh',
          width: '75.36cqw',
          height: '19.07cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Vector 579 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '6.35cqw',
          top: '35.74cqh',
          width: '5.47cqw',
          height: '15.28cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Brand colors/Fuschia */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Definition */}
      <div
        style={{
          position: 'absolute',
          left: '14.11cqw',
          top: '37.96cqh',
          width: '67.08cqw',
          height: '16.85cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 400,
          fontSize: '2.5cqw',
          lineHeight: '1.2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <EditableField
          fieldKey="Definition"
          value={content['Definition'] || ''}
          onChange={(val) => onChange('Definition', val)}
          rule={rules['Definition']}
          placeholder="Definition"
          style={{

            textAlign: 'left',
            padding: '0px',
            background: 'transparent',
            border: 'none',
            width: '100%',
          }}
        />
      </div>
      {/* Brand colors/Fig */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          color: '#18093B',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Bloc 1 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '8.65cqw',
          top: '26.17cqh',
          width: '58.8cqw',
          height: '7.04cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Mot */}
      <div
        style={{
          position: 'absolute',
          left: '8.65cqw',
          top: '26.17cqh',
          width: '58.8cqw',
          height: '7.04cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 400,
          fontSize: '5.99cqw',
          lineHeight: 1.0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <EditableField
          fieldKey="Mot"
          value={content['Mot'] || ''}
          onChange={(val) => onChange('Mot', val)}
          rule={rules['Mot']}
          placeholder="Mot"
          multiline={false}
          style={{

            textAlign: 'left',
            padding: '0px',
            background: 'transparent',
            border: 'none',
            width: '100%',
            whiteSpace: 'nowrap',
          }}
        />
      </div>
      {/* Brand colors/Purple Thinking */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          color: '#6634D9',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* camera */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          right: '0.0cqw',
          bottom: '0.0cqh',
          width: '20.83cqw',
          height: '37.04cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Vector */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          right: '-0.03cqw',
          bottom: '0.04cqh',
          width: '18.31cqw',
          height: '32.56cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Pink Feeling variations/Pink Feeling 80% */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          background: '#FFBABB',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Rectangle 181 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          right: '3.91cqw',
          bottom: '6.94cqh',
          width: '9.38cqw',
          height: '16.67cqh',
          background: '#7F7F7F',
          borderRadius: '8.72cqw',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Bloc Bulle */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '-16.35cqw',
          top: '69.72cqh',
          width: '89.84cqw',
          height: '21.02cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Rectangle 381 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '-16.35cqw',
          top: '69.72cqh',
          width: '89.84cqw',
          height: '21.02cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Brand colors/Purple Thinking */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          background: '#6634D9',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Bulle */}
      <div
        style={{
          position: 'absolute',
          left: '5.35cqw',
          top: '73.8cqh',
          width: '67.62cqw',
          height: '12.96cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '3.65cqw',
          lineHeight: 1.0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <EditableField
          fieldKey="Bulle"
          value={content['Bulle'] || ''}
          onChange={(val) => onChange('Bulle', val)}
          rule={rules['Bulle']}
          placeholder="Bulle"
          style={{

            textAlign: 'left',
            padding: '0px',
            background: 'transparent',
            border: 'none',
            width: '100%',
          }}
        />
      </div>
      {/* Blanc */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
    </div>
  );
};

export default ConceptLayout;