import { useContext } from 'react';
import { TeamContext } from '../context/TeamContext';

export default function CoverageTable() {
    // Wyciągamy tablicę 'team' z magazynu
    const { team } = useContext(TeamContext);
  
    // Filtrujemy tylko te sloty, które nie są puste (gdzie ktoś już wpisał dobrego pokemona)
    const activePokemons = team.filter(pokemon => pokemon !== null);
  
    return (
      <div className="coverage-table" style={styles.container}>
        <h2>Defensive Coverage</h2>
        
        {activePokemons.length === 0 ? (
          <p style={{ marginTop: '10px' }}>Dodaj pokémony, aby zobaczyć ich typy...</p>
        ) : (
          <div style={{ marginTop: '20px' }}>
            <h3>Obecne typy w drużynie:</h3>
            <ul style={{ marginTop: '10px', marginLeft: '20px' }}>
              {activePokemons.map((pokemon, idx) => (
                <li key={idx} style={{ textTransform: 'capitalize', marginBottom: '5px' }}>
                  <strong>{pokemon.name}</strong>: {pokemon.types.join(', ')}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <p style={{ marginTop: '30px', fontSize: '12px', color: '#ccc' }}>
          (W kolejnym kroku zamienimy tę listę na tabelę odporności/słabości z prawdziwego zdarzenia!)
        </p>
      </div>
    );
  }
  
  const styles = {
    container: { 
        ackgroundColor: '#3b4cca', 
        color: 'white', 
        padding: '20px', 
        borderRadius: '8px', 
        minHeight: '400px' 
    }
  };