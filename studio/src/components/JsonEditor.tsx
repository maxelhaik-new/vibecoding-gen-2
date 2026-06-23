import React, { useRef, useEffect, useState } from 'react';

interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const JsonEditor: React.FC<JsonEditorProps> = ({ value, onChange }) => {
  const [localVal, setLocalVal] = useState(value);
  const preRef = useRef<HTMLPreElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync scroll between textarea and pre
  const handleScroll = () => {
    if (textareaRef.current && preRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop;
      preRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  // Sync internal state when prop changes from outside (e.g. switching lessons)
  useEffect(() => {
    try {
      const parsedVal = JSON.parse(value);
      const parsedLocal = JSON.parse(localVal);
      if (JSON.stringify(parsedVal) !== JSON.stringify(parsedLocal)) {
        setLocalVal(value);
      }
    } catch (e) {
      if (value !== localVal) {
        setLocalVal(value);
      }
    }
  }, [value]);

  useEffect(() => {
    handleScroll();
  }, [localVal]);

  const highlightJSON = (jsonStr: string) => {
    if (!jsonStr) return '';
    
    // Escape HTML tags to prevent XSS
    let html = jsonStr
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    return html.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\b\d+(?:\.\d*)?(?:[eE][+-]?\d+)?\b)/g,
      (match) => {
        let cls = 'json-number';
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'json-key';
          } else {
            cls = 'json-string';
          }
        } else if (/true|false/.test(match)) {
          cls = 'json-boolean';
        } else if (/null/.test(match)) {
          cls = 'json-null';
        }
        return `<span class="${cls}">${match}</span>`;
      }
    );
  };

  const highlightedHtml = highlightJSON(localVal);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setLocalVal(val);
    onChange(val);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <pre
        ref={preRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          margin: 0,
          padding: '20px',
          background: 'transparent',
          border: 'none',
          color: 'var(--text-primary)',
          fontFamily: 'monospace',
          fontSize: '13px',
          lineHeight: '1.5',
          overflow: 'hidden',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
          pointerEvents: 'none',
          boxSizing: 'border-box',
        }}
        dangerouslySetInnerHTML={{ __html: highlightedHtml || '&nbsp;' }}
      />
      <textarea
        ref={textareaRef}
        value={localVal}
        onChange={handleChange}
        onScroll={handleScroll}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          margin: 0,
          padding: '20px',
          background: 'transparent',
          border: 'none',
          color: 'transparent',
          WebkitTextFillColor: 'transparent',
          caretColor: 'var(--text-primary)',
          fontFamily: 'monospace',
          fontSize: '13px',
          lineHeight: '1.5',
          resize: 'none',
          outline: 'none',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
          overflowY: 'auto',
          boxSizing: 'border-box',
        }}
        placeholder="Structure finale JSON..."
      />
    </div>
  );
};
export default JsonEditor;
