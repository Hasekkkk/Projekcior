import { useContext } from 'react';
import PokemonSlot from './components/PokemonSlot';
import CoverageTable from './components/CoverageTable';
import { TeamContext } from './context/TeamContext';

function App() {
  const slots = [1, 2, 3, 4, 5, 6];
  
  // Pobieramy nowe dane z naszego magazynu (TeamContext)
  const { teamName, setTeamName, saveTeamLocal, isOnline } = useContext(TeamContext);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      
      {/* Pasek Statusu Internetu */}
      <div style={{ 
        padding: '10px', 
        marginBottom: '20px', 
        backgroundColor: isOnline ? '#d4edda' : '#f8d7da', 
        color: isOnline ? '#155724' : '#721c24',
        borderRadius: '5px',
        fontWeight: 'bold',
        textAlign: 'center'
      }}>
        Status połączenia: {isOnline ? '🟢 ONLINE (Gotowy do synchronizacji)' : '🔴 OFFLINE (Dane zapisywane lokalnie)'}
      </div>

      <header style={{ marginBottom: '20px', display: 'flex', gap: '20px', alignItems: 'center' }}>
        <h1>Pokémon Team Builder</h1>
        <input 
          type="text" 
          placeholder="Nazwa Twojej drużyny (Wymagane)..." 
          style={{ padding: '10px', width: '300px' }}
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)} // Formularz kontrolowany
        />
        <button 
          onClick={saveTeamLocal}
          style={{ padding: '10px 20px', backgroundColor: '#3498db', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          💾 Zapisz Drużynę
        </button>
      </header>

      <main style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
        <section style={{ flex: '1' }}>
          {slots.map((num) => (
            <PokemonSlot key={num} index={num} />
          ))}
        </section>
        <aside style={{ width: '450px' }}>
          <CoverageTable />
        </aside>
      </main>

    </div>
  );
}

export default App;