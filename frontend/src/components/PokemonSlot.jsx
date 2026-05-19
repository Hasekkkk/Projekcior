export default function PokemonSlot({ index }) {
    return (
      <div className="pokemon-slot" style={styles.slot}>
        <h3>Pokémon {index}</h3>
        <input type="text" placeholder="Nazwa pokémona..." style={styles.input} />
        
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
    movesGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '5px',
      marginTop: '10px'
    },
    input: {
      width: '100%',
      padding: '5px'
    }
  };