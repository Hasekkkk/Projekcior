import { useContext } from 'react';
import { TeamContext } from '../context/TeamContext';
import { ALL_TYPES, TYPE_COLORS, getMultiplier } from '../utils/typeChart';

export default function CoverageTable() {
  const { team } = useContext(TeamContext);

  // Funkcja pomocnicza: renderuje pojedynczą komórkę w tabeli
  const renderCell = (attackType, pokemon) => {
    if (!pokemon) return <td style={styles.cellEmpty}></td>;

    const multiplier = getMultiplier(attackType, pokemon.types);
    
    let bgColor = '#e0e0e0'; // Zwykłe (x1)
    let text = '';

    if (multiplier > 1) { bgColor = '#ff9999'; text = `${multiplier}x`; } // Słabość
    if (multiplier < 1 && multiplier > 0) { bgColor = '#a3e4d7'; text = '½'; } // Odporność
    if (multiplier === 0.25) { bgColor = '#76d7c4'; text = '¼'; } // Podwójna odporność
    if (multiplier === 0) { bgColor = '#85929e'; text = '0'; } // Niewrażliwość

    return (
      <td style={{ ...styles.cell, backgroundColor: bgColor }}>
        {text}
      </td>
    );
  };

  return (
    <div className="coverage-table" style={styles.container}>
      <h2 style={{ marginBottom: '15px', textAlign: 'center' }}>Defensive Coverage</h2>
      
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Atak</th>
            {/* Numery pokemonów na górze */}
            {team.map((_, i) => (
              <th key={i} style={styles.th}>P{i+1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ALL_TYPES.map(type => (
            <tr key={type}>
              {/* Kolumna z nazwą i kolorem typu */}
              <td style={{ ...styles.typeCell, backgroundColor: TYPE_COLORS[type] }}>
                {type.toUpperCase()}
              </td>
              
              {/* Komórki dla każdego z 6 pokemonów */}
              {team.map((pokemon, idx) => (
                <React.Fragment key={idx}>
                  {renderCell(type, pokemon)}
                </React.Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Musimy zaimportować Reacta do Fragmentu użytego wyżej
import React from 'react';

const styles = {
  container: { 
      backgroundColor: '#2c3e50', 
      color: 'white', 
      padding: '15px', 
      borderRadius: '8px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '12px',
    textAlign: 'center'
  },
  th: {
    padding: '5px',
    borderBottom: '2px solid #555'
  },
  typeCell: {
    padding: '5px',
    fontWeight: 'bold',
    textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
    border: '1px solid #1a252f',
    width: '60px'
  },
  cell: {
    border: '1px solid #bdc3c7',
    color: '#000',
    fontWeight: 'bold',
    width: '30px',
    height: '25px'
  },
  cellEmpty: {
    border: '1px solid #7f8c8d',
    backgroundColor: '#34495e'
  }
};