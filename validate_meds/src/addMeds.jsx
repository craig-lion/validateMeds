
import { Formik, FormikProps, Form, Field, ErrorMessage, FieldArray } from 'formik';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const AddMeds = () => {
  const [submitting, setSubmitting] = useState(true)
  const [medications, setMedications] = useState([''])
  const [autocompleteArray, setAutocompleteArray] = useState([])
  useEffect(() => {
    axios.get('https://rxnav.nlm.nih.gov/REST/displaynames')
    .then((names) => { 
      setAutocompleteArray(names.data.displayTermsList.term)
    })
  })
  const handleSubmit = (values) => {
    setSubmitting(false);
    console.log('medications: ', medications)

  }

  const saveMed = (e) => {
    console.log('here is where we would update medications', e.getElement)
  }
  
  const saveAllMeds = () => {
    console.log('this is medications: ', medications)
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
        render={formProps => {
          return(
            <Form>
              <FieldArray
                name='medications'
                render={arrayHelpers => (
            	   <div>         
                   {formProps.values.medications.map((medication, index) => (    
    
                     <div key={index}>
							       
                      {/* Edit the value here */}
                      <Field 
                        name={`medications.${index}`}
                        id={medication}
                        render={() => (
                          <Autocomplete
                          id={medication}
                          freeSolo
                          options={autocompleteArray.map((med) => med)}
                          renderInput={(params) => (
                            <TextField {...params} label="Enter Medication" margin="normal" variant="outlined" />
                          )}
                        /> 
                        )}
                       /> 
                         
							         
                        {/* Add this medication to array */}
                        <button 
                         type="button"
                         onClick={
                           () => {
                            const newMed = formProps.values.medications[index]
                            console.log('this is newMed', newMed)
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
            	/>
              </Form>
          );
        }}
      />);
  }

  export default AddMeds
