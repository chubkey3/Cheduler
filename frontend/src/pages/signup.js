import React, {useState, useEffect} from "react";
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';

function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [invalidusername, setInvalidUsername] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')){
            navigate('/dashboard');
        }

    }, [navigate])

    const handleSignUp = async (e) => {
        e.preventDefault()

        axios.post('http://localhost:3001/signup', {username: username, password: password})
            .then(res => {
                axios.post('http://localhost:3001/login', {username: username, password: password})
                    .then(res => {
                        navigate('/dashboard')
                        localStorage.setItem('token', res.data);
                        setInvalidUsername(false);
                    })
            })
            .catch(function(error) {
                if (error.response){
                    setInvalidUsername(true);
                }
            })

        setUsername("");
        setPassword("");
    }

    return(
        <div className="signup-container">
            <h1>Sign Up</h1>
            <form onSubmit={handleSignUp}>
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
            {invalidusername && <div className="invalid-username">Username Already Exists</div>}
            <Link to="/login">Log In</Link>
        </div>
    )
}

export default Login;


