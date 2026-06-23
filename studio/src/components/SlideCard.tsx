import React from 'react';
import { SlideData, TemplateRule, SlideFieldRule } from '../types';
import CoverLayout from './layouts/CoverLayout';
import IntroLayout from './layouts/IntroLayout';
import ThreeBlocsPhotoLayout from './layouts/ThreeBlocsPhotoLayout';
import FinLayout from './layouts/FinLayout';
import CoverChapLayout from './layouts/CoverChapLayout';
import ObjectifChapLayout from './layouts/ObjectifChapLayout';
import UseCaseLayout from './layouts/UseCaseLayout';
import Layout5BlocsLayout from './layouts/Layout5BlocsLayout';
import Layout5BlocsVariationLayout from './layouts/Layout5BlocsVariationLayout';
import Layout6BlocsLayout from './layouts/Layout6BlocsLayout';
import ChiffresLayout from './layouts/ChiffresLayout';
import ComparaisonLayout from './layouts/ComparaisonLayout';
import ChecklistLayout from './layouts/ChecklistLayout';
import Layout3ColonnesLayout from './layouts/Layout3ColonnesLayout';
import Layout3BlocsLargeTextLayout from './layouts/Layout3BlocsLargeTextLayout';
import ConceptLayout from './layouts/ConceptLayout';
import VeilleLayout from './layouts/VeilleLayout';
import DefinitionLayout from './layouts/DefinitionLayout';
import ProcessLayout from './layouts/ProcessLayout';
import CycleLayout from './layouts/CycleLayout';
import ChronologieLayout from './layouts/ChronologieLayout';
import FocusOutilLayout from './layouts/FocusOutilLayout';
import AcronymeLayout from './layouts/AcronymeLayout';
import Acronyme3LettresLayout from './layouts/Acronyme3LettresLayout';
import PodiumLayout from './layouts/PodiumLayout';
import ExerciceLayout from './layouts/ExerciceLayout';
import Schema3ColonnesLayout from './layouts/Schema3ColonnesLayout';
import VideLayout from './layouts/VideLayout';
import ImageLayout from './layouts/ImageLayout';
import Layout4BlocsLayout from './layouts/Layout4BlocsLayout';
import { EditableField } from './EditableField';
import { EditorContext } from './EditorContext';

interface SlideCardProps {
  slide: SlideData;
  onChange: (content: Record<string, string>) => void;
  templateRules?: TemplateRule[];
  index: number;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onDelete?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

export const SlideCard: React.FC<SlideCardProps> = ({
  slide,
  onChange,
  templateRules = [],
  index,
  onMoveUp,
  onMoveDown,
  onDelete,
  isFirst = false,
  isLast = false,
}) => {
  const { template, content = {} } = slide;

  // Find rules for current template
  const currentRule = templateRules.find(t => t.name === template);
  const rulesMap: Record<string, SlideFieldRule> = {};
  if (currentRule && currentRule.text_layers) {
    currentRule.text_layers.forEach(r => {
      rulesMap[r.key] = r;
    });
  }



  const handleFieldChange = (key: string, value: string) => {
    const updatedContent = { ...content, [key]: value };
    onChange(updatedContent);
  };

  // Derive content: statically select a single fallback key to prevent duplication across multiple fields
  const derivedContent = { ...content };
  if (slide.title) {
    let fallbackKey: string | null = null;
    if (rulesMap['Titre']) {
      fallbackKey = 'Titre';
    } else if (rulesMap['Focus sur Caude (Anthropic)']) {
      fallbackKey = 'Focus sur Caude (Anthropic)';
    } else if (rulesMap['Titre 1']) {
      fallbackKey = 'Titre 1';
    } else if (rulesMap['Intro']) {
      fallbackKey = 'Intro';
    }

    if (fallbackKey && !derivedContent[fallbackKey]) {
      derivedContent[fallbackKey] = slide.title;
    }
  }

  // Dispatch layout component
  const renderLayout = () => {
    switch (template) {
      case 'VIBECODING - COVER':
        return <CoverLayout content={derivedContent} onChange={handleFieldChange} rules={rulesMap} />;
      case 'VIBECODING - COVER CHAP':
        return <CoverChapLayout content={derivedContent} onChange={handleFieldChange} rules={rulesMap} />;
        
      case 'VIBECODING - OBJECTIF CHAP':
        return <ObjectifChapLayout content={derivedContent} onChange={handleFieldChange} rules={rulesMap} />;
        
      case 'VIBECODING - INTRO':
        return <IntroLayout content={derivedContent} onChange={handleFieldChange} rules={rulesMap} />;
        
      case 'VIBECODING - FIN':
        return <FinLayout content={derivedContent} onChange={handleFieldChange} rules={rulesMap} />;
        
      case 'VIBECODING - 3 BLOCS - PHOTO':
      case 'VIBECODING - 3 BLOCS - PHOTO - ALT':
        return (
          <ThreeBlocsPhotoLayout
            content={derivedContent}
            onChange={handleFieldChange}
            rules={rulesMap}
            imageConcept={slide.image_concept}
            imageStyle={slide.image_style}
          />
        );
        
      case 'VIBECODING - USE CASE':
        return <UseCaseLayout content={derivedContent} onChange={handleFieldChange} rules={rulesMap} />;
        
      case 'VIBECODING - 5 BLOCS':
        return <Layout5BlocsLayout content={derivedContent} onChange={handleFieldChange} rules={rulesMap} />;
        
      case 'VIBECODING - 5 BLOCS - VARIATION':
        return <Layout5BlocsVariationLayout content={derivedContent} onChange={handleFieldChange} rules={rulesMap} />;
        
      case 'VIBECODING - 6 BLOCS':
        return <Layout6BlocsLayout content={derivedContent} onChange={handleFieldChange} rules={rulesMap} />;
        
      case 'VIBECODING - CHIFFRES':
        return <ChiffresLayout content={derivedContent} onChange={handleFieldChange} rules={rulesMap} />;
        
      case 'VIBECODING - COMPARAISON':
        return <ComparaisonLayout content={derivedContent} onChange={handleFieldChange} rules={rulesMap} />;
        
      case 'VIBECODING - CHECKLIST':
        return <ChecklistLayout content={derivedContent} onChange={handleFieldChange} rules={rulesMap} />;
        
      case 'VIBECODING - 3 COLONNES':
        return <Layout3ColonnesLayout content={derivedContent} onChange={handleFieldChange} rules={rulesMap} />;
        
      case 'VIBECODING - 3 BLOCS - LARGE TEXT':
        return <Layout3BlocsLargeTextLayout content={derivedContent} onChange={handleFieldChange} rules={rulesMap} />;
        
      case 'VIBECODING - CONCEPT':
        return <ConceptLayout content={derivedContent} onChange={handleFieldChange} rules={rulesMap} />;
        
      case 'VIBECODING - VEILLE':
        return <VeilleLayout content={derivedContent} onChange={handleFieldChange} rules={rulesMap} />;
        
      case 'VIBECODING - DEFINITION':
        return <DefinitionLayout content={derivedContent} onChange={handleFieldChange} rules={rulesMap} />;
        
      case 'VIBECODING - PROCESS':
        return <ProcessLayout content={derivedContent} onChange={handleFieldChange} rules={rulesMap} />;
        
      case 'VIBECODING - CYCLE':
        return <CycleLayout content={derivedContent} onChange={handleFieldChange} rules={rulesMap} />;
        
      case 'VIBECODING - CHRONOLOGIE':
        return <ChronologieLayout content={derivedContent} onChange={handleFieldChange} rules={rulesMap} />;
        
      case 'VIBECODING - FOCUS OUTIL':
        return <FocusOutilLayout content={derivedContent} onChange={handleFieldChange} rules={rulesMap} />;
        
      case 'VIBECODING - ACRONYME':
        return <AcronymeLayout content={derivedContent} onChange={handleFieldChange} rules={rulesMap} />;
        
      case 'VIBECODING - ACRONYME 3 LETTRES':
        return <Acronyme3LettresLayout content={derivedContent} onChange={handleFieldChange} rules={rulesMap} />;
        
      case 'VIBECODING - PODIUM':
        return <PodiumLayout content={derivedContent} onChange={handleFieldChange} rules={rulesMap} />;
        
      case 'VIBECODING - EXERCICE':
        return <ExerciceLayout content={derivedContent} onChange={handleFieldChange} rules={rulesMap} />;
        
      case 'VIBECODING - SCHEMA - 3 COLONNES':
        return <Schema3ColonnesLayout content={derivedContent} onChange={handleFieldChange} rules={rulesMap} />;
        
      case 'VIBECODING - VIDE':
        return <VideLayout content={derivedContent} onChange={handleFieldChange} rules={rulesMap} />;
        
      case 'VIBECODING - IMAGE':
        return <ImageLayout content={derivedContent} onChange={handleFieldChange} rules={rulesMap} />;
        
      case 'VIBECODING - 4 BLOCS':
        return <Layout4BlocsLayout content={derivedContent} onChange={handleFieldChange} rules={rulesMap} />;
        
      default:
        // Generic Editor Fallback
        return renderGenericFallback();
    }
  };

  // Generic fallback editor rendered inside the 16:9 slide frame
  const renderGenericFallback = () => {
    const fields = currentRule?.text_layers || [];
    
    return (
      <div
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '4cqw',
          background: 'transparent',
        }}
      >
        <div
          className="glass-panel"
          style={{
            width: '95%',
            height: '95%',
            padding: '2cqw',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5cqh',
            background: 'var(--bg-secondary)',
          }}
        >
          <div
            style={{
              fontSize: '1.67cqw',
              fontWeight: 700,
              color: 'var(--accent-blue)',
              borderBottom: '1px solid var(--border-color)',
              paddingBottom: '1cqh',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>{template}</span>
            <span
              style={{
                fontSize: '1.67cqw',
                background: 'var(--badge-yellow-bg)',
                color: 'var(--badge-yellow-text)',
                border: '1px solid rgba(0,0,0,0.03)',
                padding: '2px 6px',
                borderRadius: '4px',
              }}
            >
              Visualisation générique
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '2cqh 2cqw',
              padding: '1cqh 0',
            }}
          >
            {fields.length > 0 ? (
              fields.map((f) => (
                <div
                   key={f.key}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5cqh',
                  }}
                >
                  <label
                    style={{
                      fontSize: '1.67cqw',
                      fontWeight: 600,
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {f.key}
                  </label>
                  <div style={{ height: '8cqh' }}>
                    <EditableField
                      fieldKey={f.key}
                      value={derivedContent[f.key] || ''}
                      onChange={(val) => handleFieldChange(f.key, val)}
                      rule={f}
                      placeholder={f.original_placeholder}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div
                style={{
                  gridColumn: 'span 2',
                  textAlign: 'center',
                  padding: '4cqh',
                  color: 'var(--text-muted)',
                  fontSize: '1.67cqw',
                }}
              >
                Aucun champ de texte détecté pour ce gabarit.
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // We rely on the EditorContext provided from App.tsx. SlideCard just adds its own index to the context.
  const parentContext = React.useContext(EditorContext);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        width: '100%',
        animation: 'fadeIn 0.3s ease-out',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 8px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              background: 'var(--bg-tertiary)',
              padding: '2px 8px',
              borderRadius: '10px',
            }}
          >
            Slide {index + 1}
          </span>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            <button
              onClick={onMoveUp}
              disabled={isFirst}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: isFirst ? 'not-allowed' : 'pointer',
                color: isFirst ? 'var(--text-muted)' : 'var(--text-secondary)',
                opacity: isFirst ? 0.3 : 0.7,
                padding: '2px 6px',
                fontSize: '10px',
                borderRadius: '4px',
                transition: 'opacity 0.15s',
              }}
              title="Déplacer vers le haut"
            >
              ▲
            </button>
            <button
              onClick={onMoveDown}
              disabled={isLast}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: isLast ? 'not-allowed' : 'pointer',
                color: isLast ? 'var(--text-muted)' : 'var(--text-secondary)',
                opacity: isLast ? 0.3 : 0.7,
                padding: '2px 6px',
                fontSize: '10px',
                borderRadius: '4px',
                transition: 'opacity 0.15s',
              }}
              title="Déplacer vers le bas"
            >
              ▼
            </button>
            <button
              onClick={onDelete}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--badge-red-text)',
                opacity: 0.7,
                padding: '2px 6px',
                fontSize: '10px',
                borderRadius: '4px',
                transition: 'opacity 0.15s',
                marginLeft: '4px'
              }}
              title="Supprimer la slide"
            >
              ✕
            </button>
          </div>
        </div>
        <span
          style={{
            fontSize: '11px',
            color: 'var(--text-muted)',
            fontFamily: 'monospace',
          }}
        >
          {template}
        </span>
      </div>

      {/* 16:9 Frame */}
      <div
        style={{
          width: '100%',
          aspectRatio: '16/9',
          backgroundColor: '#ffffff', // Clean white background instead of figma PNG image underlay
          borderRadius: '8px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--border-color)',
          containerType: 'size', // Activate container queries on the card
        }}
      >
        <EditorContext.Provider value={{ ...parentContext, slideIndex: index }}>
          {renderLayout()}
        </EditorContext.Provider>
      </div>
    </div>
  );
};
export default SlideCard;

