
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
  const [isFontCustom, setIsFontCustom] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [floatingElements, setFloatingElements] = useState<{id: number, char: string, left: string, delay: string}[]>([]);
  
  const shufflingRef = useRef<boolean[]>([false, false, false, false, false, false, false]);
  const finalDataRef = useRef<PlateData | null>(null);

  useEffect(() => {
    const elements = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      char: Math.random() > 0.5 ? VALID_CHARS[Math.floor(Math.random() * VALID_CHARS.length)] : Math.floor(Math.random() * 10).toString(),
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 12}s`
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

    // Индексы: 0-первая буква (RU), 1-4 цифры, 5-6 буквы
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
    }, 70);

    const lockSymbol = (index: number) => {
      if (index >= 7) {
        clearInterval(shuffleInterval);
        setIsGenerating(false);
        return;
      }
      
      const delay = index === 0 ? 400 : 200;
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
    <div className="min-h-screen w-full flex flex-col bg-[#080808] relative overflow-hidden">
      {floatingElements.map(el => (
        <div key={el.id} className="floating-char text-6xl opacity-10" style={{ left: el.left, bottom: '-20%', animationDelay: el.delay }}>
          {el.char}
        </div>
      ))}

      <header className="w-full px-12 py-8 flex items-center justify-between z-20 border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="flex items-center gap-8">
          <div className="majestic-bg px-5 py-3 rounded shadow-[0_0_25px_#facc1544]">
             <span className="text-black font-black text-2xl rp-font">M</span>
          </div>
          <div>
             <h1 className="rp-font text-2xl font-extrabold uppercase tracking-tight">РЕГИСТРАЦИЯ <span className="majestic-yellow">TC</span></h1>
             <p className="text-white/20 text-[9px] uppercase font-black tracking-[0.4em] mt-1">ГОСУДАРСТВЕННЫЙ ПОРТАЛ</p>
          </div>
        </div>
        <div className="flex items-center gap-10">
           <div className="flex items-center gap-4">
              <div className="text-right"><span className="text-[9px] text-white/30 uppercase font-black">Сотрудник</span><p className="text-xs font-bold uppercase rp-font">A. Majestic</p></div>
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 overflow-hidden ring-2 ring-white/5">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky" alt="avatar" />
              </div>
           </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-6 gap-16 z-10">
        <div className="relative group">
           <div className="absolute inset-0 bg-yellow-400/5 blur-[100px] opacity-40"></div>
           <LicensePlate data={plateData} shufflingStates={shufflingStates} />
        </div>

        <div className="w-full max-w-4xl">
          <Controls 
            data={plateData} 
            onChange={setPlateData} 
            onGenerate={handleGenerate}
            onCountryChange={handleCountryChange}
            isGenerating={isGenerating}
          />
        </div>
      </main>

      <footer className="w-full px-12 py-6 bg-black/80 border-t border-white/5 flex items-center justify-end z-20">
        <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-4 px-6 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
          <div className={`w-2 h-2 rounded-full ${isFontCustom ? 'bg-yellow-400' : 'bg-white/20'}`}></div>
          <span className="text-[10px] font-black uppercase tracking-widest text-white/50">{isFontCustom ? 'Шрифт активен' : 'Загрузить .OTF'}</span>
          <input type="file" ref={fileInputRef} className="hidden" accept=".otf" onChange={async (e) => {
             const file = e.target.files?.[0];
             if (!file) return;
             const arrayBuffer = await file.arrayBuffer();
             const fontFace = new FontFace('roadnumberscyr_regular', arrayBuffer);
             await fontFace.load(); document.fonts.add(fontFace); setIsFontCustom(true);
          }} />
        </button>
      </footer>
    </div>
  );
};

export default App;
