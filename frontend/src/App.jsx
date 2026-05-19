import PokemonSlot from './components/PokemonSlot';
import CoverageTable from './components/CoverageTable';

function App() {
  // Generujemy tablicę [1, 2, 3, 4, 5, 6] dla sześciu slotów
  const slots = [1, 2, 3, 4, 5, 6];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      
      <header style={{ marginBottom: '20px' }}>
        <h1>Pokémon Team Builder</h1>
        <input 
          type="text" 
          placeholder="Nazwa Twojej drużyny..." 
          style={{ padding: '10px', width: '300px', marginTop: '10px' }}
        />
      </header>

      {/* Główny grid aplikacji */}
      <main style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
        
        {/* Lewa kolumna: Sloty na 6 pokemonów */}
        <section style={{ flex: '1' }}>
          {slots.map((num) => (
            <PokemonSlot key={num} index={num} />
          ))}
        </section>

        {/* Prawa kolumna: Tabela Coverage */}
        <aside style={{ width: '400px' }}>
          <CoverageTable />
        </aside>

      </main>

    </div>
  );
}

export default App;