import React, { useState, useEffect } from "react";
import { Button } from "../components/AuthForm";
import { useAuth } from "../context/auth";
import { Link, Redirect } from "react-router-dom";
import axios from "axios"
var account = require('../store/account').account
function Admin(props) {
    const myKey = localStorage.getItem('tokens');
    const [data, setData] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:3000/account")
            .then(result => setData(result.data));
        console.log({...data,"anc": "12"})
    }, []);


    

    const myAcc = account.filter(function (item) {
        return (JSON.stringify(item.privateKey) === myKey)
    })
    const [myBalance, setBalance] = useState(myAcc.balance)
    const { setAuthTokens } = useAuth();

    function logOut() {
        localStorage.removeItem('tokens')
        props.history.push('/login')
    }
    const mainHeader = {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
    const LOButton = {
        width: 100,
        height: 30,
        alignItems: 'center',
        alignSelf: 'center',
        margin: 10,
    }
    return (
        <div>
            <header style={mainHeader}>
                <div>MY COIN</div>
                <Button style={LOButton} onClick={logOut}>Log out</Button>
            </header>
            {/* <p>My key : {myAcc[0].privateKey}</p>
            <p>My address : {myAcc[0].address}</p>
            <p>My balance : {myAcc[0].balance}</p> */}
            {/* <Button onClick={() => {
                const n = balance - 10
                setBalance(n)
                account.find((e)=>{
                    return e.privateKey = myKey
                }).balance -=10
                console.log(account)
            }
            }> -10 coin</Button> */}
        </div>
    );
}

export default Admin;