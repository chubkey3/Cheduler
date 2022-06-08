import React, {useState, useEffect} from "react";
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';

function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [invalidlogin, setInvalidlogin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')){
            navigate('/dashboard');
        }

    }, [navigate])

    const handleLogin = async (e) => {
        e.preventDefault()

        axios.post('http://localhost:3001/login', {username: username, password: password})
            .then(res => {
                navigate('/dashboard')
                localStorage.setItem('token', res.data);
                setInvalidlogin(false);
            })
            .catch(function(error) {
                if (error.response){
                    setInvalidlogin(true);
                }
            })

        setUsername("");
        setPassword("");
    }

    return(
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <label>
                    Username
                    <input value={username} type="text" onChange={e => setUsername(e.target.value)}/>                    
                </label>
                <label>
                    Password
                    <input value={password} type="password" onChange={e => setPassword(e.target.value)}/>                    
                </label>
                <input value="Login" type="submit"></input>
            </form>
            {invalidlogin && <div className="invalid-login">Invalid Username and/or Password</div>}
            <Link to="/signup">Sign Up</Link>
        </div>
    )
}

export default Login;


