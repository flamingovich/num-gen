
import React, { useState, useRef } from 'react';
import LicensePlate from './components/LicensePlate.tsx';
import Controls from './components/Controls.tsx';
import { PlateData } from './types.ts';

const App: React.FC = () => {
  const [plateData, setPlateData] = useState<PlateData>({
    firstLetter: 'А',
    numbers: '777',
    secondLetter: 'М',
    thirdLetter: 'Р',
    region: '77'
  });

  const [isFontCustom, setIsFontCustom] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFontUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const arrayBuffer = await file.arrayBuffer();
      // Use FontFace API to register the font globally
      const fontFace = new FontFace('roadnumberscyr_regular', arrayBuffer);
      await fontFace.load();
      document.fonts.add(fontFace);
      
      setIsFontCustom(true);
      console.log('Font loaded successfully:', fontFace.family);
      
      // Force a slight re-render if necessary, though document.fonts.add should be reactive for CSS
      setPlateData(prev => ({...prev}));
    } catch (err) {
      console.error('Failed to load font:', err);
      alert('Ошибка при загрузке шрифта. Убедитесь, что это валидный OTF файл.');
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 gap-12 bg-slate-950 overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Header */}
      <div className="text-center z-10">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
          ГОС<span className="text-blue-500">НОМЕР</span> РФ
        </h1>
        <p className="text-slate-400 font-medium">Russian Vehicle License Plate Visualizer</p>
      </div>

      {/* Plate Showcase */}
      <div className="z-10 w-full flex items-center justify-center">
        <LicensePlate data={plateData} />
      </div>

      {/* Controls */}
      <div className="z-10 w-full max-w-lg">
        <Controls data={plateData} onChange={setPlateData} />
      </div>

      {/* Footer Info & Hidden Font Loader */}
      <footer className="mt-8 text-slate-500 text-sm flex flex-col items-center gap-4 z-10">
        <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                High Fidelity
            </span>
            <span>•</span>
            <span>GOST 50577 Compliant Layout</span>
        </div>
        
        <div className="flex flex-col items-center gap-2 opacity-30 hover:opacity-100 transition-opacity duration-500">
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept=".otf" 
              onChange={handleFontUpload}
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-[10px] uppercase tracking-widest hover:bg-slate-700 transition-colors"
            >
              <div className={`w-1.5 h-1.5 rounded-full ${isFontCustom ? 'bg-green-500 shadow-[0_0_5px_#22c55e]' : 'bg-slate-500'}`}></div>
              {isFontCustom ? 'Custom Font Active' : 'Load Custom Font (.OTF)'}
            </button>
            <p className="text-[10px] uppercase tracking-tighter">Experimental Visualization Tool</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
