import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
// import logoImg from "../img/logo.jpg";
import { Card, Logo, Form, Input, Button } from '../components/AuthForm';
import axios from "axios";
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

function Signup() {
  const [save, updateSave] = useState('')
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/account")
      .then(result => setData(result.data));
  }, []);
  const generate = () => {
    const key = ec.genKeyPair();
    updateSave(key.getPrivate('hex'))
    const newAcc = {
      id: data.length+1,
      privateKey: key.getPrivate('hex'),
      balance: 0,
      address: ec.keyFromPrivate(key.getPrivate('hex'))
    }
    // const temp = data.push(newAcc)
    // setData(temp)
    // console.log(data)
    axios.post("http://localhost:3000/account",newAcc)

  }

  return (
    <Card>
      {/* <Logo src={logoImg} /> */}
      <Form>
        {/* <Input type="email" placeholder="email" />
        <Input type="password" placeholder="password" />
        <Input type="password" placeholder="password again" /> */}
        <Button onClick={generate}>Generate Private Key</Button>
        <label>Your private key is: {save}</label>
        
        {/* <ul>
          {data.map(item => (
            <li key={item.username}>
              {item.username}: {item.name}
            </li>
          ))}
        </ul> */}
      </Form>
      <Link to="/login">Already have an account?</Link>
    </Card>
  );
}

export default Signup;