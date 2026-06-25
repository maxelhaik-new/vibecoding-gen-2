import React, { useState, useEffect, useRef } from 'react';
import { LessonSummary, LessonData, TemplateRule, SlideFieldRule } from './types';
import SlideCard from './components/SlideCard';
import JsonEditor from './components/JsonEditor';
import { EditorContext } from './components/EditorContext';

// Markdown parser to render styled Notion-like HTML
function parseMarkdown(md: string): string {
  if (!md) return '<p class="notion-placeholder">Aucun contenu...</p>';
  
  // Escape HTML tags to prevent XSS
  let html = md
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
    
  const lines = html.split('\n');
  const result: string[] = [];
  let inList = false;
  let inQuote = false;
  let quoteLines: string[] = [];
  
  // Track current heading level for hierarchical auto-indentation
  let currentLevel = 2; // Default to H2 level

  const getBaseIndent = (level: number): number => {
    if (level <= 2) return 0;
    if (level === 3) return 24;
    if (level === 4) return 48;
    if (level === 5) return 72;
    return 96; // H6 or deeper
  };
  
  const parseInlineFormatting = (text: string): string => {
    // Bold **text**
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Italic *text*
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    // Inline code `code`
    text = text.replace(/`(.*?)`/g, '<code class="notion-code">$1</code>');
    return text;
  };

  const flushQuote = () => {
    if (inQuote) {
      const text = quoteLines.map(line => parseInlineFormatting(line)).join('<br />');
      const baseIndent = getBaseIndent(currentLevel);
      const textPadding = 14;
      const indentStyle = ` style="padding-left: ${baseIndent + textPadding}px; border-left: 3px solid var(--accent-blue); margin-left: 0px;" data-indent="0"`;
      result.push(`<blockquote class="notion-quote"${indentStyle}>${text}</blockquote>`);
      quoteLines = [];
      inQuote = false;
    }
  };
  
  for (let line of lines) {
    const indentCount = line.length - line.trimStart().length;
    const trimmed = line.trim();
    
    // Check for empty lines or divider lines consisting only of hash symbols (e.g. ##, ###)
    const isOnlyHashes = /^#+$/.test(trimmed);
    const isDivider = trimmed === '---' || trimmed === '***' || trimmed === '___';
    
    if (trimmed === '' || isOnlyHashes) {
      if (inList) { result.push('</ul>'); inList = false; }
      flushQuote();
      result.push('<div class="notion-spacer"></div>');
      continue;
    }

    if (isDivider) {
      if (inList) { result.push('</ul>'); inList = false; }
      flushQuote();
      result.push('<hr class="notion-hr" />');
      continue;
    }
    
    // Check if it's a lesson title line (e.g., starts with "Leçon" or "Lecon" and optionally has "##" or no hashes at all)
    const isLessonTitle = /^(Leçon|Lecon|Lesson)\s+M\d+C\d+L\d+/i.test(trimmed);
    
    // Handle titles (# , ## , ### , #### , ##### , ###### )
    const headingMatch = trimmed.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch || isLessonTitle) {
      if (inList) { result.push('</ul>'); inList = false; }
      flushQuote();
      
      let level = 1;
      let headingText = trimmed;
      
      if (headingMatch) {
        level = headingMatch[1].length;
        headingText = headingMatch[2];
      } else if (isLessonTitle) {
        level = 1;
        // Strip leading hashes if any exist
        headingText = trimmed.replace(/^#+\s*/, '');
      }
      
      currentLevel = level;
      
      const parsedHeadingText = parseInlineFormatting(headingText);
      const baseIndent = getBaseIndent(level);
      const totalIndent = baseIndent + indentCount * 8;
      const indentStyle = ` style="padding-left: ${totalIndent}px" data-indent="${indentCount}"`;
      
      result.push(`<h${level} class="notion-h${level}"${indentStyle}>${parsedHeadingText}</h${level}>`);
      continue;
    }
    
    // Handle bullet lists (- or *)
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      flushQuote();
      if (!inList) {
        result.push('<ul class="notion-list">');
        inList = true;
      }
      let text = trimmed.slice(2);
      text = parseInlineFormatting(text);
      
      const baseIndent = getBaseIndent(currentLevel);
      const totalIndent = baseIndent + indentCount * 8;
      const indentStyle = ` style="padding-left: ${totalIndent}px" data-indent="${indentCount}"`;
      
      result.push(`<li class="notion-li"${indentStyle}>${text}</li>`);
      continue;
    }
    
    // Close list if we hit a non-list line
    if (inList && !trimmed.startsWith('- ') && !trimmed.startsWith('* ')) {
      result.push('</ul>');
      inList = false;
    }
    
    // Handle blockquotes (> )
    if (trimmed.startsWith('&gt; ')) {
      inQuote = true;
      let text = trimmed.slice(5);
      quoteLines.push(text);
      continue;
    } else {
      flushQuote();
    }
    
    // Regular paragraph
    let pText = parseInlineFormatting(trimmed);
    const baseIndent = getBaseIndent(currentLevel);
    const totalIndent = baseIndent + indentCount * 8;
    const indentStyle = ` style="padding-left: ${totalIndent}px" data-indent="${indentCount}"`;
    result.push(`<p class="notion-p"${indentStyle}>${pText}</p>`);
  }
  
  if (inList) {
    result.push('</ul>');
  }
  flushQuote();
  
  return result.join('\n');
}

// Convert Notion-style HTML back to Markdown plan format
function htmlToMarkdown(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const body = doc.body;

  function convertNode(node: Node): string {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent || '';
    }
    if (node.nodeType !== Node.ELEMENT_NODE) {
      return '';
    }

    const element = node as HTMLElement;
    const tagName = element.tagName.toLowerCase();

    let indentPrefix = '';
    const dataIndentAttr = element.getAttribute('data-indent');
    if (dataIndentAttr !== null) {
      const count = parseInt(dataIndentAttr);
      if (!isNaN(count) && count > 0) {
        indentPrefix = ' '.repeat(count);
      }
    } else if (element.style && element.style.paddingLeft) {
      const pl = parseInt(element.style.paddingLeft);
      if (!isNaN(pl) && pl > 0) {
        indentPrefix = ' '.repeat(Math.round(pl / 8));
      }
    }

    // Handle inline tags
    if (tagName === 'strong' || tagName === 'b') {
      return `**${element.textContent}**`;
    }
    if (tagName === 'em' || tagName === 'i') {
      return `*${element.textContent}*`;
    }
    if (tagName === 'code') {
      return `\`${element.textContent}\``;
    }
    if (tagName === 'br') {
      return '\n';
    }

    let childrenContent = '';
    for (let i = 0; i < element.childNodes.length; i++) {
      childrenContent += convertNode(element.childNodes[i]);
    }

    switch (tagName) {
      case 'h1':
        return `${indentPrefix}# ${childrenContent.trim()}\n\n`;
      case 'h2':
        return `${indentPrefix}## ${childrenContent.trim()}\n\n`;
      case 'h3':
        return `${indentPrefix}### ${childrenContent.trim()}\n\n`;
      case 'h4':
        return `${indentPrefix}#### ${childrenContent.trim()}\n\n`;
      case 'h5':
        return `${indentPrefix}##### ${childrenContent.trim()}\n\n`;
      case 'h6':
        return `${indentPrefix}###### ${childrenContent.trim()}\n\n`;
      case 'p':
      case 'div':
        if (element.classList.contains('notion-spacer')) {
          return '\n';
        }
        return `${indentPrefix}${childrenContent.trim()}\n\n`;
      case 'li':
        return `${indentPrefix}- ${childrenContent.trim()}\n`;
      case 'ul':
        return `${childrenContent}\n`;
      case 'blockquote':
        const lines = childrenContent.trim().split('\n');
        return lines.map(line => `${indentPrefix}> ${line}`).join('\n') + '\n\n';
      case 'hr':
        return `${indentPrefix}---\n\n`;
      default:
        return childrenContent;
    }
  }

  let markdown = '';
  for (let i = 0; i < body.childNodes.length; i++) {
    markdown += convertNode(body.childNodes[i]);
  }

  return markdown
    .split('\n')
    .map(line => line.trimEnd())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

const parseInlineFormatting = (text: string) => {
  const regex = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g;
  const parts = text.split(regex);

  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} className="inline-code" style={{
          background: 'var(--bg-secondary)',
          padding: '2px 6px',
          borderRadius: '4px',
          fontFamily: 'monospace',
          fontSize: '11px',
          border: '1px solid var(--border-color)',
          color: 'var(--accent-cyan)'
        }}>
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} style={{ fontWeight: 700 }}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={i} style={{ fontStyle: 'italic' }}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
};

const renderMarkdownMessage = (text: string) => {
  if (!text) return null;

  // Split by code blocks: ```[lang]\n[code]```
  const parts = text.split(/(```[\s\S]*?```)/g);

  return parts.map((part, index) => {
    if (part.startsWith('```')) {
      const match = part.match(/```(\w*)\n([\s\S]*?)```/);
      const language = match ? match[1] : '';
      const codeContent = match ? match[2] : part.slice(3, -3);

      return (
        <div key={index} className="chat-code-block" style={{
          margin: '8px 0',
          borderRadius: '6px',
          overflow: 'hidden',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{
            background: 'var(--bg-tertiary)',
            padding: '6px 12px',
            fontSize: '10px',
            color: 'var(--text-muted)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: 'sans-serif',
            textTransform: 'uppercase',
            fontWeight: 700
          }}>
            <span>{language || 'code'}</span>
            <button
              onClick={(e) => {
                e.preventDefault();
                navigator.clipboard.writeText(codeContent.trim());
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent-blue)',
                cursor: 'pointer',
                fontSize: '10px',
                fontWeight: 600
              }}
            >
              Copier
            </button>
          </div>
          <pre style={{
            margin: 0,
            padding: '12px',
            background: 'var(--bg-secondary)',
            overflowX: 'auto',
            fontFamily: 'monospace',
            fontSize: '11px',
            lineHeight: '1.5',
            color: 'var(--text-primary)'
          }}>
            <code>{codeContent.trim()}</code>
          </pre>
        </div>
      );
    }

    const lines = part.split('\n');
    return lines.map((line, lineIdx) => {
      const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('* ');
      const isNumbered = /^\d+\.\s/.test(line.trim());
      
      let lineText = line;
      if (isBullet) {
        lineText = line.trim().replace(/^[-*]\s+/, '');
      } else if (isNumbered) {
        lineText = line.trim().replace(/^\d+\.\s+/, '');
      }

      const inlineParts = parseInlineFormatting(lineText);

      if (isBullet) {
        return (
          <ul key={lineIdx} style={{ margin: '2px 0 2px 16px', padding: 0, listStyleType: 'disc' }}>
            <li style={{ fontSize: '12px', color: 'inherit', lineHeight: '1.4' }}>{inlineParts}</li>
          </ul>
        );
      }
      if (isNumbered) {
        const matchNum = line.trim().match(/^(\d+)\.\s+/);
        const num = matchNum ? matchNum[1] : '1';
        return (
          <ol key={lineIdx} start={parseInt(num)} style={{ margin: '2px 0 2px 16px', padding: 0 }}>
            <li style={{ fontSize: '12px', color: 'inherit', lineHeight: '1.4' }}>{inlineParts}</li>
          </ol>
        );
      }

      return lineText.trim() === '' ? (
        <div key={lineIdx} style={{ height: '8px' }} />
      ) : (
        <p key={lineIdx} style={{ margin: '4px 0', fontSize: '12px', lineHeight: '1.4' }}>
          {inlineParts}
        </p>
      );
    });
  });
};

export const App: React.FC = () => {
  const [lessons, setLessons] = useState<LessonSummary[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string>('');
  const [lessonData, setLessonData] = useState<{ plan: string; final: LessonData | null } | null>(null);
  const [templates, setTemplates] = useState<TemplateRule[]>([]);
  const [activeTab, setActiveTab] = useState<'visual' | 'decoupage' | 'plan' | 'json'>('visual');
  const [planMode, setPlanMode] = useState<'edit' | 'preview' | 'split'>('preview');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState<boolean>(false);
  const [rightSidebarCollapsed, setRightSidebarCollapsed] = useState<boolean>(false);
  const [activeTabSidebar, setActiveTabSidebar] = useState<'tools' | 'console' | 'agent'>('tools');
  const [activeMobilePane, setActiveMobilePane] = useState<'lessons' | 'editor' | 'tools' | 'agent'>('editor');

  // Chat Agent States
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant' | 'tool'; content: string; parts?: any[] }>>([
    { role: 'assistant', content: 'Bonjour ! Je suis votre assistant de workspace Vibe. Je peux lire/écrire vos fichiers de cours (plans, JSON), lancer le pipeline de découpe/rédaction, ou chercher des informations dans le workspace. Que puis-je faire pour vous ?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [agentConfig, setAgentConfig] = useState<{ hasKey: boolean; model: string } | null>(null);

  useEffect(() => {
    fetch('/api/agent/config')
      .then(res => res.json())
      .then(data => setAgentConfig(data))
      .catch(console.error);
  }, []);

  const [focusedFieldInfo, setFocusedFieldInfo] = useState<{
    slideIndex: number;
    fieldKey: string;
    value: string;
    rule?: SlideFieldRule;
  } | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  
  // Pipeline settings
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [generateImage, setGenerateImage] = useState<boolean>(false);
  const [runningPhase, setRunningPhase] = useState<string | null>(null);
  const [logs, setLogs] = useState<string>('');
  const [logAutoScroll, setLogAutoScroll] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Collapsible tree navigation states for UX/UI arborescence
  const [expandedModules, setExpandedModules] = useState<Record<number, boolean>>({ 1: true });
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({});

  // Helper to parse lesson slug like "m1c3l4"
  const parseLessonSlug = (slug: string) => {
    const match = slug.toLowerCase().match(/^m(\d+)c(\d+)l(\d+)$/);
    if (match) {
      return {
        module: parseInt(match[1], 10),
        chapter: parseInt(match[2], 10),
        lesson: parseInt(match[3], 10)
      };
    }
    return null;
  };

  // Automatically expand modules and chapters when a lesson is selected
  useEffect(() => {
    if (selectedSlug) {
      const parsed = parseLessonSlug(selectedSlug);
      if (parsed) {
        setExpandedModules(prev => ({ ...prev, [parsed.module]: true }));
        setExpandedChapters(prev => ({ ...prev, [`m${parsed.module}c${parsed.chapter}`]: true }));
      }
    }
  }, [selectedSlug]);

  // Create new lesson state
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [newLessonSlug, setNewLessonSlug] = useState<string>('');
  const [newLessonTitle, setNewLessonTitle] = useState<string>('');

  const [copied, setCopied] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'error'>('saved');
  const handleCopyJSON = async () => {
    if (!lessonData || !lessonData.final) return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(lessonData.final, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy JSON:', err);
    }
  };

  const logConsoleRef = useRef<HTMLPreElement>(null);
  const lastSavedDataRef = useRef<{ plan: string; final: any } | null>(null);
  const editableRef = useRef<HTMLDivElement>(null);

  // Sync contentEditable with loaded data
  useEffect(() => {
    if (editableRef.current && lessonData) {
      const currentHtml = editableRef.current.innerHTML;
      const targetHtml = parseMarkdown(lessonData.plan);
      if (currentHtml !== targetHtml && document.activeElement !== editableRef.current) {
        editableRef.current.innerHTML = targetHtml;
      }
    }
  }, [lessonData?.plan, selectedSlug, activeTab, planMode]);

  const handleEditableInput = () => {
    if (!editableRef.current || !lessonData) return;
    const html = editableRef.current.innerHTML;
    const md = htmlToMarkdown(html);
    setLessonData(prev => prev ? { ...prev, plan: md } : null);
  };

  const handleCreateLesson = async () => {
    if (!newLessonSlug) return;
    try {
      const res = await fetch('/api/lessons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: newLessonSlug,
          title: newLessonTitle
        })
      });
      if (res.ok) {
        setShowCreateModal(false);
        setNewLessonSlug('');
        setNewLessonTitle('');
        
        await fetchLessons();
        setSelectedSlug(newLessonSlug);
        setActiveTab('plan'); // Switch to MD Plan tab immediately
      } else {
        const err = await res.json();
        alert(`Erreur : ${err.error || 'Impossible de créer la leçon'}`);
      }
    } catch (e) {
      console.error('Error creating lesson:', e);
      alert('Erreur réseau lors de la création de la leçon.');
    }
  };

  const handleMoveSlide = (idx: number, direction: 'up' | 'down') => {
    if (!lessonData || !lessonData.final) return;
    const slides = [...lessonData.final.slides];
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= slides.length) return;
    
    // Swap slides
    const temp = slides[idx];
    slides[idx] = slides[targetIdx];
    slides[targetIdx] = temp;
    
    setLessonData({
      ...lessonData,
      final: { ...lessonData.final, slides },
    });
  };

  const handleDeleteSlide = (idx: number) => {
    if (!lessonData || !lessonData.final) return;
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette slide ?')) return;
    const slides = [...lessonData.final.slides];
    slides.splice(idx, 1);
    
    setLessonData({
      ...lessonData,
      final: { ...lessonData.final, slides },
    });
  };

  const handleTemplateChange = (idx: number, newTemplate: string) => {
    if (!lessonData || !lessonData.final) return;
    const slides = [...lessonData.final.slides];
    slides[idx] = {
      ...slides[idx],
      template: newTemplate
    };
    setLessonData({
      ...lessonData,
      final: { ...lessonData.final, slides }
    });
  };

  // Fetch all lessons summaries
  const fetchLessons = async () => {
    try {
      const res = await fetch(`/api/lessons?t=${Date.now()}`);
      if (res.ok) {
        const data = await res.json();
        setLessons(data);
        if (data.length > 0 && !selectedSlug) {
          setSelectedSlug(data[0].slug);
        }
      }
    } catch (e) {
      console.error('Error fetching lessons:', e);
    }
  };

  // Fetch templates.json metadata rules
  const fetchTemplates = async () => {
    try {
      const res = await fetch(`/api/templates?t=${Date.now()}`);
      if (res.ok) {
        const data = await res.json();
        setTemplates(data);
      }
    } catch (e) {
      console.error('Error fetching templates:', e);
    }
  };

  // Fetch selected lesson plan and JSON
  const fetchLessonData = async (slug: string) => {
    if (!slug) return;
    try {
      const res = await fetch(`/api/lesson/${slug}?t=${Date.now()}`);
      if (res.ok) {
        const data = await res.json();
        setLessonData({
          plan: data.plan,
          final: data.final,
        });
        lastSavedDataRef.current = {
          plan: data.plan,
          final: data.final
        };
      }
    } catch (e) {
      console.error(`Error fetching data for ${slug}:`, e);
    }
  };

  useEffect(() => {
    fetchLessons();
    fetchTemplates();
  }, []);

  useEffect(() => {
    if (selectedSlug) {
      fetchLessonData(selectedSlug);
    }
  }, [selectedSlug]);

  const handleSendChatMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;

    const userMsg = { role: 'user' as const, content: chatInput };
    const updatedMessages = [...chatMessages, userMsg];
    setChatMessages(updatedMessages);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const res = await fetch('/api/agent/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages,
          activeLessonSlug: selectedSlug
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.error) {
          setChatMessages(prev => [...prev, { role: 'assistant', content: `❌ Erreur : ${data.error}` }]);
        } else {
          if (data.history) {
            setChatMessages([...data.history, { role: 'assistant', content: data.content }]);
          } else {
            setChatMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
          }
          // Refresh data since agent might have modified files or run pipeline
          fetchLessons();
          if (selectedSlug) {
            fetchLessonData(selectedSlug);
          }
        }
      } else {
        const errData = await res.json();
        setChatMessages(prev => [...prev, { role: 'assistant', content: `❌ Erreur : ${errData.error || 'Erreur serveur'}` }]);
      }
    } catch (err: any) {
      setChatMessages(prev => [...prev, { role: 'assistant', content: `❌ Erreur réseau : ${err.message}` }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Scroll console to bottom
  useEffect(() => {
    if (logAutoScroll && logConsoleRef.current) {
      logConsoleRef.current.scrollTop = logConsoleRef.current.scrollHeight;
    }
  }, [logs, logAutoScroll]);

  // Auto-save changes in real-time (debounced)
  useEffect(() => {
    if (!selectedSlug || !lessonData) return;

    // Check if the current data is different from last saved data
    const hasChanges = !lastSavedDataRef.current ||
      lastSavedDataRef.current.plan !== lessonData.plan ||
      JSON.stringify(lastSavedDataRef.current.final) !== JSON.stringify(lessonData.final);

    if (!hasChanges) return;

    setSaveStatus('saving');
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/lesson/${selectedSlug}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            plan: lessonData.plan,
            final: lessonData.final,
          }),
        });
        if (res.ok) {
          lastSavedDataRef.current = {
            plan: lessonData.plan,
            final: lessonData.final
          };
          setSaveStatus('saved');
          console.log(`Auto-saved ${selectedSlug} in real-time`);
        } else {
          setSaveStatus('error');
        }
      } catch (e) {
        console.error('Error auto-saving:', e);
        setSaveStatus('error');
      }
    }, 800); // 800ms debounce

    return () => clearTimeout(timer);
  }, [lessonData, selectedSlug]);

  // Trigger local script execution and stream output
  const runPipeline = (phase: string) => {
    if (!selectedSlug) return;
    setRunningPhase(phase);
    setLogs(`[System] Démarrage du pipeline pour ${selectedSlug.toUpperCase()} (Phase: ${phase})...\n`);
    
    let url = `/api/run-pipeline?lesson=${selectedSlug}&phase=${phase}`;
    if (selectedModel) url += `&model=${encodeURIComponent(selectedModel)}`;
    if (generateImage) url += `&image=true`;

    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      setLogs((prev) => prev + event.data + '\n');
      
      // Stop condition from backend custom logs
      if (event.data.includes('[System] Process exited')) {
        eventSource.close();
        setRunningPhase(null);
        fetchLessons(); // Refresh list stats
        fetchLessonData(selectedSlug); // Reload modifications
      }
    };

    eventSource.onerror = (e) => {
      console.error('EventSource error:', e);
      setLogs((prev) => prev + '[System Error] Connexion SSE interrompue avec le serveur.\n');
      eventSource.close();
      setRunningPhase(null);
    };
  };

  // Helper for status badge styling
  const getStatusBadge = (status: string) => {
    let text = 'Inconnu';
    let textVar = 'var(--text-muted)';
    let bgVar = 'var(--border-color)';
    switch (status) {
      case 'no_plan':
        textVar = 'var(--badge-red-text)';
        bgVar = 'var(--badge-red-bg)';
        text = 'Pas de Plan';
        break;
      case 'plan_only':
        textVar = 'var(--badge-yellow-text)';
        bgVar = 'var(--badge-yellow-bg)';
        text = 'Plan Prêt';
        break;
      case 'sliced':
        textVar = 'var(--badge-blue-text)';
        bgVar = 'var(--badge-blue-bg)';
        text = 'Découpé';
        break;
      case 'written':
        textVar = 'var(--badge-green-text)';
        bgVar = 'var(--badge-green-bg)';
        text = 'Rédigé';
        break;
      case 'completed':
        textVar = 'var(--badge-green-text)';
        bgVar = 'var(--badge-green-bg)';
        text = 'Images OK';
        break;
      case 'error':
        textVar = 'var(--badge-red-text)';
        bgVar = 'var(--badge-red-bg)';
        text = 'Erreur JSON';
        break;
    }
    return (
      <span style={{
        background: bgVar,
        color: textVar,
        padding: '2px 8px',
        borderRadius: '12px',
        fontSize: '10px',
        fontWeight: 600,
        whiteSpace: 'nowrap',
        border: '1px solid rgba(0,0,0,0.03)'
      }}>
        {text}
      </span>
    );
  };

  // Filter lessons based on search and status filter
  const filteredLessons = lessons.filter(l => {
    const matchesSearch = l.slug.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          l.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Group filtered lessons by module and chapter for hierarchical arborescence
  const groupedLessons: Record<number, Record<number, LessonSummary[]>> = {};
  filteredLessons.forEach(l => {
    const parsed = parseLessonSlug(l.slug);
    if (parsed) {
      const { module, chapter } = parsed;
      if (!groupedLessons[module]) {
        groupedLessons[module] = {};
      }
      if (!groupedLessons[module][chapter]) {
        groupedLessons[module][chapter] = [];
      }
      groupedLessons[module][chapter].push(l);
    }
  });

  const sortedModuleKeys = Object.keys(groupedLessons).map(Number).sort((a, b) => a - b);

  return (
    <div className="app-container">
      {/* 0. ACTIVITY BAR (far left) */}
      <nav className="activity-bar">
        <button
          className={`activity-btn ${!leftSidebarCollapsed ? 'active' : ''}`}
          onClick={() => setLeftSidebarCollapsed(!leftSidebarCollapsed)}
          title="Explorateur de Leçons (📁)"
        >
          📁
        </button>
        <button
          className={`activity-btn ${activeTabSidebar === 'tools' && !rightSidebarCollapsed ? 'active' : ''}`}
          onClick={() => {
            if (activeTabSidebar === 'tools' && !rightSidebarCollapsed) {
              setRightSidebarCollapsed(true);
            } else {
              setActiveTabSidebar('tools');
              setRightSidebarCollapsed(false);
            }
          }}
          title="Outils & Validation (⚡)"
        >
          ⚡
        </button>
        <button
          className={`activity-btn ${activeTabSidebar === 'console' && !rightSidebarCollapsed ? 'active' : ''}`}
          onClick={() => {
            if (activeTabSidebar === 'console' && !rightSidebarCollapsed) {
              setRightSidebarCollapsed(true);
            } else {
              setActiveTabSidebar('console');
              setRightSidebarCollapsed(false);
            }
          }}
          title="Console d'Exécution (🖥️)"
        >
          🖥️
        </button>
        <button
          className={`activity-btn ${activeTabSidebar === 'agent' && !rightSidebarCollapsed ? 'active' : ''}`}
          onClick={() => {
            if (activeTabSidebar === 'agent' && !rightSidebarCollapsed) {
              setRightSidebarCollapsed(true);
            } else {
              setActiveTabSidebar('agent');
              setRightSidebarCollapsed(false);
            }
          }}
          title="Agent IA de Workspace (🤖)"
        >
          🤖
        </button>
        <div style={{ flex: 1 }} />
        <button
          className="activity-btn"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          title={theme === 'light' ? 'Activer le mode sombre' : 'Activer le mode clair'}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </nav>
      
      {/* 1. LEFT SIDEBAR: Lessons Browser */}
      <aside className={`sidebar-panel glass-panel ${leftSidebarCollapsed ? 'collapsed' : ''} ${activeMobilePane === 'lessons' ? 'active-mobile' : ''}`} style={{
        margin: '12px',
        height: 'calc(100vh - 24px)'
      }}>
        <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h1 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)' }}>
              🎬 Vibe Slicer Studio
            </h1>
            <button
              onClick={() => setShowCreateModal(true)}
              style={{
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                borderRadius: '4px',
                color: 'var(--accent-blue)',
                padding: '4px 8px',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'all 0.15s ease'
              }}
            >
              ➕ Créer
            </button>
          </div>
          <input
            type="text"
            placeholder="Rechercher une leçon..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              color: 'var(--text-primary)',
              fontSize: '13px',
              outline: 'none',
              marginBottom: '8px'
            }}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              width: '100%',
              padding: '6px 10px',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              color: 'var(--text-primary)',
              fontSize: '12px',
              outline: 'none'
            }}
          >
            <option value="all">Tous les statuts</option>
            <option value="no_plan">Pas de Plan</option>
            <option value="plan_only">Plan Prêt</option>
            <option value="sliced">Découpé</option>
            <option value="written">Rédigé</option>
            <option value="completed">Complet (Images)</option>
          </select>
        </div>

        {/* Scrollable lessons list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
          {sortedModuleKeys.length > 0 ? (
            sortedModuleKeys.map((moduleId) => {
              const isModExpanded = !!expandedModules[moduleId];
              const chapters = groupedLessons[moduleId];
              const sortedChapterKeys = Object.keys(chapters).map(Number).sort((a, b) => a - b);
              
              return (
                <div key={moduleId} style={{ marginBottom: '10px' }}>
                  {/* Module Header */}
                  <button
                    onClick={() => setExpandedModules(prev => ({ ...prev, [moduleId]: !prev[moduleId] }))}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                      padding: '8px 10px',
                      background: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      color: 'var(--text-primary)',
                      fontWeight: 700,
                      fontSize: '13px',
                      textAlign: 'left',
                      gap: '8px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                          transition: 'transform 0.2s ease',
                          transform: isModExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                          color: 'var(--text-muted)'
                        }}
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </span>
                    <span>📦 Module {moduleId}</span>
                  </button>
                  
                  {isModExpanded && (
                    <div style={{ paddingLeft: '12px', borderLeft: '1px solid var(--border-color)', marginLeft: '14px', marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {sortedChapterKeys.map((chapterId) => {
                        const chapKey = `m${moduleId}c${chapterId}`;
                        const isChapExpanded = !!expandedChapters[chapKey];
                        const chapLessons = chapters[chapterId];
                        
                        return (
                          <div key={chapterId}>
                            {/* Chapter Header */}
                            <button
                              onClick={() => setExpandedChapters(prev => ({ ...prev, [chapKey]: !prev[chapKey] }))}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%',
                                padding: '6px 8px',
                                background: 'transparent',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                color: 'var(--text-secondary)',
                                fontWeight: 600,
                                fontSize: '12px',
                                textAlign: 'left',
                                gap: '6px',
                                transition: 'all 0.15s ease'
                              }}
                            >
                              <span style={{ display: 'flex', alignItems: 'center' }}>
                                <svg
                                  width="10"
                                  height="10"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  style={{
                                    transition: 'transform 0.2s ease',
                                    transform: isChapExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                                    color: 'var(--text-muted)'
                                  }}
                                >
                                  <polyline points="9 18 15 12 9 6" />
                                </svg>
                              </span>
                              <span>📖 Chapitre {chapterId}</span>
                            </button>
                            
                            {isChapExpanded && (
                              <div style={{ paddingLeft: '10px', borderLeft: '1px solid var(--border-color)', marginLeft: '12px', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                {chapLessons.map((l) => (
                                  <button
                                    key={l.slug}
                                    onClick={() => setSelectedSlug(l.slug)}
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      width: '100%',
                                      padding: '6px 8px',
                                      background: selectedSlug === l.slug ? 'rgba(59, 130, 246, 0.08)' : 'transparent',
                                      border: 'none',
                                      borderLeft: selectedSlug === l.slug ? '2px solid var(--accent-blue)' : '2px solid transparent',
                                      borderRadius: '0 4px 4px 0',
                                      cursor: 'pointer',
                                      color: selectedSlug === l.slug ? 'var(--accent-blue)' : 'var(--text-secondary)',
                                      fontSize: '12px',
                                      textAlign: 'left',
                                      transition: 'all 0.15s ease'
                                    }}
                                  >
                                    <span style={{ fontWeight: selectedSlug === l.slug ? 700 : 500, fontFamily: 'monospace' }}>
                                      {l.slug.toUpperCase()}
                                    </span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                      {l.slideCount > 0 && (
                                        <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>
                                          {l.slideCount} slides
                                        </span>
                                      )}
                                      {getStatusBadge(l.status)}
                                    </div>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)', fontSize: '13px' }}>
              Aucune leçon trouvée
            </div>
          )}
        </div>
      </aside>

      {/* 2. CENTRAL WORKSPACE: Document Editor & Visual Mockup */}
      <main className={`workspace-panel ${activeMobilePane === 'editor' ? 'active-mobile' : ''}`} style={{
        padding: '12px 0 12px 12px'
      }}>
        {/* Header toolbar */}
        <div className="glass-panel" style={{
          padding: '12px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '12px',
          marginRight: '12px'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 700 }}>
                {selectedSlug ? selectedSlug.toUpperCase() : 'Sélectionnez une leçon'}
              </h2>
              {selectedSlug && (
                <span style={{
                  fontSize: '10px',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontWeight: 500,
                  backgroundColor: saveStatus === 'saving' ? 'var(--badge-yellow-bg)' : saveStatus === 'error' ? 'var(--badge-red-bg)' : 'var(--badge-green-bg)',
                  color: saveStatus === 'saving' ? 'var(--badge-yellow-text)' : saveStatus === 'error' ? 'var(--badge-red-text)' : 'var(--badge-green-text)',
                  transition: 'all 0.15s ease',
                  border: '1px solid transparent',
                  borderColor: saveStatus === 'saving' ? '#fbbf24' : saveStatus === 'error' ? '#f87171' : '#34d399',
                }}>
                  {saveStatus === 'saving' ? '⏳ Enregistrement...' : saveStatus === 'error' ? '❌ Erreur' : '✓ Enregistré'}
                </span>
              )}
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              {lessonData?.final?.lessonTitle || 'Chargement...'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                color: 'var(--text-secondary)',
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'background 0.15s'
              }}
            >
              {theme === 'light' ? '🌙 Sombre' : '☀️ Clair'}
            </button>
            {/* Tab switchers */}
            <div style={{
              display: 'flex',
              background: 'var(--bg-tertiary)',
              padding: '3px',
              borderRadius: '6px',
              border: '1px solid var(--border-color)'
            }}>
              <button
                onClick={() => setActiveTab('visual')}
                style={{
                  padding: '4px 12px',
                  background: activeTab === 'visual' ? 'var(--bg-primary)' : 'transparent',
                  border: 'none',
                  color: activeTab === 'visual' ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                  fontSize: '12px',
                  fontWeight: 600,
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Slides
              </button>
              <button
                onClick={() => setActiveTab('decoupage')}
                style={{
                  padding: '4px 12px',
                  background: activeTab === 'decoupage' ? 'var(--bg-primary)' : 'transparent',
                  border: 'none',
                  color: activeTab === 'decoupage' ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                  fontSize: '12px',
                  fontWeight: 600,
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Découpage
              </button>
              <button
                onClick={() => setActiveTab('plan')}
                style={{
                  padding: '4px 12px',
                  background: activeTab === 'plan' ? 'var(--bg-primary)' : 'transparent',
                  border: 'none',
                  color: activeTab === 'plan' ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                  fontSize: '12px',
                  fontWeight: 600,
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Plan (MD)
              </button>
              <button
                onClick={() => setActiveTab('json')}
                style={{
                  padding: '4px 12px',
                  background: activeTab === 'json' ? 'var(--bg-primary)' : 'transparent',
                  border: 'none',
                  color: activeTab === 'json' ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                  fontSize: '12px',
                  fontWeight: 600,
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                JSON Brut
              </button>
            </div>

            <button
              onClick={handleCopyJSON}
              disabled={!lessonData || !lessonData.final}
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                color: 'var(--text-secondary)',
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background 0.15s',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                whiteSpace: 'nowrap'
              }}
            >
              {copied ? '⚡ Copié !' : '📋 Copier le JSON'}
            </button>
          </div>
        </div>

        {/* Scrollable central content */}
        <div style={{ flex: 1, overflowY: 'auto', paddingRight: '12px' }}>
          {lessonData ? (
            <div className="animate-fade-in" style={{ height: '100%' }}>
              
              {/* Tab 1: Visual Slide Editor */}
              {activeTab === 'visual' && (
                <EditorContext.Provider value={{
                  onFieldFocus: (slideIndex, fieldKey, value, rule) => {
                    setFocusedFieldInfo({ slideIndex, fieldKey, value, rule });
                  },
                  onFieldBlur: () => {
                    // Optional: keep it or clear it. Let's keep it so user can see it after blur,
                    // but they might want to see the last focused field. We won't clear it.
                  }
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingBottom: '40px' }}>
                    {lessonData.final && lessonData.final.slides && lessonData.final.slides.length > 0 ? (
                      lessonData.final.slides.map((slide, idx) => (
                        <SlideCard
                          key={idx}
                          index={idx}
                          slide={slide}
                          templateRules={templates}
                          isFirst={idx === 0}
                          isLast={idx === (lessonData.final?.slides?.length || 1) - 1}
                          onMoveUp={() => handleMoveSlide(idx, 'up')}
                          onMoveDown={() => handleMoveSlide(idx, 'down')}
                          onDelete={() => handleDeleteSlide(idx)}
                          onChange={(newContent) => {
                            // Update active slide contents in global state
                            if (lessonData.final) {
                              const updatedSlides = [...lessonData.final.slides];
                              updatedSlides[idx] = { ...updatedSlides[idx], content: newContent };
                              setLessonData({
                                ...lessonData,
                                final: { ...lessonData.final, slides: updatedSlides },
                              });
                            }
                          }}
                        />
                      ))
                    ) : (
                      <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                        <h3>Aucune slide découpée dans FINAL.json</h3>
                        <p style={{ fontSize: '13px', marginTop: '10px' }}>
                          Utilisez le panneau de droite pour lancer la phase <strong>Découpage</strong>.
                        </p>
                      </div>
                    )}
                  </div>
                </EditorContext.Provider>
              )}

              {/* Tab: Decoupage Table */}
              {activeTab === 'decoupage' && (
                <div className="glass-panel" style={{ padding: '20px', height: 'calc(100vh - 130px)', overflowY: 'auto' }}>
                  <h3 style={{ marginBottom: '16px', color: 'var(--text-primary)' }}>Tableau de Découpage</h3>
                  {lessonData.final && lessonData.final.slides && lessonData.final.slides.length > 0 ? (
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                      <thead>
                        <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                          <th style={{ padding: '12px 8px', width: '50px' }}>N°</th>
                          <th style={{ padding: '12px 8px' }}>Titre de la slide</th>
                          <th style={{ padding: '12px 8px' }}>Template utilisé</th>
                          <th style={{ padding: '12px 8px', width: '120px', textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {lessonData.final.slides.map((slide, idx) => {
                          const templateList = Object.keys(templates).length > 0 ? Object.keys(templates) : [slide.template];
                          return (
                            <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)', background: idx % 2 === 0 ? 'transparent' : 'var(--bg-tertiary)' }}>
                              <td style={{ padding: '12px 8px', color: 'var(--text-muted)' }}>{idx + 1}</td>
                              <td style={{ padding: '12px 8px', fontWeight: 600, color: 'var(--text-primary)' }}>
                                {slide.title || slide.content?.['Titre'] || slide.content?.['Titre 1'] || slide.content?.['Intro'] || 'Sans titre'}
                              </td>
                              <td style={{ padding: '12px 8px' }}>
                                <select
                                  value={slide.template}
                                  onChange={(e) => handleTemplateChange(idx, e.target.value)}
                                  style={{
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                    border: '1px solid var(--border-color)',
                                    background: 'var(--bg-secondary)',
                                    color: 'var(--text-primary)',
                                    fontFamily: 'monospace',
                                    fontSize: '12px',
                                    cursor: 'pointer',
                                    outline: 'none'
                                  }}
                                >
                                  {templateList.map((tName) => (
                                    <option key={tName} value={tName}>
                                      {tName.replace(/^VIBECODING\s*-\s*/i, '')}
                                    </option>
                                  ))}
                                </select>
                              </td>
                              <td style={{ padding: '12px 8px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                                <button
                                  onClick={() => handleMoveSlide(idx, 'up')}
                                  disabled={idx === 0}
                                  style={{
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: idx === 0 ? 'not-allowed' : 'pointer',
                                    color: idx === 0 ? 'var(--text-muted)' : 'var(--text-secondary)',
                                    opacity: idx === 0 ? 0.3 : 0.7,
                                    padding: '2px 6px',
                                    fontSize: '12px',
                                  }}
                                  title="Déplacer vers le haut"
                                >
                                  ▲
                                </button>
                                <button
                                  onClick={() => handleMoveSlide(idx, 'down')}
                                  disabled={idx === (lessonData.final?.slides || []).length - 1}
                                  style={{
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: idx === (lessonData.final?.slides || []).length - 1 ? 'not-allowed' : 'pointer',
                                    color: idx === (lessonData.final?.slides || []).length - 1 ? 'var(--text-muted)' : 'var(--text-secondary)',
                                    opacity: idx === (lessonData.final?.slides || []).length - 1 ? 0.3 : 0.7,
                                    padding: '2px 6px',
                                    fontSize: '12px',
                                  }}
                                  title="Déplacer vers le bas"
                                >
                                  ▼
                                </button>
                                <button
                                  onClick={() => handleDeleteSlide(idx)}
                                  style={{
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: 'var(--badge-red-text)',
                                    opacity: 0.7,
                                    padding: '2px 6px',
                                    fontSize: '12px',
                                    marginLeft: '4px'
                                  }}
                                  title="Supprimer la slide"
                                >
                                  ✕
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                      <p>Aucune slide trouvée dans FINAL.json.</p>
                      <p style={{ fontSize: '12px', marginTop: '8px' }}>Générez d'abord le découpage depuis le panneau de droite.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Markdown Lesson Plan Editor */}
              {activeTab === 'plan' && (
                <div className="glass-panel" style={{ height: 'calc(100vh - 130px)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                  {/* Markdown Editor Toolbar */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '10px 20px',
                      borderBottom: '1px solid var(--border-color)',
                      background: 'var(--bg-tertiary)',
                    }}
                  >
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                      📄 PLAN_{selectedSlug.toUpperCase()}.md
                    </span>
                    <div style={{ display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.03)', padding: '2px', borderRadius: '6px' }}>
                      {[
                        { id: 'preview', label: '📝 Notion' },
                        { id: 'edit', label: '⚡ Markdown' },
                        { id: 'split', label: '🌓 Côte à côte' },
                      ].map((mode) => (
                        <button
                          key={mode.id}
                          onClick={() => setPlanMode(mode.id as any)}
                          style={{
                            padding: '4px 10px',
                            fontSize: '11px',
                            fontWeight: 600,
                            borderRadius: '4px',
                            border: 'none',
                            cursor: 'pointer',
                            background: planMode === mode.id ? 'var(--bg-secondary)' : 'transparent',
                            color: planMode === mode.id ? 'var(--accent-blue)' : 'var(--text-secondary)',
                            boxShadow: planMode === mode.id ? 'var(--shadow-sm)' : 'none',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          {mode.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Markdown Content Area */}
                  <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>
                    {(planMode === 'edit' || planMode === 'split') && (
                      <textarea
                        value={lessonData.plan}
                        onChange={(e) => setLessonData({ ...lessonData, plan: e.target.value })}
                        style={{
                          flex: 1,
                          height: '100%',
                          padding: '20px',
                          background: 'transparent',
                          border: 'none',
                          color: 'var(--text-primary)',
                          fontFamily: 'monospace',
                          fontSize: '14px',
                          lineHeight: '1.6',
                          resize: 'none',
                          outline: 'none',
                          overflowY: 'auto',
                        }}
                        placeholder="Écrivez le plan de leçon ici (Format Markdown)..."
                      />
                    )}
                    
                    {planMode === 'split' && (
                      <div style={{ width: '1px', background: 'var(--border-color)', height: '100%' }} />
                    )}

                    {(planMode === 'preview' || planMode === 'split') && (
                      <div
                        style={{
                          flex: 1,
                          height: '100%',
                          overflowY: 'auto',
                          background: 'var(--bg-secondary)',
                          padding: '20px',
                        }}
                      >
                        <div
                          ref={editableRef}
                          contentEditable
                          suppressContentEditableWarning
                                                    className="notion-preview"
                          style={{
                            outline: 'none',
                            minHeight: '100%',
                            cursor: 'text',
                          }}
                          onInput={handleEditableInput}
                          onBlur={handleEditableInput}
                          onPaste={(e) => {
                            e.preventDefault();
                            const text = e.clipboardData.getData('text/plain');
                            // Insère le texte brut à la position du curseur
                            document.execCommand('insertText', false, text);
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tab 3: Raw JSON Structure Editor */}
              {activeTab === 'json' && (
                <div className="glass-panel" style={{ height: 'calc(100vh - 130px)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '10px 20px',
                      borderBottom: '1px solid var(--border-color)',
                      background: 'var(--bg-tertiary)',
                    }}
                  >
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                      ⚡ FINAL_{selectedSlug.toUpperCase()}.json
                    </span>
                    <span
                      style={{
                        fontSize: '10px',
                        background: 'var(--badge-blue-bg)',
                        color: 'var(--badge-blue-text)',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontWeight: 600,
                      }}
                    >
                      Coloration syntaxique IDE active
                    </span>
                  </div>
                  <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                    <JsonEditor
                      value={lessonData.final ? JSON.stringify(lessonData.final, null, 2) : ''}
                      onChange={(newVal) => {
                        try {
                          const parsed = JSON.parse(newVal);
                          setLessonData({ ...lessonData, final: parsed });
                        } catch (err) {
                          // Let typing continue even if JSON is temporarily invalid
                        }
                      }}
                    />
                  </div>
                </div>
              )}

            </div>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: 'var(--text-muted)' }}>
              Sélectionnez une leçon dans la barre latérale pour l'éditer.
            </div>
          )}
        </div>
      </main>

      {/* 3. RIGHT SIDEBAR: Script Orchestrator & Live Terminal */}
      <aside className={`sidebar-panel right-sidebar-panel glass-panel ${rightSidebarCollapsed ? 'collapsed' : ''} ${(activeMobilePane === 'tools' || activeMobilePane === 'agent') ? 'active-mobile' : ''}`} style={{
        margin: '12px',
        height: 'calc(100vh - 24px)'
      }}>
        {/* Header tabs selector */}
        <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 'var(--header-toolbar-height)' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 700 }}>
            {activeTabSidebar === 'agent' ? '🤖 Agent IA Workspace' : (activeTabSidebar === 'tools' ? '⚡ Outils & Validation' : '🖥️ Console')}
          </h3>
          
          <div style={{ display: 'flex', background: 'var(--bg-tertiary)', padding: '2px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
            <button
              onClick={() => setActiveTabSidebar('tools')}
              style={{
                padding: '2px 8px',
                background: activeTabSidebar === 'tools' ? 'var(--bg-secondary)' : 'transparent',
                border: 'none',
                fontSize: '10px',
                fontWeight: 600,
                borderRadius: '2px',
                cursor: 'pointer',
                color: activeTabSidebar === 'tools' ? 'var(--accent-blue)' : 'var(--text-secondary)'
              }}
            >
              Outils
            </button>
            <button
              onClick={() => setActiveTabSidebar('console')}
              style={{
                padding: '2px 8px',
                background: activeTabSidebar === 'console' ? 'var(--bg-secondary)' : 'transparent',
                border: 'none',
                fontSize: '10px',
                fontWeight: 600,
                borderRadius: '2px',
                cursor: 'pointer',
                color: activeTabSidebar === 'console' ? 'var(--accent-blue)' : 'var(--text-secondary)'
              }}
            >
              Console
            </button>
            <button
              onClick={() => setActiveTabSidebar('agent')}
              style={{
                padding: '2px 8px',
                background: activeTabSidebar === 'agent' ? 'var(--bg-secondary)' : 'transparent',
                border: 'none',
                fontSize: '10px',
                fontWeight: 600,
                borderRadius: '2px',
                cursor: 'pointer',
                color: activeTabSidebar === 'agent' ? 'var(--accent-blue)' : 'var(--text-secondary)'
              }}
            >
              Agent
            </button>
          </div>
        </div>

        {/* Tab contents */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', padding: '12px', gap: '12px' }}>
          {activeTabSidebar === 'tools' && (
            <>
              {/* Field Validation Panel */}
              <section className="glass-panel" style={{ padding: '16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '6px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
                  🎯 Validation du Champ
                </h3>
                {focusedFieldInfo ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>Slide {focusedFieldInfo.slideIndex + 1}</span>
                      <span style={{ fontSize: '12px', color: 'var(--accent-blue)', fontWeight: 600 }}>{focusedFieldInfo.fieldKey}</span>
                    </div>
                    
                    {focusedFieldInfo.rule ? (() => {
                      const len = focusedFieldInfo.value.length;
                      const min = focusedFieldInfo.rule.min_lenght;
                      const max = focusedFieldInfo.rule.max_lenght;
                      const isTooShort = len < min;
                      const isTooLong = len > max;
                      const isInvalid = isTooShort || isTooLong;
                      
                      return (
                        <div style={{ 
                          marginTop: '8px',
                          padding: '12px',
                          borderRadius: '6px',
                          background: isInvalid ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)',
                          border: `1px solid ${isInvalid ? 'rgba(239, 68, 68, 0.3)' : 'rgba(34, 197, 94, 0.3)'}`,
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          transition: 'all 0.2s ease'
                        }}>
                          <span style={{ fontSize: '13px', color: isInvalid ? 'var(--accent-red)' : 'var(--accent-green)', fontWeight: 700 }}>
                            {len} caractères
                          </span>
                          <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                            Requis : {min} - {max}
                          </span>
                        </div>
                      );
                    })() : (
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Aucune règle spécifique.</div>
                    )}
                  </div>
                ) : (
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontStyle: 'italic', padding: '8px 0' }}>
                    Sélectionnez un champ texte sur une slide pour voir ses contraintes.
                  </div>
                )}
              </section>

              {/* Script Orchestrator / Pipeline launcher */}
              <section className="glass-panel" style={{ padding: '16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '6px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
                  ⚡ Lanceur de Pipeline
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Modèle IA (Optionnel) :</label>
                    <select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      style={{
                        padding: '6px 10px',
                        background: 'var(--bg-tertiary)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '6px',
                        color: 'var(--text-primary)',
                        fontSize: '12px',
                        outline: 'none'
                      }}
                    >
                      <option value="">Par défaut (défini dans .env)</option>
                      <option value="gemini-pro-latest">Gemini Pro Latest</option>
                      <option value="gemini-3.5-flash">Gemini 3.5 Flash</option>
                      <option value="claude-sonnet-4-6">Claude Sonnet 4.6</option>
                      <option value="claude-opus-4-8">Claude Opus 4.8</option>
                    </select>
                  </div>
                  
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={generateImage}
                      onChange={(e) => setGenerateImage(e.target.checked)}
                      style={{ cursor: 'pointer' }}
                    />
                    Générer les illustrations
                  </label>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <button
                    onClick={() => runPipeline('decoupe')}
                    disabled={!!runningPhase || !selectedSlug}
                    style={{
                      padding: '10px',
                      background: runningPhase === 'decoupe' ? 'rgba(59, 130, 246, 0.15)' : 'var(--bg-tertiary)',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  >
                    1. Découpage
                  </button>

                  <button
                    onClick={() => runPipeline('ecris')}
                    disabled={!!runningPhase || !selectedSlug}
                    style={{
                      padding: '10px',
                      background: runningPhase === 'ecris' ? 'rgba(59, 130, 246, 0.15)' : 'var(--bg-tertiary)',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  >
                    2. Rédaction
                  </button>

                  <button
                    onClick={() => runPipeline('genere')}
                    disabled={!!runningPhase || !selectedSlug}
                    style={{
                      padding: '10px',
                      background: runningPhase === 'genere' ? 'rgba(59, 130, 246, 0.15)' : 'var(--bg-tertiary)',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  >
                    3. Images Gen
                  </button>

                  <button
                    onClick={() => runPipeline('all')}
                    disabled={!!runningPhase || !selectedSlug}
                    style={{
                      padding: '10px',
                      background: runningPhase === 'all' ? 'var(--accent-blue)' : 'rgba(59, 130, 246, 0.08)',
                      color: runningPhase === 'all' ? 'white' : 'var(--text-primary)',
                      border: '1px solid var(--accent-blue)',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  >
                    Tout exécuter
                  </button>
                </div>
                
                <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button
                    onClick={() => runPipeline('intro')}
                    disabled={!!runningPhase || !selectedSlug}
                    style={{
                      width: '100%',
                      padding: '10px',
                      background: runningPhase === 'intro' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.08)',
                      color: 'var(--text-primary)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      transition: 'background 0.2s'
                    }}
                  >
                    ✨ Générer / Corriger l'Intro
                  </button>
                  
                  <button
                    onClick={() => runPipeline('objectif-l1')}
                    disabled={!!runningPhase || !selectedSlug}
                    style={{
                      width: '100%',
                      padding: '10px',
                      background: runningPhase === 'objectif-l1' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.08)',
                      color: 'var(--text-primary)',
                      border: '1px solid rgba(99, 102, 241, 0.3)',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      transition: 'background 0.2s'
                    }}
                  >
                    🎯 Objectif L1 du Chapitre
                  </button>
                </div>
              </section>
            </>
          )}

          {activeTabSidebar === 'console' && (
            <section style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', minHeight: '300px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
                <h3 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>
                  Sortie console :
                </h3>
                
                <div style={{ display: 'flex', gap: '8px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: 'var(--text-muted)', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={logAutoScroll}
                      onChange={(e) => setLogAutoScroll(e.target.checked)}
                    />
                    Scroll
                  </label>
                  <button
                    onClick={() => setLogs('')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      fontSize: '10px',
                      cursor: 'pointer',
                      fontWeight: 600
                    }}
                  >
                    Effacer
                  </button>
                </div>
              </div>

              <pre
                ref={logConsoleRef}
                style={{
                  flex: 1,
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  padding: '12px',
                  borderRadius: '6px',
                  color: 'var(--text-primary)',
                  fontFamily: 'monospace',
                  fontSize: '11px',
                  lineHeight: '1.4',
                  overflowY: 'auto',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-all'
                }}
              >
                {logs || 'En attente de lancement...'}
              </pre>
            </section>
          )}

          {activeTabSidebar === 'agent' && (
            <section style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', minHeight: '350px', overflow: 'hidden' }}>
              {/* Agent Status and Clear */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '10px', color: 'var(--badge-green-text)', background: 'var(--badge-green-bg)', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>
                    {agentConfig?.model || 'Gemini 3.5 Flash'}
                  </span>
                </div>
                <button
                  onClick={() => setChatMessages([
                    { role: 'assistant', content: 'Discussion réinitialisée. Comment puis-je vous aider sur le workspace ?' }
                  ])}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '10px', cursor: 'pointer', fontWeight: 600 }}
                >
                  Réinitialiser
                </button>
              </div>

              {/* Message List */}
              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', paddingRight: '4px', marginBottom: '8px' }}>
                {chatMessages.map((msg, i) => {
                  if (msg.role === 'tool') {
                    const parts = msg.parts || [];
                    return (
                      <div key={i} style={{ fontSize: '10px', color: 'var(--text-muted)', background: 'var(--bg-tertiary)', borderLeft: '2px solid var(--accent-cyan)', padding: '4px 8px', borderRadius: '0 4px 4px 0' }}>
                        🛠️ {parts.map((p: any, pIdx) => {
                          const name = p.functionResponse?.name || '';
                          const response = p.functionResponse?.response;
                          let desc = '';
                          if (name === 'list_directory') desc = `Lister le répertoire (trouvé ${response?.items?.length || 0} éléments)`;
                          else if (name === 'read_file') desc = `Lire le fichier (taille ${response?.content?.length || 0} caract.)`;
                          else if (name === 'write_file') desc = `Écrire le fichier`;
                          else if (name === 'run_pipeline') desc = `Exécuter le pipeline (${response?.status === 0 ? 'succès' : 'erreur'})`;
                          else if (name === 'regenerate_slide') desc = `Régénérer la slide (${response?.status === 0 ? 'succès' : 'erreur'})`;
                          else if (name === 'search_in_files') desc = `Rechercher dans les fichiers (trouvé ${response?.results?.length || 0} fichiers)`;
                          else desc = name;
                          return <div key={`${name}-${pIdx}`}>Exécution de <strong>{name}</strong>: {desc}</div>;
                        })}
                      </div>
                    );
                  }
                  
                  const isUser = msg.role === 'user';
                  return (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: isUser ? 'flex-end' : 'flex-start',
                        maxWidth: '85%',
                        alignSelf: isUser ? 'flex-end' : 'flex-start'
                      }}
                    >
                      <span style={{ fontSize: '9px', color: 'var(--text-muted)', marginBottom: '2px', padding: '0 4px' }}>
                        {isUser ? 'Vous' : 'Agent IA'}
                      </span>
                      <div
                        style={{
                          background: isUser ? 'var(--accent-blue)' : 'var(--bg-tertiary)',
                          color: isUser ? '#ffffff' : 'var(--text-primary)',
                          border: isUser ? 'none' : '1px solid var(--border-color)',
                          borderRadius: isUser ? '12px 12px 0 12px' : '12px 12px 12px 0',
                          padding: '8px 12px',
                          fontSize: '12px',
                          lineHeight: '1.4',
                          wordBreak: 'break-word',
                          boxShadow: 'var(--shadow-sm)'
                        }}
                      >
                        {renderMarkdownMessage(msg.content)}
                      </div>
                    </div>
                  );
                })}
                {isChatLoading && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-muted)', padding: '4px' }}>
                    <span className="spinner"></span>
                    <span>L'agent réfléchit...</span>
                  </div>
                )}
              </div>

              {/* Chat Input form */}
              <form onSubmit={(e) => handleSendChatMessage(e)} style={{ display: 'flex', gap: '6px' }}>
                <input
                  type="text"
                  placeholder={selectedSlug ? `Message pour la leçon ${selectedSlug.toUpperCase()}...` : "Poser une question à l'agent..."}
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  disabled={isChatLoading}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    fontSize: '12px',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  disabled={isChatLoading || !chatInput.trim()}
                  style={{
                    background: 'var(--accent-blue)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0 12px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    opacity: (isChatLoading || !chatInput.trim()) ? 0.6 : 1
                  }}
                >
                  Envoyer
                </button>
              </form>
            </section>
          )}
        </div>
      </aside>

      {/* Footer status bar */}
      <footer className="status-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ color: 'var(--accent-green)', fontWeight: 600 }}>● Système Prêt</span>
          <span>• {lessons.length} leçons</span>
          {selectedSlug && (
            <span>• Active : <strong style={{ fontFamily: 'monospace' }}>{selectedSlug.toUpperCase()}</strong></span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {selectedSlug && lessonData?.final?.slides && (
            <span>{lessonData.final.slides.length} slides</span>
          )}
          <span>Modèle Actif : {selectedModel || 'Config .env'}</span>
        </div>
      </footer>

      {/* Bottom mobile navigation bar */}
      <nav className="mobile-nav-bar">
        <button
          className={`mobile-nav-btn ${activeMobilePane === 'lessons' ? 'active' : ''}`}
          onClick={() => setActiveMobilePane('lessons')}
        >
          <span className="mobile-nav-icon">📁</span>
          <span>Leçons</span>
        </button>
        <button
          className={`mobile-nav-btn ${activeMobilePane === 'editor' ? 'active' : ''}`}
          onClick={() => setActiveMobilePane('editor')}
        >
          <span className="mobile-nav-icon">📝</span>
          <span>Éditeur</span>
        </button>
        <button
          className={`mobile-nav-btn ${activeMobilePane === 'tools' ? 'active' : ''}`}
          onClick={() => {
            setActiveMobilePane('tools');
            if (activeTabSidebar === 'agent') {
              setActiveTabSidebar('tools');
            }
          }}
        >
          <span className="mobile-nav-icon">⚡</span>
          <span>Outils</span>
        </button>
        <button
          className={`mobile-nav-btn ${activeMobilePane === 'agent' ? 'active' : ''}`}
          onClick={() => {
            setActiveMobilePane('agent');
            setActiveTabSidebar('agent');
            setRightSidebarCollapsed(false);
          }}
        >
          <span className="mobile-nav-icon">🤖</span>
          <span>Agent</span>
        </button>
      </nav>
      {/* Modal for creating a new lesson */}
      {showCreateModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.4)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
          backdropFilter: 'blur(4px)'
        }}>
          <div className="glass-panel animate-fade-in" style={{
            width: '400px',
            padding: '24px',
            background: 'var(--bg-secondary)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
              Créer une nouvelle leçon
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                ID Leçon (ex: m1c2l6) :
              </label>
              <input 
                type="text" 
                value={newLessonSlug}
                onChange={(e) => setNewLessonSlug(e.target.value.toLowerCase().trim())}
                placeholder="m1c2l6"
                style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Titre de la leçon :
              </label>
              <input 
                type="text" 
                value={newLessonTitle}
                onChange={(e) => setNewLessonTitle(e.target.value)}
                placeholder="Découper avec les agents"
                style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
              <button 
                onClick={() => {
                  setShowCreateModal(false);
                  setNewLessonSlug('');
                  setNewLessonTitle('');
                }}
                style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-secondary)',
                  padding: '6px 14px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Annuler
              </button>
              <button 
                onClick={handleCreateLesson}
                disabled={!newLessonSlug}
                className="glow-btn"
                style={{
                  padding: '6px 16px',
                  fontSize: '12px'
                }}
              >
                Créer la leçon
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
export default App;
