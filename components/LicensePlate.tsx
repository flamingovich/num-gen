
import React from 'react';
import { PlateData } from '../types.ts';

interface LicensePlateProps {
  data: PlateData;
  // Index mapping: 0=firstLetter, 1=digit1, 2=digit2, 3=digit3, 4=secondLetter, 5=thirdLetter
  shufflingStates: boolean[];
}

const LicensePlate: React.FC<LicensePlateProps> = ({ data, shufflingStates }) => {
  const digits = data.numbers.split('');
  
  return (
    <div className="relative flex items-center justify-center p-8 bg-slate-900 rounded-[40px] shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/5">
      {/* The Plate Container */}
      <div 
        className="relative bg-[#FDFDFD] border-[5px] border-black rounded-[12px] flex items-center shadow-2xl overflow-hidden"
        style={{ 
          width: '520px', 
          height: '112px',
          boxShadow: 'inset 0 0 8px rgba(0,0,0,0.2), 0 30px 60px -12px rgba(0,0,0,0.9)'
        }}
      >
        {/* Main Section: A 777 MP */}
        <div className="flex-grow flex items-center justify-center h-full">
          <div className="flex items-center justify-center translate-y-[10px]">
            {/* First Letter (Index 0) */}
            <span className={`text-black text-[108px] leading-none gost-font select-none uppercase mr-1 inline-block
              ${shufflingStates[0] ? 'animate-shuffling' : 'animate-pop'}`}>
              {data.firstLetter}
            </span>
            
            {/* Numbers (Indices 1, 2, 3) */}
            <div className="flex items-center">
              {digits.map((digit, idx) => (
                <span 
                  key={`digit-${idx}`}
                  className={`text-black text-[126px] leading-none gost-font tracking-normal select-none inline-block
                  ${shufflingStates[idx + 1] ? 'animate-shuffling' : 'animate-pop'}`}
                >
                  {digit}
                </span>
              ))}
            </div>
            
            {/* Second & Third Letters (Indices 4, 5) */}
            <div className="flex gap-1 items-center ml-1">
              <span className={`text-black text-[108px] leading-none gost-font select-none uppercase inline-block
                ${shufflingStates[4] ? 'animate-shuffling' : 'animate-pop'}`}>
                {data.secondLetter}
              </span>
              <span className={`text-black text-[108px] leading-none gost-font select-none uppercase inline-block
                ${shufflingStates[5] ? 'animate-shuffling' : 'animate-pop'}`}>
                {data.thirdLetter}
              </span>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="w-[3px] bg-black h-full shrink-0" />

        {/* Region Section */}
        <div className="w-[125px] flex flex-col items-center justify-center h-full shrink-0 bg-[#FDFDFD]">
          <div className="flex flex-col items-center justify-center h-full w-full">
            <div className="flex-grow flex items-center justify-center pt-5">
              <span className="text-black text-[84px] leading-none gost-font tracking-tighter select-none">
                {data.region}
              </span>
            </div>
            
            <div className="flex items-center justify-center w-full gap-2 pb-8 pr-2 translate-y-[-6px]">
              <span className="text-black text-[15px] font-bold leading-none select-none tracking-widest font-sans">
                RUS
              </span>
              <div className="flex flex-col border-[1.2px] border-black/80 w-[30px] h-[18px] shrink-0 overflow-hidden rounded-[1px]">
                <div className="h-[33.3%] bg-white"></div>
                <div className="h-[33.3%] bg-[#0033A0]"></div>
                <div className="h-[33.4%] bg-[#DA291C]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Surface realism overlays */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/40 via-transparent to-black/5 opacity-30" />
        <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />
        <div className="absolute inset-0 pointer-events-none border-[1px] border-black/10 rounded-[8px]" />
      </div>
    </div>
  );
};

export default LicensePlate;
