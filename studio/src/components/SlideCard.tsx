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
import DecoupageLayout from './layouts/DecoupageLayout';
import ConceptImageLayout from './layouts/ConceptImageLayout';
import BriefAltLayout from './layouts/BriefAltLayout';
import PersonaMvpLayout from './layouts/PersonaMvpLayout';
import UserStoriesLayout from './layouts/UserStoriesLayout';
import ExercicePratiqueLayout from './layouts/ExercicePratiqueLayout';
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
  isRegenerating?: boolean;
  onRegenerate?: (instruction: string) => void;
  onTemplateChange?: (newTemplate: string) => void;
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
  isRegenerating = false,
  onRegenerate,
  onTemplateChange,
}) => {
  const { template, content = {} } = slide;
  const [copied, setCopied] = React.useState(false);
  const [showRegenModal, setShowRegenModal] = React.useState(false);
  const [regenInstruction, setRegenInstruction] = React.useState('');

  // Find rules for current template
  const currentRule = templateRules.find(t => t.name === template);
  const rulesMap: Record<string, SlideFieldRule> = {};
  if (currentRule && currentRule.text_layers) {
    currentRule.text_layers.forEach(r => {
      rulesMap[r.key] = r;
    });
  }

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

  const handleFieldChange = (key: string, value: string) => {
    const updatedContent = { ...content, [key]: value };
    onChange(updatedContent);
  };

  const handleCopyJson = () => {
    const slideJson = {
      template: slide.template,
      content: derivedContent,
      image_concept: slide.image_concept || null,
      image_style: slide.image_style || null,
      image_ratio: slide.image_ratio || null
    };

    navigator.clipboard.writeText(JSON.stringify(slideJson, null, 2))
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      })
      .catch(err => {
        console.error('Erreur lors de la copie :', err);
      });
  };

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
        
      case 'VIBECODING - DECOUPAGE':
        return <DecoupageLayout content={derivedContent} onChange={handleFieldChange} rules={rulesMap} />;
        
      case 'VIBECODING - CONCEPT - IMAGE':
        return (
          <ConceptImageLayout
            content={derivedContent}
            onChange={handleFieldChange}
            rules={rulesMap}
            imageConcept={slide.image_concept}
            imageStyle={slide.image_style}
          />
        );
        
      case 'VIBECODING - BRIEF ALT':
        return <BriefAltLayout content={derivedContent} onChange={handleFieldChange} rules={rulesMap} />;
        
      case 'VIBECODING - PERSONA & MVP':
        return <PersonaMvpLayout content={derivedContent} onChange={handleFieldChange} rules={rulesMap} />;
        
      case 'VIBECODING - USER STORIES':
        return <UserStoriesLayout content={derivedContent} onChange={handleFieldChange} rules={rulesMap} />;
        
      case 'VIBECODING - EXERCICE PRATIQUE':
        return <ExercicePratiqueLayout content={derivedContent} onChange={handleFieldChange} rules={rulesMap} />;

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

  const [confirmingDelete, setConfirmingDelete] = React.useState(false);
  const confirmTimerRef = React.useRef<any>(null);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirmingDelete) {
      setConfirmingDelete(true);
      if (confirmTimerRef.current) clearTimeout(confirmTimerRef.current);
      confirmTimerRef.current = setTimeout(() => {
        setConfirmingDelete(false);
      }, 3500);
    } else {
      if (confirmTimerRef.current) clearTimeout(confirmTimerRef.current);
      setConfirmingDelete(false);
      if (onDelete) onDelete();
    }
  };

  return (
    <div className="slide-card-container">
      <div className="slide-card-header">
        <div className="slide-card-header-left">
          <span className="slide-card-index">
            Slide {index + 1}
          </span>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            <button
              onClick={onMoveUp}
              disabled={isFirst}
              className="slide-card-btn"
              title="Déplacer vers le haut"
            >
              ▲
            </button>
            <button
              onClick={onMoveDown}
              disabled={isLast}
              className="slide-card-btn"
              title="Déplacer vers le bas"
            >
              ▼
            </button>
            <button
              onClick={handleDeleteClick}
              className={`slide-card-btn slide-card-delete-btn ${confirmingDelete ? 'confirming' : ''}`}
              title={confirmingDelete ? "Cliquer à nouveau pour confirmer la suppression" : "Supprimer la slide"}
              style={{
                background: confirmingDelete ? 'rgba(239, 68, 68, 0.15)' : undefined,
                color: confirmingDelete ? '#ef4444' : undefined,
                borderColor: confirmingDelete ? '#ef4444' : undefined,
                fontWeight: confirmingDelete ? 600 : undefined,
                fontSize: confirmingDelete ? '11px' : undefined,
                padding: confirmingDelete ? '2px 8px' : undefined,
              }}
            >
              {confirmingDelete ? '⚠️ Supprimer ?' : '✕'}
            </button>
          </div>
        </div>
        <div className="slide-card-header-right">
          <select
            value={template}
            onChange={(e) => onTemplateChange && onTemplateChange(e.target.value)}
            style={{
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              borderRadius: '4px',
              color: 'var(--text-secondary)',
              fontSize: '11px',
              fontFamily: 'monospace',
              padding: '2px 4px',
              outline: 'none',
              cursor: 'pointer',
              maxWidth: '220px',
            }}
            title="Changer le gabarit de la slide"
          >
            {templateRules.map((rule) => (
              <option key={rule.name} value={rule.name}>
                {rule.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              setRegenInstruction('');
              setShowRegenModal(true);
            }}
            disabled={isRegenerating}
            className={`slide-card-btn slide-card-regen-btn ${isRegenerating ? 'active' : ''}`}
            title="Régénérer cette slide avec Claude"
          >
            {isRegenerating ? '⚡...' : '🔄'}
          </button>
          <button
            onClick={handleCopyJson}
            className={`slide-card-btn slide-card-copy-btn ${copied ? 'copied' : ''}`}
            title="Copier le JSON de cette slide pour le plugin Figma"
          >
            {copied ? '✓' : '📋'}
          </button>
        </div>
      </div>

      {/* 16:9 Frame */}
      <div
        style={{
          width: '100%',
          aspectRatio: '16/9',
          backgroundColor: 'var(--slide-bg)', // Adapts to Light/Dark mode
          borderRadius: '8px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--border-color)',
          containerType: 'size', // Activate container queries on the card
          opacity: isRegenerating ? 0.6 : 1,
          pointerEvents: isRegenerating ? 'none' : 'auto',
          transition: 'all 0.3s ease',
        }}
      >
        <EditorContext.Provider value={{ ...parentContext, slideIndex: index }}>
          {renderLayout()}
        </EditorContext.Provider>
        {isRegenerating && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(255, 255, 255, 0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '12px',
            zIndex: 10
          }}>
            <span style={{ fontSize: '32px' }}>⚡</span>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#8b5cf6' }}>
              Régénération par Claude...
            </span>
          </div>
        )}
        {showRegenModal && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(15, 16, 19, 0.75)',
            backdropFilter: 'blur(3px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 20,
            padding: '2cqw'
          }}>
            <div className="glass-panel animate-fade-in" style={{
              width: '90%',
              background: 'var(--bg-secondary)',
              padding: '2cqw',
              borderRadius: '8px',
              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5cqw'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1.6cqw', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Régénérer avec consigne (Slide {index + 1})
                </span>
                <button 
                  onClick={() => setShowRegenModal(false)}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.6cqw', color: 'var(--text-muted)' }}
                >
                  ✕
                </button>
              </div>
              
              <textarea
                placeholder="Consigne de modification (ex: 'Rendre plus technique', 'Ajouter un exemple', 'Raccourcir')..."
                value={regenInstruction}
                onChange={(e) => setRegenInstruction(e.target.value)}
                style={{
                  width: '100%',
                  height: '10cqh',
                  padding: '1cqw',
                  borderRadius: '6px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                  fontSize: '1.4cqw',
                  fontFamily: 'inherit',
                  resize: 'none',
                  outline: 'none'
                }}
                autoFocus
              />
              
              {/* Presets */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8cqw' }}>
                {[
                  { label: 'Raccourcir', text: 'Raccourcir les textes pour respecter strictement les limites et être plus punchy.' },
                  { label: 'Plus d\'exemples', text: 'Ajouter des exemples concrets de Vibe Coding ou d\'outils.' },
                  { label: 'Ton plus expert', text: 'Adopter un ton extrêmement technique, expert et axé engineering.' },
                  { label: 'Ajouter un Warning', text: 'Ajouter une mise en garde ou un piège classique à éviter.' }
                ].map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => setRegenInstruction(preset.text)}
                    style={{
                      background: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '12px',
                      padding: '3px 10px',
                      fontSize: '1.2cqw',
                      cursor: 'pointer',
                      color: 'var(--text-secondary)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    💡 {preset.label}
                  </button>
                ))}
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1cqw', marginTop: '0.5cqh' }}>
                <button
                  onClick={() => setShowRegenModal(false)}
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    padding: '4px 12px',
                    fontSize: '1.3cqw',
                    cursor: 'pointer',
                    color: 'var(--text-secondary)'
                  }}
                >
                  Annuler
                </button>
                <button
                  onClick={() => {
                    setShowRegenModal(false);
                    if (onRegenerate) onRegenerate(regenInstruction);
                  }}
                  style={{
                    background: 'var(--accent-blue)',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '4px 16px',
                    fontSize: '1.3cqw',
                    fontWeight: 600,
                    cursor: 'pointer',
                    color: '#fff'
                  }}
                >
                  Régénérer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default SlideCard;

