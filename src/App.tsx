import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [state, setState] = useState<string>(null);
  const [colors, setColors] = useState([]);
  const [error, setError] = useState<string>(null);

  useEffect(() => {
    const fetchColors = async () => {
      try {
        let resp;
        resp = await fetch('https://app.fakejson.com/q', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            token: "aQxNEcvu6sckWkDmfy0fYA",
            data: {
              id: "colorHEX",
              _repeat: 5
            }
          })
        });
        if (resp.ok) {
          const colors = await resp.json();
          setColors(colors);
        } else
          throw new Error('Fetching colors failed');
      } catch (e) {
        setError('Fetching colors failed');
      }
    };

    fetchColors();
  }, []);

  return (
    <div className="App">
      <div className="Header">Fruit Selector</div>
      {error ? <div className="Error">{error}</div>
        : (
          <>
            <div className="Text">Selected: {state}</div>
            <div className="List">
              {colors.map(({ hex }) =>
                <div className="Item Color" style={{ backgroundColor: hex }} onClick={() => setState(hex)} />)}
            </div>
          </>)}
    </div>
  );
}

export default App;
