import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
// import logoImg from "../img/logo.jpg";
import { Card, Logo, Form, Input, Button, Error } from "../components/AuthForm";
import { useAuth } from "../context/auth";

function Login(props) {
    const priArray = ['111', '222']
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [privateKey, setprivateKey] = useState("");
    const { setAuthTokens } = useAuth();
    const referer = props.location.state.referer || '/';
    function postLogin() {
        if(priArray.indexOf(privateKey)>=0){
            setAuthTokens('login');
            setLoggedIn(true);
        }else{
            setIsError(true);
        }

    }

    if (isLoggedIn) {
        return <Redirect to={referer} />;
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