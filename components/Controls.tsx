
import React from 'react';
import { PlateData, VALID_CHARS } from '../types';

interface ControlsProps {
  data: PlateData;
  onChange: (newData: PlateData) => void;
}

const Controls: React.FC<ControlsProps> = ({ data, onChange }) => {
  const updateField = (field: keyof PlateData, value: string) => {
    let sanitized = value.toUpperCase();
    
    // Validate based on field type
    if (field === 'numbers' || field === 'region') {
      sanitized = sanitized.replace(/[^0-9]/g, '');
    } else {
      sanitized = sanitized.replace(/[^АВЕКМНОРСТУХ]/g, '');
    }

    // Limit lengths
    if (field === 'firstLetter' || field === 'secondLetter' || field === 'thirdLetter') sanitized = sanitized.slice(0, 1);
    if (field === 'numbers') sanitized = sanitized.slice(0, 3);
    if (field === 'region') sanitized = sanitized.slice(0, 3);

    onChange({ ...data, [field]: sanitized });
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-md p-6 rounded-2xl border border-slate-700 w-full max-w-lg">
      <h2 className="text-slate-100 text-lg font-bold mb-4 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
        Edit License Plate
      </h2>

      <div className="grid grid-cols-5 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-slate-400 text-xs font-medium uppercase px-1">Ser.</label>
          <input 
            type="text" 
            value={data.firstLetter}
            onChange={(e) => updateField('firstLetter', e.target.value)}
            className="bg-slate-900 text-white border border-slate-600 rounded-lg p-2 text-center text-xl font-bold focus:border-blue-500 outline-none transition-all"
            maxLength={1}
            placeholder="A"
          />
        </div>
        <div className="flex flex-col gap-1 col-span-2">
          <label className="text-slate-400 text-xs font-medium uppercase px-1">Numbers</label>
          <input 
            type="text" 
            value={data.numbers}
            onChange={(e) => updateField('numbers', e.target.value)}
            className="bg-slate-900 text-white border border-slate-600 rounded-lg p-2 text-center text-xl font-bold focus:border-blue-500 outline-none transition-all"
            maxLength={3}
            placeholder="000"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-slate-400 text-xs font-medium uppercase px-1">Ser.</label>
          <input 
            type="text" 
            value={data.secondLetter}
            onChange={(e) => updateField('secondLetter', e.target.value)}
            className="bg-slate-900 text-white border border-slate-600 rounded-lg p-2 text-center text-xl font-bold focus:border-blue-500 outline-none transition-all"
            maxLength={1}
            placeholder="A"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-slate-400 text-xs font-medium uppercase px-1">Ser.</label>
          <input 
            type="text" 
            value={data.thirdLetter}
            onChange={(e) => updateField('thirdLetter', e.target.value)}
            className="bg-slate-900 text-white border border-slate-600 rounded-lg p-2 text-center text-xl font-bold focus:border-blue-500 outline-none transition-all"
            maxLength={1}
            placeholder="A"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-1">
        <label className="text-slate-400 text-xs font-medium uppercase px-1">Region Code</label>
        <input 
          type="text" 
          value={data.region}
          onChange={(e) => updateField('region', e.target.value)}
          className="bg-slate-900 text-white border border-slate-600 rounded-lg p-2 text-center text-2xl font-black tracking-widest focus:border-blue-500 outline-none transition-all"
          maxLength={3}
          placeholder="77"
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <span className="text-slate-500 text-[10px] uppercase w-full mb-1">Allowed Letters:</span>
        {VALID_CHARS.map(char => (
          <div key={char} className="text-slate-400 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs font-mono">
            {char}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Controls;
