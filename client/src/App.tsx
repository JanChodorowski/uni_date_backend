import React from 'react';
import { insertUniversity, postUniversity } from './api';
import './App.css';
import logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={insertUniversity}>insertUniversity</button>
        <button onClick={postUniversity}>postUniversity</button>

      </header>
    </div>
  );
}

export default App;
