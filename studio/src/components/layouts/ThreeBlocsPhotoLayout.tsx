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

export const ThreeBlocsPhotoLayout: React.FC<LayoutProps> = ({
  content,
  onChange,
  rules,
  imageConcept = '',
  imageStyle = '',
}) => {
  const imageUrl = content.image || content.Image;
  const showImage = imageUrl && imageUrl.startsWith('http');

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', backgroundColor: '#FFFFFF' }}>
      {/* Title Text */}
      <div
        style={{
          position: 'absolute',
          top: '9.25cqh', // 100px
          left: '5.2cqw', // 100px
          width: '73.7cqw', // 1415px
          height: '12cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 900,
          fontSize: '4.69cqw', // 90px
          lineHeight: '1.0',
          letterSpacing: '-0.014em',
          color: '#18093B',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <EditableField
          fieldKey="Titre"
          value={content.Titre || ''}
          onChange={(val) => onChange('Titre', val)}
          rule={rules.Titre}
          placeholder="Titre de la slide..."
          style={{
            color: '#18093B',
            textAlign: 'left',
            padding: '0px',
            background: 'transparent',
            border: 'none',
          }}
        />
      </div>

      {/* Intro paragraph */}
      <div
        style={{
          position: 'absolute',
          top: '21.67cqh', // 234px
          left: '5.15cqw', // 99px
          width: '85.6cqw', // 1644px
          height: '6.5cqh', // 70px
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 600,
          fontSize: '1.82cqw', // 35px
          lineHeight: '1.0',
          color: '#18093B', // Fig
          overflow: 'hidden',
        }}
      >
        <EditableField
          fieldKey="Intro"
          value={content.Intro || ''}
          onChange={(val) => onChange('Intro', val)}
          rule={rules.Intro}
          placeholder="Texte introductif de la slide..."
          style={{
            color: '#18093B',
            textAlign: 'left',
            padding: '0px',
            background: 'transparent',
            border: 'none',
          }}
        />
      </div>

      {/* Left Photo Container (Figma Bloc Image) */}
      <div
        style={{
          position: 'absolute',
          top: '39.8cqh', // 430px
          left: '5.15cqw', // 99px
          width: '22.1cqw', // 424px
          height: '51.2cqh', // 553px
          borderRadius: '8px',
          boxShadow: '-10px 10px 0px #FCB3AD', // Pink offset photo shadow!
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid #FCB3AD',
        }}
      >
        <div style={{ flex: 1, background: '#f4f4f5', position: 'relative' }}>
          {showImage ? (
            <img
              src={imageUrl}
              alt="Visual metaphor"
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
              <strong style={{ fontSize: '1.1cqw' }}>Photo de veille (2:3)</strong>
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
      </div>

      {/* Image Source (Figma Source below image) */}
      <div
        style={{
          position: 'absolute',
          top: '93.2cqh', // 1007px
          left: '5.15cqw', // 99px
          width: '22.6cqw', // 434px
          height: '3.7cqh', // 40px
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 400,
          fontSize: '1.67cqw', // 32px minimum
          lineHeight: '1.0',
          color: '#FCB3AD', // Pink text
        }}
      >
        <EditableField
          fieldKey="Source"
          value={content.Source || ''}
          onChange={(val) => onChange('Source', val)}
          rule={rules.Source}
          placeholder="Source de l'illustration..."
          style={{
            color: '#FCB3AD',
            padding: '0px',
            background: 'transparent',
            border: 'none',
          }}
        />
      </div>

      {/* 3 Blocks Stack on the right */}
      <div
        style={{
          position: 'absolute',
          top: '39.8cqh', // 430px
          left: '29.5cqw', // 566.99px
          width: '65.7cqw', // Spans to the right edge (calc from 100% width)
          height: '51.2cqh', // 553px
        }}
      >
        {[1, 2, 3].map((num, idx) => {
          const descKey = num === 2 ? 'Titre Bulle' : `Texte ${num}`;
          const topOffsets = ['0cqh', '18.5cqh', '37.0cqh']; // 430px, 630px, 830px -> diffs of 200px (18.5cqh)
          return (
            <div
              key={num}
              style={{
                position: 'absolute',
                top: topOffsets[idx],
                left: '0px',
                width: '100%',
                height: '14cqh', // 151px
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              {/* Title Dark Blue Banner with Pink Arrow */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: '#18093B', // Fig dark blue background
                  borderRadius: '6px',
                  height: '7.0cqh', // 76px
                  padding: '0px 2cqw',
                  width: '26.9cqw', // 517px banner width
                  marginBottom: '1.2cqh',
                }}
              >
                {/* Pink Arrow ➔ */}
                <span
                  style={{
                    fontSize: '2.34cqw', // 45px
                    color: '#FFB2B2', // Pink arrow color
                    marginRight: '1.2cqw',
                    fontWeight: 900,
                    lineHeight: '1.0',
                  }}
                >
                  ➔
                </span>

                {/* Editable Title */}
                <div
                  style={{
                    flex: 1,
                    fontFamily: 'var(--font-family-slides)',
                    fontWeight: 700,
                    fontSize: '2.34cqw', // 45px
                    color: '#FFFF77', // Sunny Yellow text
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <EditableField
                    fieldKey={`Titre ${num}`}
                    value={content[`Titre ${num}`] || ''}
                    onChange={(val) => onChange(`Titre ${num}`, val)}
                    rule={rules[`Titre ${num}`]}
                    placeholder={`Titre bloc ${num}`}
                    style={{
                      color: '#FFFF77',
                      padding: '0px',
                      background: 'transparent',
                      border: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Description Text */}
              <div
                style={{
                  paddingLeft: '1cqw',
                  fontSize: '1.67cqw', // 32px minimum
                  lineHeight: '1.0',
                  color: '#18093B', // Fig
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <EditableField
                  fieldKey={descKey}
                  value={content[descKey] || ''}
                  onChange={(val) => onChange(descKey, val)}
                  rule={rules[descKey]}
                  placeholder={`Description du bloc ${num}...`}
                  style={{
                    color: '#18093B',
                    padding: '0px',
                    background: 'transparent',
                    border: 'none',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ThreeBlocsPhotoLayout;
