import React from 'react';
import { User } from 'lucide-react';

export default function CrewRoster({ crewMembers, selectedAstronautId, setSelectedAstronautId }) {
  return (
    <section className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-md relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500" />
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase block mb-1">
            Active Telemetry Subject
          </span>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <User className="w-5 h-5 text-cyan-400" />
            ARES-V CREW ROSTER
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto">
          {crewMembers.map(crew => {
            const isSelected = crew.id === selectedAstronautId;
            const isEva = crew.status === 'ON EVA';
            return (
              <button
                key={crew.id}
                onClick={() => setSelectedAstronautId(crew.id)}
                className={`flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all ${
                  isSelected 
                    ? 'bg-cyan-950/40 border-cyan-500/80 shadow-lg ring-1 ring-cyan-500/50' 
                    : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="relative">
                  <img src={crew.avatar} alt={crew.name} className="w-10 h-10 rounded-lg object-cover border border-slate-700" />
                  <span className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-slate-900 ${
                    isEva ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'
                  }`} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold truncate text-slate-200">{crew.name}</p>
                  <p className="text-[10px] font-mono text-slate-400">{crew.role}</p>
                  <span className={`inline-block text-[9px] font-mono font-bold px-1.5 py-0.5 rounded mt-0.5 ${
                    isEva ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {crew.status}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}