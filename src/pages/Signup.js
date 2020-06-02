import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import logoImg from "../img/logo.jpg";
import { Button } from "antd";
import { Card, Form } from "../components/AuthForm";
import axios from "axios";
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

function Signup() {
  const [save, updateSave] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/account")
      .then((result) => setData(result.data));
  }, []);
  const generate = () => {
    const key = ec.genKeyPair();
    updateSave(key.getPrivate("hex"));//private key
    console.log(key.getPrivate("hex"))
    const myKey = ec.keyFromPrivate(key.getPrivate("hex"));
    const addr = myKey.getPublic('hex')
    // fullAdd.slice(11, fullAdd.length - 12);

    const newAcc = {
      id: data.length + 1,
      privateKey: key.getPrivate("hex"),
      balance: 0,
      address: addr,
    };
    axios.post("http://localhost:3000/account", newAcc);
  };

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

        <Button type="primary" onClick={generate} shape="round" style={{ width: 300 }}>
          Generate Private Key
        </Button>
        <label>{save!==""?`Your private key is: ${save}`:""}</label>
      </Form>
      <Link to="/login">{save!==""?`Access to your account`:"Already have an account?"}</Link>
    </Card>
  );
}

export default Signup;
