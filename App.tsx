
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
  const [floatingElements, setFloatingElements] = useState<{id: number, char: string, left: string, delay: string}[]>([]);
  
  const shufflingRef = useRef<boolean[]>([false, false, false, false, false, false, false]);
  const finalDataRef = useRef<PlateData | null>(null);

  useEffect(() => {
    const elements = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      char: Math.random() > 0.5 ? VALID_CHARS[Math.floor(Math.random() * VALID_CHARS.length)] : Math.floor(Math.random() * 10).toString(),
      left: `${5 + Math.random() * 90}%`,
      delay: `${Math.random() * 15}s`
    }));
    setFloatingElements(elements);
  }, []);

  const getRandomChar = (country: Country) => {
    const chars = country === 'RU' ? VALID_CHARS : VALID_CHARS_BY;
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
    <div className="min-h-screen w-full flex flex-col bg-[#080808] relative select-none">
      {/* Background Layer */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {floatingElements.map(el => (
          <div key={el.id} className="floating-char text-7xl md:text-8xl opacity-0" style={{ left: el.left, bottom: '-10%', animationDelay: el.delay }}>
            {el.char}
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="w-full px-4 sm:px-10 py-5 md:py-8 flex items-center justify-between z-30 border-b border-white/5 bg-black/60 backdrop-blur-3xl sticky top-0">
        <div className="flex items-center gap-4 md:gap-8 max-w-[1440px] mx-auto w-full">
          <div className="flex items-center gap-4 flex-1">
            <div className="majestic-bg px-4 py-3 rounded-lg shadow-[0_0_30px_rgba(250,204,21,0.3)]">
               <span className="text-black font-black text-xl md:text-2xl rp-font">M</span>
            </div>
            <div>
               <h1 className="rp-font text-base md:text-2xl font-black uppercase tracking-tight leading-none">РЕГИСТРАЦИЯ <span className="majestic-yellow">TC</span></h1>
               <p className="text-white/20 text-[7px] md:text-[9px] uppercase font-black tracking-[0.4em] mt-1.5">ГОСУДАРСТВЕННЫЙ ПОРТАЛ</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 md:gap-10 shrink-0">
             <div className="flex items-center gap-3 md:gap-4">
                <div className="text-right hidden sm:block">
                  <span className="text-[8px] text-white/20 uppercase font-black tracking-widest">Сотрудник</span>
                  <p className="text-[10px] md:text-xs font-bold uppercase rp-font text-white/80">A. Majestic</p>
                </div>
                <div className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/5 border border-white/10 overflow-hidden p-0.5">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky" alt="avatar" className="w-full h-full rounded-full" />
                </div>
             </div>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-10 md:p-16 z-10 relative">
        <div className="w-full max-w-[1440px] flex flex-col items-center justify-center gap-12 md:gap-24">
          
          {/* Plate Stage */}
          <div className="relative w-full flex items-center justify-center min-h-[300px] md:min-h-[400px]">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[900px] h-[300px] bg-yellow-400/5 blur-[140px] opacity-40 pointer-events-none rounded-full"></div>
             <LicensePlate data={plateData} shufflingStates={shufflingStates} />
          </div>

          {/* Controls Stage */}
          <div className="w-full flex justify-center px-2">
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

      {/* Bottom Bar */}
      <footer className="w-full px-4 sm:px-10 py-5 bg-black/60 backdrop-blur-2xl border-t border-white/5 flex items-center justify-center z-30 sticky bottom-0">
        <div className="w-full max-w-[1440px] flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3 text-white/20 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em]">
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse shadow-[0_0_8px_#facc15]"></div>
            Шрифт активен
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => fileInputRef.current?.click()} 
              className="group flex items-center gap-3 px-4 md:px-6 py-2 rounded-xl bg-white/[0.03] border border-white/5 hover:border-yellow-400/30 hover:bg-white/[0.06] transition-all active:scale-95"
            >
              <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-white/30 group-hover:text-yellow-400/80 transition-colors">Загрузить .OTF</span>
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
