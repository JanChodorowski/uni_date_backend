import React, {useState} from "react";
import {login, secret, refresh,register} from "./api";
import logo from "./logo.svg";
import "./App.css";
import Cookies  from 'universal-cookie';

function App() {
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [email, setEmail] = useState("");

    const handleLogin = () => {
        const user = {
            email,
            password,
        };
        login(user);
    };

    const handleRegister = () => {
        const user = {
            email,
            password,
            passwordConfirmation
        };
        register(user);
    };
    const handleSecret = () => {
        secret();
    };
    const handleRefresh = () => {
        refresh();
    };
    const handleLogOut = () => {
        const cookies = new Cookies();

        console.log('getoken',cookies.get("token"));
        cookies.remove("token")
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
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
                    value={email}
                    placeholder={"email"}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="text"
                    value={password}
                    placeholder={"password"}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="text"
                    value={passwordConfirmation}
                    placeholder={"passwordConfirmation"}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
                <button onClick={handleLogin}>Login</button>
                <button onClick={handleSecret}>Secret</button>
                <button onClick={handleRefresh}>Refresh</button>
                <button onClick={handleLogOut}>LogOut</button>
                <button onClick={handleRegister}>Register</button>
            </header>
        </div>
    );
}

export default App;
