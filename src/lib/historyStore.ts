import { v4 as uuidv4 } from 'uuid';

export interface HistoryItem {
  id: string;
  timestamp: number;
  content: string;
  phraseObj?: {
    original: string;
    romanized: string;
    meaning: string;
    languageCode: string;
    culturalTip?: string;
  };
  isFavorite: boolean;
}

const HISTORY_KEY = 'vaiaHistory';

export const getHistory = (): HistoryItem[] => {
  const stored = localStorage.getItem(HISTORY_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const addToHistory = (content: string, phraseObj?: HistoryItem['phraseObj']): HistoryItem => {
  const history = getHistory();
  const newItem: HistoryItem = {
    id: uuidv4(),
    timestamp: Date.now(),
    content,
    phraseObj,
    isFavorite: false
  };
  
  localStorage.setItem(HISTORY_KEY, JSON.stringify([newItem, ...history]));
  return newItem;
};

export const toggleFavorite = (id: string): HistoryItem | undefined => {
  const history = getHistory();
  const itemIndex = history.findIndex(item => item.id === id);
  
  if (itemIndex === -1) return undefined;
  
  history[itemIndex].isFavorite = !history[itemIndex].isFavorite;
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  return history[itemIndex];
}; 