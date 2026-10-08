export const CREW_MEMBERS = [
  {
    id: 'ast-1',
    name: 'Capt. Sarah Vance',
    role: 'Commander',
    callsign: 'ARES-1',
    status: 'ON EVA',
    location: 'Airlock 2 Exterior',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    ambientPressure: '4.3 PSI',
    suitPressure: '4.3 PSI',
    vitals: { 
      hr: 82, 
      spo2: 98.8, 
      temp: 36.8, 
      bp: '118/76', 
      rr: 14, 
      respiratory: 14, 
      radiation: 0.18 
    },
    suit: { o2Primary: 94, o2Secondary: 100, co2Scrubber: 88, battery: 81, temp: 21.2, humidity: 42 }
  },
  {
    id: 'ast-2',
    name: 'Dr. Alexey Chen',
    role: 'Flight Engineer',
    callsign: 'ARES-2',
    status: 'IN-HAB',
    location: 'BioLab Module',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    ambientPressure: '14.7 PSI',
    suitPressure: 'N/A',
    vitals: { 
      hr: 68, 
      spo2: 99.2, 
      temp: 36.6, 
      bp: '112/72', 
      rr: 12, 
      respiratory: 12, 
      radiation: 0.08 
    },
    suit: { o2Primary: 100, o2Secondary: 100, co2Scrubber: 100, battery: 100, temp: 22.0, humidity: 40 }
  },
  {
    id: 'ast-3',
    name: 'Elena Rostova',
    role: 'Mission Specialist',
    callsign: 'ARES-3',
    status: 'IN-HAB',
    location: 'Cupola Observation',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    ambientPressure: '14.7 PSI',
    suitPressure: 'N/A',
    vitals: { 
      hr: 74, 
      spo2: 98.1, 
      temp: 37.1, 
      bp: '122/80', 
      rr: 15, 
      respiratory: 15, 
      radiation: 0.12 
    },
    suit: { o2Primary: 100, o2Secondary: 100, co2Scrubber: 96, battery: 98, temp: 21.8, humidity: 45 }
  }
];

export const INITIAL_LOGS = [
  { id: 1, met: 'T+ 142d 08h 32m', type: 'INFO', text: 'Nominal bio-telemetry link established via Deep Space Network Array 4.' },
  { id: 2, met: 'T+ 142d 08h 15m', type: 'SUCCESS', text: 'Capt. Sarah Vance initiated scheduled Extravehicular Activity (EVA-2).' },
  { id: 3, met: 'T+ 142d 07h 45m', type: 'WARNING', text: 'Elevated radiation spike detected (0.24 mSv/hr). Solar activity normal.' },
  { id: 4, met: 'T+ 142d 06h 10m', type: 'INFO', text: 'Dr. Alexey Chen completed 45-min ARED heavy load countermeasure protocol.' }
];