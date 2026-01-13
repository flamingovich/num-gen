
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
    <div className="rp-panel w-full max-w-[1000px] p-4 sm:p-6 md:p-10 rounded-[32px] md:rounded-[48px] border-t border-white/10 flex flex-col items-center gap-6 md:gap-10 transition-all">
      
      {/* Country Switcher */}
      <div className="flex bg-black/40 p-1 rounded-2xl border border-white/5 w-fit">
         <button 
           onClick={() => !isGenerating && onCountryChange('RU')}
           className={`px-6 md:px-12 py-3 rounded-xl rp-font text-[10px] md:text-xs font-black transition-all duration-300 ${isRU ? 'majestic-bg text-black shadow-lg shadow-yellow-400/30 scale-105' : 'text-white/30 hover:text-white/60'}`}
         >
           РОССИЯ
         </button>
         <button 
           onClick={() => !isGenerating && onCountryChange('BY')}
           className={`px-6 md:px-12 py-3 rounded-xl rp-font text-[10px] md:text-xs font-black transition-all duration-300 ${!isRU ? 'majestic-bg text-black shadow-lg shadow-yellow-400/30 scale-105' : 'text-white/30 hover:text-white/60'}`}
         >
           БЕЛАРУСЬ
         </button>
      </div>

      {/* Inputs Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-stretch md:items-end">
        
        {/* Region Input Column */}
        <div className="md:col-span-5 flex flex-col gap-3 group">
          <label className="text-white/20 text-[9px] font-black uppercase tracking-[0.2em] px-1">Код Региона</label>
          <div className="relative">
            <input 
              type="text" 
              value={data.region}
              onChange={handleRegionChange}
              disabled={isGenerating}
              placeholder={isRU ? "777" : "7"}
              className="w-full bg-white/[0.02] border border-white/10 text-white p-4 md:p-6 rounded-2xl text-2xl md:text-4xl font-black rp-font outline-none focus:border-yellow-400/50 focus:bg-white/[0.04] text-center transition-all placeholder:text-white/5"
              maxLength={isRU ? 3 : 1}
            />
          </div>
          <div className="h-5 flex items-center justify-center">
            <span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-wider transition-all duration-500 ${data.region.length > 0 && regionName !== 'Неизвестный регион' && regionName !== 'Введите регион' ? 'text-yellow-400 opacity-100' : 'text-white/10 opacity-50'}`}>
              {regionName}
            </span>
          </div>
        </div>

        {/* Generate Button Column */}
        <div className="md:col-span-7 flex flex-col gap-3">
          <div className="hidden md:block h-[12px]"></div> {/* Spacer for alignment */}
          <button 
            onClick={(e) => onGenerate(e.shiftKey)}
            disabled={isGenerating}
            className={`rp-font relative w-full h-[64px] md:h-[92px] rounded-2xl font-black text-black uppercase text-sm md:text-xl transition-all shadow-xl ${isGenerating ? 'bg-white/5 text-white/10 cursor-not-allowed' : 'majestic-bg hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] shadow-yellow-400/10'}`}
          >
            {isGenerating ? 'ПОДОЖДИТЕ...' : 'ПОЛУЧИТЬ НОМЕР'}
          </button>
          <div className="h-5"></div> {/* Bottom spacer */}
        </div>
      </div>
    </div>
  );
};

export default Controls;
