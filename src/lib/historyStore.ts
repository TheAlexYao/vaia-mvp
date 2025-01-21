import { v4 as uuidv4 } from 'uuid';

// Migration function to handle old data format
const migrateHistoryItem = (item: any): HistoryItem => {
  if (item.phraseObj?.languageCode) {
    return {
      ...item,
      phraseObj: {
        ...item.phraseObj,
        locale: item.phraseObj.languageCode,
        // @ts-ignore - remove old field
        languageCode: undefined
      }
    };
  }
  return item;
};

type HistoryItem = {
  id: string;
  timestamp: number;
  content: string;
  phraseObj?: {
    original: string;
    romanized: string;
    meaning: string;
    locale: string;
    culturalTip?: string;
    audioUrl?: string;
  };
  isFavorite?: boolean;
};

const HISTORY_KEY = 'vaiaHistory';

export const getHistory = (): HistoryItem[] => {
  const stored = localStorage.getItem(HISTORY_KEY);
  if (!stored) return [];
  
  // Migrate old data if needed
  const parsed = JSON.parse(stored);
  const migrated = parsed.map(migrateHistoryItem);
  
  // If any items were migrated, save the migrated data
  if (migrated.some((item: any) => item.phraseObj?.languageCode)) {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(migrated));
  }
  
  return migrated;
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