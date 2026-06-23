import React from 'react';
import { EditableField } from '../EditableField';
import { SlideFieldRule } from '../../types';

interface LayoutProps {
  content: Record<string, string>;
  onChange: (key: string, value: string) => void;
  rules: Record<string, SlideFieldRule>;
}

export const CycleLayout: React.FC<LayoutProps> = ({ content, onChange, rules }) => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', backgroundColor: '#FFFFFF' }}>
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
          width: '84.64cqw',
          height: '7.69cqh',
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
      {/* Bloc 5 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '8.59cqw',
          top: '67.13cqh',
          width: '73.49cqw',
          height: '12.59cqh',
          transform: 'rotate(-180deg)',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Texte 5 */}
      <div
        style={{
          position: 'absolute',
          left: '35.94cqw',
          top: '74.63cqh',
          width: '45.62cqw',
          height: '3.24cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '1.98cqw',
          lineHeight: '1.2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <EditableField
          fieldKey="Texte 5"
          value={content['Texte 5'] || ''}
          onChange={(val) => onChange('Texte 5', val)}
          rule={rules['Texte 5']}
          placeholder="Texte 5"
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
      {/* Group 4357 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '8.59cqw',
          top: '67.13cqh',
          width: '25.1cqw',
          height: '9.81cqh',
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
          left: '8.59cqw',
          right: '89.31cqw',
          top: '67.13cqh',
          bottom: '29.49cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Brand colors/Pink Feeling */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          background: '#FFB2B2',
          transform: 'rotate(-90deg)',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Rectangle 6817 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '10.1cqw',
          right: '85.31cqw',
          top: '68.8cqh',
          bottom: '29.81cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Brand colors/Pink Feeling */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          background: '#FFB2B2',
          borderRadius: '0.0cqw',
          transform: 'rotate(-90deg)',
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
          left: '10.49cqw',
          right: '87.41cqw',
          top: '67.13cqh',
          bottom: '29.49cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Brand colors/Pink Feeling */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          background: '#FFB2B2',
          transform: 'matrix(0, -1, -1, 0, 0, 0)',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Rectangle 6817 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '10.1cqw',
          right: '66.3cqw',
          top: '75.56cqh',
          bottom: '23.06cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Brand colors/Pink Feeling */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          background: '#FFB2B2',
          borderRadius: '0.0cqw',
          transform: 'rotate(-180deg)',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Group 4302 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '63.85cqw',
          top: '67.13cqh',
          width: '7.08cqw',
          height: '32.41cqh',
          transform: 'rotate(90deg)',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Rectangle 6817 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '81.3cqw',
          right: '13.18cqw',
          top: '67.13cqh',
          bottom: '31.48cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Brand colors/Pink Feeling */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          background: '#FFB2B2',
          borderRadius: '0.0cqw',
          transform: 'rotate(90deg)',
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
          left: '63.85cqw',
          right: '34.05cqw',
          top: '76.34cqh',
          bottom: '20.28cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Brand colors/Pink Feeling */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          background: '#FFB2B2',
          transform: 'rotate(-180deg)',
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
          left: '63.85cqw',
          right: '34.05cqw',
          top: '72.96cqh',
          bottom: '23.66cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Brand colors/Pink Feeling */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          background: '#FFB2B2',
          transform: 'matrix(-1, 0, 0, 1, 0, 0)',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Rectangle 6817 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '64.79cqw',
          right: '17.92cqw',
          top: '75.65cqh',
          bottom: '22.96cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Brand colors/Pink Feeling */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          background: '#FFB2B2',
          borderRadius: '0.0cqw',
          transform: 'rotate(-180deg)',
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
          top: '36.3cqh',
          width: '16.56cqw',
          height: '27.59cqh',
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
          top: '36.3cqh',
          width: '6.51cqw',
          height: '10.74cqh',
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
          right: '88.28cqw',
          top: '36.3cqh',
          bottom: '52.96cqh',
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
          left: '6.81cqw',
          right: '89.49cqw',
          top: '39.49cqh',
          bottom: '56.25cqh',
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
      {/* Titre 1 */}
      <div
        style={{
          position: 'absolute',
          left: '5.21cqw',
          top: '50.28cqh',
          width: '16.04cqw',
          height: '3.24cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '1.98cqw',
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
          left: '5.21cqw',
          top: '55.0cqh',
          width: '16.56cqw',
          height: '8.89cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 400,
          fontSize: '1.56cqw',
          lineHeight: '1.2',
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
      {/* Bloc 2 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '17.97cqw',
          top: '36.3cqh',
          width: '28.12cqw',
          height: '27.59cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Group 4277 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '29.53cqw',
          top: '36.3cqh',
          width: '6.51cqw',
          height: '10.74cqh',
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
          left: '29.53cqw',
          right: '63.95cqw',
          top: '36.3cqh',
          bottom: '52.96cqh',
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
          left: '30.77cqw',
          right: '64.86cqw',
          top: '39.49cqh',
          bottom: '56.25cqh',
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
      {/* Titre 2 */}
      <div
        style={{
          position: 'absolute',
          left: '29.53cqw',
          top: '50.28cqh',
          width: '16.04cqw',
          height: '3.24cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '1.98cqw',
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
      {/* Texte 2 */}
      <div
        style={{
          position: 'absolute',
          left: '29.53cqw',
          top: '55.0cqh',
          width: '16.04cqw',
          height: '8.89cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 400,
          fontSize: '1.56cqw',
          lineHeight: '1.2',
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
      {/* Group 4275 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '17.97cqw',
          top: '38.24cqh',
          width: '5.52cqw',
          height: '6.76cqh',
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
          left: '21.4cqw',
          right: '76.51cqw',
          top: '38.24cqh',
          bottom: '58.38cqh',
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
      {/* Rectangle 6817 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '17.97cqw',
          right: '77.45cqw',
          top: '40.93cqh',
          bottom: '57.69cqh',
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
          left: '21.4cqw',
          right: '76.51cqw',
          top: '41.62cqh',
          bottom: '55.0cqh',
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
          transform: 'matrix(1, 0, 0, -1, 0, 0)',
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
          left: '42.81cqw',
          top: '36.3cqh',
          width: '27.6cqw',
          height: '27.59cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Group 4278 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '53.85cqw',
          top: '36.3cqh',
          width: '6.51cqw',
          height: '10.74cqh',
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
          left: '53.85cqw',
          right: '39.63cqw',
          top: '36.3cqh',
          bottom: '52.96cqh',
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
          left: '55.09cqw',
          right: '40.53cqw',
          top: '39.49cqh',
          bottom: '56.25cqh',
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
      {/* Titre 3 */}
      <div
        style={{
          position: 'absolute',
          left: '53.85cqw',
          top: '50.28cqh',
          width: '16.04cqw',
          height: '3.24cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '1.98cqw',
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
      {/* Texte 3 */}
      <div
        style={{
          position: 'absolute',
          left: '53.85cqw',
          top: '55.0cqh',
          width: '16.04cqw',
          height: '8.89cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 400,
          fontSize: '1.56cqw',
          lineHeight: '1.2',
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
      {/* Group 4299 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '42.81cqw',
          top: '38.24cqh',
          width: '5.52cqw',
          height: '6.76cqh',
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
          left: '46.24cqw',
          right: '51.67cqw',
          top: '38.24cqh',
          bottom: '58.38cqh',
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
      {/* Rectangle 6817 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '42.81cqw',
          right: '52.6cqw',
          top: '40.93cqh',
          bottom: '57.69cqh',
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
          left: '46.24cqw',
          right: '51.67cqw',
          top: '41.62cqh',
          bottom: '55.0cqh',
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
          transform: 'matrix(1, 0, 0, -1, 0, 0)',
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
          left: '67.66cqw',
          top: '36.3cqh',
          width: '27.08cqw',
          height: '27.59cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Group 4279 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '78.18cqw',
          top: '36.3cqh',
          width: '6.51cqw',
          height: '10.74cqh',
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
          left: '78.18cqw',
          right: '15.31cqw',
          top: '36.3cqh',
          bottom: '52.96cqh',
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
      {/* Numero 4 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '79.36cqw',
          right: '16.11cqw',
          top: '39.49cqh',
          bottom: '56.25cqh',
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
      {/* Titre 4 */}
      <div
        style={{
          position: 'absolute',
          left: '78.18cqw',
          top: '50.28cqh',
          width: '16.04cqw',
          height: '3.24cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '1.98cqw',
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
      {/* Texte 4 */}
      <div
        style={{
          position: 'absolute',
          left: '78.18cqw',
          top: '55.0cqh',
          width: '16.04cqw',
          height: '8.89cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 400,
          fontSize: '1.56cqw',
          lineHeight: '1.2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <EditableField
          fieldKey="Texte 4"
          value={content['Texte 4'] || ''}
          onChange={(val) => onChange('Texte 4', val)}
          rule={rules['Texte 4']}
          placeholder="Texte 4"
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
      {/* Group 4300 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '67.66cqw',
          top: '38.24cqh',
          width: '5.52cqw',
          height: '6.76cqh',
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
          left: '71.09cqw',
          right: '26.82cqw',
          top: '38.24cqh',
          bottom: '58.38cqh',
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
      {/* Rectangle 6817 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '67.66cqw',
          right: '27.76cqw',
          top: '40.93cqh',
          bottom: '57.69cqh',
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
          left: '71.09cqw',
          right: '26.82cqw',
          top: '41.62cqh',
          bottom: '55.0cqh',
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
          transform: 'matrix(1, 0, 0, -1, 0, 0)',
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

export default CycleLayout;