
import { Formik, FormikProps, Form, Field, ErrorMessage, FieldArray } from 'formik';
import React, {useState} from 'react';

const AddMeds = () => {
  const [submitting, setSubmitting] = useState(true)
  const [medications, setMedications] = useState([
    'tylenol',
    'advil',
    'asprin',
    'ibuprophen'
  ])
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
                       />     
							         
                        {/* Add this medication to array */}
                        <button 
                         type="button"
                         onClick={
                           () => {
                            const newMed = formProps.values.medications[index]
                            console.log(newMed)
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
