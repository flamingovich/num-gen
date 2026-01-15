
import React, { useEffect, useState, useRef } from 'react';
import { PlateData } from '../types.ts';

interface LicensePlateProps {
  data: PlateData;
  shufflingStates: boolean[];
}

const LicensePlate: React.FC<LicensePlateProps> = ({ data, shufflingStates }) => {
  const isRU = data.country === 'RU';
  const isBY = data.country === 'BY';
  const digits = data.numbers.split('');
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const parentWidth = containerRef.current.parentElement?.clientWidth || window.innerWidth;
        const parentHeight = window.innerHeight;
        
        const targetWidth = 820 + 20; 
        const minGapHeight = 400;
        
        let newScale = 0.65; 
        
        if (parentWidth < targetWidth) {
          newScale = (parentWidth / targetWidth) * 0.65;
        }
        
        if (parentHeight < minGapHeight) {
          const heightScale = (parentHeight / minGapHeight) * 0.65;
          newScale = Math.min(newScale, heightScale);
        }

        setScale(Math.max(newScale, 0.2));
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className="relative flex items-center justify-center transition-all duration-700 ease-out will-change-transform"
      style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}
    >
      <div className="p-3 bg-[#0d0d0d] rounded-[24px] border border-white/5 shadow-[0_50px_120px_rgba(0,0,0,0.95)]">
        <div 
          className="relative plate-gradient border-[5px] border-black/95 rounded-[12px] flex items-center shadow-2xl overflow-hidden select-none"
          style={{ width: '820px', height: '180px' }}
        >
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-30 z-0" />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/5 via-transparent to-black/10 opacity-20 z-0" />

          {isRU && (
            <div className="relative z-10 w-full h-full flex items-center">
              <div className="flex-grow flex items-center justify-center h-full px-6">
                {/* Смещено еще ниже: с translate-y-[-5px] на translate-y-[15px] */}
                <div className="flex items-baseline translate-y-[15px]">
                  <span className={`text-black text-[160px] leading-none gost-font mr-2 ${shufflingStates[0] ? 'animate-shuffling' : ''}`}>
                    {data.firstLetter}
                  </span>
                  <div className="flex items-baseline">
                    {digits.map((digit, idx) => (
                      <span key={idx} className={`text-black text-[205px] leading-none gost-font ${shufflingStates[idx + 1] ? 'animate-shuffling' : ''}`}>
                        {digit}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-baseline ml-2">
                    <span className={`text-black text-[160px] leading-none gost-font mr-1 ${shufflingStates[5] ? 'animate-shuffling' : ''}`}>
                      {data.secondLetter}
                    </span>
                    <span className={`text-black text-[160px] leading-none gost-font ${shufflingStates[6] ? 'animate-shuffling' : ''}`}>
                      {data.thirdLetter}
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-[4px] bg-black/95 h-full shrink-0" />
              <div className="w-[170px] flex flex-col items-center justify-center h-full bg-transparent">
                {/* Смещено еще ниже: с translate-y-[5px] на translate-y-[15px] */}
                <div className="flex-grow flex items-center justify-center pt-2 translate-y-[15px]">
                  <span className="text-black text-[105px] leading-none gost-font tracking-tighter">{data.region}</span>
                </div>
                <div className="flex items-center gap-2 pb-6 pr-2">
                  <span className="text-black text-[24px] font-bold tracking-widest font-sans">RUS</span>
                  <div className="flex flex-col border border-black/80 w-[45px] h-[28px] overflow-hidden rounded-sm shadow-sm bg-white">
                    <div className="h-1/3 bg-white"></div>
                    <div className="h-1/3 bg-[#0033A0]"></div>
                    <div className="h-1/3 bg-[#DA291C]"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isBY && (
            <div className="relative z-10 w-full h-full flex items-center pl-8 pr-4">
              <div className="flex flex-col items-center justify-center h-full w-[110px] border-r border-black/15 mr-4 py-4 shrink-0">
                 <div className="relative w-24 h-14 rounded-sm overflow-hidden border border-black/10 mb-1 shadow-sm">
                    <div className="absolute top-0 w-full h-[60%] bg-[#DA291C]"></div>
                    <div className="absolute bottom-0 w-full h-[40%] bg-[#009639]"></div>
                    <div className="absolute left-0 w-[15%] h-full bg-white flex items-center justify-center">
                       <div className="w-full h-full bg-[#DA291C] opacity-20" style={{backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, #DA291C 1px, #DA291C 2px)'}}></div>
                    </div>
                 </div>
                 <span className="text-black font-black text-6xl font-sans tracking-tight leading-none">BY</span>
              </div>
              <div className="flex-grow flex items-center justify-center h-full whitespace-nowrap overflow-visible">
                {/* Смещено еще ниже: с translate-y-[-2px] на translate-y-[18px] */}
                <div className="flex items-baseline translate-y-[18px] translate-x-[-25px]">
                  {digits.map((digit, idx) => (
                    <span key={idx} className={`text-black text-[190px] leading-none gost-font ${shufflingStates[idx + 1] ? 'animate-shuffling' : ''}`}>
                      {digit}
                    </span>
                  ))}
                  <div className="flex items-baseline ml-2">
                    <span className={`text-black text-[220px] durability-none gost-font ${shufflingStates[5] ? 'animate-shuffling' : ''}`}>{data.secondLetter}</span>
                    <span className={`text-black text-[220px] durability-none gost-font ${shufflingStates[6] ? 'animate-shuffling' : ''}`}>{data.thirdLetter}</span>
                  </div>
                  <span className="text-black text-[110px] font-bold font-sans mx-1 translate-y-[-10px] leading-none">-</span>
                  <span className="text-black text-[190px] leading-none gost-font">{data.region}</span>
                </div>
              </div>
            </div>
          )}
          
          <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-zinc-200 to-zinc-500 border border-black/30 shadow-sm opacity-40 z-20" />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-zinc-200 to-zinc-500 border border-black/30 shadow-sm opacity-40 z-20" />
        </div>
      </div>
    </div>
  );
};

export default LicensePlate;
