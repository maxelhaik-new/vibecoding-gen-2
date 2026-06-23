import React from 'react';
import { EditableField } from '../EditableField';
import { SlideFieldRule } from '../../types';

interface LayoutProps {
  content: Record<string, string>;
  onChange: (key: string, value: string) => void;
  rules: Record<string, SlideFieldRule>;
}

export const ChronologieLayout: React.FC<LayoutProps> = ({ content, onChange, rules }) => {
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
          width: '88.65cqw',
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
      {/* Fond */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.21cqw',
          top: '33.98cqh',
          width: '89.58cqw',
          height: '6.02cqh',
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
          left: '92.93cqw',
          right: '5.21cqw',
          top: '33.98cqh',
          bottom: '63.01cqh',
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
          left: '5.21cqw',
          right: '6.04cqw',
          top: '36.39cqh',
          bottom: '62.41cqh',
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
          left: '92.93cqw',
          right: '5.21cqw',
          top: '36.99cqh',
          bottom: '60.0cqh',
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
          transform: 'matrix(1, 0, 0, -1, 0, 0)',
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
          left: '6.09cqw',
          top: '36.39cqh',
          width: '16.82cqw',
          height: '24.72cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Date 1 */}
      <div
        style={{
          position: 'absolute',
          left: '6.09cqw',
          top: '45.09cqh',
          width: '16.3cqw',
          height: '2.78cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '2.34cqw',
          lineHeight: '1.2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <EditableField
          fieldKey="Date 1"
          value={content['Date 1'] || ''}
          onChange={(val) => onChange('Date 1', val)}
          rule={rules['Date 1']}
          placeholder="Date 1"
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
      {/* Titre 1 */}
      <div
        style={{
          position: 'absolute',
          left: '6.09cqw',
          top: '49.26cqh',
          width: '21.04cqw',
          height: '2.13cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '1.82cqw',
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
      {/* Brand colors/Fuschia */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          color: '#FF5CE8',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Texte 1 */}
      <div
        style={{
          position: 'absolute',
          left: '6.09cqw',
          top: '53.7cqh',
          width: '21.04cqw',
          height: '7.41cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 500,
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
      {/* Rectangle 6817 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '6.09cqw',
          right: '89.95cqw',
          top: '36.39cqh',
          bottom: '62.87cqh',
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
          transform: 'matrix(0, -1, -1, 0, 0, 0)',
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
          left: '77.14cqw',
          top: '36.39cqh',
          width: '16.82cqw',
          height: '24.72cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Date 5 */}
      <div
        style={{
          position: 'absolute',
          left: '77.14cqw',
          top: '45.09cqh',
          width: '16.3cqw',
          height: '2.78cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '2.34cqw',
          lineHeight: '1.2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <EditableField
          fieldKey="Date 5"
          value={content['Date 5'] || ''}
          onChange={(val) => onChange('Date 5', val)}
          rule={rules['Date 5']}
          placeholder="Date 5"
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
      {/* Titre 5 */}
      <div
        style={{
          position: 'absolute',
          left: '77.14cqw',
          top: '49.26cqh',
          width: '16.3cqw',
          height: '2.13cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '1.82cqw',
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
          style={{

            textAlign: 'left',
            padding: '0px',
            background: 'transparent',
            border: 'none',
            width: '100%',
          }}
        />
      </div>
      {/* Brand colors/Fuschia */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          color: '#FF5CE8',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Texte 5 */}
      <div
        style={{
          position: 'absolute',
          left: '77.14cqw',
          top: '53.7cqh',
          width: '16.82cqw',
          height: '7.41cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 500,
          fontSize: '1.56cqw',
          lineHeight: 1.0,
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
      {/* Rectangle 6820 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '77.14cqw',
          right: '18.91cqw',
          top: '36.39cqh',
          bottom: '62.87cqh',
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
          transform: 'matrix(0, -1, -1, 0, 0, 0)',
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
          left: '41.61cqw',
          top: '36.39cqh',
          width: '16.82cqw',
          height: '24.72cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Date 3 */}
      <div
        style={{
          position: 'absolute',
          left: '41.61cqw',
          top: '45.09cqh',
          width: '16.3cqw',
          height: '2.78cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '2.34cqw',
          lineHeight: '1.2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <EditableField
          fieldKey="Date 3"
          value={content['Date 3'] || ''}
          onChange={(val) => onChange('Date 3', val)}
          rule={rules['Date 3']}
          placeholder="Date 3"
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
      {/* Titre 3 */}
      <div
        style={{
          position: 'absolute',
          left: '41.61cqw',
          top: '49.26cqh',
          width: '16.3cqw',
          height: '2.13cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '1.82cqw',
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
      {/* Brand colors/Fuschia */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          color: '#FF5CE8',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Texte 3 */}
      <div
        style={{
          position: 'absolute',
          left: '41.61cqw',
          top: '53.7cqh',
          width: '16.82cqw',
          height: '7.41cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 500,
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
      {/* Rectangle 6821 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '41.61cqw',
          right: '54.43cqw',
          top: '36.39cqh',
          bottom: '62.87cqh',
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
          transform: 'matrix(0, -1, -1, 0, 0, 0)',
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
          left: '23.85cqw',
          top: '36.39cqh',
          width: '16.82cqw',
          height: '42.13cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Date 2 */}
      <div
        style={{
          position: 'absolute',
          left: '23.85cqw',
          top: '62.5cqh',
          width: '16.3cqw',
          height: '2.78cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '2.34cqw',
          lineHeight: '1.2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <EditableField
          fieldKey="Date 2"
          value={content['Date 2'] || ''}
          onChange={(val) => onChange('Date 2', val)}
          rule={rules['Date 2']}
          placeholder="Date 2"
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
      {/* Titre 2 */}
      <div
        style={{
          position: 'absolute',
          left: '23.85cqw',
          top: '66.67cqh',
          width: '16.3cqw',
          height: '2.13cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '1.82cqw',
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
      {/* Brand colors/Fuschia */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          color: '#FF5CE8',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Texte 2 */}
      <div
        style={{
          position: 'absolute',
          left: '23.85cqw',
          top: '71.11cqh',
          width: '16.82cqw',
          height: '7.41cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 500,
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
      {/* Rectangle 6818 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '23.85cqw',
          right: '62.66cqw',
          top: '36.39cqh',
          bottom: '62.87cqh',
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
          transform: 'matrix(0, -1, -1, 0, 0, 0)',
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
          left: '59.38cqw',
          top: '36.39cqh',
          width: '16.82cqw',
          height: '42.13cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Date 4 */}
      <div
        style={{
          position: 'absolute',
          left: '59.38cqw',
          top: '62.5cqh',
          width: '11.72cqw',
          height: '2.78cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '2.34cqw',
          lineHeight: '1.2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <EditableField
          fieldKey="Date 4"
          value={content['Date 4'] || ''}
          onChange={(val) => onChange('Date 4', val)}
          rule={rules['Date 4']}
          placeholder="Date 4"
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
      {/* Titre 4 */}
      <div
        style={{
          position: 'absolute',
          left: '59.38cqw',
          top: '66.67cqh',
          width: '16.3cqw',
          height: '2.13cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '1.82cqw',
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
      {/* Brand colors/Fuschia */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          color: '#FF5CE8',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Texte 4 */}
      <div
        style={{
          position: 'absolute',
          left: '59.38cqw',
          top: '71.11cqh',
          width: '16.82cqw',
          height: '7.41cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 500,
          fontSize: '1.56cqw',
          lineHeight: 1.0,
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
      {/* Rectangle 6819 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '59.38cqw',
          right: '27.14cqw',
          top: '36.39cqh',
          bottom: '62.87cqh',
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
          transform: 'matrix(0, -1, -1, 0, 0, 0)',
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
          left: '5.21cqw',
          top: '84.07cqh',
          width: '49.9cqw',
          height: '6.67cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Rectangle 382 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.21cqw',
          top: '84.07cqh',
          width: '49.9cqw',
          height: '6.67cqh',
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
      {/* Texte Bulle */}
      <div
        style={{
          position: 'absolute',
          left: '6.25cqw',
          top: '84.63cqh',
          width: '48.33cqw',
          height: '5.56cqh',
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
      {/* DECOUPAGE */}
      <div
        style={{
          position: 'relative',
          pointerEvents: 'none',
          left: '524.79cqw',
          top: '887.22cqh',
          width: '100.0cqw',
          height: '100.0cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
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
      {/* Bloc 2 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '42.19cqw',
          top: '48.7cqh',
          width: '29.43cqw',
          height: '13.8cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Rectangle 7120 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '59.32cqw',
          top: '48.7cqh',
          width: '12.29cqw',
          height: '6.85cqh',
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
      {/* Rectangle 7118 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '42.19cqw',
          top: '48.7cqh',
          width: '8.8cqw',
          height: '6.85cqh',
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
      {/* Rectangle 7119 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '52.4cqw',
          top: '48.7cqh',
          width: '5.52cqw',
          height: '6.85cqh',
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
      {/* Vector 591 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '42.19cqw',
          top: '57.5cqh',
          width: '29.43cqw',
          height: '0.0cqh',
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
      {/* Violet 2 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '51.2cqw',
          top: '60.37cqh',
          width: '9.79cqw',
          height: '2.13cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '1.82cqw',
          lineHeight: '1.2',
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
      {/* Titre 5 */}
      <div
        style={{
          position: 'absolute',
          left: '60.0cqw',
          top: '51.02cqh',
          width: '11.09cqw',
          height: '2.13cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '1.82cqw',
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
      {/* Titre 4 */}
      <div
        style={{
          position: 'absolute',
          left: '53.07cqw',
          top: '51.02cqh',
          width: '4.32cqw',
          height: '2.13cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '1.82cqw',
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
      {/* Titre 3 */}
      <div
        style={{
          position: 'absolute',
          left: '42.86cqw',
          top: '51.02cqh',
          width: '7.6cqw',
          height: '2.13cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '1.82cqw',
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
      {/* Bloc 1 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.21cqw',
          top: '41.57cqh',
          width: '35.62cqw',
          height: '20.93cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Rectangle 7117 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '29.06cqw',
          top: '48.7cqh',
          width: '11.72cqw',
          height: '6.85cqh',
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
          left: '29.74cqw',
          top: '51.02cqh',
          width: '10.52cqw',
          height: '2.13cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '1.82cqw',
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
      {/* Rectangle 7116 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.21cqw',
          top: '48.7cqh',
          width: '22.45cqw',
          height: '6.85cqh',
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
      {/* Texte 1 - Ligne 2 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.89cqw',
          top: '51.02cqh',
          width: '21.09cqw',
          height: '2.13cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '1.82cqw',
          lineHeight: '1.2',
          display: 'flex',
          alignItems: 'center'
        }}
      >
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
      {/* Vector 590 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.26cqw',
          top: '57.5cqh',
          width: '35.57cqw',
          height: '0.0cqh',
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
          left: '18.96cqw',
          top: '60.37cqh',
          width: '8.18cqw',
          height: '2.13cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '1.82cqw',
          lineHeight: '1.2',
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
      {/* Texte 1 */}
      <div
        style={{
          position: 'absolute',
          left: '5.21cqw',
          top: '41.57cqh',
          width: '35.1cqw',
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
      {/* Bloc Bulle */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.21cqw',
          top: '72.5cqh',
          width: '73.96cqw',
          height: '17.96cqh',
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
          left: '5.21cqw',
          top: '72.5cqh',
          width: '73.96cqw',
          height: '17.96cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Group 4361 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.21cqw',
          top: '72.5cqh',
          width: '73.96cqw',
          height: '17.96cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Rectangle 7115 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.21cqw',
          top: '72.5cqh',
          width: '73.96cqw',
          height: '17.96cqh',
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
      {/* Texte Bulle */}
      <div
        style={{
          position: 'absolute',
          left: '6.56cqw',
          top: '80.28cqh',
          width: '72.08cqw',
          height: '7.04cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 300,
          fontSize: '1.56cqw',
          lineHeight: 1.25,
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
      {/* Titre Bulle */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '6.56cqw',
          top: '74.91cqh',
          width: '22.71cqw',
          height: '3.06cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '1.82cqw',
          lineHeight: '1.2',
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
      {/* Intro */}
      <div
        style={{
          position: 'absolute',
          left: '5.21cqw',
          top: '21.67cqh',
          width: '89.58cqw',
          height: '9.81cqh',
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
    </div>
  );
};

export default ChronologieLayout;