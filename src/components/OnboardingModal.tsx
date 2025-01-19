import { useState, useMemo } from 'react';
import { countryToLanguages } from '../lib/countryToLanguages';
import { azureVoiceMap } from '../lib/azureVoiceMap';

interface OnboardingModalProps {
  onComplete: (config: { langCode: string; city: string }) => void;
}

export function OnboardingModal({ onComplete }: OnboardingModalProps) {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedLang, setSelectedLang] = useState<string>('');
  const [cityInput, setCityInput] = useState('');
  const [step, setStep] = useState<'country' | 'language' | 'city'>('country');
  const [searchQuery, setSearchQuery] = useState('');

  const countries = Object.keys(countryToLanguages).sort();

  const filteredLanguages = useMemo(() => {
    if (!searchQuery) return Object.entries(azureVoiceMap);
    
    const query = searchQuery.toLowerCase();
    return Object.entries(azureVoiceMap).filter(([code, data]) => 
      code.toLowerCase().includes(query) || 
      data.displayName.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    const langs = countryToLanguages[country];
    
    if (langs?.length === 1) {
      setSelectedLang(langs[0]);
      setStep('city');
    } else {
      setStep('language');
    }
  };

  const handleCityConfirm = () => {
    if (cityInput.trim()) {
      onComplete({ 
        langCode: selectedLang || countryToLanguages[selectedCountry][0], 
        city: cityInput.trim() 
      });
    }
  };

  if (step === 'city') {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <h2 className="text-xl font-bold mb-4">Where are you headed?</h2>
          
          <input
            type="text"
            placeholder="e.g. Tokyo, Japan"
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />

          <div className="flex gap-2">
            <button
              onClick={() => setStep('language')}
              className="flex-1 bg-gray-100 text-gray-700 p-2 rounded hover:bg-gray-200"
            >
              Back
            </button>
            <button
              onClick={handleCityConfirm}
              disabled={!cityInput.trim()}
              className="flex-1 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedCountry === 'other') {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <h2 className="text-xl font-bold mb-4">Select Language</h2>
          
          <input
            type="text"
            placeholder="Search languages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />

          <div className="max-h-96 overflow-y-auto">
            {filteredLanguages.map(([code, data]) => (
              <button
                key={code}
                onClick={() => onComplete({ langCode: code, city: '' })}
                className="w-full text-left p-2 hover:bg-gray-100 rounded flex justify-between items-center"
              >
                <span>{data.displayName}</span>
                <span className="text-gray-500 text-sm">{code}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setSelectedCountry('')}
            className="w-full mt-4 bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  if (step === 'language') {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <h2 className="text-xl font-bold mb-4">Select Language for {selectedCountry}</h2>
          
          <div className="space-y-2">
            {countryToLanguages[selectedCountry].map(langCode => (
              <button
                key={langCode}
                onClick={() => {
                  setSelectedLang(langCode);
                  setStep('city');
                }}
                className="w-full text-left p-2 hover:bg-gray-100 rounded flex justify-between items-center"
              >
                <span>{azureVoiceMap[langCode]?.displayName}</span>
                <span className="text-gray-500 text-sm">{langCode}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setStep('country')}
            className="w-full mt-4 bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Select Your Country</h2>
        
        <select
          value={selectedCountry}
          onChange={(e) => handleCountryChange(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="">Choose a country...</option>
          <option value="other">Other...</option>
          {countries.map(country => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        {selectedCountry && selectedCountry !== 'other' && (
          <button
            onClick={() => setStep('language')}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
} 