import { createContext } from 'react';
import { SlideFieldRule } from '../types';

export interface EditorContextType {
  onFieldFocus?: (slideIndex: number, fieldKey: string, value: string, rule?: SlideFieldRule) => void;
  onFieldBlur?: () => void;
  slideIndex?: number;
}

export const EditorContext = createContext<EditorContextType>({});
