import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = (props) => {
    return (
        <div>
            <h1>Dashboard</h1>
            
            <button onClick={props.handleLogout}>Log Out</button>
        </div>
    )
};

export default Dashboard;
