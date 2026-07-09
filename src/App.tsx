import React, { useState } from 'react';
import Lithos from './components/Lithos';
import Velorah from './components/Velorah';
import Mainframe from './components/Mainframe';
import PageTransition from './components/PageTransition';
import ErrorBoundary from './components/ErrorBoundary';

type HeroType = 'lithos' | 'velorah' | 'mainframe';

const HERO_CONFIG: Record<HeroType, { label: string; color: string }> = {
  lithos: { label: 'Lithos', color: 'bg-[#e8702a]' },
  velorah: { label: 'Velorah', color: 'bg-blue-500' },
  mainframe: { label: 'Mainframe', color: 'bg-black' },
};

function App() {
  const [activeHero, setActiveHero] = useState<HeroType>('lithos');

  const handleHeroChange = (hero: HeroType) => {
    if (hero !== activeHero) {
      setActiveHero(hero);
    }
  };

  return (
    <ErrorBoundary>
      <div className="relative">
        {/* Hero Selector Navigation */}
        <div
          className="fixed top-4 left-4 z-[200] bg-white rounded-lg shadow-lg p-4"
          role="navigation"
          aria-label="Hero section selector"
        >
          <div className="flex flex-col gap-2">
            {(Object.keys(HERO_CONFIG) as HeroType[]).map((hero) => {
              const config = HERO_CONFIG[hero];
              const isActive = activeHero === hero;

              return (
                <button
                  key={hero}
                  onClick={() => handleHeroChange(hero)}
                  className={`px-4 py-2 rounded transition-all duration-200 font-medium ${
                    isActive
                      ? `${config.color} text-white shadow-md transform scale-105`
                      : 'bg-gray-200 text-black hover:bg-gray-300 active:scale-95'
                  }`}
                  aria-pressed={isActive}
                  aria-label={`View ${config.label} hero section`}
                >
                  {config.label}
                </button>
              );
            })}
          </div>
          <div className="text-xs text-gray-500 mt-3 pt-3 border-t border-gray-200">
            ℹ️ Click to switch heroes
          </div>
        </div>

        {/* Hero Sections with Transitions */}
        <PageTransition isActive={activeHero === 'lithos'}>
          <Lithos />
        </PageTransition>

        <PageTransition isActive={activeHero === 'velorah'}>
          <Velorah />
        </PageTransition>

        <PageTransition isActive={activeHero === 'mainframe'}>
          <Mainframe />
        </PageTransition>
      </div>
    </ErrorBoundary>
  );
}

export default App;
