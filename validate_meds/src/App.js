import React, {useState} from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';

import './App.css';

const App = () => {
  const [oneMed, setOneMed] = useState({
    name: '',
    rxnorm: null,
  })
  const [allMeds, setAllMeds] = useState([])
  const [count, setCount] = useState(1)
  const newMedication = () => {
    console.log('ye dis click fam')
    setCount(count + 1)
  }
  const saveMedications = () => {
    console.log('medications saved')
  }

  const handleChange = (e) => {
    console.log(e.target.value)
    setOneMed({...oneMed, name:e.target.value})
  }

  const formik = useFormik({
    initialValues: {
      drugName: '',
    },
    onSubmit: name => {
      setOneMed({...oneMed, name})
    },
  });

  const OneInput = (c) => (
      <NewMedContainer key={c}>
        <form onSubmit={formik.handleSubmit}>
      <label htmlFor="drugName">Medication Name</label>
      <input
        name="drugName"
        onChange={formik.handleChange}
        value={formik.values.drugName}
        size="40"
      />
      <button type="submit">Submit</button>
      <button type="button" onClick={newMedication}>Enter Another Medication</button>
     </form>
       </NewMedContainer>
  )


  const makeAllInputs = () => {
    let array = []
    for (let i=0; i < count; i++) {
      array.push(OneInput(count))
    }
    return array
  }

  const allInputs = makeAllInputs()

  return (
      <>
        {allInputs}
        <button type="button" onClick={saveMedications}>Save All Medications</button>
      </>
  );
}

const NewMedContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export default App;
