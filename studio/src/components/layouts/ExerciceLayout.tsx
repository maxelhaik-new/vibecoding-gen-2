import React from 'react';
import { EditableField } from '../EditableField';
import { SlideFieldRule } from '../../types';

interface LayoutProps {
  content: Record<string, string>;
  onChange: (key: string, value: string) => void;
  rules: Record<string, SlideFieldRule>;
}

export const ExerciceLayout: React.FC<LayoutProps> = ({ content, onChange, rules }) => {
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
      {/* Intro */}
      <div
        style={{
          position: 'absolute',
          left: '5.21cqw',
          top: '21.67cqh',
          width: '53.23cqw',
          height: '3.06cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 400,
          fontSize: '2.6cqw',
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
          left: '5.21cqw',
          top: '34.81cqh',
          width: '73.96cqw',
          height: '15.56cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Rectangle 7104 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.21cqw',
          top: '36.57cqh',
          width: '73.96cqw',
          height: '13.8cqh',
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
      {/* Titre 1 */}
      <div
        style={{
          position: 'absolute',
          left: '12.45cqw',
          top: '39.26cqh',
          width: '66.2cqw',
          height: '3.06cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '2.6cqw',
          lineHeight: 1.0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <EditableField
          fieldKey="Titre 1"
          value={content['Titre 1'] || ''}
          onChange={(val) => onChange('Titre 1', val)}
          rule={rules['Titre 1']}
          placeholder="Titre 1"
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
      {/* Texte 1 */}
      <div
        style={{
          position: 'absolute',
          left: '12.45cqw',
          top: '44.81cqh',
          width: '66.2cqw',
          height: '2.41cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 400,
          fontSize: '2.08cqw',
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
      {/* Group 2469 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.21cqw',
          top: '34.81cqh',
          width: '6.04cqw',
          height: '10.0cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Vector 370 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.21cqw',
          right: '88.75cqw',
          top: '34.81cqh',
          bottom: '55.19cqh',
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
      {/* Numero 1 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '6.41cqw',
          right: '89.9cqw',
          top: '37.96cqh',
          bottom: '57.78cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '3.65cqw',
          lineHeight: '1.2',
          display: 'flex',
          alignItems: 'center'
        }}
      >
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
      {/* Bloc 2 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.21cqw',
          top: '55.0cqh',
          width: '73.96cqw',
          height: '15.56cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Rectangle 7105 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.21cqw',
          top: '56.76cqh',
          width: '73.96cqw',
          height: '13.8cqh',
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
      {/* Titre 2 */}
      <div
        style={{
          position: 'absolute',
          left: '12.45cqw',
          top: '59.44cqh',
          width: '66.2cqw',
          height: '3.06cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '2.6cqw',
          lineHeight: 1.0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <EditableField
          fieldKey="Titre 2"
          value={content['Titre 2'] || ''}
          onChange={(val) => onChange('Titre 2', val)}
          rule={rules['Titre 2']}
          placeholder="Titre 2"
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
      {/* Texte 2 */}
      <div
        style={{
          position: 'absolute',
          left: '12.45cqw',
          top: '65.0cqh',
          width: '66.2cqw',
          height: '2.41cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 400,
          fontSize: '2.08cqw',
          lineHeight: 1.0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <EditableField
          fieldKey="Texte 2"
          value={content['Texte 2'] || ''}
          onChange={(val) => onChange('Texte 2', val)}
          rule={rules['Texte 2']}
          placeholder="Texte 2"
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
      {/* Group 4307 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.21cqw',
          top: '55.0cqh',
          width: '6.04cqw',
          height: '10.0cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Vector 370 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.21cqw',
          right: '88.75cqw',
          top: '55.0cqh',
          bottom: '35.0cqh',
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
      {/* Numero 2 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '6.09cqw',
          right: '89.53cqw',
          top: '58.15cqh',
          bottom: '37.59cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '3.65cqw',
          lineHeight: '1.2',
          display: 'flex',
          alignItems: 'center'
        }}
      >
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
      {/* Bloc 3 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.21cqw',
          top: '75.19cqh',
          width: '73.96cqw',
          height: '15.56cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Rectangle 7106 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.21cqw',
          top: '76.94cqh',
          width: '73.96cqw',
          height: '13.8cqh',
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
      {/* Titre 3 */}
      <div
        style={{
          position: 'absolute',
          left: '12.45cqw',
          top: '79.63cqh',
          width: '66.2cqw',
          height: '3.06cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '2.6cqw',
          lineHeight: 1.0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <EditableField
          fieldKey="Titre 3"
          value={content['Titre 3'] || ''}
          onChange={(val) => onChange('Titre 3', val)}
          rule={rules['Titre 3']}
          placeholder="Titre 3"
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
      {/* Texte 3 */}
      <div
        style={{
          position: 'absolute',
          left: '12.45cqw',
          top: '85.19cqh',
          width: '66.2cqw',
          height: '2.41cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 400,
          fontSize: '2.08cqw',
          lineHeight: 1.0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <EditableField
          fieldKey="Texte 3"
          value={content['Texte 3'] || ''}
          onChange={(val) => onChange('Texte 3', val)}
          rule={rules['Texte 3']}
          placeholder="Texte 3"
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
      {/* Group 4309 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.21cqw',
          top: '75.19cqh',
          width: '6.04cqw',
          height: '10.0cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Vector 370 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.21cqw',
          right: '88.75cqw',
          top: '75.19cqh',
          bottom: '14.81cqh',
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
      {/* Numero 3 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '6.09cqw',
          right: '89.53cqw',
          top: '78.33cqh',
          bottom: '17.41cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '3.65cqw',
          lineHeight: '1.2',
          display: 'flex',
          alignItems: 'center'
        }}
      >
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
    </div>
  );
};

export default ExerciceLayout;