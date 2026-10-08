'use client';

import React, { useState, useEffect } from 'react';
import { CREW_MEMBERS, INITIAL_LOGS } from '../data/mockData';
import Navbar from '../components/Navbar';
import CrewRoster from '../components/CrewRoster';
import NavigationTabs from '../components/NavigationTabs';
import VitalsTelemetry from '../components/VitalsTelemetry';
import LifeSupport from '../components/LifeSupport';
import Footer from '../components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('telemetry');
  const [selectedAstronautId, setSelectedAstronautId] = useState(CREW_MEMBERS[0]?.id || 'ast-1');
  const [isAudioMuted, setIsAudioMuted] = useState(false);


  const [missionTime, setMissionTime] = useState({
    days: 342,
    hours: 8,
    minutes: 36,
    seconds: 14
  });

 
  const baseCrew = CREW_MEMBERS.find(c => c.id === selectedAstronautId) || CREW_MEMBERS[0];

 
  const [liveVitals, setLiveVitals] = useState(baseCrew?.vitals || {});
  const [telemetryHistory, setTelemetryHistory] = useState([]);


  useEffect(() => {
    const clockTimer = setInterval(() => {
      setMissionTime((prev) => {
        let sec = prev.seconds + 1;
        let min = prev.minutes;
        let hr = prev.hours;
        let d = prev.days;

        if (sec >= 60) {
          sec = 0;
          min += 1;
        }
        if (min >= 60) {
          min = 0;
          hr += 1;
        }
        if (hr >= 24) {
          hr = 0;
          d += 1;
        }

        return { days: d, hours: hr, minutes: min, seconds: sec };
      });
    }, 1000);

    return () => clearInterval(clockTimer);
  }, []);

  useEffect(() => {
    if (!baseCrew || !baseCrew.vitals) return;

    setLiveVitals(baseCrew.vitals);

    const initialData = Array.from({ length: 20 }).map((_, index) => ({
      time: `-${(20 - index) * 3}s`,
      hr: baseCrew.vitals.hr + Math.floor(Math.random() * 6 - 3),
      spo2: parseFloat((baseCrew.vitals.spo2 + (Math.random() * 0.4 - 0.2)).toFixed(1)),
      temp: parseFloat((baseCrew.vitals.temp + (Math.random() * 0.2 - 0.1)).toFixed(1))
    }));
    setTelemetryHistory(initialData);
  }, [selectedAstronautId]);

  useEffect(() => {
    if (!baseCrew || !baseCrew.vitals) return;

    const interval = setInterval(() => {
      setLiveVitals((prev) => {
        const newHr = Math.min(110, Math.max(60, (prev.hr || 80) + (Math.floor(Math.random() * 5) - 2)));
        const newSpo2 = parseFloat(Math.min(100, Math.max(94, (prev.spo2 || 98) + (Math.random() * 0.4 - 0.2))).toFixed(1));
        const newTemp = parseFloat((36.8 + (Math.random() * 0.4 - 0.2)).toFixed(1));
        

        const sys = 118 + Math.floor(Math.random() * 5 - 2);
        const dia = 76 + Math.floor(Math.random() * 3 - 1);
        
        const newRr = Math.min(20, Math.max(10, (prev.rr || prev.respiratory || 14) + (Math.floor(Math.random() * 3) - 1)));
        const newRad = parseFloat((0.18 + (Math.random() * 0.04 - 0.02)).toFixed(2));

        const updatedVitals = {
          ...prev,
          hr: newHr,
          spo2: newSpo2,
          temp: newTemp,
          bp: `${sys}/${dia}`,
          rr: newRr,
          respiratory: newRr,
          radiation: newRad
        };

        setTelemetryHistory((prevHistory) => [
          ...prevHistory.slice(1),
          { time: 'Now', hr: newHr, spo2: newSpo2, temp: newTemp }
        ]);

        return updatedVitals;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [selectedAstronautId]);

  const selectedCrew = {
    ...baseCrew,
    vitals: liveVitals
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col justify-between">
      <div>
        <Navbar 
          isAudioMuted={isAudioMuted} 
          setIsAudioMuted={setIsAudioMuted} 
          missionTime={missionTime}
        />
        
        <main className="max-w-7xl mx-auto px-4 lg:px-8 pt-6 space-y-6">
          <CrewRoster 
            crewMembers={CREW_MEMBERS} 
            selectedAstronautId={selectedAstronautId} 
            setSelectedAstronautId={setSelectedAstronautId} 
          />
          
          <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {activeTab === 'telemetry' && (
            <VitalsTelemetry selectedCrew={selectedCrew} telemetryHistory={telemetryHistory} />
          )}

          {activeTab === 'lifesupport' && (
            <LifeSupport selectedCrew={selectedCrew} />
          )}
        </main>
      </div>

      <Footer 
        isAudioMuted={isAudioMuted} 
        setIsAudioMuted={setIsAudioMuted} 
        missionTime={missionTime}
      />
    </div>
  );
}