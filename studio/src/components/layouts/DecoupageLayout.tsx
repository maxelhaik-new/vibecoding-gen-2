import React from 'react';
import { EditableField } from '../EditableField';
import { SlideFieldRule } from '../../types';

interface LayoutProps {
  content: Record<string, string>;
  onChange: (key: string, value: string) => void;
  rules: Record<string, SlideFieldRule>;
}

export const DecoupageLayout: React.FC<LayoutProps> = ({ content, onChange, rules }) => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', backgroundColor: 'var(--slide-bg)' }}>
      {/* Titre */}
      <div
        style={{
          position: 'absolute',
          left: '5.21cqw',
          top: '9.26cqh',
          width: '70.57cqw',
          height: '5.46cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 900,
          fontSize: '4.69cqw',
          lineHeight: 1.0,
          display: 'flex',
          alignItems: 'center',
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
          lineHeight: '1.2',
          display: 'flex',
          alignItems: 'center',
          color: '#18093B',
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

      {/* Texte 1 */}
      <div
        style={{
          position: 'absolute',
          left: '5.21cqw',
          top: '41.57cqh',
          width: '23.85cqw',
          height: '3.06cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '2.6cqw',
          lineHeight: '1.0',
          display: 'flex',
          alignItems: 'center',
          color: '#18093B',
        }}
      >
        <EditableField
          fieldKey="Texte 1"
          value={content['Texte 1'] || ''}
          onChange={(val) => onChange('Texte 1', val)}
          rule={rules['Texte 1']}
          placeholder="Texte 1"
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

      {/* BLOC 1 (Purple blocks) */}
      {/* Rectangle 7116 (Purple block 1 bg) */}
      <div
        style={{
          position: 'absolute',
          left: '5.21cqw',
          top: '48.7cqh',
          width: '22.45cqw',
          height: '6.85cqh',
          backgroundColor: '#6634D9',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '1.35cqw',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-family-slides)',
            fontWeight: 700,
            fontSize: '1.82cqw',
            color: '#FFFFFF',
            width: '100%',
          }}
        >
          <EditableField
            fieldKey="Texte 1 - Ligne 2"
            value={content['Texte 1 - Ligne 2'] || ''}
            onChange={(val) => onChange('Texte 1 - Ligne 2', val)}
            rule={rules['Texte 1 - Ligne 2']}
            placeholder="Texte 1 - Ligne 2"
            multiline={false}
            style={{
              textAlign: 'left',
              padding: '0px',
              background: 'transparent',
              border: 'none',
              width: '100%',
              color: '#FFFFFF',
            }}
          />
        </div>
      </div>

      {/* Rectangle 7117 (Purple block 2 bg) */}
      <div
        style={{
          position: 'absolute',
          left: '29.06cqw',
          top: '48.7cqh',
          width: '11.72cqw',
          height: '6.85cqh',
          backgroundColor: '#6634D9',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '1.35cqw',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-family-slides)',
            fontWeight: 700,
            fontSize: '1.82cqw',
            color: '#FFFFFF',
            width: '100%',
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
              color: '#FFFFFF',
            }}
          />
        </div>
      </div>

      {/* Vector 590 (Purple underline) */}
      <div
        style={{
          position: 'absolute',
          left: '5.26cqw',
          top: '57.5cqh',
          width: '35.57cqw',
          height: '0px',
          borderBottom: '0.47cqw solid #6634D9',
        }}
      />

      {/* Violet 1 */}
      <div
        style={{
          position: 'absolute',
          left: '18.96cqw',
          top: '60.37cqh',
          width: '8.18cqw',
          height: '2.13cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '1.82cqw',
          color: '#6634D9',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <EditableField
          fieldKey="Violet 1"
          value={content['Violet 1'] || ''}
          onChange={(val) => onChange('Violet 1', val)}
          rule={rules['Violet 1']}
          placeholder="Violet 1"
          multiline={false}
          style={{
            textAlign: 'left',
            padding: '0px',
            background: 'transparent',
            border: 'none',
            width: '100%',
            color: '#6634D9',
          }}
        />
      </div>

      {/* BLOC 2 (Fig blocks) */}
      {/* Rectangle 7118 (Fig block 1 bg) */}
      <div
        style={{
          position: 'absolute',
          left: '42.19cqw',
          top: '48.7cqh',
          width: '8.8cqw',
          height: '6.85cqh',
          backgroundColor: '#18093B',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '0.7cqw',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-family-slides)',
            fontWeight: 700,
            fontSize: '1.82cqw',
            color: '#FFFFFF',
            width: '100%',
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
              color: '#FFFFFF',
            }}
          />
        </div>
      </div>

      {/* Rectangle 7119 (Fig block 2 bg) */}
      <div
        style={{
          position: 'absolute',
          left: '52.40cqw',
          top: '48.7cqh',
          width: '5.52cqw',
          height: '6.85cqh',
          backgroundColor: '#18093B',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '0.7cqw',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-family-slides)',
            fontWeight: 700,
            fontSize: '1.82cqw',
            color: '#FFFFFF',
            width: '100%',
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
              color: '#FFFFFF',
            }}
          />
        </div>
      </div>

      {/* Rectangle 7120 (Fig block 3 bg) */}
      <div
        style={{
          position: 'absolute',
          left: '59.32cqw',
          top: '48.7cqh',
          width: '12.29cqw',
          height: '6.85cqh',
          backgroundColor: '#18093B',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '0.7cqw',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-family-slides)',
            fontWeight: 700,
            fontSize: '1.82cqw',
            color: '#FFFFFF',
            width: '100%',
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
              color: '#FFFFFF',
            }}
          />
        </div>
      </div>

      {/* Vector 591 (Fig underline) */}
      <div
        style={{
          position: 'absolute',
          left: '42.19cqw',
          top: '62.1cqh',
          width: '29.43cqw',
          height: '0px',
          borderBottom: '0.47cqw solid #18093B',
        }}
      />

      {/* Violet 2 */}
      <div
        style={{
          position: 'absolute',
          left: '51.20cqw',
          top: '60.37cqh',
          width: '9.79cqw',
          height: '2.13cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '1.82cqw',
          color: '#18093B',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <EditableField
          fieldKey="Violet 2"
          value={content['Violet 2'] || ''}
          onChange={(val) => onChange('Violet 2', val)}
          rule={rules['Violet 2']}
          placeholder="Violet 2"
          multiline={false}
          style={{
            textAlign: 'left',
            padding: '0px',
            background: 'transparent',
            border: 'none',
            width: '100%',
            color: '#18093B',
          }}
        />
      </div>

      {/* Sunny Bubble Block */}
      <div
        style={{
          position: 'absolute',
          left: '5.21cqw',
          top: '72.5cqh',
          width: '73.96cqw',
          height: '17.96cqh',
          backgroundColor: '#FFFF77',
          padding: '2.4cqh 1.35cqw',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {/* Titre Bulle */}
        <div
          style={{
            fontFamily: 'var(--font-family-slides)',
            fontWeight: 700,
            fontSize: '1.82cqw',
            color: '#6634D9',
            textTransform: 'uppercase',
            marginBottom: '0.8cqh',
          }}
        >
          <EditableField
            fieldKey="Titre Bulle"
            value={content['Titre Bulle'] || ''}
            onChange={(val) => onChange('Titre Bulle', val)}
            rule={rules['Titre Bulle']}
            placeholder="TITRE BULLE"
            multiline={false}
            style={{
              textAlign: 'left',
              padding: '0px',
              background: 'transparent',
              border: 'none',
              width: '100%',
              color: '#6634D9',
            }}
          />
        </div>

        {/* Texte Bulle */}
        <div
          style={{
            fontFamily: 'var(--font-family-slides)',
            fontWeight: 600,
            fontStyle: 'italic',
            fontSize: '1.56cqw',
            lineHeight: '1.25',
            color: '#18093B',
          }}
        >
          <EditableField
            fieldKey="Texte Bulle"
            value={content['Texte Bulle'] || ''}
            onChange={(val) => onChange('Texte Bulle', val)}
            rule={rules['Texte Bulle']}
            placeholder="Texte de la bulle explicative..."
            style={{
              textAlign: 'left',
              padding: '0px',
              background: 'transparent',
              border: 'none',
              width: '100%',
              color: '#18093B',
            }}
          />
        </div>
      </div>

      {/* Decorative camera circle/vector bottom right */}
      <div
        style={{
          position: 'absolute',
          right: '-0.025cqw',
          bottom: '0.037cqh',
          width: '18.31cqw',
          height: '32.56cqh',
          backgroundColor: '#FFBABB',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: '3.91cqw',
          bottom: '6.94cqh',
          width: '9.38cqw',
          height: '16.67cqh',
          backgroundColor: '#7F7F7F',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default DecoupageLayout;
