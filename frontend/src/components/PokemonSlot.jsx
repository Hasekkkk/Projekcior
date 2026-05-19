import { useState, useEffect} from 'react';

export default function PokemonSlot({ index }) {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // Jeśli pole jest puste, czyścimy dane
    if (!pokemonName.trim()) {
      setPokemonData(null);
      setIsError(false);
      return;
    }

    // Ustawiamy opóźnienie (Debouncing) - 500ms po zakończeniu pisania
    const timeoutId = setTimeout(async () => {
      try {
        setIsError(false);
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
        
        if (!response.ok) throw new Error('Nie znaleziono pokémona');
        
        const data = await response.json();
        
        setPokemonData({
          name: data.name,
          sprite: data.sprites.front_default,
          types: data.types.map((t) => t.type.name),
        });
      } catch (err) {
        setPokemonData(null);
        setIsError(true); // Wyświetli błąd jeśli wpiszesz np. "gengarrr"
      }
    }, 500); // 500 milisekund opóźnienia

    // Cleanup: jeśli użytkownik wciśnie kolejną literę przed upływem 500ms, anulujemy poprzednie zapytanie
    return () => clearTimeout(timeoutId);
    
  }, [pokemonName]); // Ta tablica na końcu mówi: wywołaj ten efekt tylko, gdy zmieni się pokemonName

  return (
    <div className="pokemon-slot" style={styles.slot}>
      <div style={styles.header}>
        <h3>Pokémon {index}</h3>
        {/* Wyświetlanie obrazka, jeśli mamy dane z API */}
        {pokemonData && (
          <img src={pokemonData.sprite} alt={pokemonData.name} style={styles.sprite} />
        )}
      </div>
      
      {/* Formularz kontrolowany */}
      <input 
        type="text" 
        placeholder="Nazwa (np. charizard)..." 
        style={styles.input}
        value={pokemonName}
        onChange={(e) => setPokemonName(e.target.value)}
      />
      
      {/* Komunikaty */}
      {isError && <p style={{ color: 'red', fontSize: '12px', margin: '5px 0' }}>Nie znaleziono takiego Pokémona!</p>}
      
      {pokemonData && (
        <div style={{ marginTop: '8px', fontSize: '14px', textTransform: 'capitalize' }}>
          <strong>Typy:</strong> {pokemonData.types.join(', ')}
        </div>
      )}
        
        <div className="moves" style={styles.movesGrid}>
          <input type="text" placeholder="Atak 1" style={styles.input} />
          <input type="text" placeholder="Atak 2" style={styles.input} />
          <input type="text" placeholder="Atak 3" style={styles.input} />
          <input type="text" placeholder="Atak 4" style={styles.input} />
        </div>
      </div>
    );
  }
  
  // Proste style wpięte w plik, by nie robić na razie bałaganu w CSS
  const styles = {
    slot: {
      backgroundColor: '#fff',
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '15px',
      marginBottom: '10px'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '10px'
    },
    sprite: {
      height: '50px',
      imageRendering: 'pixelated'
    },
    movesGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '5px',
      marginTop: '15px'
    },
    input: {
      width: '100%',
      padding: '8px',
      borderRadius: '4px',
      border: '1px solid #aaa'
    }
  };