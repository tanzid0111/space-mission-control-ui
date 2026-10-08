'use client';

import React, { useState, useEffect } from 'react';
import { Orbit, Radio, Volume2, VolumeX } from 'lucide-react';

export default function Navbar({ isAudioMuted, setIsAudioMuted }) {
 
  const [days, setDays] = useState(342);
  const [hours, setHours] = useState(8);
  const [minutes, setMinutes] = useState(36);
  const [seconds, setSeconds] = useState(14);
  const [dsnSignal, setDsnSignal] = useState(98.4);

  useEffect(() => {
  
    const timer = setInterval(() => {
      setSeconds((prevSec) => {
        if (prevSec >= 59) {
          setMinutes((prevMin) => {
            if (prevMin >= 59) {
              setHours((prevHr) => {
                if (prevHr >= 23) {
                  setDays((prevDay) => prevDay + 1);
                  return 0;
                }
                return prevHr + 1;
              });
              return 0;
            }
            return prevMin + 1;
          });
          return 0;
        }
        return prevSec + 1;
      });

    
      setDsnSignal((98.0 + (Math.random() * 1.2 - 0.6)).toFixed(1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTwoDigits = (num) => String(num).padStart(2, '0');

  return (
    <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-cyan-500/20 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/40 text-cyan-400">
              <Orbit className="w-6 h-6 animate-pulse text-cyan-400" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </span>
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-200 to-indigo-400 font-mono">
                ASTRAGUARD-X
              </h1>
              <p className="text-xs font-mono text-cyan-400/70 tracking-widest uppercase">
                ARES-V Deep Space BioTelemetry
              </p>
            </div>
          </div>

          <button 
            onClick={() => setIsAudioMuted(!isAudioMuted)} 
            className="md:hidden p-2 rounded bg-slate-800 text-slate-300 border border-slate-700"
          >
            {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>
        </div>

        <div className="flex items-center gap-6 text-sm font-mono">
          
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-slate-400 text-xs">MISSION ELAPSED TIME</span>
            <span className="text-cyan-300 font-bold tracking-widest text-base">
              T+ {days}D {formatTwoDigits(hours)}H {formatTwoDigits(minutes)}M {formatTwoDigits(seconds)}S
            </span>
          </div>

          <div className="h-8 w-px bg-slate-800 hidden sm:block" />

         
          <div className="flex items-center gap-2 bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 px-3 py-1.5 rounded-full text-xs">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span className="font-semibold tracking-wide">DSN LINK: {dsnSignal}%</span>
          </div>

          <button 
            onClick={() => setIsAudioMuted(!isAudioMuted)} 
            className="hidden md:flex items-center justify-center p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 transition-all"
          >
            {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>
        </div>
      </div>
    </header>
  );
}