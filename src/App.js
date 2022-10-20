import { useState, useEffect } from 'react';
import Form from './Components/Form';
import classes from './App.module.css'
import img from './Assets/peeking.jpg'
import RenderFeedbacks from './Components/RenderFeedbacks';

function App() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [dataSent, setDataSent] = useState(true);

  const fn = async() => {     // A function that fetches the available feedback data from the DB
    try{
      const res = await fetch('https://feedback-form-2e760-default-rtdb.asia-southeast1.firebasedatabase.app/userData.json');
      if(!res.ok){
        throw new Error('Something went wrong!');
      }
      const resModified = await res.json();
      let feed = []
      for(const item in resModified){
        feed.push({userName : resModified[item].userName, feedback: resModified[item].feedback})
      }
      setFeedbacks(feed);
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    if(dataSent){           // Checking whether a post request is sent If so, then update the feedback list
      fn();                 // Without this condition useEffect will have no effect
      setDataSent(false);
    }
  }, [dataSent])

  const dataHandler = (props) => {
    if(props.error){
      return;
    }
    setDataSent(props);     // dataSent state is updated by the child component whenever a post req is sent
  }

  return (
    <div>
      <h1>A basic feedback form</h1>
      <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
        <img className={classes.image} src={img} />
      </div>
      <div className={classes.app}>
        <Form dataDispatched={dataHandler} />
      </div>
      <RenderFeedbacks feedbacks={feedbacks} />
    </div>
  );
}

export default App;