import React, { useState,useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
// import logoImg from "../img/logo.jpg";
import { Card, Logo, Form, Input, Button, Error } from "../components/AuthForm";
import { useAuth } from "../context/auth";


function Login(props) {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios
          .get("http://localhost:3000/account")
          .then(result => setData(result.data));
      }, []);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [privateKey, setprivateKey] = useState("");
    const { setAuthTokens } = useAuth();
    if(localStorage.getItem('tokens')){
        props.history.push('/admin')
    }
    
    function postLogin() {
        if (data.map(e=>e.privateKey).indexOf(privateKey) >= 0) {
            setAuthTokens(privateKey);
            setLoggedIn(true);
        } else {
            setIsError(true);
        }

    }

    return (
        <Card>
            <Form>
                <Input
                    type="privateKey"
                    value={privateKey}
                    onChange={e => {
                        setprivateKey(e.target.value);
                    }}
                    placeholder="enter private key"
                />
                <Button onClick={postLogin}>NEXT</Button>
            </Form>
            <Link to="/signup">Don't have an account?</Link>
            {isError && <Error>The username or password provided were incorrect!</Error>}
        </Card>
    );
}

export default Login;