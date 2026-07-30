import React from 'react';
import { EditableField } from '../EditableField';
import { SlideFieldRule } from '../../types';

interface LayoutProps {
  content: Record<string, string>;
  onChange: (key: string, value: string) => void;
  rules: Record<string, SlideFieldRule>;
}

export const FicheRecapLayout: React.FC<LayoutProps> = ({ content, onChange, rules }) => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', backgroundColor: 'var(--slide-bg)' }}>
      {/* Header Block */}
      <div
        style={{
          position: 'absolute',
          left: '4.63cqw',
          top: '3.27cqh',
          width: '90.74cqw',
          height: '6.54cqh',
          backgroundColor: '#6634D9',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 2.5cqw'
        }}
      >
        {/* Titre */}
        <div style={{ fontFamily: 'var(--font-family-slides)', fontWeight: 900, fontSize: '4.2cqw', color: '#FFFF77', width: '45%' }}>
          <EditableField
            fieldKey="Titre"
            value={content['Titre'] || ''}
            onChange={(val) => onChange('Titre', val)}
            rule={rules['Titre']}
            placeholder="FICHE RÉCAP"
            multiline={false}
            style={{ background: 'transparent', border: 'none', color: '#FFFF77', fontWeight: 900 }}
          />
        </div>

        {/* Sous-titre */}
        <div style={{ fontFamily: 'var(--font-family-slides)', fontWeight: 900, fontSize: '2.5cqw', color: '#FFFFFF', textAlign: 'right', width: '50%' }}>
          <EditableField
            fieldKey="Sous-titre"
            value={content['Sous-titre'] || ''}
            onChange={(val) => onChange('Sous-titre', val)}
            rule={rules['Sous-titre']}
            placeholder="SYNTHÈSE"
            multiline={false}
            style={{ background: 'transparent', border: 'none', color: '#FFFFFF', fontWeight: 900, textAlign: 'right' }}
          />
        </div>
      </div>

      {/* Step 1 */}
      <div style={{ position: 'absolute', left: '4.63cqw', top: '12.76cqh', width: '85cqw', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2cqw', marginBottom: '0.8cqh' }}>
          <div style={{ width: '3.7cqw', height: '2.68cqh', backgroundColor: '#FFB2B2', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#18093B', fontWeight: 900, fontSize: '2cqw' }}>
            1
          </div>
          <EditableField
            fieldKey="Titre 1"
            value={content['Titre 1'] || ''}
            onChange={(val) => onChange('Titre 1', val)}
            rule={rules['Titre 1']}
            placeholder="Étape 1"
            multiline={false}
            style={{ background: 'transparent', border: 'none', color: '#18093B', fontWeight: 700, fontSize: '2.8cqw' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4cqh', paddingLeft: '4.9cqw' }}>
          {['Texte 1', 'Texte 2', 'Texte 3', 'Texte 4'].map((key, i) => (
            content[key] !== undefined || i < 2 ? (
              <div key={key} style={{ display: 'flex', gap: '0.5cqw', fontFamily: 'var(--font-family-slides)', fontSize: '2cqw', color: '#18093B' }}>
                <span>→</span>
                <EditableField
                  fieldKey={key}
                  value={content[key] || ''}
                  onChange={(val) => onChange(key, val)}
                  rule={rules[key]}
                  placeholder={`Consigne ${i + 1}`}
                  style={{ background: 'transparent', border: 'none', width: '100%', color: '#18093B', padding: '0' }}
                />
              </div>
            ) : null
          ))}
        </div>
      </div>

      {/* Step 2 */}
      <div style={{ position: 'absolute', left: '4.63cqw', top: '30.17cqh', width: '85cqw', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2cqw', marginBottom: '0.8cqh' }}>
          <div style={{ width: '3.7cqw', height: '2.68cqh', backgroundColor: '#FFB2B2', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#18093B', fontWeight: 900, fontSize: '2cqw' }}>
            2
          </div>
          <EditableField
            fieldKey="Titre 2"
            value={content['Titre 2'] || ''}
            onChange={(val) => onChange('Titre 2', val)}
            rule={rules['Titre 2']}
            placeholder="Étape 2"
            multiline={false}
            style={{ background: 'transparent', border: 'none', color: '#18093B', fontWeight: 700, fontSize: '2.8cqw' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4cqh', paddingLeft: '4.9cqw' }}>
          {['Texte 5', 'Texte 6', 'Texte 7', 'Texte 8'].map((key, i) => (
            content[key] !== undefined || i < 2 ? (
              <div key={key} style={{ display: 'flex', gap: '0.5cqw', fontFamily: 'var(--font-family-slides)', fontSize: '2cqw', color: '#18093B' }}>
                <span>→</span>
                <EditableField
                  fieldKey={key}
                  value={content[key] || ''}
                  onChange={(val) => onChange(key, val)}
                  rule={rules[key]}
                  placeholder={`Consigne ${i + 1}`}
                  style={{ background: 'transparent', border: 'none', width: '100%', color: '#18093B', padding: '0' }}
                />
              </div>
            ) : null
          ))}
        </div>
      </div>

      {/* Step 3 */}
      <div style={{ position: 'absolute', left: '4.63cqw', top: '47.58cqh', width: '85cqw', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2cqw', marginBottom: '0.8cqh' }}>
          <div style={{ width: '3.7cqw', height: '2.68cqh', backgroundColor: '#FFB2B2', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#18093B', fontWeight: 900, fontSize: '2cqw' }}>
            3
          </div>
          <EditableField
            fieldKey="Titre 3"
            value={content['Titre 3'] || ''}
            onChange={(val) => onChange('Titre 3', val)}
            rule={rules['Titre 3']}
            placeholder="Étape 3"
            multiline={false}
            style={{ background: 'transparent', border: 'none', color: '#18093B', fontWeight: 700, fontSize: '2.8cqw' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4cqh', paddingLeft: '4.9cqw' }}>
          {['Texte 9', 'Texte 10', 'Texte 11', 'Texte 12'].map((key, i) => (
            content[key] !== undefined || i < 2 ? (
              <div key={key} style={{ display: 'flex', gap: '0.5cqw', fontFamily: 'var(--font-family-slides)', fontSize: '2cqw', color: '#18093B' }}>
                <span>→</span>
                <EditableField
                  fieldKey={key}
                  value={content[key] || ''}
                  onChange={(val) => onChange(key, val)}
                  rule={rules[key]}
                  placeholder={`Consigne ${i + 1}`}
                  style={{ background: 'transparent', border: 'none', width: '100%', color: '#18093B', padding: '0' }}
                />
              </div>
            ) : null
          ))}
        </div>
      </div>

      {/* Footer highlights / bottom block */}
      <div
        style={{
          position: 'absolute',
          left: '4.63cqw',
          top: '65.0cqh',
          width: '90.74cqw',
          height: '26.44cqh',
          backgroundColor: '#FFFF77',
          borderRadius: '8px',
          padding: '2cqh 3cqw',
          boxSizing: 'border-box'
        }}
      >
        {/* Footer Title */}
        <div style={{ fontFamily: 'var(--font-family-slides)', fontWeight: 700, fontSize: '2.8cqw', color: '#6634D9', marginBottom: '1.5cqh' }}>
          <EditableField
            fieldKey="Titre Bulle"
            value={content['Titre Bulle'] || ''}
            onChange={(val) => onChange('Titre Bulle', val)}
            rule={rules['Titre Bulle']}
            placeholder="RECOMMANDATIONS"
            multiline={false}
            style={{ background: 'transparent', border: 'none', color: '#6634D9', fontWeight: 700 }}
          />
        </div>

        {/* Check & Cross lists */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5cqh 4cqw', marginBottom: '1.5cqh' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5cqh' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8cqw', fontFamily: 'var(--font-family-slides)', fontWeight: 700, fontSize: '2.2cqw', color: '#18093B' }}>
              <span style={{ color: '#22c55e' }}>🟢</span>
              <EditableField
                fieldKey="Titre Check"
                value={content['Titre Check'] || ''}
                onChange={(val) => onChange('Titre Check', val)}
                rule={rules['Titre Check']}
                placeholder="À faire"
                multiline={false}
                style={{ background: 'transparent', border: 'none', color: '#18093B', fontWeight: 700 }}
              />
            </div>
            <div style={{ fontFamily: 'var(--font-family-slides)', fontSize: '1.8cqw', color: '#18093B', paddingLeft: '2cqw' }}>
              <EditableField
                fieldKey="Texte Check"
                value={content['Texte Check'] || ''}
                onChange={(val) => onChange('Texte Check', val)}
                rule={rules['Texte Check']}
                placeholder="Bonnes pratiques..."
                style={{ background: 'transparent', border: 'none', width: '100%', color: '#18093B' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5cqh' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8cqw', fontFamily: 'var(--font-family-slides)', fontWeight: 700, fontSize: '2.2cqw', color: '#18093B' }}>
              <span style={{ color: '#ef4444' }}>🔴</span>
              <EditableField
                fieldKey="Titre Cross"
                value={content['Titre Cross'] || ''}
                onChange={(val) => onChange('Titre Cross', val)}
                rule={rules['Titre Cross']}
                placeholder="À éviter"
                multiline={false}
                style={{ background: 'transparent', border: 'none', color: '#18093B', fontWeight: 700 }}
              />
            </div>
            <div style={{ fontFamily: 'var(--font-family-slides)', fontSize: '1.8cqw', color: '#18093B', paddingLeft: '2cqw' }}>
              <EditableField
                fieldKey="Texte Cross"
                value={content['Texte Cross'] || ''}
                onChange={(val) => onChange('Texte Cross', val)}
                rule={rules['Texte Cross']}
                placeholder="Pièges à éviter..."
                style={{ background: 'transparent', border: 'none', width: '100%', color: '#18093B' }}
              />
            </div>
          </div>
        </div>

        {/* Lightbulb TIP */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8cqw', fontFamily: 'var(--font-family-slides)', fontStyle: 'italic', fontSize: '1.6cqw', color: '#6634D9', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '1cqh' }}>
          <span>💡</span>
          <EditableField
            fieldKey="Texte Bulle"
            value={content['Texte Bulle'] || ''}
            onChange={(val) => onChange('Texte Bulle', val)}
            rule={rules['Texte Bulle']}
            placeholder="Conseil ou astuce bonus..."
            style={{ background: 'transparent', border: 'none', width: '100%', color: '#6634D9', fontStyle: 'italic' }}
          />
        </div>
      </div>

      {/* Footer Logotype placeholder */}
      <div style={{ position: 'absolute', left: '3.42cqw', bottom: '2.29cqh', fontSize: '1.8cqw', fontWeight: 900, color: '#6634D9', opacity: 0.8 }}>
        VIBECODING
      </div>
    </div>
  );
};

export default FicheRecapLayout;
