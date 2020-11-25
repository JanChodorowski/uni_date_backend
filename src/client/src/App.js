import React, { useState } from 'react';
import { insertUniversity ,insertUniversityWithRoute} from './api';
import './App.css';
import logo from './logo.svg';

function App() {
  const [university, setUniversity] = useState('')

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>   
        <a     
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <input type="text" value={university} onChange={(e) => setUniversity(e.target.value)}/>
        <button onClick={() => insertUniversity(university)}>insertUniversity</button>
        <button onClick={() => insertUniversityWithRoute(university)}>insertUniversityWithRoute</button>

      </header>
    </div>
  );
}

export default App;
