export interface SlideFieldRule {
  key: string;
  original_placeholder: string;
  target_lenght: number;
  min_lenght: number;
  max_lenght: number;
}

export interface TemplateRule {
  name: string;
  status: string;
  description: string;
  text_layers: SlideFieldRule[];
  image_layers?: Array<{
    key: string;
    original_placeholder: string;
    ratio: string;
    width: number;
    height: number;
  }>;
  picto_layers?: Array<{
    key: string;
    original_placeholder: string;
  }>;
}

export interface SlideData {
  template: string;
  content: Record<string, string>;
  title?: string;
  image_concept?: string;
  image_style?: string;
  image_ratio?: string;
}

export interface LessonData {
  lessonTitle: string;
  slides: SlideData[];
}

export interface LessonSummary {
  slug: string;
  title: string;
  hasPlan: boolean;
  hasFinal: boolean;
  status: 'no_plan' | 'plan_only' | 'sliced' | 'written' | 'completed' | 'error';
  slideCount: number;
}
