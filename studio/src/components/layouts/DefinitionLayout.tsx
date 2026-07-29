import React from 'react';
import { EditableField } from '../EditableField';
import { SlideFieldRule } from '../../types';

interface LayoutProps {
  content: Record<string, string>;
  onChange: (key: string, value: string) => void;
  rules: Record<string, SlideFieldRule>;
}

export const DefinitionLayout: React.FC<LayoutProps> = ({ content, onChange, rules }) => {
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
      {/* Bloc 2 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '6.35cqw',
          top: '35.74cqh',
          width: '70.1cqw',
          height: '31.76cqh',
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
          top: '41.02cqh',
          width: '61.82cqw',
          height: '26.48cqh',
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
          left: '5.11cqw',
          top: '21.48cqh',
          width: '46.32cqw',
          height: '11.91cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Group 4318 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.11cqw',
          top: '22.23cqh',
          width: '4.81cqw',
          height: '9.77cqh',
          transform: 'rotate(-10.51deg)',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Rectangle 7108 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.11cqw',
          top: '23.03cqh',
          width: '2.34cqw',
          height: '8.33cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Pink Feeling variations/Pink Feeling 50% */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          background: '#F8DBDA',
          transform: 'rotate(-10.51deg)',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Rectangle 7109 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '7.68cqw',
          top: '23.67cqh',
          width: '2.32cqw',
          height: '8.32cqh',
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
          transform: 'rotate(-6.39deg)',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Group 4319 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '45.36cqw',
          top: '21.48cqh',
          width: '4.81cqw',
          height: '9.77cqh',
          transform: 'matrix(0.97, 0.26, 0.26, -0.97, 0, 0)',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Rectangle 7108 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '45.36cqw',
          top: '22.87cqh',
          width: '2.34cqw',
          height: '8.33cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Pink Feeling variations/Pink Feeling 50% */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          background: '#F8DBDA',
          transform: 'matrix(0.97, 0.26, 0.26, -0.97, 0, 0)',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Rectangle 7109 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '47.94cqw',
          top: '22.76cqh',
          width: '2.32cqw',
          height: '8.32cqh',
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
          transform: 'matrix(0.98, 0.19, 0.19, -0.98, 0, 0)',
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
          width: '42.27cqw',
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
      {/* Bloc Bulle */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.21cqw',
          top: '76.39cqh',
          width: '89.58cqw',
          height: '14.35cqh',
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
          top: '76.39cqh',
          width: '89.58cqw',
          height: '14.35cqh',
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
      {/* Bulle */}
      <div
        style={{
          position: 'absolute',
          left: '11.25cqw',
          top: '78.15cqh',
          width: '83.02cqw',
          height: '9.72cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '1.82cqw',
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
      {/* mdi:lightbulb-on-20 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.94cqw',
          top: '79.54cqh',
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
          left: '7.89cqw',
          right: '0.44cqw',
          top: '3.95cqh',
          bottom: '4.39cqh',
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
      {/* MODIFS max effectuées (couleurs, suppressions, blocs) */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '865.36cqw',
          top: '50.65cqh',
          width: '125.78cqw',
          height: '46.3cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 800,
          fontSize: '10.42cqw',
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
      {/* 🟡 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '844.27cqw',
          top: '53.7cqh',
          width: '21.41cqw',
          height: '12.22cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 800,
          fontSize: '10.42cqw',
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
    </div>
  );
};

export default DefinitionLayout;