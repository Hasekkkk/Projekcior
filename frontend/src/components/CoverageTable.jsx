export default function CoverageTable() {
    return (
      <div className="coverage-table" style={styles.container}>
        <h2>Defensive Coverage</h2>
        <p style={{ marginTop: '10px' }}>Tabela odporności i słabości pojawi się tutaj...</p>
      </div>
    );
  }
  
  const styles = {
    container: {
      backgroundColor: '#3b4cca',
      color: 'white',
      padding: '20px',
      borderRadius: '8px',
      minHeight: '400px'
    }
  };