import React, {useState} from 'react';
import {  Form, Field, Formik } from 'formik';
import { Effect } from 'formik-effect'
import AddMeds from './addMeds'

import './App.css';

const App = () => {
  const [oneMed, setOneMed] = useState({
    name: '',
    rxnorm: null,
  })
  const [allMeds, setAllMeds] = useState([])
  const newMedication = () => {
    console.log('ye dis click fam')
  }
  const saveMedications = () => {
    console.log('medications saved')
  }

  const formik = {
    initialValues: {
      drugName: '',
    },
    onSubmit: (values) => {
      console.log('this is oneMed:', oneMed)
      setAllMeds([...allMeds, oneMed])
      console.log(oneMed)
    },
    onChange: (currentFormik, nextFormik) => {
      // do whatevs
      // FYI if you alter state it will cause another render
      console.log(currentFormik, nextFormik)
   }
  };

  const OneInput = (c) => (
    <>
    <Formik
      key={c}
      onSubmit={formik.onSubmit}
      initialValues={formik.initialValues}
      render={props =>
        <Form>
          {/* <Effect onChange={formik.onChange} /> */}
          <label htmlFor="drugName">Medication Name</label>
          <Field
            name="drugName"
            placeholder="Medication Name"
            size="40"
          />
          <button type="submit">Enter Another Medication</button>
        </Form>}
    />
    </>
  )

  return (
      <>
        <OneInput />
        <button type="button" onClick={saveMedications}>Save All Medications</button>
        <AddMeds />
      </>
  );
}

export default App;

