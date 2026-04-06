import React, { useEffect } from 'react';
import { useGameStore } from './store/gameStore';
import { HomeScreen } from './components/screens/HomeScreen';
import { AdventureMapScreen } from './components/screens/AdventureMapScreen';
import { StoryScreen } from './components/screens/StoryScreen';
import { ChallengeScreen } from './components/screens/ChallengeScreen';
import { BattleScreen } from './components/screens/BattleScreen';
import { VictoryScreen } from './components/screens/VictoryScreen';
import { MagicDictionaryScreen } from './components/screens/MagicDictionaryScreen';
import { ParentDashboardScreen } from './components/screens/ParentDashboardScreen';

const App: React.FC = () => {
  const { currentScreen, loadFromStorage } = useGameStore();

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen />;
      case 'map':
        return <AdventureMapScreen />;
      case 'story':
        return <StoryScreen />;
      case 'challenge':
        return <ChallengeScreen />;
      case 'battle':
        return <BattleScreen />;
      case 'victory':
        return <VictoryScreen />;
      case 'dictionary':
        return <MagicDictionaryScreen />;
      case 'parentDashboard':
        return <ParentDashboardScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="app-root">
      {renderScreen()}
    </div>
  );
};

export default App;
