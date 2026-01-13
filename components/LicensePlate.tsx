
import React from 'react';
import { PlateData } from '../types.ts';

interface LicensePlateProps {
  data: PlateData;
}

const LicensePlate: React.FC<LicensePlateProps> = ({ data }) => {
  return (
    <div className="relative flex items-center justify-center p-12 bg-slate-900 rounded-[40px] shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/5">
      {/* The Plate Container */}
      <div 
        className="relative bg-white border-[6px] border-black rounded-[14px] flex items-center shadow-2xl overflow-hidden"
        style={{ 
          width: '520px', 
          height: '112px',
          boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1), 0 30px 60px -12px rgba(0,0,0,0.8)'
        }}
      >
        {/* Main Section: A 777 MP */}
        <div className="flex-grow flex items-center justify-center h-full px-2">
          <div className="flex items-center gap-0 translate-y-[2px]">
            {/* First Letter */}
            <span className="text-black text-[72px] leading-none gost-font select-none uppercase embossed-text mr-3">
              {data.firstLetter}
            </span>
            
            {/* Numbers */}
            <span className="text-black text-[108px] leading-none gost-font tracking-tight select-none embossed-text">
              {data.numbers}
            </span>
            
            {/* Second & Third Letters */}
            <div className="flex gap-2 items-center ml-3">
              <span className="text-black text-[72px] leading-none gost-font select-none uppercase embossed-text">
                {data.secondLetter}
              </span>
              <span className="text-black text-[72px] leading-none gost-font select-none uppercase embossed-text">
                {data.thirdLetter}
              </span>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="w-[3px] bg-black h-full shrink-0" />

        {/* Region Section */}
        <div className="w-[125px] flex flex-col items-center justify-center h-full shrink-0 bg-white">
          <div className="flex flex-col items-center justify-center h-full w-full">
             {/* Region Numbers */}
            <div className="flex-grow flex items-center justify-center pt-2">
              <span className="text-black text-[76px] leading-none gost-font tracking-tighter select-none embossed-text">
                {data.region}
              </span>
            </div>
            
            {/* Bottom Info: RUS + Flag */}
            <div className="flex items-center justify-center w-full gap-2 pb-3 pr-2">
              <span className="text-black text-[15px] font-bold leading-none select-none tracking-wider font-sans">
                RUS
              </span>
              
              {/* Russian Flag */}
              <div className="flex flex-col border-[1.5px] border-black/80 w-[30px] h-[17px] shrink-0 overflow-hidden rounded-[1px]">
                <div className="h-[33.3%] bg-white"></div>
                <div className="h-[33.3%] bg-[#0033A0]"></div>
                <div className="h-[33.4%] bg-[#DA291C]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Realistic metal surface effects */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/25 via-transparent to-black/5 opacity-40" />
        
        {/* Subtle reflective pinstripe pattern */}
        <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />
      </div>
    </div>
  );
};

export default LicensePlate;
