
import React from 'react';
import { PlateData } from '../types.ts';

interface ControlsProps {
  data: PlateData;
  onChange: (newData: PlateData) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

const Controls: React.FC<ControlsProps> = ({ data, onChange, onGenerate, isGenerating }) => {
  const handleRegionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 3);
    onChange({ ...data, region: value });
  };

  return (
    <div className="rp-panel p-10 rounded-2xl border-t-2 border-white/5 w-full relative overflow-hidden flex flex-col items-center">
      {/* Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-yellow-400 shadow-[0_0_30px_#facc15]"></div>

      <div className="w-full flex flex-col items-center text-center mb-10">
        <h2 className="rp-font text-3xl font-black uppercase tracking-tight mb-3">
          РЕГИСТРАЦИЯ <span className="majestic-yellow">ТРАНСПОРТА</span>
        </h2>
        <div className="flex items-center gap-4">
          <div className="h-[1px] w-12 bg-white/10"></div>
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.4em]">
            ГЕНЕРАЦИЯ ГОСУДАРСТВЕННОГО НОМЕРА
          </p>
          <div className="h-[1px] w-12 bg-white/10"></div>
        </div>
      </div>

      <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Region Input Section */}
        <div className="flex flex-col gap-3 group">
          <label className="text-white/30 text-[9px] font-black uppercase tracking-widest px-1 group-focus-within:text-yellow-400 transition-colors">
            Код Региона (вручную)
          </label>
          <div className="relative">
            <input 
              type="text" 
              value={data.region}
              onChange={handleRegionChange}
              disabled={isGenerating}
              placeholder="777"
              className="w-full bg-white/[0.03] border border-white/10 text-white p-5 rounded-xl text-3xl font-black rp-font outline-none focus:border-yellow-400 focus:bg-white/[0.05] transition-all text-center tracking-widest"
              maxLength={3}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:opacity-100 transition-opacity">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
               </svg>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button 
          onClick={onGenerate}
          disabled={isGenerating}
          className={`
            rp-font relative h-full min-h-[84px] rounded-xl font-black text-black uppercase tracking-tighter transition-all text-xl overflow-hidden
            ${isGenerating 
              ? 'bg-zinc-800 text-white/20 cursor-not-allowed border border-white/5' 
              : 'majestic-bg hover:brightness-110 hover:shadow-[0_0_50px_rgba(250,204,21,0.4)] active:scale-95'}
          `}
        >
          <div className="relative z-10 flex items-center justify-center gap-4">
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                <span>В ОБРАБОТКЕ...</span>
              </>
            ) : (
              <span>ПОЛУЧИТЬ НОМЕР</span>
            )}
          </div>
          {!isGenerating && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:animate-[shimmer_2s_infinite] pointer-events-none"></div>
          )}
        </button>
      </div>

      <div className="mt-12 w-full flex justify-center opacity-20">
        <div className="flex gap-10 items-center">
          <div className="flex flex-col items-center">
            <span className="text-[8px] font-black uppercase">STATUS</span>
            <span className="text-[10px] rp-font">ONLINE</span>
          </div>
          <div className="w-2 h-2 rounded-full bg-white/20"></div>
          <div className="flex flex-col items-center">
            <span className="text-[8px] font-black uppercase">TYPE</span>
            <span className="text-[10px] rp-font">AUTO</span>
          </div>
          <div className="w-2 h-2 rounded-full bg-white/20"></div>
          <div className="flex flex-col items-center">
            <span className="text-[8px] font-black uppercase">DB</span>
            <span className="text-[10px] rp-font">SYNCED</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;
