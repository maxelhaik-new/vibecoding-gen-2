import React from 'react';
import { EditableField } from '../EditableField';
import { SlideFieldRule } from '../../types';

interface LayoutProps {
  content: Record<string, string>;
  onChange: (key: string, value: string) => void;
  rules: Record<string, SlideFieldRule>;
}

export const Layout6BlocsLayout: React.FC<LayoutProps> = ({ content, onChange, rules }) => {
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
      {/* Intro */}
      <div
        style={{
          position: 'absolute',
          left: '5.21cqw',
          top: '21.67cqh',
          width: '85.62cqw',
          height: '6.48cqh',
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
      {/* Bloc Bulle */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.21cqw',
          top: '81.94cqh',
          width: '60.26cqw',
          height: '8.8cqh',
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
          top: '81.94cqh',
          width: '60.26cqw',
          height: '8.8cqh',
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
      {/* mdi:lightbulb-on-20 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.62cqw',
          top: '82.87cqh',
          width: '3.96cqw',
          height: '7.04cqh',
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
          left: '4.17cqw',
          right: '4.16cqw',
          top: '4.17cqh',
          bottom: '4.17cqh',
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
          pointerEvents: 'none',
          left: '11.25cqw',
          top: '83.61cqh',
          width: '52.29cqw',
          height: '5.56cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Texte Bulle */}
      <div
        style={{
          position: 'absolute',
          left: '11.25cqw',
          top: '83.61cqh',
          width: '53.7cqw',
          height: '5.56cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
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
      {/* Bloc 6 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '63.12cqw',
          top: '57.22cqh',
          width: '23.23cqw',
          height: '16.02cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Rectangle 7026 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '63.12cqw',
          top: '57.22cqh',
          width: '3.33cqw',
          height: '6.3cqh',
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
      {/* mdi:baby-carriage */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '63.28cqw',
          top: '57.87cqh',
          width: '2.97cqw',
          height: '5.28cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Picto 6 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '8.33cqw',
          right: '12.5cqw',
          top: '8.33cqh',
          bottom: '8.33cqh',
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
      {/* Titre 6 */}
      <div
        style={{
          position: 'absolute',
          left: '67.76cqw',
          top: '59.17cqh',
          width: '18.07cqw',
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
      {/* Texte 6 */}
      <div
        style={{
          position: 'absolute',
          left: '63.12cqw',
          top: '65.83cqh',
          width: '23.23cqw',
          height: '7.41cqh',
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
          fieldKey="Texte 6"
          value={content['Texte 6'] || ''}
          onChange={(val) => onChange('Texte 6', val)}
          rule={rules['Texte 6']}
          placeholder="Texte 6"
          style={{

            textAlign: 'left',
            padding: '0px',
            background: 'transparent',
            border: 'none',
            width: '100%',
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
      {/* Bloc 5 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '34.17cqw',
          top: '57.22cqh',
          width: '23.23cqw',
          height: '16.02cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Rectangle 7026 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '34.17cqw',
          top: '57.22cqh',
          width: '3.33cqw',
          height: '6.3cqh',
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
      {/* mdi:baby-carriage */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '34.32cqw',
          top: '57.87cqh',
          width: '2.97cqw',
          height: '5.28cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Picto 5 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '8.33cqw',
          right: '12.5cqw',
          top: '8.33cqh',
          bottom: '8.33cqh',
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
      {/* Titre 5 */}
      <div
        style={{
          position: 'absolute',
          left: '38.8cqw',
          top: '59.17cqh',
          width: '18.07cqw',
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
      {/* Texte 5 */}
      <div
        style={{
          position: 'absolute',
          left: '34.17cqw',
          top: '65.83cqh',
          width: '23.23cqw',
          height: '7.41cqh',
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
      {/* Bloc 4 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.21cqw',
          top: '57.22cqh',
          width: '23.23cqw',
          height: '16.02cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Rectangle 7026 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.21cqw',
          top: '57.22cqh',
          width: '3.33cqw',
          height: '6.3cqh',
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
      {/* mdi:baby-carriage */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.36cqw',
          top: '57.87cqh',
          width: '2.97cqw',
          height: '5.28cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Picto 4 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '8.33cqw',
          right: '12.5cqw',
          top: '8.33cqh',
          bottom: '8.33cqh',
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
      {/* Titre 4 */}
      <div
        style={{
          position: 'absolute',
          left: '9.32cqw',
          top: '59.17cqh',
          width: '18.59cqw',
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
      {/* Texte 4 */}
      <div
        style={{
          position: 'absolute',
          left: '5.21cqw',
          top: '65.83cqh',
          width: '23.23cqw',
          height: '7.41cqh',
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
      {/* Bloc 3 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '63.12cqw',
          top: '34.17cqh',
          width: '23.23cqw',
          height: '16.02cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Rectangle 7026 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '63.12cqw',
          top: '34.17cqh',
          width: '3.33cqw',
          height: '6.3cqh',
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
      {/* mdi:baby-carriage */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '63.28cqw',
          top: '34.81cqh',
          width: '2.97cqw',
          height: '5.28cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Picto 3 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '8.33cqw',
          right: '12.5cqw',
          top: '8.33cqh',
          bottom: '8.33cqh',
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
      {/* Titre 3 */}
      <div
        style={{
          position: 'absolute',
          left: '67.76cqw',
          top: '36.11cqh',
          width: '18.07cqw',
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
      {/* Texte 3 */}
      <div
        style={{
          position: 'absolute',
          left: '63.12cqw',
          top: '42.78cqh',
          width: '23.23cqw',
          height: '7.41cqh',
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
            width: '100%',
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
          left: '34.17cqw',
          top: '34.17cqh',
          width: '23.23cqw',
          height: '16.02cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Rectangle 7026 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '34.17cqw',
          top: '34.17cqh',
          width: '3.33cqw',
          height: '6.3cqh',
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
      {/* mdi:baby-carriage */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '34.32cqw',
          top: '34.81cqh',
          width: '2.97cqw',
          height: '5.28cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Picto 2 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '8.33cqw',
          right: '12.5cqw',
          top: '8.33cqh',
          bottom: '8.33cqh',
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
      {/* Titre 2 */}
      <div
        style={{
          position: 'absolute',
          left: '38.8cqw',
          top: '36.11cqh',
          width: '18.07cqw',
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
      {/* Texte 2 */}
      <div
        style={{
          position: 'absolute',
          left: '34.17cqw',
          top: '42.78cqh',
          width: '23.23cqw',
          height: '7.41cqh',
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
            width: '100%',
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
      {/* Bloc 1 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.21cqw',
          top: '34.17cqh',
          width: '23.23cqw',
          height: '16.02cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Rectangle 7026 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.21cqw',
          top: '34.17cqh',
          width: '3.33cqw',
          height: '6.3cqh',
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
      {/* mdi:baby-carriage */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.36cqw',
          top: '34.81cqh',
          width: '2.97cqw',
          height: '5.28cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Picto 1 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '8.33cqw',
          right: '12.5cqw',
          top: '8.33cqh',
          bottom: '8.33cqh',
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
      {/* Titre 1 */}
      <div
        style={{
          position: 'absolute',
          left: '9.32cqw',
          top: '36.11cqh',
          width: '18.59cqw',
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
      {/* Texte 1 */}
      <div
        style={{
          position: 'absolute',
          left: '5.21cqw',
          top: '42.78cqh',
          width: '23.23cqw',
          height: '7.41cqh',
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
            width: '100%',
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
    </div>
  );
};

export default Layout6BlocsLayout;