import React from 'react';
import { EditableField } from '../EditableField';
import { SlideFieldRule } from '../../types';

interface LayoutProps {
  content: Record<string, string>;
  onChange: (key: string, value: string) => void;
  rules: Record<string, SlideFieldRule>;
}

export const ProcessLayout: React.FC<LayoutProps> = ({ content, onChange, rules }) => {
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
      {/* Bloc Intro */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.21cqw',
          top: '21.67cqh',
          width: '77.71cqw',
          height: '6.11cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Fleche */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.21cqw',
          top: '21.76cqh',
          width: '3.39cqw',
          height: '6.02cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Vector 194 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.21cqw',
          top: '21.76cqh',
          width: '3.39cqw',
          height: '6.02cqh',
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
          transform: 'matrix(-1, 0, 0, 1, 0, 0)',
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
          left: '6.79cqw',
          right: '91.97cqw',
          top: '22.76cqh',
          bottom: '75.23cqh',
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
          background: '#FFFF77',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Rectangle 6816 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.77cqw',
          right: '92.53cqw',
          top: '24.37cqh',
          bottom: '74.83cqh',
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
          background: '#FFFF77',
          borderRadius: '0.0cqw',
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
          left: '6.79cqw',
          right: '91.97cqw',
          top: '24.77cqh',
          bottom: '73.23cqh',
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
          background: '#FFFF77',
          transform: 'matrix(1, 0, 0, -1, 0, 0)',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Intro */}
      <div
        style={{
          position: 'absolute',
          left: '10.16cqw',
          top: '21.67cqh',
          width: '72.24cqw',
          height: '6.11cqh',
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
      {/* Bloc 6 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '50.05cqw',
          top: '64.44cqh',
          width: '36.91cqw',
          height: '23.51cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Vector 578 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '84.48cqw',
          top: '64.44cqh',
          width: '2.48cqw',
          height: '16.76cqh',
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
          transform: 'matrix(-1, 0, 0, 1, 0, 0)',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Rectangle 6905 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '54.79cqw',
          top: '78.89cqh',
          width: '28.12cqw',
          height: '6.11cqh',
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
      {/* Titre 6 */}
      <div
        style={{
          position: 'absolute',
          left: '55.83cqw',
          top: '80.19cqh',
          width: '26.56cqw',
          height: '3.06cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 900,
          fontSize: '2.6cqw',
          lineHeight: 1.0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <EditableField
          fieldKey="Titre 6"
          value={content['Titre 6'] || ''}
          onChange={(val) => onChange('Titre 6', val)}
          rule={rules['Titre 6']}
          placeholder="Titre 6"
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
      {/* Rectangle 7010 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '50.05cqw',
          top: '78.6cqh',
          width: '3.44cqw',
          height: '6.11cqh',
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
          background: '#FFFF77',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Violet 6 */}
      <div
        style={{
          position: 'absolute',
          left: '54.79cqw',
          top: '86.11cqh',
          width: '31.65cqw',
          height: '1.85cqh',
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
          fieldKey="Violet 6"
          value={content['Violet 6'] || ''}
          onChange={(val) => onChange('Violet 6', val)}
          rule={rules['Violet 6']}
          placeholder="Violet 6"
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
      {/* 6 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '50.99cqw',
          top: '80.18cqh',
          width: '1.61cqw',
          height: '3.06cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 900,
          fontSize: '2.6cqw',
          lineHeight: 1.0,
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
          color: '#18093B',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Bloc 5 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '50.05cqw',
          top: '44.17cqh',
          width: '36.91cqw',
          height: '24.53cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Vector 577 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '84.48cqw',
          top: '44.17cqh',
          width: '2.48cqw',
          height: '16.76cqh',
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
          transform: 'matrix(-1, 0, 0, 1, 0, 0)',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Rectangle 6905 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '54.79cqw',
          top: '59.35cqh',
          width: '28.12cqw',
          height: '6.11cqh',
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
      {/* Titre 5 */}
      <div
        style={{
          position: 'absolute',
          left: '55.83cqw',
          top: '60.93cqh',
          width: '26.56cqw',
          height: '3.06cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 900,
          fontSize: '2.6cqw',
          lineHeight: 1.0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <EditableField
          fieldKey="Titre 5"
          value={content['Titre 5'] || ''}
          onChange={(val) => onChange('Titre 5', val)}
          rule={rules['Titre 5']}
          placeholder="Titre 5"
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
      {/* Rectangle 7008 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '50.05cqw',
          top: '59.35cqh',
          width: '3.44cqw',
          height: '6.11cqh',
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
          background: '#FFFF77',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Violet 5 */}
      <div
        style={{
          position: 'absolute',
          left: '54.79cqw',
          top: '66.85cqh',
          width: '31.65cqw',
          height: '1.85cqh',
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
          fieldKey="Violet 5"
          value={content['Violet 5'] || ''}
          onChange={(val) => onChange('Violet 5', val)}
          rule={rules['Violet 5']}
          placeholder="Violet 5"
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
      {/* 5 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '50.99cqw',
          top: '60.93cqh',
          width: '1.56cqw',
          height: '3.06cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 900,
          fontSize: '2.6cqw',
          lineHeight: 1.0,
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
          color: '#18093B',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Bloc 4 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '43.59cqw',
          top: '39.44cqh',
          width: '39.32cqw',
          height: '42.59cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Rectangle 6905 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '54.79cqw',
          top: '39.44cqh',
          width: '28.12cqw',
          height: '6.11cqh',
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
      {/* Titre 4 */}
      <div
        style={{
          position: 'absolute',
          left: '55.83cqw',
          top: '41.02cqh',
          width: '26.56cqw',
          height: '3.06cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 900,
          fontSize: '2.6cqw',
          lineHeight: 1.0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <EditableField
          fieldKey="Titre 4"
          value={content['Titre 4'] || ''}
          onChange={(val) => onChange('Titre 4', val)}
          rule={rules['Titre 4']}
          placeholder="Titre 4"
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
      {/* Rectangle 7006 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '50.05cqw',
          top: '39.54cqh',
          width: '3.44cqw',
          height: '6.11cqh',
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
          background: '#FFFF77',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Group 4355 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '43.59cqw',
          top: '43.56cqh',
          width: '5.05cqw',
          height: '38.47cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Vector 576 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '43.59cqw',
          top: '43.56cqh',
          width: '5.05cqw',
          height: '38.47cqh',
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
      {/* Violet 4 */}
      <div
        style={{
          position: 'absolute',
          left: '54.79cqw',
          top: '46.94cqh',
          width: '31.65cqw',
          height: '1.85cqh',
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
          fieldKey="Violet 4"
          value={content['Violet 4'] || ''}
          onChange={(val) => onChange('Violet 4', val)}
          rule={rules['Violet 4']}
          placeholder="Violet 4"
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
      {/* 4 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '50.94cqw',
          top: '41.11cqh',
          width: '1.67cqw',
          height: '3.06cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 900,
          fontSize: '2.6cqw',
          lineHeight: 1.0,
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
          color: '#18093B',
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
          left: '5.25cqw',
          top: '64.44cqh',
          width: '37.77cqw',
          height: '23.51cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Rectangle 6905 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '13.33cqw',
          top: '78.88cqh',
          width: '29.69cqw',
          height: '6.11cqh',
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
      {/* Rectangle 7009 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '8.59cqw',
          top: '78.6cqh',
          width: '3.44cqw',
          height: '6.11cqh',
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
          background: '#FFFF77',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Vector 575 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.25cqw',
          top: '64.44cqh',
          width: '2.48cqw',
          height: '16.76cqh',
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
      {/* Titre 3 */}
      <div
        style={{
          position: 'absolute',
          left: '14.38cqw',
          top: '80.19cqh',
          width: '28.12cqw',
          height: '3.06cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 900,
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
      {/* 3 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '9.53cqw',
          top: '80.18cqh',
          width: '1.56cqw',
          height: '3.06cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 900,
          fontSize: '2.6cqw',
          lineHeight: 1.0,
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
          color: '#18093B',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Violet 3 */}
      <div
        style={{
          position: 'absolute',
          left: '13.33cqw',
          top: '86.11cqh',
          width: '29.17cqw',
          height: '1.85cqh',
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
          fieldKey="Violet 3"
          value={content['Violet 3'] || ''}
          onChange={(val) => onChange('Violet 3', val)}
          rule={rules['Violet 3']}
          placeholder="Violet 3"
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
      {/* Bloc 2 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.25cqw',
          top: '44.17cqh',
          width: '37.77cqw',
          height: '24.53cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Rectangle 6905 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '13.33cqw',
          top: '59.63cqh',
          width: '29.69cqw',
          height: '6.11cqh',
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
      {/* Rectangle 7007 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '8.59cqw',
          top: '59.35cqh',
          width: '3.44cqw',
          height: '6.11cqh',
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
          background: '#FFFF77',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Vector 574 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.25cqw',
          top: '44.17cqh',
          width: '2.48cqw',
          height: '16.76cqh',
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
      {/* Titre 2 */}
      <div
        style={{
          position: 'absolute',
          left: '14.38cqw',
          top: '60.93cqh',
          width: '28.12cqw',
          height: '3.06cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 900,
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
      {/* Violet 2 */}
      <div
        style={{
          position: 'absolute',
          left: '13.33cqw',
          top: '66.85cqh',
          width: '29.17cqw',
          height: '1.85cqh',
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
          fieldKey="Violet 2"
          value={content['Violet 2'] || ''}
          onChange={(val) => onChange('Violet 2', val)}
          rule={rules['Violet 2']}
          placeholder="Violet 2"
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
      {/* 2 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '9.53cqw',
          top: '60.93cqh',
          width: '1.56cqw',
          height: '3.06cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 900,
          fontSize: '2.6cqw',
          lineHeight: 1.0,
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
          left: '8.59cqw',
          top: '39.54cqh',
          width: '34.43cqw',
          height: '9.26cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Rectangle 6905 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '13.33cqw',
          top: '39.81cqh',
          width: '29.69cqw',
          height: '6.11cqh',
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
      {/* Rectangle 7005 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '8.59cqw',
          top: '39.54cqh',
          width: '3.44cqw',
          height: '6.11cqh',
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
          background: '#FFFF77',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Violet 1 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '13.33cqw',
          top: '46.94cqh',
          width: '29.69cqw',
          height: '1.85cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 400,
          fontSize: '1.56cqw',
          lineHeight: 1.0,
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
          color: '#6634D9',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* 1 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '9.79cqw',
          top: '41.11cqh',
          width: '1.09cqw',
          height: '3.06cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 900,
          fontSize: '2.6cqw',
          lineHeight: 1.0,
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
          left: '14.43cqw',
          top: '41.11cqh',
          width: '28.07cqw',
          height: '3.06cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 900,
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
    </div>
  );
};

export default ProcessLayout;