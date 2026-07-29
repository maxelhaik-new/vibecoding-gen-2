import React from 'react';
import { EditableField } from '../EditableField';
import { SlideFieldRule } from '../../types';

interface LayoutProps {
  content: Record<string, string>;
  onChange: (key: string, value: string) => void;
  rules: Record<string, SlideFieldRule>;
  imageConcept?: string;
  imageStyle?: string;
}

export const ConceptImageLayout: React.FC<LayoutProps> = ({
  content,
  onChange,
  rules,
  imageConcept = '',
  imageStyle = '',
}) => {
  const imageUrl = content.image || content.Image || content['Image Fond'];
  const showImage = imageUrl && imageUrl.startsWith('http');

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', backgroundColor: 'var(--slide-bg)' }}>
      {/* Titre */}
      <div
        style={{
          position: 'absolute',
          left: '5.21cqw',
          top: '9.26cqh',
          width: '66.20cqw',
          height: '5.46cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 900,
          fontSize: '4.69cqw',
          lineHeight: 1.0,
          display: 'flex',
          alignItems: 'center',
          color: '#18093B',
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

      {/* Image Fond Container */}
      <div
        style={{
          position: 'absolute',
          left: '5.26cqw',
          top: '24.63cqh',
          width: '37.14cqw',
          height: '66.39cqh',
          boxShadow: '-10px 10px 0px #FCB3AD',
          borderRadius: '8px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#f4f4f5',
          border: '1px solid #FCB3AD',
        }}
      >
        {showImage ? (
          <img
            src={imageUrl}
            alt="Visual concept"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '1.5cqw',
              textAlign: 'center',
              color: '#18093B',
              background: 'rgba(252, 179, 173, 0.05)',
            }}
          >
            <span style={{ fontSize: '2.5cqw', marginBottom: '8px' }}>🖼️</span>
            <strong style={{ fontSize: '1.1cqw' }}>Image de concept (1:1)</strong>
            {imageConcept ? (
              <span style={{ fontSize: '0.8cqw', marginTop: '6px', color: '#71717a', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                "{imageConcept}" ({imageStyle})
              </span>
            ) : (
              <span style={{ fontSize: '0.8cqw', marginTop: '6px', color: '#71717a' }}>
                (Pas d'image)
              </span>
            )}
          </div>
        )}
      </div>

      {/* Mot */}
      <div
        style={{
          position: 'absolute',
          left: '44.32cqw',
          top: '24.63cqh',
          width: '39.06cqw',
          height: '6.11cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 400,
          fontStyle: 'italic',
          fontSize: '5.21cqw', // 100px -> ~5.21cqw (100 / 19.2)
          lineHeight: '1.0',
          display: 'flex',
          alignItems: 'center',
          color: '#6634D9',
        }}
      >
        <EditableField
          fieldKey="Mot"
          value={content['Mot'] || ''}
          onChange={(val) => onChange('Mot', val)}
          rule={rules['Mot']}
          placeholder="Concept/Mot clé"
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

      {/* Definition */}
      <div
        style={{
          position: 'absolute',
          left: '44.32cqw',
          top: '36.30cqh',
          width: '50.47cqw',
          height: '20.93cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 400,
          fontStyle: 'italic',
          fontSize: '2.08cqw', // 40px -> 2.08cqw
          lineHeight: '1.25',
          display: 'flex',
          alignItems: 'flex-start',
          color: '#18093B',
        }}
      >
        <EditableField
          fieldKey="Definition"
          value={content['Definition'] || ''}
          onChange={(val) => onChange('Definition', val)}
          rule={rules['Definition']}
          placeholder="Définition du concept..."
          style={{
            textAlign: 'left',
            padding: '0px',
            background: 'transparent',
            border: 'none',
            width: '100%',
          }}
        />
      </div>

      {/* Intro */}
      <div
        style={{
          position: 'absolute',
          left: '44.32cqw',
          top: '59.26cqh',
          width: '49.84cqw',
          height: '7.41cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '2.08cqw', // 40px -> 2.08cqw
          lineHeight: '1.0',
          display: 'flex',
          alignItems: 'center',
          color: '#FF5CE8',
        }}
      >
        <EditableField
          fieldKey="Intro"
          value={content['Intro'] || ''}
          onChange={(val) => onChange('Intro', val)}
          rule={rules['Intro']}
          placeholder="Phrase d'introduction/synthèse"
          style={{
            textAlign: 'left',
            padding: '0px',
            background: 'transparent',
            border: 'none',
            width: '100%',
          }}
        />
      </div>

      {/* FEATURE 1 */}
      {/* Rectangle 7026 (Picto 1 container) */}
      <div
        style={{
          position: 'absolute',
          left: '44.17cqw',
          top: '69.91cqh',
          width: '3.33cqw',
          height: '6.30cqh',
          backgroundColor: '#18093B',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Simple Picto indicator */}
        <span style={{ fontSize: '1.2cqw', color: '#FFFF77' }}>✨</span>
      </div>

      {/* Titre 1 */}
      <div
        style={{
          position: 'absolute',
          left: '48.28cqw',
          top: '71.85cqh',
          width: '10.68cqw',
          height: '3.06cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '2.60cqw', // 50px -> 2.6cqw
          lineHeight: '1.0',
          display: 'flex',
          alignItems: 'center',
          color: '#18093B',
        }}
      >
        <EditableField
          fieldKey="Titre 1"
          value={content['Titre 1'] || ''}
          onChange={(val) => onChange('Titre 1', val)}
          rule={rules['Titre 1']}
          placeholder="Feature 1"
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

      {/* Texte 1 */}
      <div
        style={{
          position: 'absolute',
          left: '44.17cqw',
          top: '78.52cqh',
          width: '17.19cqw',
          height: '10.19cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 400,
          fontSize: '1.56cqw', // 30px -> 1.56cqw
          lineHeight: '1.1',
          display: 'flex',
          alignItems: 'flex-start',
          color: '#18093B',
        }}
      >
        <EditableField
          fieldKey="Texte 1"
          value={content['Texte 1'] || ''}
          onChange={(val) => onChange('Texte 1', val)}
          rule={rules['Texte 1']}
          placeholder="Description feature 1..."
          style={{
            textAlign: 'left',
            padding: '0px',
            background: 'transparent',
            border: 'none',
            width: '100%',
          }}
        />
      </div>

      {/* FEATURE 2 */}
      {/* Rectangle 7026 (Picto 2 container) */}
      <div
        style={{
          position: 'absolute',
          left: '66.88cqw',
          top: '69.91cqh',
          width: '3.33cqw',
          height: '6.30cqh',
          backgroundColor: '#18093B',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{ fontSize: '1.2cqw', color: '#FFFF77' }}>✨</span>
      </div>

      {/* Titre 2 */}
      <div
        style={{
          position: 'absolute',
          left: '71.51cqw',
          top: '71.85cqh',
          width: '11.15cqw',
          height: '3.06cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 700,
          fontSize: '2.60cqw', // 50px -> 2.6cqw
          lineHeight: '1.0',
          display: 'flex',
          alignItems: 'center',
          color: '#18093B',
        }}
      >
        <EditableField
          fieldKey="Titre 2"
          value={content['Titre 2'] || ''}
          onChange={(val) => onChange('Titre 2', val)}
          rule={rules['Titre 2']}
          placeholder="Feature 2"
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

      {/* Texte 2 */}
      <div
        style={{
          position: 'absolute',
          left: '66.88cqw',
          top: '78.52cqh',
          width: '18.07cqw',
          height: '10.19cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 400,
          fontSize: '1.56cqw', // 30px -> 1.56cqw
          lineHeight: '1.1',
          display: 'flex',
          alignItems: 'flex-start',
          color: '#18093B',
        }}
      >
        <EditableField
          fieldKey="Texte 2"
          value={content['Texte 2'] || ''}
          onChange={(val) => onChange('Texte 2', val)}
          rule={rules['Texte 2']}
          placeholder="Description feature 2..."
          style={{
            textAlign: 'left',
            padding: '0px',
            background: 'transparent',
            border: 'none',
            width: '100%',
          }}
        />
      </div>

      {/* Source */}
      <div
        style={{
          position: 'absolute',
          left: '5.16cqw',
          top: '93.24cqh',
          width: '31.67cqw',
          height: '3.70cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 400,
          fontSize: '1.04cqw', // 20px -> 1.04cqw
          lineHeight: '1.0',
          display: 'flex',
          alignItems: 'center',
          color: '#FFB2B2',
        }}
      >
        <EditableField
          fieldKey="Source"
          value={content['Source'] || ''}
          onChange={(val) => onChange('Source', val)}
          rule={rules['Source']}
          placeholder="Source"
          multiline={false}
          style={{
            textAlign: 'left',
            padding: '0px',
            background: 'transparent',
            border: 'none',
            width: '100%',
            color: '#FFB2B2',
          }}
        />
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

export default ConceptImageLayout;
