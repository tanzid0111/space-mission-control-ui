'use client';

import React, { useState, useEffect } from 'react';
import { Radio, Wifi, Terminal, ShieldAlert, Volume2, VolumeX } from 'lucide-react';

export default function Footer({ isAudioMuted, setIsAudioMuted, missionTime }) {
  const [ping, setPing] = useState(124);

  useEffect(() => {
    const pingInterval = setInterval(() => {
      setPing(120 + Math.floor(Math.random() * 10));
    }, 2000);
    return () => clearInterval(pingInterval);
  }, []);

  const formatTwoDigits = (num) => String(num || 0).padStart(2, '0');
  
  
  const { days = 342, hours = 8, minutes = 36, seconds = 14 } = missionTime || {};

  return (
    <footer className="mt-12 border-t border-slate-800/80 bg-[#060b18]/95 backdrop-blur-md px-6 py-8 text-xs text-slate-400 font-mono">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800/60">
        
     
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 font-bold tracking-wider text-sm">
            <Radio className="w-4 h-4 animate-pulse text-cyan-400" /> ASTRAGUARD X-BIO
          </div>
          <p className="text-slate-500 text-[11px] leading-relaxed">
            Autonomous Space Bio-Telemetry & Telemedicine Command Suite.
          </p>
        </div>

        
        <div className="space-y-3">
          <h4 className="text-slate-300 font-semibold flex items-center gap-2 uppercase tracking-wider text-[11px]">
            <Wifi className="w-3.5 h-3.5 text-emerald-400" /> DSN Array Telemetry
          </h4>
          <div className="space-y-1.5 text-slate-500 text-[11px]">
            <div className="flex justify-between border-b border-slate-800/40 pb-1">
              <span>DSN Madrid (DSS-63):</span>
              <span className="text-emerald-400 font-semibold">{ping}ms Ping</span>
            </div>
            <div className="flex justify-between">
              <span>Telemetry Loss:</span>
              <span className="text-emerald-400">0.00% (Nominal)</span>
            </div>
          </div>
        </div>

      
        <div className="space-y-3">
          <h4 className="text-slate-300 font-semibold flex items-center gap-2 uppercase tracking-wider text-[11px]">
            <Terminal className="w-3.5 h-3.5 text-amber-400" /> Mission Chronometer
          </h4>
          <div className="bg-[#0b1329] border border-slate-800 p-3 rounded-lg text-center">
            <span className="text-cyan-400 font-bold text-sm tracking-widest font-mono">
              T+ {days}d : {formatTwoDigits(hours)}h : {formatTwoDigits(minutes)}m : {formatTwoDigits(seconds)}s
            </span>
          </div>
        </div>

        
        <div className="space-y-3">
          <h4 className="text-slate-300 font-semibold flex items-center gap-2 uppercase tracking-wider text-[11px]">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" /> System Integrity
          </h4>
          <button 
            onClick={() => setIsAudioMuted(!isAudioMuted)}
            className="w-full flex items-center justify-center gap-2 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded text-slate-300 transition text-[11px]"
          >
            {isAudioMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                <span>Muted Alarms</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Telemetry Audio Active</span>
              </>
            )}
          </button>
        </div>

      </div>

     
      <div className="max-w-7xl mx-auto pt-4 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-500 gap-2">
        <p>© 2026 NASA / ESA Mission Health Subsystem. Authorized Crew Access Only.</p>
        <div className="flex items-center gap-4 font-mono">
          <span className="flex items-center gap-1 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> ISS / Gateway Bay-04
          </span>
        </div>
      </div>
    </footer>
  );
}