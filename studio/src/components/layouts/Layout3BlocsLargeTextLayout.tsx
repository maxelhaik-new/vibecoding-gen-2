import React from 'react';
import { EditableField } from '../EditableField';
import { SlideFieldRule } from '../../types';

interface LayoutProps {
  content: Record<string, string>;
  onChange: (key: string, value: string) => void;
  rules: Record<string, SlideFieldRule>;
}

export const Layout3BlocsLargeTextLayout: React.FC<LayoutProps> = ({ content, onChange, rules }) => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', backgroundColor: '#FFFFFF' }}>
      {/* Blanc */}
      <div
        style={{
          pointerEvents: 'none',
position: 'absolute',
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
          pointerEvents: 'none',
position: 'absolute',
          color: '#18093B',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Purple Thinking */}
      <div
        style={{
          pointerEvents: 'none',
position: 'absolute',
          color: '#6634D9',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Fig */}
      <div
        style={{
          pointerEvents: 'none',
position: 'absolute',
          color: '#18093B',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Purple Thinking */}
      <div
        style={{
          pointerEvents: 'none',
position: 'absolute',
          background: '#6634D9',
          transform: 'matrix(-1, 0, 0, 1, 0, 0)',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* camera */}
      <div
        style={{
          pointerEvents: 'none',
position: 'absolute',
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
          pointerEvents: 'none',
position: 'absolute',
          right: '0.01cqw',
          bottom: '-0.02cqh',
          width: '18.77cqw',
          height: '33.63cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Brand colors/Pink Feeling */}
      <div
        style={{
          pointerEvents: 'none',
position: 'absolute',
          background: '#FFB2B2',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Rectangle 182 */}
      <div
        style={{
          pointerEvents: 'none',
position: 'absolute',
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
      {/* Intro */}
      <div
        style={{
          position: 'absolute',
          left: '5.21cqw',
          top: '21.67cqh',
          width: '85.62cqw',
          height: '6.48cqh',
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
          }}
        />
      </div>
      {/* Brand colors/Fig */}
      <div
        style={{
          pointerEvents: 'none',
position: 'absolute',
          color: '#18093B',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Bloc 3 */}
      <div
        style={{
          pointerEvents: 'none',
position: 'absolute',
          left: '5.05cqw',
          top: '67.5cqh',
          width: '39.01cqw',
          height: '19.54cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Texte 3 */}
      <div
        style={{
          position: 'absolute',
          left: '5.05cqw',
          top: '76.85cqh',
          width: '38.49cqw',
          height: '10.19cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 400,
          fontSize: '1.56cqw',
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
          }}
        />
      </div>
      {/* Fig */}
      <div
        style={{
          pointerEvents: 'none',
position: 'absolute',
          color: '#18093B',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Bloc 3 */}
      <div
        style={{
          pointerEvents: 'none',
position: 'absolute',
          left: '5.05cqw',
          top: '67.5cqh',
          width: '39.01cqw',
          height: '7.04cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Rectangle 7024 */}
      <div
        style={{
          pointerEvents: 'none',
position: 'absolute',
          left: '5.05cqw',
          top: '67.5cqh',
          width: '39.01cqw',
          height: '7.04cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Fig */}
      <div
        style={{
          pointerEvents: 'none',
position: 'absolute',
          background: '#18093B',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Titre 3 */}
      <div
        style={{
          position: 'absolute',
          left: '9.74cqw',
          top: '69.63cqh',
          width: '33.75cqw',
          height: '2.78cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '2.34cqw',
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
          }}
        />
      </div>
      {/* Sunny */}
      <div
        style={{
          pointerEvents: 'none',
position: 'absolute',
          color: '#FFFF77',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* mdi:aspect-ratio */}
      <div
        style={{
          pointerEvents: 'none',
position: 'absolute',
          left: '6.51cqw',
          top: '68.89cqh',
          width: '2.34cqw',
          height: '4.17cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Vector */}
      <div
        style={{
          pointerEvents: 'none',
position: 'absolute',
          left: '4.17cqw',
          right: '4.17cqw',
          top: '12.5cqh',
          bottom: '12.5cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Brand colors/Pink Feeling */}
      <div
        style={{
          pointerEvents: 'none',
position: 'absolute',
          background: '#FFB2B2',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Text */}
      <div
        style={{
          pointerEvents: 'none',
position: 'absolute',
          left: '49.01cqw',
          top: '51.85cqh',
          width: '0.0cqw',
          height: '1.2cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Bloc 2 */}
      <div
        style={{
          pointerEvents: 'none',
position: 'absolute',
          left: '49.01cqw',
          top: '39.81cqh',
          width: '38.85cqw',
          height: '19.54cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Rectangle 7024 */}
      <div
        style={{
          pointerEvents: 'none',
position: 'absolute',
          left: '49.01cqw',
          top: '39.81cqh',
          width: '38.8cqw',
          height: '7.04cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Fig */}
      <div
        style={{
          pointerEvents: 'none',
position: 'absolute',
          background: '#18093B',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Titre 2 */}
      <div
        style={{
          position: 'absolute',
          left: '53.7cqw',
          top: '41.94cqh',
          width: '33.59cqw',
          height: '2.78cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '2.34cqw',
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
          }}
        />
      </div>
      {/* Sunny */}
      <div
        style={{
          pointerEvents: 'none',
position: 'absolute',
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
          left: '49.01cqw',
          top: '49.17cqh',
          width: '38.8cqw',
          height: '10.19cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 400,
          fontSize: '1.56cqw',
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
          }}
        />
      </div>
      {/* Fig */}
      <div
        style={{
          pointerEvents: 'none',
position: 'absolute',
          color: '#18093B',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* mdi:color */}
      <div
        style={{
          pointerEvents: 'none',
position: 'absolute',
          left: '50.47cqw',
          top: '41.2cqh',
          width: '2.34cqw',
          height: '4.17cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Vector */}
      <div
        style={{
          pointerEvents: 'none',
position: 'absolute',
          left: '12.5cqw',
          right: '12.5cqw',
          top: '12.5cqh',
          bottom: '12.5cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Brand colors/Pink Feeling */}
      <div
        style={{
          pointerEvents: 'none',
position: 'absolute',
          background: '#FFB2B2',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Bloc 1 */}
      <div
        style={{
          pointerEvents: 'none',
position: 'absolute',
          left: '5.21cqw',
          top: '39.81cqh',
          width: '38.85cqw',
          height: '19.54cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Rectangle 7024 */}
      <div
        style={{
          pointerEvents: 'none',
position: 'absolute',
          left: '5.21cqw',
          top: '39.81cqh',
          width: '38.8cqw',
          height: '7.04cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Fig */}
      <div
        style={{
          pointerEvents: 'none',
position: 'absolute',
          background: '#18093B',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* mdi:message-text-outline */}
      <div
        style={{
          pointerEvents: 'none',
position: 'absolute',
          left: '6.46cqw',
          top: '41.2cqh',
          width: '2.34cqw',
          height: '4.17cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Vector */}
      <div
        style={{
          pointerEvents: 'none',
position: 'absolute',
          left: '8.33cqw',
          right: '8.33cqw',
          top: '8.33cqh',
          bottom: '8.33cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Brand colors/Pink Feeling */}
      <div
        style={{
          pointerEvents: 'none',
position: 'absolute',
          background: '#FFB2B2',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Texte 1 */}
      <div
        style={{
          position: 'absolute',
          left: '5.21cqw',
          top: '49.17cqh',
          width: '38.85cqw',
          height: '10.19cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 400,
          fontSize: '1.56cqw',
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
          }}
        />
      </div>
      {/* Fig */}
      <div
        style={{
          pointerEvents: 'none',
position: 'absolute',
          color: '#18093B',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Titre 1 */}
      <div
        style={{
          position: 'absolute',
          left: '9.9cqw',
          top: '41.94cqh',
          width: '33.59cqw',
          height: '2.78cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '2.34cqw',
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
          }}
        />
      </div>
      {/* Sunny */}
      <div
        style={{
          pointerEvents: 'none',
position: 'absolute',
          color: '#FFFF77',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
    </div>
  );
};

export default Layout3BlocsLargeTextLayout;