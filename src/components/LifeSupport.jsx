import React from 'react';
import { Wind, Thermometer } from 'lucide-react';

export default function LifeSupport({ selectedCrew }) {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Wind className="w-5 h-5 text-cyan-400" />
            EMU LIFE SUPPORT & SUIT ENVIRONMENT
          </h3>
          <p className="text-xs text-slate-400">Extravehicular Mobility Unit Subsystem Status for {selectedCrew.name}</p>
        </div>
        <span className="text-xs font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 px-3 py-1 rounded-full">
          SUIT MODEL: xEMU-V3
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-300 font-bold">Primary Oxygen Reserve</span>
            <span className="text-cyan-400 font-bold">{selectedCrew.suit.o2Primary}%</span>
          </div>
          <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
            <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${selectedCrew.suit.o2Primary}%` }} />
          </div>
        </div>

        <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-300 font-bold">Secondary Emergency Oxygen</span>
            <span className="text-emerald-400 font-bold">{selectedCrew.suit.o2Secondary}%</span>
          </div>
          <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${selectedCrew.suit.o2Secondary}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
