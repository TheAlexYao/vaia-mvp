import { useState } from 'react';
import { getHistory, toggleFavorite } from '../lib/historyStore';
import { Card } from './ui/card';
import { TTSButton } from './TTSButton';

export const HistoryView = () => {
  const [viewMode, setViewMode] = useState<'history' | 'favorites'>('history');
  const history = getHistory();
  
  const items = viewMode === 'favorites' 
    ? history.filter(item => item.isFavorite)
    : history;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex gap-2 mb-4">
        <button 
          onClick={() => setViewMode('history')}
          className={`px-4 py-2 rounded-full text-sm ${
            viewMode === 'history' 
              ? 'bg-indigo-700 text-white' 
              : 'bg-white text-indigo-700 border border-indigo-200'
          }`}
        >
          History
        </button>
        <button 
          onClick={() => setViewMode('favorites')}
          className={`px-4 py-2 rounded-full text-sm ${
            viewMode === 'favorites' 
              ? 'bg-indigo-700 text-white' 
              : 'bg-white text-indigo-700 border border-indigo-200'
          }`}
        >
          Favorites
        </button>
      </div>

      <div className="space-y-3">
        {items.map(item => (
          <Card key={item.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600">{item.content}</p>
                {item.phraseObj && (
                  <div className="mt-2 text-sm">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{item.phraseObj.original}</p>
                      <TTSButton text={item.phraseObj.original} locale={item.phraseObj.locale} />
                    </div>
                    <p className="text-gray-500">{item.phraseObj.romanized}</p>
                    <p className="text-gray-600">{item.phraseObj.meaning}</p>
                  </div>
                )}
              </div>
              <button
                onClick={() => toggleFavorite(item.id)}
                className="text-indigo-400 hover:text-indigo-600 transition-colors"
              >
                {item.isFavorite ? "♥" : "♡"}
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}; 