import genAiQuizzes from './gen-ai.json';
import { Question } from '../../types';

// Helper to cast JSON data to Question[]
const cast = (data: any) => data as Question[];

// Level-based questions (for the main AI Quiz)
export const GEN_AI_QUESTIONS = cast(genAiQuizzes.level1);
export const GEN_AI_QUESTIONS_L2 = cast(genAiQuizzes.level2);
export const GEN_AI_QUESTIONS_L3 = cast(genAiQuizzes.level3);
export const GEN_AI_QUESTIONS_L4 = cast(genAiQuizzes.level4);

export const ALL_QUIZZES = {
  genAi: genAiQuizzes,
};

// Function for loading quiz data by level (GEN_AI / level1, level2, level3, level4)
export const getQuizData = async (moduleId: string, chapterId: string): Promise<Question[]> => {
  try {
    const genAiData: any = await import('./gen-ai.json');
    return genAiData[chapterId.toLowerCase()] || genAiData.level1;
  } catch (error) {
    console.error('Error loading quiz data:', error);
    return [];
  }
};
