
import React, { useState } from 'react';
import LicensePlate from './components/LicensePlate';
import Controls from './components/Controls';
import { PlateData } from './types';

const App: React.FC = () => {
  const [plateData, setPlateData] = useState<PlateData>({
    firstLetter: 'А',
    numbers: '777',
    secondLetter: 'М',
    thirdLetter: 'Р',
    region: '77'
  });

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

      {/* Footer Info */}
      <footer className="mt-8 text-slate-500 text-sm flex flex-col items-center gap-2">
        <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                High Fidelity
            </span>
            <span>•</span>
            <span>GOST 50577 Compliant Layout</span>
        </div>
        <p className="opacity-50">Experimental Visualization Tool</p>
      </footer>
    </div>
  );
};

export default App;
