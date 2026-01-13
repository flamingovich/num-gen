
import React, { useState, useRef, useEffect } from 'react';
import LicensePlate from './components/LicensePlate.tsx';
import Controls from './components/Controls.tsx';
import { PlateData, VALID_CHARS } from './types.ts';

const App: React.FC = () => {
  const [plateData, setPlateData] = useState<PlateData>({
    firstLetter: 'А',
    numbers: '001',
    secondLetter: 'А',
    thirdLetter: 'А',
    region: '777'
  });

  const [shufflingStates, setShufflingStates] = useState<boolean[]>([false, false, false, false, false, false]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isFontCustom, setIsFontCustom] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [floatingElements, setFloatingElements] = useState<{id: number, char: string, left: string, delay: string}[]>([]);
  
  const shufflingRef = useRef<boolean[]>([false, false, false, false, false, false]);
  const finalDataRef = useRef<PlateData | null>(null);

  // Initialize floating background elements
  useEffect(() => {
    const elements = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      char: Math.random() > 0.5 ? VALID_CHARS[Math.floor(Math.random() * VALID_CHARS.length)] : Math.floor(Math.random() * 10).toString(),
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 12}s`
    }));
    setFloatingElements(elements);
  }, []);

  const getRandomChar = () => VALID_CHARS[Math.floor(Math.random() * VALID_CHARS.length)];
  const getRandomDigit = () => Math.floor(Math.random() * 10).toString();

  const handleGenerate = () => {
    if (isGenerating) return;
    setIsGenerating(true);

    const final = {
      firstLetter: getRandomChar(),
      numbers: Array(3).fill(0).map(() => getRandomDigit()).join(''),
      secondLetter: getRandomChar(),
      thirdLetter: getRandomChar(),
      region: plateData.region || '777'
    };
    finalDataRef.current = final;

    const initialShuffling = [true, true, true, true, true, true];
    shufflingRef.current = initialShuffling;
    setShufflingStates(initialShuffling);

    // Faster interval for smoother animation (30ms = ~33fps)
    const shuffleInterval = setInterval(() => {
      setPlateData(prev => {
        const finalDigits = finalDataRef.current?.numbers.split('') || ['0', '0', '0'];
        return {
          ...prev,
          firstLetter: shufflingRef.current[0] ? getRandomChar() : finalDataRef.current!.firstLetter,
          numbers: [
            shufflingRef.current[1] ? getRandomDigit() : finalDigits[0],
            shufflingRef.current[2] ? getRandomDigit() : finalDigits[1],
            shufflingRef.current[3] ? getRandomDigit() : finalDigits[2],
          ].join(''),
          secondLetter: shufflingRef.current[4] ? getRandomChar() : finalDataRef.current!.secondLetter,
          thirdLetter: shufflingRef.current[5] ? getRandomChar() : finalDataRef.current!.thirdLetter,
        };
      });
    }, 35);

    // Optimized locking sequence: Faster overall but smooth one-by-one locking
    const lockSymbol = (index: number) => {
      if (index >= 6) {
        clearInterval(shuffleInterval);
        setIsGenerating(false);
        return;
      }

      // First symbol spins for 700ms, then each next one takes 300ms more.
      // Total time approx: 0.7 + 0.3*5 = 2.2 seconds (vs ~4s before)
      const delay = index === 0 ? 700 : 300;

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

  const handleFontUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const arrayBuffer = await file.arrayBuffer();
      const fontFace = new FontFace('roadnumberscyr_regular', arrayBuffer);
      await fontFace.load();
      document.fonts.add(fontFace);
      setIsFontCustom(true);
    } catch (err) {
      console.error('Failed to load font:', err);
      alert('Ошибка при загрузке шрифта.');
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#080808] relative overflow-hidden">
      {/* Background Floating Elements */}
      {floatingElements.map(el => (
        <div 
          key={el.id} 
          className="floating-char text-6xl opacity-10"
          style={{ left: el.left, bottom: '-20%', animationDelay: el.delay }}
        >
          {el.char}
        </div>
      ))}

      {/* Decorative Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-yellow-500/5 rounded-full blur-[180px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Top Bar Navigation (GTA Style) */}
      <header className="w-full px-12 py-8 flex items-center justify-between z-20 border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="flex items-center gap-8">
          <div className="majestic-bg px-5 py-3 rounded shadow-[0_0_25px_rgba(250,204,21,0.3)]">
             <span className="text-black font-black text-2xl rp-font">M</span>
          </div>
          <div>
             <h1 className="rp-font text-2xl font-extrabold uppercase tracking-tight leading-none">
                РЕГИСТРАЦИЯ <span className="majestic-yellow">TC</span>
             </h1>
             <p className="text-white/20 text-[9px] uppercase font-black tracking-[0.4em] mt-1.5">ГОСУДАРСТВЕННЫЙ ПОРТАЛ УСЛУГ</p>
          </div>
        </div>

        <div className="flex items-center gap-10">
           <div className="hidden lg:flex items-center gap-3 border-r border-white/10 pr-10">
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 shadow-[0_0_10px_#facc15]"></div>
              <div className="flex flex-col">
                <span className="text-[9px] text-white/30 uppercase font-black">Терминал</span>
                <span className="text-xs font-bold uppercase rp-font">LSPD-HQ-04</span>
              </div>
           </div>
           <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-[9px] text-white/30 uppercase font-black">Сотрудник</span>
                <p className="text-xs font-bold uppercase rp-font">A. Majestic</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 overflow-hidden ring-2 ring-white/5">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky" alt="avatar" />
              </div>
           </div>
        </div>
      </header>

      {/* Main Experience */}
      <main className="flex-grow flex flex-col items-center justify-center p-6 gap-20 z-10">
        
        {/* The License Plate */}
        <div className="relative group perspective-1000">
           <div className="absolute inset-0 bg-yellow-400/5 blur-[100px] opacity-40"></div>
           <div className="relative z-10 transition-all duration-500 group-hover:scale-[1.02]">
              <LicensePlate data={plateData} shufflingStates={shufflingStates} />
           </div>
        </div>

        {/* Simplified Controls */}
        <div className="w-full max-w-4xl px-4">
          <Controls 
            data={plateData} 
            onChange={setPlateData} 
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
          />
        </div>
      </main>

      {/* Global Status Bar */}
      <footer className="w-full px-12 py-6 bg-black/80 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 z-20">
        <div className="flex items-center gap-12 text-white/40">
           <div className="flex flex-col">
              <span className="text-[8px] uppercase font-black tracking-widest mb-1">Версия протокола</span>
              <span className="text-[10px] font-mono tracking-widest">MJ-V4.9-STABLE</span>
           </div>
           <div className="flex flex-col border-l border-white/10 pl-12">
              <span className="text-[8px] uppercase font-black tracking-widest mb-1">Местоположение</span>
              <span className="text-[10px] font-bold uppercase rp-font">Los Santos, Mission Row</span>
           </div>
        </div>

        <div className="flex items-center gap-6">
            <input type="file" ref={fileInputRef} className="hidden" accept=".otf" onChange={handleFontUpload} />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-4 px-6 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
            >
              <div className={`w-2 h-2 rounded-full ${isFontCustom ? 'bg-yellow-400 shadow-[0_0_10px_#facc15]' : 'bg-white/20'}`}></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">
                {isFontCustom ? 'Шрифт активен' : 'Загрузить .OTF'}
              </span>
            </button>
        </div>
      </footer>
    </div>
  );
};

export default App;
