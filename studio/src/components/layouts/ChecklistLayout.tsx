import React from 'react';
import { EditableField } from '../EditableField';
import { SlideFieldRule } from '../../types';

interface LayoutProps {
  content: Record<string, string>;
  onChange: (key: string, value: string) => void;
  rules: Record<string, SlideFieldRule>;
}

export const ChecklistLayout: React.FC<LayoutProps> = ({ content, onChange, rules }) => {
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
      {/* Bloc Intro */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.21cqw',
          top: '21.67cqh',
          width: '37.55cqw',
          height: '69.07cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Rectangle 381 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '5.21cqw',
          top: '21.67cqh',
          width: '37.55cqw',
          height: '69.07cqh',
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
      {/* Texte Intro */}
      <div
        style={{
          position: 'absolute',
          left: '6.82cqw',
          top: '59.17cqh',
          width: '35.42cqw',
          height: '19.44cqh',
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
          fieldKey="Texte Intro"
          value={content['Texte Intro'] || ''}
          onChange={(val) => onChange('Texte Intro', val)}
          rule={rules['Texte Intro']}
          placeholder="Texte Intro"
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
      {/* Intro */}
      <div
        style={{
          position: 'absolute',
          left: '6.82cqw',
          top: '25.19cqh',
          width: '35.42cqw',
          height: '25.93cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '3.65cqw',
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
      {/* Bloc 1 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '45.36cqw',
          top: '21.67cqh',
          width: '49.43cqw',
          height: '69.07cqh',
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
          left: '45.36cqw',
          top: '21.67cqh',
          width: '49.43cqw',
          height: '69.07cqh',
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
      {/* Checklist 5 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '47.5cqw',
          top: '73.89cqh',
          width: '32.6cqw',
          height: '6.02cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* mdi:check-decagram */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '47.5cqw',
          top: '73.89cqh',
          width: '3.39cqw',
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
          left: '4.16cqw',
          right: '4.17cqw',
          top: '6.42cqh',
          bottom: '6.38cqh',
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
      {/* Texte 5 */}
      <div
        style={{
          position: 'absolute',
          left: '51.46cqw',
          top: '74.35cqh',
          width: '28.12cqw',
          height: '4.44cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 400,
          fontSize: '1.67cqw',
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
      {/* Checklist 4 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '47.5cqw',
          top: '64.91cqh',
          width: '45.31cqw',
          height: '6.02cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* mdi:check-decagram */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '47.5cqw',
          top: '64.91cqh',
          width: '3.39cqw',
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
          left: '4.16cqw',
          right: '4.17cqw',
          top: '6.42cqh',
          bottom: '6.38cqh',
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
      {/* Texte 4 */}
      <div
        style={{
          position: 'absolute',
          left: '51.46cqw',
          top: '65.37cqh',
          width: '40.83cqw',
          height: '4.44cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 400,
          fontSize: '1.67cqw',
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
      {/* Checklist 3 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '47.5cqw',
          top: '55.93cqh',
          width: '45.31cqw',
          height: '6.02cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* mdi:check-decagram */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '47.5cqw',
          top: '55.93cqh',
          width: '3.39cqw',
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
          left: '4.16cqw',
          right: '4.17cqw',
          top: '6.42cqh',
          bottom: '6.38cqh',
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
      {/* Texte 3 */}
      <div
        style={{
          position: 'absolute',
          left: '51.46cqw',
          top: '56.39cqh',
          width: '40.83cqw',
          height: '4.44cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 400,
          fontSize: '1.67cqw',
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
      {/* Checklist 2 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '47.5cqw',
          top: '46.94cqh',
          width: '45.31cqw',
          height: '6.02cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* mdi:check-decagram */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '47.5cqw',
          top: '46.94cqh',
          width: '3.39cqw',
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
          left: '4.16cqw',
          right: '4.17cqw',
          top: '6.42cqh',
          bottom: '6.38cqh',
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
      {/* Texte 2 */}
      <div
        style={{
          position: 'absolute',
          left: '51.46cqw',
          top: '47.41cqh',
          width: '40.83cqw',
          height: '4.44cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 400,
          fontSize: '1.67cqw',
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
      {/* Checklist 1 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '47.5cqw',
          top: '37.96cqh',
          width: '45.31cqw',
          height: '6.02cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* mdi:check-decagram */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '47.5cqw',
          top: '37.96cqh',
          width: '3.39cqw',
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
          left: '4.16cqw',
          right: '4.17cqw',
          top: '6.42cqh',
          bottom: '6.38cqh',
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
      {/* Texte 1 */}
      <div
        style={{
          position: 'absolute',
          left: '51.46cqw',
          top: '38.43cqh',
          width: '40.83cqw',
          height: '4.44cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 400,
          fontSize: '1.67cqw',
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
      {/* Nom Checklist */}
      <div
        style={{
          position: 'absolute',
          left: '47.86cqw',
          top: '25.19cqh',
          width: '46.41cqw',
          height: '6.48cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '3.65cqw',
          lineHeight: 1.0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <EditableField
          fieldKey="Nom Checklist"
          value={content['Nom Checklist'] || ''}
          onChange={(val) => onChange('Nom Checklist', val)}
          rule={rules['Nom Checklist']}
          placeholder="Nom Checklist"
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
    </div>
  );
};

export default ChecklistLayout;