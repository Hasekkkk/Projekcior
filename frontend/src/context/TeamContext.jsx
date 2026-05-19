import { createContext, useState } from 'react';

// 1. Tworzymy Context
export const TeamContext = createContext();

// 2. Tworzymy Provider (komponent, który owinie naszą aplikację i da jej dane)
export function TeamProvider({ children }) {
  // Stan przechowujący tablicę 6 elementów (nasza drużyna). Na start same null-e.
  const [team, setTeam] = useState([null, null, null, null, null, null]);

  // Funkcja do aktualizacji konkretnego slotu (od 0 do 5)
  const updatePokemon = (index, pokemonData) => {
    setTeam((prevTeam) => {
      const newTeam = [...prevTeam];
      newTeam[index] = pokemonData; // Nadpisujemy dane w danym slocie
      return newTeam;
    });
  };

  return (
    <TeamContext.Provider value={{ team, updatePokemon }}>
      {children}
    </TeamContext.Provider>
  );
}