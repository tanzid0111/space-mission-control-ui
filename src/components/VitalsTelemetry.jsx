'use client';

import React from 'react';
import { Heart, Activity, Thermometer, ShieldAlert, Wind, Compass } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

export default function VitalsTelemetry({ selectedCrew, telemetryHistory }) {

  const vitals = selectedCrew?.vitals || {};
  const currentTelemetry = telemetryHistory[telemetryHistory.length - 1] || vitals;

  
  const getHrStatus = (hr) => {
    if (hr > 95) return { label: 'ELEVATED', color: 'bg-rose-500/10 text-rose-400 border-rose-500/30' };
    if (hr < 60) return { label: 'BRADYCARDIA', color: 'bg-amber-500/10 text-amber-400 border-amber-500/30' };
    return { label: 'STABLE', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' };
  };

  const hrStatus = getHrStatus(vitals.hr || currentTelemetry.hr || 82);

  return (
    <div className="space-y-6">
    
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 grid grid-cols-2 md:grid-cols-4 gap-4 backdrop-blur-md">
        <div className="space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase">LOCATION / HAB</span>
          <p className="text-sm font-semibold text-slate-100 flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-cyan-400" />
            {selectedCrew?.location || 'Airlock 2 Exterior'}
          </p>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase">AMBIENT PRESSURE</span>
          <p className="text-sm font-semibold text-cyan-300 font-mono">{selectedCrew?.ambientPressure || '4.3 PSI'}</p>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase">SUIT PRESSURE</span>
          <p className="text-sm font-semibold text-indigo-300 font-mono">{selectedCrew?.suitPressure || '4.3 PSI'}</p>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase">BIO-STATUS LINK</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono text-emerald-400 font-bold">NOMINAL STREAM</span>
          </div>
        </div>
      </div>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        
       
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400">
                <Heart className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-xs font-mono uppercase text-slate-400">Heart Rate</h3>
                <p className="text-xs font-semibold text-slate-300">Target: 60-100 BPM</p>
              </div>
            </div>
            <span className={`text-xs font-mono px-2 py-0.5 rounded border ${hrStatus.color}`}>
              {hrStatus.label}
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-slate-100">{vitals.hr || currentTelemetry?.hr || 82}</span>
            <span className="text-xs font-mono text-slate-400">BPM</span>
          </div>
          <div className="h-16 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={telemetryHistory}>
                <defs>
                  <linearGradient id="hrGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="hr" stroke="#f43f5e" strokeWidth={2} fillOpacity={1} fill="url(#hrGrad)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

       
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-mono uppercase text-slate-400">Blood Oxygen (SpO2)</h3>
                <p className="text-xs font-semibold text-slate-300">Min Threshold: 95%</p>
              </div>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              OPTIMAL
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-cyan-400">{vitals.spo2 || currentTelemetry?.spo2 || 98.7}%</span>
            <span className="text-xs font-mono text-slate-400">SaO2 saturation</span>
          </div>
          <div className="h-16 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={telemetryHistory}>
                <Line type="monotone" dataKey="spo2" stroke="#06b6d4" strokeWidth={2} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Thermometer className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-mono uppercase text-slate-400">Core Temp</h3>
                <p className="text-xs font-semibold text-slate-300">Norm: 36.5°C - 37.3°C</p>
              </div>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              NORMAL
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-amber-400">{vitals.temp || currentTelemetry?.temp || 36.8}°C</span>
            <span className="text-xs font-mono text-slate-400">T-Core Sensor</span>
          </div>
          <div className="h-16 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={telemetryHistory}>
                <Line type="monotone" dataKey="temp" stroke="#f59e0b" strokeWidth={2} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-xs font-mono uppercase text-slate-400">Blood Pressure</h3>
              <p className="text-xs font-semibold text-emerald-400 mt-0.5">Normotensive Range</p>
            </div>
            <span className="text-[10px] font-mono text-slate-500">SYS / DIA</span>
          </div>
          <div className="flex items-baseline gap-2 my-auto pt-2">
            <span className="text-3xl font-extrabold font-mono text-slate-100">{vitals.bp || '118/76'}</span>
            <span className="text-xs font-mono text-slate-400">mmHg</span>
          </div>
        </div>


        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-xs font-mono uppercase text-slate-400">Respiratory Rate</h3>
              <p className="text-xs font-semibold text-slate-400 mt-0.5">Regulated Suit Ventilation</p>
            </div>
            <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Wind className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 my-auto pt-2">
            <span className="text-3xl font-extrabold font-mono text-slate-100">{vitals.rr || vitals.respiratory || 14}</span>
            <span className="text-xs font-mono text-slate-400">br/min</span>
          </div>
        </div>

      
        <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-xs font-mono uppercase text-slate-400">Radiation Rate</h3>
              <p className="text-xs font-semibold text-indigo-400 mt-0.5">Dosimeter Active Safe Limit</p>
            </div>
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 my-auto pt-2">
            <span className="text-3xl font-extrabold font-mono text-cyan-400">{vitals.radiation || 0.18}</span>
            <span className="text-xs font-mono text-slate-400">mSv/hr</span>
          </div>
        </div>

      </div>

      
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold font-mono text-slate-200 uppercase tracking-wider">
              Continuous Multi-Channel Bio-Stream
            </h3>
            <p className="text-xs text-slate-400">Real-time synchronized physiological trends (Last 60 seconds)</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-rose-400"><span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"/> Heart Rate</span>
            <span className="flex items-center gap-1.5 text-cyan-400"><span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block"/> SpO2 %</span>
          </div>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={telemetryHistory}>
              <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} domain={['dataMin - 5', 'dataMax + 5']} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }} />
              <Line type="monotone" dataKey="hr" stroke="#f43f5e" strokeWidth={2} name="Heart Rate (BPM)" isAnimationActive={false} />
              <Line type="monotone" dataKey="spo2" stroke="#06b6d4" strokeWidth={2} name="SpO2 (%)" isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}