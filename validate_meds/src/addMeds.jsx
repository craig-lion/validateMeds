
import { Formik, FormikProps, Form, Field, ErrorMessage, FieldArray } from 'formik';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const AddMeds = () => {
  const [submitting, setSubmitting] = useState(true)
  const [medications, setMedications] = useState([])
  const [autocompleteArray, setAutocompleteArray] = useState([])
  useEffect(() => {
    axios.get('https://rxnav.nlm.nih.gov/REST/displaynames')
    .then((names) => { 
      setAutocompleteArray(names.data.displayTermsList.term)
    })
  }, [])
  const handleSubmit = (values) => {
    setSubmitting(false);
    console.log('medications: ', medications)

  }
  
  const saveAllMeds = () => {
    console.log('we are now saving medications: ', medications)
  }
    return(
      <Formik
        initialValues={{
          medications: medications
        }}
        validate={(values) => {
          let errors = [];
         
          if(!values.medications.length)
            errors.medications = "At least one medication is required";
          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {formProps => {
          return(
            <Form>
              <FieldArray
                name='medications'
              >
                {arrayHelpers => (
            	   <div>         
                   {formProps.values.medications.map((medication, index) => (    
    
                     <div key={index}>
							       
                      {/* Edit the value here */}
                      <Field 
                        name={`medications.${index}`}
                        id={medication}
                      >
                        {() => (
                          <Autocomplete
                          id={`${index}`}
                          freeSolo
                          options={autocompleteArray.map((med) => med)}
                          renderInput={(params) => (
                            <TextField {...params} label="Enter Medication" margin="normal" variant="outlined" />
                          )}
                        /> 
                        )}
                       </Field> 
                         
							         
                        {/* Add this medication to array */}
                        <button 
                         type="button"
                         onClick={
                           () => {
                            const newMed = {
                              drugName:document.getElementById(`${index}`).value,
                              Rxnorm: null
                            }
                            axios.get('/api/getId', {
                              params:{name:newMed.drugName}
                            })
                            .then(id => newMed.Rxnorm = id.data[0])
                            setMedications([
                          ...medications.slice(0,index), 
                          newMed,
                          ...medications.slice(index)
                            ])
                          }
                          }
                        >Save Medication</button> 

                       {/* Remove this medication */}
                       <button 
                          type="button"
                          onClick={() => {
                            medications.splice(index,1)
                            setMedications(medications)
                            arrayHelpers.remove(index)
                          }}
                        >Remove Medication</button>
							      
                            
                     </div>
                  ))}

                  {/* Add a new empty medication at the end of the list */}
                  <button 
                    type="button"
                    onClick={() => arrayHelpers.push('')}
                  >Add Medication</button>
                  <button 
                    type="button"
                    onClick={saveAllMeds}
                  >Save Medications</button>
                 </div>
            	  )}
            	</FieldArray>
              </Form>
          );
        }}
      </Formik>);
  }

  export default AddMeds
