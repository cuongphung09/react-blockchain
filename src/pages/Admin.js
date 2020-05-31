import React, { useState, useEffect } from "react";
import { Button, Card, Input, Select, Table,Space } from "antd";

import { useAuth } from "../context/auth";
import { Link, Redirect } from "react-router-dom";
import "antd/dist/antd.css";
import axios from "axios";
import { BlockChain, Transaction } from "../context/blockchain";
var account = require("../store/account").account;
const { Option } = Select;
function Admin(props) {
  const [amount,setAmount] = useState()
  const [toAdd,settoAdd] = useState('')
  const myKey = localStorage.getItem("tokens");
  const [data, setData] = useState([]);
  const [BC, setBC] = useState([]);
  const [pending, setpending] = useState([]);
  const [myAcc, setMyAcc] = useState([
    {
      id: 0,
      privateKey: "0",
      balance: "0",
      address: "0",
    },
  ]);
  const [lastBlock, setlastBlock] = useState([
    {
      id: 0,
      timestamp: "",
      transaction: "",
      previousHash: "",
      hash: "",
      nonce: "",
    },
  ]);
  useEffect(() => {
    axios.get("http://localhost:3000/account").then((result) => {
      setData(result.data);
      let acc = result.data.filter(function (item) {
        return JSON.stringify(item.privateKey) === myKey;
      });
      setMyAcc(acc);
      //   setMyAcc(
      //     data.filter(function (item) {
      //       return JSON.stringify(item.privateKey) === myKey;
      //     })
      //   );
    });
    axios.get("http://localhost:3000/blockchain").then((result) => {
      setBC(result.data[0].chain);
      setpending(result.data[0].pendingTransaction);
      // setlastBlock(result.data[result.data.length -1]);
      let LB = result.data[0].chain[result.data[0].chain.length - 1];
      setlastBlock(LB);
    });
  }, []);

  // useEffect(() => {
  //   axios.get("http://localhost:3000/blockchain").then((result) => {
  //     setBC(result.data);
  //     console.log(result.data)
  //     console.log(BC)
  //   });

  // }, []);
  const [myBalance, setBalance] = useState(myAcc.balance);
  const { setAuthTokens } = useAuth();

  function logOut() {
    localStorage.removeItem("tokens");
    props.history.push("/login");
  }
  const mainHeader = {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
  };
  const LOButton = {
    width: 100,
    height: 30,
    alignItems: "center",
    alignSelf: "center",
    margin: 10,
  };
  return (
    <div style={{}}>
      <header style={mainHeader}>
        <p
          style={{
            fontSize: 40,
            fontWeight: "bold",
            fontFamily: "Lucida Console",
          }}
        >
          MY COIN WALLET
        </p>
        <Button style={LOButton} onClick={logOut} type="primary" shape="round">
          Log out
        </Button>
      </header>
      <div style={{ justifyContent: "flex-start", display: "flex" }}>
        <Card
          style={{
            backgroundColor: "#7070E3",
            margin: 10,
            width: 300,
            wordWrap: "break-word",
          }}
          hoverable={true}
        >
          <label style={{ fontSize: 30, color: "white" }}>Address</label>
          <p disabled={"disabled"} style={{ color: "white" }}>
            {myAcc[0].address}
          </p>
          <br />
        </Card>
        <Card
          style={{
            backgroundColor: "#5A78F0",
            margin: 10,
            width: 300,
            wordWrap: "break-word",
          }}
          hoverable={true}
        >
          <label style={{ fontSize: 30, color: "white" }}>Balance</label>
          <p disabled={"disabled"} style={{ color: "white" }}>
            {myAcc[0].balance} COIN
          </p>
          <br />
        </Card>
        <Card
          style={{
            backgroundColor: "#25B0E8",
            margin: 10,
            width: 300,
            wordWrap: "break-word",
          }}
          hoverable={true}
        >
          <label style={{ fontSize: 30, color: "white" }}>Network</label>
          <p disabled={"disabled"} style={{ color: "white" }}>
            Last block: #{lastBlock.hash}
          </p>
          <br />
        </Card>
      </div>
      <Card
        style={{
          justifyContent: "center",
          display: "flex",
          margin: 10,
          alignItems: "center",
        }}
      >
        <p style={{ fontSize: 20, fontWeight: "bold" }}>Send Transaction</p>
        <label>Amount: </label>
        <br />
        <Input style={{ width: 400 }} value={amount} onChange={(e)=>{setAmount(e.target.value)}}></Input>
        <br />

        <label>To Address: </label>
        <br />
        <Select
          showSearch
          style={{ width: 400 }}
          placeholder="Select an address"
          optionFilterProp="children"
          // onChange={onChange}
          // onFocus={onFocus}
          // onBlur={onBlur}
          // onSearch={onSearch}
          onSelect={(value,event)=>{settoAdd(value)}}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {data.map((item) => {
            return (
              <Option value={item.address} key={item.id}>
                {item.address===myAcc[0].address?'My account':item.address}
              </Option>
            );
          })}
        </Select>
        <br />
        <br />
        <Button onClick={()=>{
          console.log(amount,toAdd,myAcc[0].address)
        }}>Send transaction</Button>
      </Card>
      <h2 style={{ margin: 10 }}>Succeed transaction Block Chain</h2>
      <Table
        style={{ margin: 10 }}
        columns={[
          {
            title: "Previous Hash",
            dataIndex: "previousHash",
            key: "previousHash",
            render: (text) => <a>{text}</a>,
          },
          {
            title: "Hash",
            dataIndex: "hash",
            key: "hash",
            render: (text) => <a>{text}</a>,
          },
          {
            title: "From Address",
            dataIndex: "transaction",
            key: "hash",
            render: (text) => <a>{text[0].fromAddress}</a>,
          },
          {
            title: "To Address",
            dataIndex: "transaction",
            key: "hash",
            render: (text) => <a>{text[0].toAddress}</a>,
          },
        ]}
        dataSource={BC}
      >
        {console.log(BC)}
      </Table>
      <h2 style={{ margin: 10 }}>
        Pending transaction Block Chain(Proof of Work)
      </h2>
      <Table
        style={{ margin: 10 }}
        columns={[
          {
            title: "From Address",
            dataIndex: "fromAddress",
            key: "hash",
            render: (text) => <a>{text}</a>,
          },
          {
            title: "To Address",
            dataIndex: "toAddress",
            key: "hash",
            render: (text) => <a>{text}</a>,
          },
          {
            title: "Amount",
            dataIndex: "amount",
            key: "hash",
            render: (text) => <a>{text}</a>,
          },
          {
            title: "Action",
            key: "action",
            render: (text, record) => (
              <Space size="middle">
                <Button>Mine</Button>
              </Space>
            ),
          },
        ]}
        dataSource={pending}
      >
        {console.log(BC)}
      </Table>
    </div>
  );
}

export default Admin;
