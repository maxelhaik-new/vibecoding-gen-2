import React from 'react';
import { EditableField } from '../EditableField';
import { SlideFieldRule } from '../../types';

interface LayoutProps {
  content: Record<string, string>;
  onChange: (key: string, value: string) => void;
  rules: Record<string, SlideFieldRule>;
}

export const ComparaisonLayout: React.FC<LayoutProps> = ({ content, onChange, rules }) => {
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
      {/* Rectangles Fond */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.21cqw',
          top: '45.65cqh',
          width: '89.58cqw',
          height: '48.43cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Rectangle 258 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.21cqw',
          top: '45.65cqh',
          width: '89.58cqw',
          height: '12.04cqh',
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
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Rectangle 260 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.21cqw',
          top: '57.68cqh',
          width: '89.58cqw',
          height: '12.22cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Pink Feeling variations/Pink Feeling 20% */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          background: '#FCF1F0',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Rectangle 261 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.21cqw',
          top: '81.85cqh',
          width: '89.58cqw',
          height: '12.22cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Pink Feeling variations/Pink Feeling 20% */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          background: '#FCF1F0',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Rectangle 259 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.21cqw',
          top: '69.81cqh',
          width: '89.58cqw',
          height: '12.04cqh',
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
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Item 2 */}
      <div
        style={{
          position: 'absolute',
          left: '6.25cqw',
          top: '62.64cqh',
          width: '88.02cqw',
          height: '2.22cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '1.88cqw',
          lineHeight: '1.2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <EditableField
          fieldKey="Item 2"
          value={content['Item 2'] || ''}
          onChange={(val) => onChange('Item 2', val)}
          rule={rules['Item 2']}
          placeholder="Item 2"
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
      {/* Item 1 */}
      <div
        style={{
          position: 'absolute',
          left: '6.25cqw',
          top: '50.51cqh',
          width: '88.02cqw',
          height: '2.22cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '1.88cqw',
          lineHeight: '1.2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <EditableField
          fieldKey="Item 1"
          value={content['Item 1'] || ''}
          onChange={(val) => onChange('Item 1', val)}
          rule={rules['Item 1']}
          placeholder="Item 1"
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
      {/* Item 3 */}
      <div
        style={{
          position: 'absolute',
          left: '6.25cqw',
          top: '74.77cqh',
          width: '88.02cqw',
          height: '2.22cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '1.88cqw',
          lineHeight: '1.2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <EditableField
          fieldKey="Item 3"
          value={content['Item 3'] || ''}
          onChange={(val) => onChange('Item 3', val)}
          rule={rules['Item 3']}
          placeholder="Item 3"
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
      {/* Item 4 */}
      <div
        style={{
          position: 'absolute',
          left: '6.25cqw',
          top: '86.9cqh',
          width: '88.02cqw',
          height: '2.22cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '1.88cqw',
          lineHeight: '1.2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <EditableField
          fieldKey="Item 4"
          value={content['Item 4'] || ''}
          onChange={(val) => onChange('Item 4', val)}
          rule={rules['Item 4']}
          placeholder="Item 4"
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
      {/* Texte A1 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '20.47cqw',
          top: '48.33cqh',
          width: '33.44cqw',
          height: '6.67cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Group 3292 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '20.47cqw',
          top: '49.63cqh',
          width: '2.26cqw',
          height: '4.35cqh',
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
          left: '21.68cqw',
          right: '77.08cqw',
          top: '49.63cqh',
          bottom: '48.36cqh',
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
      {/* Rectangle 6816 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '20.47cqw',
          right: '77.66cqw',
          top: '51.23cqh',
          bottom: '47.93cqh',
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
          left: '21.68cqw',
          right: '77.08cqw',
          top: '51.63cqh',
          bottom: '46.36cqh',
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
      {/* Texte A Item 1 */}
      <div
        style={{
          position: 'absolute',
          left: '27.24cqw',
          top: '48.33cqh',
          width: '26.15cqw',
          height: '6.67cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 400,
          fontSize: '1.88cqw',
          lineHeight: 1.0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <EditableField
          fieldKey="Texte A Item 1"
          value={content['Texte A Item 1'] || ''}
          onChange={(val) => onChange('Texte A Item 1', val)}
          rule={rules['Texte A Item 1']}
          placeholder="Texte A Item 1"
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
      {/* Texte A2 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '20.47cqw',
          top: '60.56cqh',
          width: '33.44cqw',
          height: '6.67cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Group 3293 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '20.47cqw',
          top: '61.76cqh',
          width: '2.26cqw',
          height: '4.35cqh',
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
          left: '21.68cqw',
          right: '77.08cqw',
          top: '61.76cqh',
          bottom: '36.24cqh',
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
      {/* Rectangle 6816 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '20.47cqw',
          right: '77.66cqw',
          top: '63.36cqh',
          bottom: '35.8cqh',
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
          left: '21.68cqw',
          right: '77.08cqw',
          top: '63.76cqh',
          bottom: '34.23cqh',
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
      {/* Texte A Item 2 */}
      <div
        style={{
          position: 'absolute',
          left: '27.24cqw',
          top: '60.56cqh',
          width: '26.15cqw',
          height: '6.67cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 400,
          fontSize: '1.88cqw',
          lineHeight: 1.0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <EditableField
          fieldKey="Texte A Item 2"
          value={content['Texte A Item 2'] || ''}
          onChange={(val) => onChange('Texte A Item 2', val)}
          rule={rules['Texte A Item 2']}
          placeholder="Texte A Item 2"
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
      {/* Texte A3 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '20.47cqw',
          top: '72.78cqh',
          width: '33.44cqw',
          height: '6.67cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Group 3294 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '20.47cqw',
          top: '73.89cqh',
          width: '2.26cqw',
          height: '4.35cqh',
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
          left: '21.68cqw',
          right: '77.08cqw',
          top: '73.89cqh',
          bottom: '24.11cqh',
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
      {/* Rectangle 6816 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '20.47cqw',
          right: '77.66cqw',
          top: '75.49cqh',
          bottom: '23.67cqh',
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
          left: '21.68cqw',
          right: '77.08cqw',
          top: '75.89cqh',
          bottom: '22.1cqh',
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
      {/* Texte A Item 3 */}
      <div
        style={{
          position: 'absolute',
          left: '27.24cqw',
          top: '72.78cqh',
          width: '26.15cqw',
          height: '6.67cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 400,
          fontSize: '1.88cqw',
          lineHeight: 1.0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <EditableField
          fieldKey="Texte A Item 3"
          value={content['Texte A Item 3'] || ''}
          onChange={(val) => onChange('Texte A Item 3', val)}
          rule={rules['Texte A Item 3']}
          placeholder="Texte A Item 3"
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
      {/* Texte A4 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '20.47cqw',
          top: '85.0cqh',
          width: '33.44cqw',
          height: '6.67cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Group 3295 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '20.47cqw',
          top: '85.92cqh',
          width: '2.26cqw',
          height: '4.35cqh',
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
          left: '21.68cqw',
          right: '77.08cqw',
          top: '85.93cqh',
          bottom: '12.07cqh',
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
      {/* Rectangle 6816 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '20.47cqw',
          right: '77.66cqw',
          top: '87.53cqh',
          bottom: '11.64cqh',
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
          left: '21.68cqw',
          right: '77.08cqw',
          top: '87.93cqh',
          bottom: '10.06cqh',
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
      {/* Texte A Item 4 */}
      <div
        style={{
          position: 'absolute',
          left: '27.24cqw',
          top: '85.0cqh',
          width: '26.15cqw',
          height: '6.67cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 400,
          fontSize: '1.88cqw',
          lineHeight: 1.0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <EditableField
          fieldKey="Texte A Item 4"
          value={content['Texte A Item 4'] || ''}
          onChange={(val) => onChange('Texte A Item 4', val)}
          rule={rules['Texte A Item 4']}
          placeholder="Texte A Item 4"
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
      {/* Texte B1 */}
      <div
        style={{
          position: 'absolute',
          left: '57.71cqw',
          top: '48.61cqh',
          width: '36.56cqw',
          height: '6.67cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 400,
          fontSize: '1.88cqw',
          lineHeight: 1.0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <EditableField
          fieldKey="Texte B1"
          value={content['Texte B1'] || ''}
          onChange={(val) => onChange('Texte B1', val)}
          rule={rules['Texte B1']}
          placeholder="Texte B1"
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
      {/* Texte B2 */}
      <div
        style={{
          position: 'absolute',
          left: '57.71cqw',
          top: '60.83cqh',
          width: '36.56cqw',
          height: '6.67cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 400,
          fontSize: '1.88cqw',
          lineHeight: 1.0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <EditableField
          fieldKey="Texte B2"
          value={content['Texte B2'] || ''}
          onChange={(val) => onChange('Texte B2', val)}
          rule={rules['Texte B2']}
          placeholder="Texte B2"
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
      {/* Texte B3 */}
      <div
        style={{
          position: 'absolute',
          left: '57.71cqw',
          top: '73.06cqh',
          width: '36.56cqw',
          height: '6.67cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 400,
          fontSize: '1.88cqw',
          lineHeight: 1.0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <EditableField
          fieldKey="Texte B3"
          value={content['Texte B3'] || ''}
          onChange={(val) => onChange('Texte B3', val)}
          rule={rules['Texte B3']}
          placeholder="Texte B3"
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
      {/* Texte B4 */}
      <div
        style={{
          position: 'absolute',
          left: '57.71cqw',
          top: '85.28cqh',
          width: '36.56cqw',
          height: '6.67cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 400,
          fontSize: '1.88cqw',
          lineHeight: 1.0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <EditableField
          fieldKey="Texte B4"
          value={content['Texte B4'] || ''}
          onChange={(val) => onChange('Texte B4', val)}
          rule={rules['Texte B4']}
          placeholder="Texte B4"
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
      {/* BLOC B */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '57.71cqw',
          top: '32.31cqh',
          width: '27.29cqw',
          height: '10.37cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Rectangle 7034 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '57.71cqw',
          top: '32.31cqh',
          width: '27.29cqw',
          height: '10.37cqh',
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
      {/* Titre B */}
      <div
        style={{
          position: 'absolute',
          left: '58.88cqw',
          top: '35.56cqh',
          width: '25.6cqw',
          height: '3.89cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 900,
          fontSize: '3.33cqw',
          lineHeight: '1.2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <EditableField
          fieldKey="Titre B"
          value={content['Titre B'] || ''}
          onChange={(val) => onChange('Titre B', val)}
          rule={rules['Titre B']}
          placeholder="Titre B"
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
          transform: 'matrix(1, 0, 0.03, 1, 0, 0)',
          color: '#FFFF77',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Bloc A */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '27.24cqw',
          top: '32.31cqh',
          width: '25.94cqw',
          height: '10.37cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Rectangle 7033 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '27.24cqw',
          top: '32.31cqh',
          width: '25.94cqw',
          height: '10.37cqh',
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
      {/* Titre A */}
      <div
        style={{
          position: 'absolute',
          left: '28.38cqw',
          top: '35.56cqh',
          width: '24.28cqw',
          height: '3.89cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 900,
          fontSize: '3.33cqw',
          lineHeight: '1.2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <EditableField
          fieldKey="Titre A"
          value={content['Titre A'] || ''}
          onChange={(val) => onChange('Titre A', val)}
          rule={rules['Titre A']}
          placeholder="Titre A"
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
          transform: 'matrix(1, 0, 0.03, 1, 0, 0)',
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
      {/* Bloc Intro */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.21cqw',
          top: '21.67cqh',
          width: '80.94cqw',
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
          width: '75.47cqw',
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
    </div>
  );
};

export default ComparaisonLayout;