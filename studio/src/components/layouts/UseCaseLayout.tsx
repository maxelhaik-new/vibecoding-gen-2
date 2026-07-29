import React from 'react';
import { EditableField } from '../EditableField';
import { SlideFieldRule } from '../../types';

interface LayoutProps {
  content: Record<string, string>;
  onChange: (key: string, value: string) => void;
  rules: Record<string, SlideFieldRule>;
}

export const UseCaseLayout: React.FC<LayoutProps> = ({ content, onChange, rules }) => {
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
      {/* Bloc Image */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.16cqw',
          top: '21.67cqh',
          width: '28.23cqw',
          height: '73.15cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Image Fond */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.16cqw',
          top: '21.67cqh',
          width: '28.23cqw',
          height: '69.07cqh',
          background: 'url(IMG_5705.jpg)',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* drop shadow - photo */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Source */}
      <div
        style={{
          position: 'absolute',
          left: '5.21cqw',
          top: '92.96cqh',
          width: '27.66cqw',
          height: '1.85cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 400,
          fontSize: '1.04cqw',
          lineHeight: 1.0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <EditableField
          fieldKey="Source"
          value={content['Source'] || ''}
          onChange={(val) => onChange('Source', val)}
          rule={rules['Source']}
          placeholder="Source"
          style={{

            textAlign: 'left',
            padding: '0px',
            background: 'transparent',
            border: 'none',
            width: '100%',
          }}
        />
      </div>
      {/* Brand colors/Pink Feeling */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          color: '#FFB2B2',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Texte Bulle */}
      <div
        style={{
          position: 'absolute',
          left: '35.99cqw',
          top: '67.04cqh',
          width: '45.62cqw',
          height: '12.96cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 600,
          fontSize: '1.82cqw',
          lineHeight: 1.0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <EditableField
          fieldKey="Texte Bulle"
          value={content['Texte Bulle'] || ''}
          onChange={(val) => onChange('Texte Bulle', val)}
          rule={rules['Texte Bulle']}
          placeholder="Texte Bulle"
          style={{

            textAlign: 'left',
            padding: '0px',
            background: 'transparent',
            border: 'none',
            width: '100%',
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
      {/* Texte 1 */}
      <div
        style={{
          position: 'absolute',
          left: '35.99cqw',
          top: '40.28cqh',
          width: '55.1cqw',
          height: '22.69cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 400,
          fontSize: '1.82cqw',
          lineHeight: 1.0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <EditableField
          fieldKey="Texte 1"
          value={content['Texte 1'] || ''}
          onChange={(val) => onChange('Texte 1', val)}
          rule={rules['Texte 1']}
          placeholder="Texte 1"
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
          right: '0.01cqw',
          bottom: '-0.02cqh',
          width: '18.77cqw',
          height: '33.63cqh',
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
      {/* Rectangle 182 */}
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
      {/* Rectangle 7025 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '35.99cqw',
          top: '25.56cqh',
          width: '58.8cqw',
          height: '9.91cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Brand colors/Fig */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          background: '#18093B',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Bloc Intro */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '38.02cqw',
          top: '28.7cqh',
          width: '40.47cqw',
          height: '3.7cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Intro */}
      <div
        style={{
          position: 'absolute',
          left: '38.02cqw',
          top: '28.7cqh',
          width: '56.25cqw',
          height: '3.7cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '3.12cqw',
          lineHeight: 1.0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <EditableField
          fieldKey="Intro"
          value={content['Intro'] || ''}
          onChange={(val) => onChange('Intro', val)}
          rule={rules['Intro']}
          placeholder="Intro"
          style={{

            textAlign: 'left',
            padding: '0px',
            background: 'transparent',
            border: 'none',
            width: '100%',
          }}
        />
      </div>
      {/* Brand colors/Sunny */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          color: '#FFFF77',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
    </div>
  );
};

export default UseCaseLayout;