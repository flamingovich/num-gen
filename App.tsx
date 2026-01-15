
import React, { useState, useRef, useEffect } from 'react';
import LicensePlate from './components/LicensePlate.tsx';
import Controls from './components/Controls.tsx';
import { PlateData, VALID_CHARS, VALID_CHARS_BY, Country } from './types.ts';

const App: React.FC = () => {
  const [plateData, setPlateData] = useState<PlateData>({
    country: 'RU',
    firstLetter: 'А',
    numbers: '001',
    secondLetter: 'А',
    thirdLetter: 'А',
    region: '777'
  });

  const [shufflingStates, setShufflingStates] = useState<boolean[]>([false, false, false, false, false, false, false]);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const shufflingRef = useRef<boolean[]>([false, false, false, false, false, false, false]);
  const finalDataRef = useRef<PlateData | null>(null);

  const getRandomChar = (country: Country) => {
    let chars = VALID_CHARS;
    if (country === 'BY') chars = VALID_CHARS_BY;
    return chars[Math.floor(Math.random() * chars.length)];
  };
  
  const getRandomDigit = () => Math.floor(Math.random() * 10).toString();

  const handleGenerate = (isSpecial: boolean = false) => {
    if (isGenerating) return;
    setIsGenerating(true);

    const isRU = plateData.country === 'RU';
    const numDigits = isRU ? 3 : 4;
    const specialDigit = Math.floor(Math.random() * 9 + 1).toString();
    
    const finalNumbers = isSpecial 
      ? specialDigit.repeat(numDigits) 
      : Array(numDigits).fill(0).map(() => getRandomDigit()).join('');

    const final: PlateData = {
      country: plateData.country,
      firstLetter: getRandomChar(plateData.country),
      numbers: finalNumbers,
      secondLetter: getRandomChar(plateData.country),
      thirdLetter: getRandomChar(plateData.country),
      region: plateData.region
    };
    finalDataRef.current = final;

    const initialShuffling = Array(7).fill(true);
    shufflingRef.current = initialShuffling;
    setShufflingStates(initialShuffling);

    const shuffleInterval = setInterval(() => {
      setPlateData(prev => {
        const finalDigits = finalDataRef.current?.numbers.split('') || [];
        return {
          ...prev,
          firstLetter: shufflingRef.current[0] ? getRandomChar(prev.country) : finalDataRef.current!.firstLetter,
          numbers: finalDigits.map((d, i) => shufflingRef.current[i + 1] ? getRandomDigit() : d).join(''),
          secondLetter: shufflingRef.current[5] ? getRandomChar(prev.country) : finalDataRef.current!.secondLetter,
          thirdLetter: shufflingRef.current[6] ? getRandomChar(prev.country) : finalDataRef.current!.thirdLetter,
        };
      });
    }, 60);

    const lockSymbol = (index: number) => {
      if (index >= 7) {
        clearInterval(shuffleInterval);
        setIsGenerating(false);
        return;
      }
      
      const delay = index === 0 ? 350 : 180;
      setTimeout(() => {
        const nextShuffling = [...shufflingRef.current];
        nextShuffling[index] = false;
        shufflingRef.current = nextShuffling;
        setShufflingStates(nextShuffling);
        lockSymbol(index + 1);
      }, delay);
    };

    lockSymbol(0);
  };

  const handleCountryChange = (country: Country) => {
    setPlateData({
      country,
      firstLetter: country === 'RU' ? 'А' : '',
      numbers: country === 'RU' ? '001' : '0001',
      secondLetter: 'А',
      thirdLetter: 'А',
      region: country === 'RU' ? '777' : '7'
    });
  };

  return (
    <div className="min-h-screen w-full flex flex-col relative select-none">
      <header className="w-full px-4 sm:px-6 py-2 md:py-3 flex items-center justify-between z-30 border-b border-white/5 bg-black/30 backdrop-blur-2xl sticky top-0">
        <div className="flex items-center gap-4 md:gap-6 max-w-[1440px] mx-auto w-full">
          <div className="flex items-center gap-3 flex-1">
            <div className="majestic-bg px-2.5 py-1.5 rounded-md shadow-sm">
               <span className="text-black font-black text-sm md:text-base rp-font">M</span>
            </div>
            <div>
               <h1 className="rp-font text-xs md:text-lg font-black uppercase tracking-tight leading-none">РЕГИСТРАЦИЯ <span className="majestic-yellow">TC</span></h1>
               <p className="text-white/20 text-[5px] md:text-[7px] uppercase font-black tracking-[0.4em] mt-0.5">ГОСУДАРСТВЕННЫЙ ПОРТАЛ</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 md:gap-6 shrink-0">
             <div className="flex items-center gap-2">
                <div className="text-right hidden sm:block">
                  <span className="text-[6px] text-white/20 uppercase font-black tracking-widest leading-none">Сотрудник</span>
                  <p className="text-[8px] md:text-xs font-bold uppercase rp-font text-white/80">A. Majestic</p>
                </div>
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/10 border border-white/20 overflow-hidden p-0.5 shadow-xl">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky" alt="avatar" className="w-full h-full rounded-full" />
                </div>
             </div>
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center z-10 relative">
        <div className="w-full max-w-[1440px] flex flex-col items-center justify-center gap-10 md:gap-16">
          
          <div className="relative w-full flex items-center justify-center min-h-[300px] md:min-h-[400px]">
             {/* Усиленное свечение */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-[150px] bg-yellow-400/20 blur-[130px] opacity-50 pointer-events-none rounded-full"></div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-[150px] bg-blue-500/10 blur-[150px] opacity-30 pointer-events-none rounded-full translate-x-20"></div>
             <LicensePlate data={plateData} shufflingStates={shufflingStates} />
          </div>

          <div className="w-full flex justify-center px-4 mb-24">
            <Controls 
              data={plateData} 
              onChange={setPlateData} 
              onGenerate={handleGenerate}
              onCountryChange={handleCountryChange}
              isGenerating={isGenerating}
            />
          </div>
        </div>
      </main>

      <footer className="w-full px-4 sm:px-6 py-3 bg-black/30 backdrop-blur-2xl border-t border-white/5 flex items-center justify-center z-30 sticky bottom-0">
        <div className="w-full max-w-[1440px] flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3 text-white/20 text-[6px] md:text-[8px] font-black uppercase tracking-[0.2em]">
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse shadow-[0_0_8px_rgba(250,204,21,0.5)]"></div>
            ЦЕНТРАЛЬНАЯ СЕТЬ АКТИВНА
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => fileInputRef.current?.click()} 
              className="group flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-md bg-white/[0.03] border border-white/10 hover:border-yellow-400/40 hover:bg-white/[0.08] transition-all active:scale-95"
            >
              <span className="text-[6px] md:text-[7px] font-black uppercase tracking-widest text-white/40 group-hover:text-yellow-400 transition-colors">ОБНОВИТЬ ШРИФТ .OTF</span>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept=".otf" 
                onChange={async (e) => {
                   const file = e.target.files?.[0];
                   if (!file) return;
                   const arrayBuffer = await file.arrayBuffer();
                   const fontFace = new FontFace('roadnumberscyr_regular', arrayBuffer);
                   await fontFace.load(); document.fonts.add(fontFace);
                }} 
              />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
