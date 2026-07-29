import React from 'react';
import { EditableField } from '../EditableField';
import { SlideFieldRule } from '../../types';

interface LayoutProps {
  content: Record<string, string>;
  onChange: (key: string, value: string) => void;
  rules: Record<string, SlideFieldRule>;
}

export const CoverLayout: React.FC<LayoutProps> = ({ content, onChange, rules }) => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', backgroundColor: 'var(--slide-bg)' }}>
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
      {/* Group 2 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '12.45cqw',
          top: '-51.74cqh',
          width: '130.46cqw',
          height: '209.22cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Group */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '41.41cqw',
          right: '-31.58cqw',
          top: '-51.74cqh',
          bottom: '2.23cqh',
          transform: 'rotate(-102.39deg)',
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
          left: '83.94cqw',
          right: '-27.33cqw',
          top: '-20.22cqh',
          bottom: '58.95cqh',
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
          transform: 'rotate(-120.52deg)',
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
          left: '76.33cqw',
          right: '-10.0cqw',
          top: '13.74cqh',
          bottom: '36.66cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Sunny */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          background: '#FFFF77',
          transform: 'rotate(-120.52deg)',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Group */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: '41.41cqw',
          right: '-31.58cqw',
          top: '-48.5cqh',
          bottom: '14.1cqh',
          transform: 'rotate(-102.39deg)',
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
          left: '65.54cqw',
          right: '-8.18cqw',
          top: '25.79cqh',
          bottom: '26.08cqh',
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
          transform: 'rotate(-120.52deg)',
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
          left: '75.42cqw',
          right: '-18.05cqw',
          top: '-41.11cqh',
          bottom: '92.98cqh',
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
          transform: 'rotate(-129.4deg)',
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
          left: '54.3cqw',
          right: '14.01cqw',
          top: '55.46cqh',
          bottom: '-12.85cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Sunny */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          background: '#FFFF77',
          transform: 'rotate(-120.52deg)',
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
          left: '53.53cqw',
          right: '20.9cqw',
          top: '71.47cqh',
          bottom: '1.07cqh',
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
          transform: 'rotate(-120.52deg)',
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
          left: '12.45cqw',
          right: '48.22cqw',
          top: '56.69cqh',
          bottom: '-36.55cqh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Sunny */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          background: '#FFFF77',
          transform: 'rotate(-120.52deg)',
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
          left: '-3.44cqw',
          right: '60.8cqw',
          top: '86.11cqh',
          bottom: '-34.25cqh',
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
          transform: 'rotate(-120.52deg)',
          display: 'flex',
          alignItems: 'center'
        }}
      >
      </div>
      {/* Group 516 */}
      <div
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          right: '3.91cqw',
          top: '77.22cqh',
          width: '8.91cqw',
          height: '15.83cqh',
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
          left: '87.19cqw',
          bottom: '6.94cqh',
          width: '8.91cqw',
          height: '15.83cqh',
          background: '#7F7F7F',
          borderRadius: '8.72cqw',
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
          width: '58.07cqw',
          height: '29.54cqh',
          fontFamily: 'var(--font-family-slides)',
          fontWeight: 900,
          fontSize: '6.25cqw',
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
    </div>
  );
};

export default CoverLayout;