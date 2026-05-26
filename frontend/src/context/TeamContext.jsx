import { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Narzędzie do generowania unikalnych ID

export const TeamContext = createContext();

export function TeamProvider({ children }) {
  const [team, setTeam] = useState([null, null, null, null, null, null]);
  const [teamName, setTeamName] = useState('');
  const [isOnline, setIsOnline] = useState(navigator.onLine); // Sprawdza od razu przy starcie

  // Nasłuchiwacz, który sam reaguje na utratę/powrót internetu
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const updatePokemon = (index, pokemonData) => {
    setTeam((prevTeam) => {
      const newTeam = [...prevTeam];
      newTeam[index] = pokemonData;
      return newTeam;
    });
  };

  // Funkcja Zapisująca Drużynę (Wymóg zadania: LocalStorage)
  const saveTeamLocal = () => {
    if (!teamName) {
      alert('Podaj najpierw nazwę drużyny na samej górze!');
      return;
    }

    const newTeamData = {
      id: uuidv4(),
      name: teamName,
      data: team, // Nasza tablica 6 pokemonów
      synced: false // Wymóg zadania: flaga na false
    };

    // Pobieramy stare drużyny z LocalStorage (albo tworzymy pustą tablicę)
    const existingTeams = JSON.parse(localStorage.getItem('saved_teams')) || [];
    
    // Dodajemy nową i zapisujemy
    existingTeams.push(newTeamData);
    localStorage.setItem('saved_teams', JSON.stringify(existingTeams));

    alert('Drużyna zapisana pomyślnie w przeglądarce (Offline)!');
  };

  return (
    <TeamContext.Provider value={{ team, updatePokemon, teamName, setTeamName, saveTeamLocal, isOnline }}>
      {children}
    </TeamContext.Provider>
  );
}