import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Navbar from '../components/navbar';

function Dashboard(){
    const [token, setToken] = useState("")
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!localStorage.getItem('token')){
            navigate('/login');
        } else {
            setToken(localStorage.getItem('token'));
            
        }

    }, [navigate])

    console.log(token);

    return (
        <>
            <Navbar active='dashboard'></Navbar>
        </>
    )
}

export default Dashboard;