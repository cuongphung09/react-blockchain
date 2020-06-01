import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import logoImg from "../img/logo.jpg";
import { Card, Form, Error } from "../components/AuthForm";
import { useAuth } from "../context/auth";
import { Input, Button } from "antd";
function Login(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/account")
      .then((result) => setData(result.data));
  }, []);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [privateKey, setprivateKey] = useState("");
  const { setAuthTokens } = useAuth();
  if (localStorage.getItem("tokens")) {
    props.history.push("/admin");
  }

  function postLogin() {
    if (data.map((e) => e.privateKey).indexOf(privateKey) >= 0) {
      setAuthTokens(privateKey);
      setLoggedIn(true);
    } else {
      setIsError(true);
    }
  }

  return (
    <Card>
      <p
        style={{
          fontSize: 40,
          fontWeight: "bold",
          fontFamily: "Lucida Console",
        }}
      >
        MY COIN WALLET
      </p>
      <Form>
        <Input
          type="privateKey"
          value={privateKey}
          onChange={(e) => {
            setprivateKey(e.target.value);
          }}
          placeholder="enter private key"
          style={{ maxWidth: 300 }}
        />
        <br />
        <Button
          type="primary"
          onClick={postLogin}
          shape="round"
          style={{ width: 150 }}
        >
          NEXT
        </Button>
      </Form>
      <Link to="/signup">Don't have an account?</Link>
      {isError && (
        <Error><p style={{ color: 'red' }}>The username or password provided were incorrect!</p></Error>
      )}
    </Card>
  );
}

export default Login;
