import React, { useState } from 'react';
import Lithos from './components/Lithos';
import Velorah from './components/Velorah';
import Mainframe from './components/Mainframe';

type HeroType = 'lithos' | 'velorah' | 'mainframe';

function App() {
  const [activeHero, setActiveHero] = useState<HeroType>('lithos');

  return (
    <div className="relative">
      {/* Hero Selector */}
      <div className="fixed top-4 left-4 z-[200] bg-white rounded-lg shadow-lg p-4">
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setActiveHero('lithos')}
            className={`px-4 py-2 rounded transition-colors ${
              activeHero === 'lithos'
                ? 'bg-[#e8702a] text-white'
                : 'bg-gray-200 text-black hover:bg-gray-300'
            }`}
          >
            Lithos
          </button>
          <button
            onClick={() => setActiveHero('velorah')}
            className={`px-4 py-2 rounded transition-colors ${
              activeHero === 'velorah'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-black hover:bg-gray-300'
            }`}
          >
            Velorah
          </button>
          <button
            onClick={() => setActiveHero('mainframe')}
            className={`px-4 py-2 rounded transition-colors ${
              activeHero === 'mainframe'
                ? 'bg-black text-white'
                : 'bg-gray-200 text-black hover:bg-gray-300'
            }`}
          >
            Mainframe
          </button>
        </div>
      </div>

      {/* Heroes */}
      {activeHero === 'lithos' && <Lithos />}
      {activeHero === 'velorah' && <Velorah />}
      {activeHero === 'mainframe' && <Mainframe />}
    </div>
  );
}

export default App;
