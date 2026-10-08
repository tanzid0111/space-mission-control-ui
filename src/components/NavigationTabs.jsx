import React from 'react';
import { Activity, Wind, Cpu, Flame, ShieldAlert } from 'lucide-react';

export default function NavigationTabs({ activeTab, setActiveTab, hasActiveEmergency }) {
  const tabs = [
    { id: 'telemetry', label: 'Vitals Telemetry', icon: Activity },
    { id: 'lifesupport', label: 'EVA Life Support', icon: Wind },
    { id: 'diagnostics', label: 'Zero-G AI Medical', icon: Cpu },
    { id: 'exercise', label: 'Countermeasures', icon: Flame },
    { id: 'emergency', label: 'Emergency HUD', icon: ShieldAlert, badge: hasActiveEmergency ? 'CRITICAL' : null }
  ];

  return (
    <div className="flex border-b border-slate-800 space-x-2 overflow-x-auto pb-1 scrollbar-none">
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 font-mono text-xs uppercase tracking-wider rounded-t-lg transition-all border-b-2 whitespace-nowrap ${
              isActive 
                ? 'border-cyan-400 bg-slate-900 text-cyan-400 font-bold' 
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
            {tab.label}
            {tab.badge && (
              <span className="bg-rose-500/20 text-rose-400 border border-rose-500/50 text-[9px] px-1.5 py-0.5 rounded animate-pulse">
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}