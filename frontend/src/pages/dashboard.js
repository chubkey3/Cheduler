import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Navbar from '../components/navbar';
import Today from '../components/today';

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
        <div className='dashboard'>
            <Navbar active='dashboard'></Navbar>
            <Today></Today>
        </div>
    )
}

export default Dashboard;