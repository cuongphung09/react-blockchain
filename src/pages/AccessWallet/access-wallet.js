import React from 'react';
import { Link } from 'react-router-dom';

const AccessWallet = (props) => {
    return (
        <div>
            <h1>Private key</h1>
            <input placeholder='Enter private key' name='private-key' ></input>
            <p>Logged in status: {props.user}</p>
            <button onClick={props.handleLogin}>Log In</button>
        </div>
    )
};

export default AccessWallet;
