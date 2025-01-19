import { useState, useMemo } from 'react';
import { countryToLanguages } from '../lib/countryToLanguages';
import { azureVoiceMap } from '../lib/azureVoiceMap';

interface OnboardingModalProps {
  onComplete: (langCode: string) => void;
}

export function OnboardingModal({ onComplete }: OnboardingModalProps) {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedLang, setSelectedLang] = useState<string>('');
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
      onComplete(langs[0]);
    } else {
      setSelectedLang('');
    }
  };

  const handleLanguageChange = (lang: string) => {
    setSelectedLang(lang);
  };

  const handleConfirm = () => {
    if (selectedLang) {
      onComplete(selectedLang);
    }
  };

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
                onClick={() => onComplete(code)}
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

        {selectedCountry && countryToLanguages[selectedCountry]?.length > 1 && (
          <>
            <h3 className="text-lg font-semibold mb-2">Select Language</h3>
            <select
              value={selectedLang}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            >
              <option value="">Choose a language...</option>
              {countryToLanguages[selectedCountry].map(langCode => (
                <option key={langCode} value={langCode}>
                  {azureVoiceMap[langCode]?.displayName || langCode}
                </option>
              ))}
            </select>
          </>
        )}

        {selectedCountry && countryToLanguages[selectedCountry]?.length > 1 && (
          <button
            onClick={handleConfirm}
            disabled={!selectedLang}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
          >
            Confirm Selection
          </button>
        )}
      </div>
    </div>
  );
} 