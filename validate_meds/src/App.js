import React from 'react';
import styled from 'styled-components';
import './App.css';

const App = () => {
  const newMedication = () => {
    console.log('ye dis click fam')
  }

  const handleChange = (e) => {
    console.log(e.target.value)
  }
  return (
      <>
        <NewMedContainer>
          <p> Enter Medication Here </p>
          <input size="50" onChange={handleChange}></input>
          <button type="button" onClick={newMedication}>Enter Another Medication</button>
        </NewMedContainer>
        <button type="button" >Save All Medications</button>
      </>
  );
}

const NewMedContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export default App;
