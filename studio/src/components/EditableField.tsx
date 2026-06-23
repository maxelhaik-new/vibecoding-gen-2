import React, { useState, useContext, useEffect } from 'react';
import { SlideFieldRule } from '../types';
import { EditorContext } from './EditorContext';

interface EditableFieldProps {
  fieldKey: string;
  value: string;
  onChange: (value: string) => void;
  rule?: SlideFieldRule;
  className?: string;
  style?: React.CSSProperties;
  multiline?: boolean;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const EditableField: React.FC<EditableFieldProps> = ({
  fieldKey,
  value = '',
  onChange,
  rule,
  className = '',
  style = {},
  multiline = true,
  placeholder = '',
  onFocus,
  onBlur,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const { onFieldFocus, onFieldBlur, slideIndex } = useContext(EditorContext);
  const len = value.length;
  const hasRule = !!rule;
  const isTooShort = hasRule && len < rule.min_lenght;
  const isTooLong = hasRule && len > rule.max_lenght;
  const isInvalid = isTooShort || isTooLong;

  // Whenever value changes while focused, notify context to keep sidebar in sync
  useEffect(() => {
    if (isFocused && onFieldFocus && slideIndex !== undefined) {
      onFieldFocus(slideIndex, fieldKey, value, rule);
    }
  }, [value, isFocused]); // deliberately not including context callbacks to avoid loops

  const borderStyle = isInvalid
    ? '1px solid var(--accent-red)'
    : isFocused
    ? '1px solid var(--accent-blue)'
    : '1px transparent';

  const backgroundStyle = isInvalid
    ? 'rgba(239, 68, 68, 0.1)' // Light red highlight
    : isFocused
    ? 'rgba(0, 0, 0, 0.04)'
    : 'rgba(0, 0, 0, 0.01)';

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current && multiline) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value, multiline]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (onFocus) onFocus();
    if (onFieldFocus && slideIndex !== undefined) {
      onFieldFocus(slideIndex, fieldKey, value, rule);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (onBlur) onBlur();
    if (onFieldBlur) {
      onFieldBlur();
    }
  };

  const combinedStyle: React.CSSProperties = {
    background: backgroundStyle,
    border: borderStyle,
    color: 'inherit',
    padding: '4px 6px',
    borderRadius: '4px',
    fontSize: 'inherit',
    fontFamily: 'inherit',
    fontWeight: 'inherit',
    textAlign: 'inherit',
    resize: 'none',
    outline: 'none',
    width: '100%',
    minHeight: '100%',
    overflow: 'hidden', // hides scrollbar
    transition: 'background 0.15s ease-in-out, border 0.15s ease-in-out',
    ...style,
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'visible' }}>
      {multiline ? (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={combinedStyle}
          className={className}
          placeholder={placeholder || rule?.original_placeholder || fieldKey}
          rows={1}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={combinedStyle}
          className={className}
          placeholder={placeholder || rule?.original_placeholder || fieldKey}
        />
      )}
    </div>
  );
};
