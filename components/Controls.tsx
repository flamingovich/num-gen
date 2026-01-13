
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

  // Улучшенная логика поиска региона
  const getRegionName = () => {
    if (data.region.length === 0) return 'Введите регион';
    
    if (isRU) {
      // Прямой поиск (например, '777')
      if (REGION_NAMES_RU[data.region]) return REGION_NAMES_RU[data.region];
      
      // Поиск с ведущим нулем (для кодов 1-9, если введено '1' -> '01')
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
    <div className="rp-panel p-8 rounded-3xl border-t border-white/10 w-full flex flex-col items-center gap-10">
      
      {/* Country Switcher */}
      <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/5">
         <button 
           onClick={() => !isGenerating && onCountryChange('RU')}
           className={`px-10 py-3 rounded-xl rp-font text-xs font-black transition-all ${isRU ? 'majestic-bg text-black shadow-lg shadow-yellow-400/20' : 'text-white/40 hover:text-white'}`}
         >
           РОССИЯ
         </button>
         <button 
           onClick={() => !isGenerating && onCountryChange('BY')}
           className={`px-10 py-3 rounded-xl rp-font text-xs font-black transition-all ${!isRU ? 'majestic-bg text-black shadow-lg shadow-yellow-400/20' : 'text-white/40 hover:text-white'}`}
         >
           БЕЛАРУСЬ
         </button>
      </div>

      <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
        <div className="flex flex-col gap-3 group">
          <label className="text-white/30 text-[9px] font-black uppercase tracking-widest px-1">Код Региона</label>
          <div className="relative">
            <input 
              type="text" 
              value={data.region}
              onChange={handleRegionChange}
              disabled={isGenerating}
              placeholder={isRU ? "777" : "7"}
              className="w-full bg-white/[0.03] border border-white/10 text-white p-5 rounded-2xl text-3xl font-black rp-font outline-none focus:border-yellow-400 text-center transition-all"
              maxLength={isRU ? 3 : 1}
            />
          </div>
          <div className="h-4 text-center">
            <span className={`text-[10px] font-bold uppercase transition-all ${data.region.length > 0 && regionName !== 'Неизвестный регион' && regionName !== 'Введите регион' ? 'text-yellow-400' : 'text-white/10'}`}>
              {regionName}
            </span>
          </div>
        </div>

        <button 
          onClick={(e) => onGenerate(e.shiftKey)}
          disabled={isGenerating}
          className={`rp-font relative h-[78px] rounded-2xl font-black text-black uppercase text-xl transition-all ${isGenerating ? 'bg-white/5 text-white/20' : 'majestic-bg hover:brightness-110 active:scale-95'}`}
        >
          {isGenerating ? 'ГЕНЕРАЦИЯ...' : 'ПОЛУЧИТЬ НОМЕР'}
        </button>
      </div>
    </div>
  );
};

export default Controls;
