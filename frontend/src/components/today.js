import React, { useEffect, useState } from 'react'
import axios from 'axios'
import TaskContainer from './(Optional)task-container';

export default function Today() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        let date = new Date();
        axios.get('/tasks/day', {params: {date: date.getDate()-3, month: date.getMonth()+1}, headers: {
            "access-token": localStorage.getItem('token')
        }}) 
            .then((res) => {
                setTasks(res.data)
            })
    }, [])
    return (
        <div className='today-container'>{
            tasks.map((task) => (
                <h3 key={task.title}>{task.title}</h3>
            ))
        }</div>
    )
}
