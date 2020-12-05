import React, { useState } from "react";
import { signIn, secret } from "./api";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSignIn = () => {
    const user = {
      username,
      password,
    };
    signIn(user);
  };
  const handleSecret = () => {
    secret();
  };
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
          Learn React siema simea
        </a>
        <input
          type="text"
          value={username}
          placeholder={"username"}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          value={password}
          placeholder={"password"}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSignIn}>SignIn</button>
        <button onClick={handleSecret}>Secret</button>
      </header>
    </div>
  );
}

export default App;
