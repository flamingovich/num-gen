
import React from 'react';
import { PlateData, REGION_NAMES_RU, REGION_NAMES_BY, Country } from '../types.ts';

interface ControlsProps {
  data: PlateData;
  onChange: (newData: PlateData) => void;
  onGenerate: (isSpecial: boolean) => void;
  onCountryChange: (country: Country) => void;
  isGenerating: boolean;
}

const Controls: React.FC<ControlsProps> = ({ data, onChange, onGenerate, onCountryChange, isGenerating }) => {
  const isRU = data.country === 'RU';
  
  const handleRegionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    const limit = isRU ? 3 : 1;
    onChange({ ...data, region: value.slice(0, limit) });
  };

  const getRegionName = () => {
    if (data.region.length === 0) return 'Введите регион';
    if (isRU) {
      if (REGION_NAMES_RU[data.region]) return REGION_NAMES_RU[data.region];
      if (data.region.length === 1) {
        const padded = data.region.padStart(2, '0');
        if (REGION_NAMES_RU[padded]) return REGION_NAMES_RU[padded];
      }
      return 'Неизвестный регион';
    } else {
      return REGION_NAMES_BY[data.region] || 'Неизвестный регион';
    }
  };

  const regionName = getRegionName();

  return (
    <div className="rp-panel w-full max-w-[720px] p-3 sm:p-4 md:p-6 rounded-[20px] md:rounded-[28px] border-t border-white/10 flex flex-col items-center gap-3 md:gap-5 transition-all">
      
      {/* Country Switcher - Mini */}
      <div className="flex bg-black/40 p-0.5 rounded-lg border border-white/5 w-fit">
         <button 
           onClick={() => !isGenerating && onCountryChange('RU')}
           className={`px-4 md:px-6 py-1.5 md:py-2 rounded-md rp-font text-[8px] md:text-[9px] font-black transition-all duration-300 ${isRU ? 'majestic-bg text-black shadow-md shadow-yellow-400/20' : 'text-white/20 hover:text-white/40'}`}
         >
           РОССИЯ
         </button>
         <button 
           onClick={() => !isGenerating && onCountryChange('BY')}
           className={`px-4 md:px-6 py-1.5 md:py-2 rounded-md rp-font text-[8px] md:text-[9px] font-black transition-all duration-300 ${!isRU ? 'majestic-bg text-black shadow-md shadow-yellow-400/20' : 'text-white/20 hover:text-white/40'}`}
         >
           БЕЛАРУСЬ
         </button>
      </div>

      {/* Inputs Grid - Compact */}
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-5 items-stretch md:items-end">
        
        {/* Region Input Column */}
        <div className="md:col-span-4 flex flex-col gap-1.5 group">
          <label className="text-white/10 text-[7px] font-black uppercase tracking-[0.2em] px-1">Код Региона</label>
          <div className="relative">
            <input 
              type="text" 
              value={data.region}
              onChange={handleRegionChange}
              disabled={isGenerating}
              placeholder={isRU ? "777" : "7"}
              className="w-full bg-white/[0.01] border border-white/5 text-white p-2.5 md:p-3.5 rounded-lg text-lg md:text-2xl font-black rp-font outline-none focus:border-yellow-400/30 text-center transition-all placeholder:text-white/5"
              maxLength={isRU ? 3 : 1}
            />
          </div>
          <div className="h-3.5 flex items-center justify-center">
            <span className={`text-[7px] md:text-[8px] font-bold uppercase tracking-wider transition-all duration-500 ${data.region.length > 0 && regionName !== 'Неизвестный регион' && regionName !== 'Введите регион' ? 'text-yellow-400 opacity-80' : 'text-white/5 opacity-30'}`}>
              {regionName}
            </span>
          </div>
        </div>

        {/* Generate Button Column */}
        <div className="md:col-span-8 flex flex-col gap-1.5">
          <div className="hidden md:block h-[8px]"></div>
          <button 
            onClick={(e) => onGenerate(e.shiftKey)}
            disabled={isGenerating}
            className={`rp-font relative w-full h-[48px] md:h-[60px] rounded-lg font-black text-black uppercase text-[10px] md:text-sm transition-all shadow-lg ${isGenerating ? 'bg-white/5 text-white/10 cursor-not-allowed' : 'majestic-bg hover:brightness-105 active:scale-[0.98]'}`}
          >
            {isGenerating ? '...' : 'ПОЛУЧИТЬ НОМЕР'}
          </button>
          <div className="h-3.5"></div>
        </div>
      </div>
    </div>
  );
};

export default Controls;
