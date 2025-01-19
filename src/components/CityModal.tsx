import { useState } from 'react';

interface CityModalProps {
  onComplete: (city: string) => void;
  onClose: () => void;
}

export function CityModal({ onComplete, onClose }: CityModalProps) {
  const [cityInput, setCityInput] = useState('');

  const handleSubmit = () => {
    if (cityInput.trim()) {
      onComplete(cityInput.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Change City</h2>
        
        <input
          type="text"
          placeholder="e.g. Tokyo, Japan"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 text-gray-700 p-2 rounded hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!cityInput.trim()}
            className="flex-1 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
} 