import logo from './logo.svg';
import './App.css';
import Input from './components/Input';
import { useState } from 'react';
import { Input2 } from './components/input2';

function App() {

  const [inputValue, setInputValue] = useState('');

  const inputSubmit = () => {
    console.log("inputValue ", inputValue);
  }

  return (
    <>
      <div className="App">
        <h1>Hey there Bajaj</h1>
        <input type='text' className='UserInput' onChange={(event) => {
          setInputValue(event.target.value); // Directly set the input value
          console.log(event.target.value);
        }} />
        <button onClick={inputSubmit}>Submit</button>
      </div>
      <div className='jsonField'>
        <Input2 />
      </div>
    </>
    
  );
}

export default App;
