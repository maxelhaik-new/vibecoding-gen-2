import React from 'react';
import { EditableField } from '../EditableField';
import { SlideFieldRule } from '../../types';

interface LayoutProps {
  content: Record<string, string>;
  onChange: (key: string, value: string) => void;
  rules: Record<string, SlideFieldRule>;
}

export const ObjectifChapLayout: React.FC<LayoutProps> = ({ content, onChange, rules }) => {
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
      {/* Vector */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          right: '0.0cqw',
          bottom: '0.0cqh',
          width: '20.83cqw',
          height: '34.72cqh',
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
      {/* Bloc 6 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '6.51cqw',
          top: '83.24cqh',
          width: '70.31cqw',
          height: '4.54cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Group 1942 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '6.51cqw',
          top: '83.24cqh',
          width: '2.55cqw',
          height: '4.54cqh',
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
          left: '6.51cqw',
          top: '83.24cqh',
          width: '2.55cqw',
          height: '4.54cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Purple Thinking */}
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
      {/* 6 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '7.03cqw',
          top: '83.98cqh',
          width: '1.56cqw',
          height: '3.06cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '2.6cqw',
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
      {/* Titre 6 */}
      <div
        style={{
          position: 'absolute',
          left: '9.84cqw',
          top: '84.35cqh',
          width: '66.46cqw',
          height: '2.41cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 400,
          fontSize: '2.08cqw',
          lineHeight: '1.2',
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
      {/* Bloc 5 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '6.51cqw',
          top: '74.54cqh',
          width: '70.31cqw',
          height: '4.54cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Group 1941 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '6.51cqw',
          top: '74.54cqh',
          width: '2.55cqw',
          height: '4.54cqh',
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
          left: '6.51cqw',
          top: '74.54cqh',
          width: '2.55cqw',
          height: '4.54cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Purple Thinking */}
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
      {/* 5 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '7.08cqw',
          top: '75.28cqh',
          width: '1.51cqw',
          height: '3.06cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '2.6cqw',
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
      {/* Titre 5 */}
      <div
        style={{
          position: 'absolute',
          left: '9.84cqw',
          top: '75.65cqh',
          width: '66.46cqw',
          height: '2.41cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 400,
          fontSize: '2.08cqw',
          lineHeight: '1.2',
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
      {/* Bloc 4 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '6.51cqw',
          top: '65.83cqh',
          width: '70.31cqw',
          height: '4.54cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Group 1940 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '6.51cqw',
          top: '65.83cqh',
          width: '2.55cqw',
          height: '4.54cqh',
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
          left: '6.51cqw',
          top: '65.83cqh',
          width: '2.55cqw',
          height: '4.54cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Purple Thinking */}
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
      {/* 4 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '7.03cqw',
          top: '66.57cqh',
          width: '1.61cqw',
          height: '3.06cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '2.6cqw',
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
      {/* Titre 4 */}
      <div
        style={{
          position: 'absolute',
          left: '9.84cqw',
          top: '66.94cqh',
          width: '66.46cqw',
          height: '2.41cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 400,
          fontSize: '2.08cqw',
          lineHeight: '1.2',
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
      {/* Bloc 3 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '6.51cqw',
          top: '57.13cqh',
          width: '70.31cqw',
          height: '4.54cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Group 1939 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '6.51cqw',
          top: '57.13cqh',
          width: '2.55cqw',
          height: '4.54cqh',
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
          left: '6.51cqw',
          top: '57.13cqh',
          width: '2.55cqw',
          height: '4.54cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Purple Thinking */}
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
      {/* 3 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '7.08cqw',
          top: '57.87cqh',
          width: '1.51cqw',
          height: '3.06cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '2.6cqw',
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
      {/* Titre 3 */}
      <div
        style={{
          position: 'absolute',
          left: '9.84cqw',
          top: '58.24cqh',
          width: '66.46cqw',
          height: '2.41cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 400,
          fontSize: '2.08cqw',
          lineHeight: '1.2',
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
      {/* Bloc 2 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '6.51cqw',
          top: '48.43cqh',
          width: '70.31cqw',
          height: '4.54cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Group 1938 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '6.51cqw',
          top: '48.43cqh',
          width: '2.55cqw',
          height: '4.54cqh',
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
          left: '6.51cqw',
          top: '48.43cqh',
          width: '2.55cqw',
          height: '4.54cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Purple Thinking */}
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
      {/* 2 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '7.08cqw',
          top: '49.17cqh',
          width: '1.51cqw',
          height: '3.06cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '2.6cqw',
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
      {/* Titre 2 */}
      <div
        style={{
          position: 'absolute',
          left: '9.84cqw',
          top: '49.54cqh',
          width: '66.46cqw',
          height: '2.41cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 400,
          fontSize: '2.08cqw',
          lineHeight: '1.2',
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
      {/* Bloc 1 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '6.51cqw',
          top: '39.72cqh',
          width: '70.31cqw',
          height: '4.54cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Group 1937 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '6.51cqw',
          top: '39.72cqh',
          width: '2.55cqw',
          height: '4.54cqh',
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
          left: '6.51cqw',
          top: '39.72cqh',
          width: '2.55cqw',
          height: '4.54cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Purple Thinking */}
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
      {/* 1 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '7.29cqw',
          top: '40.46cqh',
          width: '1.04cqw',
          height: '3.06cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '2.6cqw',
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
      {/* Titre 1 */}
      <div
        style={{
          position: 'absolute',
          left: '9.84cqw',
          top: '40.83cqh',
          width: '66.46cqw',
          height: '2.41cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 400,
          fontSize: '2.08cqw',
          lineHeight: '1.2',
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
      {/* Bloc 1 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.21cqw',
          top: '39.77cqh',
          width: '70.31cqw',
          height: '48.38cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Vector 196 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.21cqw',
          top: '39.77cqh',
          width: '0.0cqw',
          height: '48.38cqh',
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
      {/* Bloc Intro */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.21cqw',
          top: '21.67cqh',
          width: '70.31cqw',
          height: '15.28cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Rectangle Fond */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.21cqw',
          top: '21.67cqh',
          width: '89.58cqw',
          height: '15.28cqh',
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
      {/* Intro */}
      <div
        style={{
          position: 'absolute',
          left: '7.08cqw',
          top: '25.83cqh',
          width: '87.19cqw',
          height: '6.94cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 600,
          fontSize: '2.34cqw',
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
    </div>
  );
};

export default ObjectifChapLayout;