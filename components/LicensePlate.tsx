
import React, { useEffect, useState, useRef } from 'react';
import { PlateData } from '../types.ts';

interface LicensePlateProps {
  data: PlateData;
  shufflingStates: boolean[];
}

const LicensePlate: React.FC<LicensePlateProps> = ({ data, shufflingStates }) => {
  const isRU = data.country === 'RU';
  const digits = data.numbers.split('');
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const parentWidth = containerRef.current.parentElement?.clientWidth || window.innerWidth;
        const parentHeight = window.innerHeight;
        
        const targetWidth = 820 + 80; // Номер + отступы
        const minGapHeight = 600; // Минимальная высота, где номер может быть 1:1
        
        let newScale = 1;
        
        // Масштабирование по ширине
        if (parentWidth < targetWidth) {
          newScale = parentWidth / targetWidth;
        }
        
        // Масштабирование по высоте (если экран слишком "приплюснут")
        if (parentHeight < minGapHeight) {
          const heightScale = parentHeight / minGapHeight;
          newScale = Math.min(newScale, heightScale);
        }

        setScale(Math.max(newScale, 0.4)); // Ограничиваем минимальный масштаб
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    setTimeout(handleResize, 100); // Доп. проверка после рендера
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className="relative flex items-center justify-center transition-all duration-500 ease-out will-change-transform"
      style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}
    >
      <div className="p-8 sm:p-12 bg-zinc-900/40 rounded-[40px] sm:rounded-[60px] border border-white/5 shadow-[0_0_120px_rgba(0,0,0,0.6)]">
        <div 
          className="relative bg-[#FDFDFD] border-[4px] border-black/95 rounded-[12px] flex items-center shadow-2xl overflow-hidden select-none"
          style={{ width: '820px', height: '180px' }}
        >
          {isRU ? (
            <>
              <div className="flex-grow flex items-center justify-center h-full translate-y-[18px]">
                <span className={`text-black text-[165px] leading-none gost-font mr-1 ${shufflingStates[0] ? 'animate-shuffling' : ''}`}>
                  {data.firstLetter}
                </span>
                <div className="flex">
                  {digits.map((digit, idx) => (
                    <span key={idx} className={`text-black text-[195px] leading-none gost-font ${shufflingStates[idx + 1] ? 'animate-shuffling' : ''}`}>
                      {digit}
                    </span>
                  ))}
                </div>
                <div className="flex gap-1 ml-1">
                  <span className={`text-black text-[165px] leading-none gost-font ${shufflingStates[5] ? 'animate-shuffling' : ''}`}>{data.secondLetter}</span>
                  <span className={`text-black text-[165px] leading-none gost-font ${shufflingStates[6] ? 'animate-shuffling' : ''}`}>{data.thirdLetter}</span>
                </div>
              </div>
              <div className="w-[4px] bg-black/90 h-full shrink-0" />
              <div className="w-[160px] flex flex-col items-center justify-center h-full bg-[#FDFDFD]">
                <div className="flex-grow flex items-center justify-center pt-8">
                  <span className="text-black text-[95px] leading-none gost-font tracking-tighter">{data.region}</span>
                </div>
                <div className="flex items-center gap-2 pb-10 pr-2 translate-y-[-4px]">
                  <span className="text-black text-[22px] font-bold tracking-widest font-sans">RUS</span>
                  <div className="flex flex-col border border-black/80 w-[42px] h-[26px] overflow-hidden rounded-sm shadow-sm">
                    <div className="h-1/3 bg-white"></div>
                    <div className="h-1/3 bg-[#0033A0]"></div>
                    <div className="h-1/3 bg-[#DA291C]"></div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center px-8 relative">
              <div className="flex flex-col items-center justify-center h-full w-[100px] border-r border-black/10 mr-8 py-4 shrink-0">
                 <div className="relative w-20 h-12 rounded-sm overflow-hidden border border-black/10 mb-1">
                    <div className="absolute top-0 w-full h-[60%] bg-[#DA291C]"></div>
                    <div className="absolute bottom-0 w-full h-[40%] bg-[#009639]"></div>
                    <div className="absolute left-0 w-[15%] h-full bg-white flex items-center justify-center">
                       <div className="w-full h-full bg-[#DA291C] opacity-20" style={{backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, #DA291C 1px, #DA291C 2px)'}}></div>
                    </div>
                 </div>
                 <span className="text-black font-black text-5xl font-sans tracking-tight leading-none">BY</span>
              </div>
              <div className="flex-grow flex items-center justify-center h-full whitespace-nowrap">
                <div className="flex items-center translate-y-[15px]">
                  {digits.map((digit, idx) => (
                    <span key={idx} className={`text-black text-[170px] leading-none gost-font ${shufflingStates[idx + 1] ? 'animate-shuffling' : ''}`}>
                      {digit}
                    </span>
                  ))}
                </div>
                <div className="flex items-center ml-4 translate-y-[5px]">
                  <span className={`text-black text-[210px] leading-none gost-font ${shufflingStates[5] ? 'animate-shuffling' : ''}`}>{data.secondLetter}</span>
                  <span className={`text-black text-[210px] leading-none gost-font ${shufflingStates[6] ? 'animate-shuffling' : ''}`}>{data.thirdLetter}</span>
                </div>
                <div className="flex items-center translate-y-[-10px] mx-2">
                   <span className="text-black text-[110px] font-bold font-sans select-none leading-none">-</span>
                </div>
                <div className="flex items-center translate-y-[15px]">
                   <span className="text-black text-[170px] leading-none gost-font">{data.region}</span>
                </div>
              </div>
            </div>
          )}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/30 via-transparent to-black/10 opacity-20" />
        </div>
      </div>
    </div>
  );
};

export default LicensePlate;
