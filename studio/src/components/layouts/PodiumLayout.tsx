import React from 'react';
import { EditableField } from '../EditableField';
import { SlideFieldRule } from '../../types';

interface LayoutProps {
  content: Record<string, string>;
  onChange: (key: string, value: string) => void;
  rules: Record<string, SlideFieldRule>;
}

export const PodiumLayout: React.FC<LayoutProps> = ({ content, onChange, rules }) => {
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
      {/* Bloc Bulle */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.21cqw',
          top: '80.65cqh',
          width: '62.6cqw',
          height: '10.09cqh',
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
          top: '80.65cqh',
          width: '62.6cqw',
          height: '10.09cqh',
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
      {/* Texte Bulle */}
      <div
        style={{
          position: 'absolute',
          left: '6.04cqw',
          top: '86.48cqh',
          width: '61.25cqw',
          height: '2.78cqh',
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
      {/* Titre Bulle */}
      <div
        style={{
          position: 'absolute',
          left: '6.04cqw',
          top: '81.85cqh',
          width: '61.25cqw',
          height: '2.78cqh',
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
          fieldKey="Titre Bulle"
          value={content['Titre Bulle'] || ''}
          onChange={(val) => onChange('Titre Bulle', val)}
          rule={rules['Titre Bulle']}
          placeholder="Titre Bulle"
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
      {/* Bloc 3 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '67.81cqw',
          top: '36.3cqh',
          width: '25.21cqw',
          height: '34.72cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Group 4317 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '67.86cqw',
          top: '36.3cqh',
          width: '18.49cqw',
          height: '7.13cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Rectangle 7107 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '67.86cqw',
          top: '36.3cqh',
          width: '18.49cqw',
          height: '7.13cqh',
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
      {/* Group 4312 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '70.16cqw',
          top: '37.13cqh',
          width: '9.01cqw',
          height: '5.56cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Picto 3 - 3 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '76.2cqw',
          top: '39.26cqh',
          width: '1.93cqw',
          height: '3.43cqh',
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
          left: '8.33cqw',
          right: '8.34cqw',
          top: '8.34cqh',
          bottom: '12.5cqh',
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
      {/* Picto 3 - 2 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '74.27cqw',
          top: '39.26cqh',
          width: '1.93cqw',
          height: '3.43cqh',
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
          left: '8.33cqw',
          right: '8.34cqw',
          top: '8.34cqh',
          bottom: '12.5cqh',
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
      {/* Picto 3 - 1 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '72.34cqw',
          top: '39.26cqh',
          width: '1.93cqw',
          height: '3.43cqh',
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
          left: '8.33cqw',
          right: '8.34cqw',
          top: '8.34cqh',
          bottom: '12.5cqh',
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
      {/* Rang 3 */}
      <div
        style={{
          position: 'absolute',
          left: '72.34cqw',
          top: '37.13cqh',
          width: '6.3cqw',
          height: '1.85cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '1.56cqw',
          lineHeight: '1.2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <EditableField
          fieldKey="Rang 3"
          value={content['Rang 3'] || ''}
          onChange={(val) => onChange('Rang 3', val)}
          rule={rules['Rang 3']}
          placeholder="Rang 3"
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
      {/* Chiffre 3 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '70.16cqw',
          top: '37.13cqh',
          width: '1.88cqw',
          height: '5.46cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '4.69cqw',
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
      {/* Texte 3 */}
      <div
        style={{
          position: 'absolute',
          left: '67.81cqw',
          top: '58.06cqh',
          width: '25.21cqw',
          height: '12.96cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
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
      {/* Capture d’écran 2025-10-30 à 16.51.38 3 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '67.86cqw',
          top: '45.65cqh',
          width: '5.68cqw',
          height: '10.09cqh',
          background: 'url(Capture d’écran 2025-10-30 à 16.51.38.png)',
          borderRadius: '8.83cqw',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Violet 3 */}
      <div
        style={{
          position: 'absolute',
          left: '74.84cqw',
          top: '47.41cqh',
          width: '17.66cqw',
          height: '6.67cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '2.6cqw',
          lineHeight: '1.2',
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
          left: '36.51cqw',
          top: '36.3cqh',
          width: '25.21cqw',
          height: '34.72cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Group 4316 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '36.51cqw',
          top: '36.3cqh',
          width: '18.49cqw',
          height: '7.13cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Rectangle 7107 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '36.51cqw',
          top: '36.3cqh',
          width: '18.49cqw',
          height: '7.13cqh',
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
      {/* Group 4312 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '38.39cqw',
          top: '37.13cqh',
          width: '10.68cqw',
          height: '5.56cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Picto 2 - 3 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '45.31cqw',
          top: '39.26cqh',
          width: '1.93cqw',
          height: '3.43cqh',
          opacity: 0.35,
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
          left: '8.33cqw',
          right: '8.34cqw',
          top: '8.34cqh',
          bottom: '12.5cqh',
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
      {/* Picto 2 - 2 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '43.39cqw',
          top: '39.26cqh',
          width: '1.93cqw',
          height: '3.43cqh',
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
          left: '8.33cqw',
          right: '8.34cqw',
          top: '8.34cqh',
          bottom: '12.5cqh',
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
      {/* Picto 2 - 1 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '41.46cqw',
          top: '39.26cqh',
          width: '1.93cqw',
          height: '3.43cqh',
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
          left: '8.33cqw',
          right: '8.34cqw',
          top: '8.34cqh',
          bottom: '12.5cqh',
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
      {/* Rang 2 */}
      <div
        style={{
          position: 'absolute',
          left: '41.46cqw',
          top: '37.13cqh',
          width: '7.08cqw',
          height: '1.85cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '1.56cqw',
          lineHeight: '1.2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <EditableField
          fieldKey="Rang 2"
          value={content['Rang 2'] || ''}
          onChange={(val) => onChange('Rang 2', val)}
          rule={rules['Rang 2']}
          placeholder="Rang 2"
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
      {/* Chiffre 2 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '38.39cqw',
          top: '37.13cqh',
          width: '2.71cqw',
          height: '5.46cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '4.69cqw',
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
      {/* Texte 2 */}
      <div
        style={{
          position: 'absolute',
          left: '36.51cqw',
          top: '58.06cqh',
          width: '25.21cqw',
          height: '12.96cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
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
      {/* Capture d’écran 2025-10-30 à 16.51.38 2 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '36.51cqw',
          top: '45.65cqh',
          width: '5.68cqw',
          height: '10.09cqh',
          background: 'url(Capture d’écran 2025-10-30 à 16.51.38.png)',
          borderRadius: '8.83cqw',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Violet 2 */}
      <div
        style={{
          position: 'absolute',
          left: '43.49cqw',
          top: '47.41cqh',
          width: '17.71cqw',
          height: '6.67cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '2.6cqw',
          lineHeight: '1.2',
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
      {/* Bloc 1 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.21cqw',
          top: '36.3cqh',
          width: '25.21cqw',
          height: '34.72cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Group 4315 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.21cqw',
          top: '36.3cqh',
          width: '18.49cqw',
          height: '7.13cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Rectangle 7107 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.21cqw',
          top: '36.3cqh',
          width: '18.49cqw',
          height: '7.13cqh',
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
      {/* Group 4312 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '7.08cqw',
          top: '37.13cqh',
          width: '10.68cqw',
          height: '5.56cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Picto 1 - 3 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '14.01cqw',
          top: '39.26cqh',
          width: '1.93cqw',
          height: '3.43cqh',
          opacity: 0.35,
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
          left: '8.33cqw',
          right: '8.34cqw',
          top: '8.34cqh',
          bottom: '12.5cqh',
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
      {/* Picto 1 - 2 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '12.08cqw',
          top: '39.26cqh',
          width: '1.93cqw',
          height: '3.43cqh',
          opacity: 0.35,
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
          left: '8.33cqw',
          right: '8.34cqw',
          top: '8.34cqh',
          bottom: '12.5cqh',
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
      {/* Picto 1 - 1 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '10.16cqw',
          top: '39.26cqh',
          width: '1.93cqw',
          height: '3.43cqh',
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
          left: '8.33cqw',
          right: '8.34cqw',
          top: '8.34cqh',
          bottom: '12.5cqh',
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
      {/* Rang 1 */}
      <div
        style={{
          position: 'absolute',
          left: '10.16cqw',
          top: '37.13cqh',
          width: '7.08cqw',
          height: '1.85cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '1.56cqw',
          lineHeight: '1.2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <EditableField
          fieldKey="Rang 1"
          value={content['Rang 1'] || ''}
          onChange={(val) => onChange('Rang 1', val)}
          rule={rules['Rang 1']}
          placeholder="Rang 1"
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
      {/* Chiffre 1 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '7.08cqw',
          top: '37.13cqh',
          width: '2.76cqw',
          height: '5.46cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '4.69cqw',
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
      {/* Texte 1 */}
      <div
        style={{
          position: 'absolute',
          left: '5.21cqw',
          top: '58.06cqh',
          width: '25.21cqw',
          height: '12.96cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
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
      {/* Violet 1 */}
      <div
        style={{
          position: 'absolute',
          left: '12.71cqw',
          top: '47.41cqh',
          width: '17.19cqw',
          height: '6.67cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '2.6cqw',
          lineHeight: '1.2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <EditableField
          fieldKey="Violet 1"
          value={content['Violet 1'] || ''}
          onChange={(val) => onChange('Violet 1', val)}
          rule={rules['Violet 1']}
          placeholder="Violet 1"
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
      {/* Capture d’écran 2025-10-30 à 16.51.38 1 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.73cqw',
          top: '45.65cqh',
          width: '5.68cqw',
          height: '10.09cqh',
          background: 'url(Capture d’écran 2025-10-30 à 16.51.38.png)',
          borderRadius: '8.83cqw',
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

export default PodiumLayout;