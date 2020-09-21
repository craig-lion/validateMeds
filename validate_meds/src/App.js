import React from 'react';
import './App.css';

const App = () => {
  const newMedication = () => {
    console.log('ye dis click fam')
  }
  return (
      <>
        <p> Enter Medication Here </p>
        <input size="50"></input>
        <button type="button" onClick={newMedication}>Enter Another Medication</button>
      </>
  );
}

export default App;
