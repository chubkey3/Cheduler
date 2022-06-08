import React from 'react';
import {Link} from 'react-router-dom';

function NotFound(){
    return (
        <>
            <h1>I Can't Find What You Are Looking For 🙈</h1>
            <img width="300px" height="300px" alt="little deb" src={require("../assets/chubkeyicon.jpeg")}></img><br></br>
            <Link style={{textDecoration: "none"}}to="/dashboard">Dashboard</Link>
        </>
    )
}

export default NotFound;