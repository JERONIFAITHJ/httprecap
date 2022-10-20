import classes from './Form.module.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useRef, useReducer } from 'react';


const Form = ({dataDispatched}) => {
  
  const [enteredName, setEnteredName] = useState('');
  const [enteredFeedback, setEnteredFeedback] = useState('');
  const [error, setError] = useState(null);
  
  const dispatchData = async (name, feed) => {
    try{
    const resp = await fetch('https://feedback-form-2e760-default-rtdb.asia-southeast1.firebasedatabase.app/userData.json', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        userName: name,
        feedback: feed
      })
    });
    if(!resp.ok){
      throw new Error('Something went wrong!');
    }
    const modifiedResp = await resp.json();
    await dataDispatched({status: true, error});
  }
  catch(err){
    setError(err);
  }
  }
  
  const userNameHandler = e => {
    setEnteredName(e.target.value);
  }

  const feedbackHandler = e => {
    setEnteredFeedback(e.target.value);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if(enteredName === '' || enteredFeedback === ''){
      return;
    }
    
    dispatchData(enteredName, enteredFeedback);
    
    setEnteredName('');
    setEnteredFeedback('');

  }
  
  return (
    <div>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: ['85%', '85%', '40%'], color: 'primary' }
        }}
        noValidate
        autoComplete="off"
        >
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <TextField color={'secondary'} onChange={userNameHandler} value={enteredName} id="outlined-basic" label="Name" variant="outlined" />
          <TextField
            color={'secondary'}
            id="outlined-multiline-static"
            label="Feedback"
            multiline
            onChange={feedbackHandler}
            value={enteredFeedback}
            rows={4}
            />
          <div style={{ marginTop: '20px' }}>
            <Button sx={{ backgroundColor: 'black', '&:hover': { backgroundColor: '#3f3e3e' } }} onClick={submitHandler} variant="contained">Submit</Button>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default Form;


// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'ADD':
//       return {
//         userName: action.userData.userName,
//         feedback: action.userData.feedback
//       }
//     default:
//       console.log('Default');
//   }
// }
// const [formVal, setFormVal] = useReducer(reducer, {});