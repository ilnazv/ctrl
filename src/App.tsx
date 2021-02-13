import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import { authenticateAnonymously } from './services/firestoreService';
import { Controller } from './Controller';
import { GamePage } from './GamePage';

function App() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    authenticateAnonymously().then((a) => {
      setLoaded(true);
    });
  });

  const [mode, setMode] = useState(2);

  const content = useMemo(() => {
    if (mode === 0) {
      return <GamePage />;
    }

    if (mode === 1) {
      return <Controller />;
    }

    return <><h2>Choose mode:</h2>
      <button type='button' onClick={() => setMode(0)}>Game</button>
      <button type='button' onClick={() => setMode(1)}>Controller</button>
    </>;
  }, [mode]);

  return (
    <div className="App">
      <header className="App-header">
        <button type='button' onClick={() => setMode(2)}>Back</button>
        {loaded && <>
          {content}
        </>}
      </header>
    </div>
  );
}

export default App;
