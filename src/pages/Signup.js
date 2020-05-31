import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import logoImg from "../img/logo.jpg";
import { Button, Radio } from "antd";
import { Card, Logo, Form, Input } from "../components/AuthForm";
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
    updateSave(key.getPrivate("hex"));
    const fullAdd = ec.keyFromPrivate(key.getPrivate("hex")).inspect();
    const addr = fullAdd.slice(11, fullAdd.length - 12);
    const newAcc = {
      id: data.length + 1,
      privateKey: key.getPrivate("hex"),
      balance: 0,
      address: addr,
    };
    console.log(newAcc);
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

        <Button type="primary" onClick={generate} shape="round" style={{width: 300}}>
          Generate Private Key
        </Button>
        <label>Your private key is: {save}</label>
      </Form>
      <Link to="/login">Already have an account?</Link>
    </Card>
  );
}

export default Signup;
