import React from 'react';
import { EditableField } from '../EditableField';
import { SlideFieldRule } from '../../types';

interface LayoutProps {
  content: Record<string, string>;
  onChange: (key: string, value: string) => void;
  rules: Record<string, SlideFieldRule>;
}

export const Layout4BlocsPhotoLayout: React.FC<LayoutProps> = ({ content, onChange, rules }) => {
  const imageUrl = content.image || content.Image || content.image_url;
  const showImage = imageUrl && (imageUrl.startsWith('http') || imageUrl.startsWith('/') || imageUrl.startsWith('data:'));

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', backgroundColor: 'var(--slide-bg)' }}>
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
          color: '#18093B',
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
          placeholder="Titre de la slide"
          multiline={false}
          style={{ background: 'transparent', border: 'none', width: '100%', color: '#18093B', fontWeight: 900 }}
        />
      </div>

      {/* Intro */}
      <div
        style={{
          position: 'absolute',
          left: '5.1cqw',
          top: '21.67cqh',
          width: '89.69cqw',
          height: '7.69cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 400,
          fontSize: '2.6cqw',
          lineHeight: 1.0,
          color: '#18093B',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <EditableField
          fieldKey="Intro"
          value={content['Intro'] || ''}
          onChange={(val) => onChange('Intro', val)}
          rule={rules['Intro']}
          placeholder="Texte d'introduction ou sous-titre"
          style={{ background: 'transparent', border: 'none', width: '100%', color: '#18093B' }}
        />
      </div>

      {/* Bloc Image */}
      <div
        style={{
          position: 'absolute',
          left: '5.68cqw',
          top: '35.09cqh',
          width: '30.94cqw',
          height: '55.93cqh',
          backgroundColor: '#FFBABB',
          boxShadow: '-0.52cqw 0.93cqh 0px var(--template-coral)',
          borderRadius: '1cqw',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {showImage ? (
          <img src={imageUrl} alt="Visuel" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ fontSize: '2cqw', color: '#6634D9', fontWeight: 700 }}>🎨 VISUEL</div>
        )}
      </div>

      {/* Source */}
      <div
        style={{
          position: 'absolute',
          left: '5.16cqw',
          top: '93.24cqh',
          width: '22.6cqw',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 400,
          fontSize: '1.04cqw',
          color: '#FFB2B2'
        }}
      >
        <EditableField
          fieldKey="Source"
          value={content['Source'] || ''}
          onChange={(val) => onChange('Source', val)}
          rule={rules['Source']}
          placeholder="Source de l'image"
          style={{ background: 'transparent', border: 'none', width: '100%', color: '#FFB2B2' }}
        />
      </div>

      {/* 4 Blocs de Contenu */}
      {/* Bloc 1 */}
      <div
        style={{
          position: 'absolute',
          left: '43.18cqw',
          top: '34.81cqh',
          width: '17.66cqw',
          height: '19.17cqh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8cqw', marginBottom: '0.5cqh' }}>
          <div style={{ width: '2.55cqw', height: '4.81cqh', backgroundColor: '#18093B', borderRadius: '4px', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', color: '#FFFF77', fontWeight: 900, fontSize: '1.2cqw' }}>
            {content['Picto 1'] || '1'}
          </div>
          <EditableField
            fieldKey="Titre 1"
            value={content['Titre 1'] || ''}
            onChange={(val) => onChange('Titre 1', val)}
            rule={rules['Titre 1']}
            placeholder="Titre 1"
            multiline={false}
            style={{ background: 'transparent', border: 'none', color: '#18093B', fontWeight: 700, fontSize: '2.34cqw' }}
          />
        </div>
        <EditableField
          fieldKey="Texte 1"
          value={content['Texte 1'] || ''}
          onChange={(val) => onChange('Texte 1', val)}
          rule={rules['Texte 1']}
          placeholder="Description 1"
          style={{ background: 'transparent', border: 'none', width: '100%', color: '#18093B', fontSize: '1.56cqw', lineHeight: 1.1 }}
        />
      </div>

      {/* Bloc 2 */}
      <div
        style={{
          position: 'absolute',
          left: '64.48cqw',
          top: '35.37cqh',
          width: '19.22cqw',
          height: '19.17cqh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8cqw', marginBottom: '0.5cqh' }}>
          <div style={{ width: '2.55cqw', height: '4.81cqh', backgroundColor: '#18093B', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFF77', fontWeight: 900, fontSize: '1.2cqw' }}>
            {content['Picto 2'] || '2'}
          </div>
          <EditableField
            fieldKey="Titre 2"
            value={content['Titre 2'] || ''}
            onChange={(val) => onChange('Titre 2', val)}
            rule={rules['Titre 2']}
            placeholder="Titre 2"
            multiline={false}
            style={{ background: 'transparent', border: 'none', color: '#18093B', fontWeight: 700, fontSize: '2.34cqw' }}
          />
        </div>
        <EditableField
          fieldKey="Texte 2"
          value={content['Texte 2'] || ''}
          onChange={(val) => onChange('Texte 2', val)}
          rule={rules['Texte 2']}
          placeholder="Description 2"
          style={{ background: 'transparent', border: 'none', width: '100%', color: '#18093B', fontSize: '1.56cqw', lineHeight: 1.1 }}
        />
      </div>

      {/* Bloc 3 */}
      <div
        style={{
          position: 'absolute',
          left: '43.18cqw',
          top: '63.06cqh',
          width: '16.2cqw',
          height: '19.17cqh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8cqw', marginBottom: '0.5cqh' }}>
          <div style={{ width: '2.55cqw', height: '4.81cqh', backgroundColor: '#18093B', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFF77', fontWeight: 900, fontSize: '1.2cqw' }}>
            {content['Picto 3'] || '3'}
          </div>
          <EditableField
            fieldKey="Titre 3"
            value={content['Titre 3'] || ''}
            onChange={(val) => onChange('Titre 3', val)}
            rule={rules['Titre 3']}
            placeholder="Titre 3"
            multiline={false}
            style={{ background: 'transparent', border: 'none', color: '#18093B', fontWeight: 700, fontSize: '2.34cqw' }}
          />
        </div>
        <EditableField
          fieldKey="Texte 3"
          value={content['Texte 3'] || ''}
          onChange={(val) => onChange('Texte 3', val)}
          rule={rules['Texte 3']}
          placeholder="Description 3"
          style={{ background: 'transparent', border: 'none', width: '100%', color: '#18093B', fontSize: '1.56cqw', lineHeight: 1.1 }}
        />
      </div>

      {/* Bloc 4 */}
      <div
        style={{
          position: 'absolute',
          left: '64.48cqw',
          top: '63.06cqh',
          width: '16.2cqw',
          height: '19.17cqh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8cqw', marginBottom: '0.5cqh' }}>
          <div style={{ width: '2.55cqw', height: '4.81cqh', backgroundColor: '#18093B', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFF77', fontWeight: 900, fontSize: '1.2cqw' }}>
            {content['Picto 4'] || '4'}
          </div>
          <EditableField
            fieldKey="Titre 4"
            value={content['Titre 4'] || ''}
            onChange={(val) => onChange('Titre 4', val)}
            rule={rules['Titre 4']}
            placeholder="Titre 4"
            multiline={false}
            style={{ background: 'transparent', border: 'none', color: '#18093B', fontWeight: 700, fontSize: '2.34cqw' }}
          />
        </div>
        <EditableField
          fieldKey="Texte 4"
          value={content['Texte 4'] || ''}
          onChange={(val) => onChange('Texte 4', val)}
          rule={rules['Texte 4']}
          placeholder="Description 4"
          style={{ background: 'transparent', border: 'none', width: '100%', color: '#18093B', fontSize: '1.56cqw', lineHeight: 1.1 }}
        />
      </div>

      {/* Camera Vector overlay at the right bottom */}
      <div style={{ position: 'absolute', right: 0, bottom: 0, width: '20.83cqw', height: '37.04cqh', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', right: '-0.48px', bottom: '0.4px', width: '18.3cqw', height: '32.56cqh', backgroundColor: '#FFBABB', opacity: 0.8 }} />
        <div style={{ position: 'absolute', right: '3.9cqw', bottom: '6.94cqh', width: '9.38cqw', height: '16.67cqh', backgroundColor: '#7F7F7F', borderRadius: '50%' }} />
      </div>
    </div>
  );
};

export default Layout4BlocsPhotoLayout;
