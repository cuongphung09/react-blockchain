import React, { useState, useEffect } from "react";
import { Button, Card, Input, Select, Table, Space, message, notification } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";
import axios from "axios";
import { BlockChain, Transaction } from "../context/blockchain";
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const { Option } = Select;
const SHA256 = require('crypto-js/sha256');
function Admin(props) {
    const [amount, setAmount] = useState()
    const [toAdd, settoAdd] = useState('')
    const myPrivateKey = localStorage.getItem("tokens");

    const myKey = ec.keyFromPrivate(myPrivateKey.slice(1, myPrivateKey.length - 1));
    const myWalletAddress = myKey.getPublic('hex');

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
                return JSON.stringify(item.privateKey) === myPrivateKey;
            });
            setMyAcc(acc);

        });
        axios.get("http://localhost:3000/blockchain").then((result) => {
            setBC(result.data);


            let LB = result.data[result.data.length - 1];
            setlastBlock(LB);
        });
        axios.get("http://localhost:3000/pendingTransaction").then((result) => {
            setpending(result.data);
        })


    }, []);


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
        marginBottom: 70,
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
                    <p disabled={"disabled"} style={{ color: "white" }} >
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
                <Input style={{ width: 400 }} value={amount} onChange={(e) => { setAmount(e.target.value) }}></Input>
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
                    onSelect={(value, event) => { settoAdd(value) }}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {data.map((item) => {
                        return (
                            <Option value={item.address} key={item.id} disabled={item.address === myAcc[0].address ?true: false}>
                                {item.address === myAcc[0].address ? `My account: ${item.address}` : item.address}
                            </Option>
                        );
                    })}
                </Select>
                <br />
                <br />
                <Button onClick={() => {
                    const newPending = {
                        id: pending.length + 1,
                        fromAddress: myAcc[0].address,
                        toAddress: toAdd,
                        amount: amount,
                    }
                    setpending([...pending, newPending])
                    if (!amount || !toAdd) {
                        message.error('Please fill all neccessary fields to send transaction!');
                    }

                    axios.post("http://localhost:3000/pendingTransaction", newPending)
                    setpending([...pending, newPending])
                }}>Send transaction</Button>
            </Card>
            <h2 style={{ margin: 10 }}>Succeed transaction Block Chain</h2>
            <Table scroll={{ x: 'max-content' }}
                style={{ margin: 10 }}
                columns={[
                    {
                        fixed: 'left',
                        title: "Previous Hash",
                        dataIndex: "previousHash",
                        key: "previousHash",
                        render: (text) => <p>{text}</p>,
                    },
                    {
                        title: "Hash",
                        dataIndex: "hash",
                        key: "hash",
                        render: (text) => <p>{text}</p>,
                    },
                    {
                        title: "From Address",
                        dataIndex: "transaction",
                        key: "hash",
                        render: (text) => <p>{text[0].fromAddress}</p>,
                    },
                    {
                        title: "To Address",
                        dataIndex: "transaction",
                        key: "hash",
                        render: (text) => <p>{text[0].toAddress}</p>,
                    },
                ]}
                dataSource={BC}
            >

            </Table>
            <h2 style={{ margin: 10 }}>
                Pending transaction Block Chain(Proof of Work)<br />
                Let's mine transaction and you'll get 10 coins for each mine
      </h2>
            <Table scroll={{ x: 'max-content' }}
                style={{ margin: 10 }}
                columns={[
                    {

                        title: "From Address",
                        dataIndex: "fromAddress",
                        key: "hash",
                        render: (text) => <p>{text}</p>,
                    },
                    {

                        title: "To Address",
                        dataIndex: "toAddress",
                        key: "hash",
                        render: (text) => <p>{text}</p>,
                    },
                    {
                        width: 100,
                        title: "Amount",
                        dataIndex: "amount",
                        key: "hash",
                        render: (text) => <p>{text}</p>,
                    },
                    {
                        fixed: 'right',
                        width: 100,
                        title: "Action",
                        key: "action",
                        render: (text, record) => (
                            <Space size="middle">
                                <Button onClick={() => {
                                    notification.open({
                                        message: 'Mining transaction!',
                                        icon: <LoadingOutlined style={{ fontSize: 24 }} spin />,
                                        duration: 10
                                    });
                                    let newBlock = {
                                        id: BC.length + 1,
                                        timestamp: Date.now(),
                                        transaction: [{
                                            fromAddress: text.fromAddress,
                                            toAddress: text.toAddress,
                                            amount: text.amount
                                        }],
                                        previousHash: lastBlock.hash,
                                        hash: SHA256(text.fromAddress + text.toAddress + text.amount).toString(),
                                        nonce: 0
                                    }
                                    // axios.post("http://localhost:3000/blockchain", newBlock)
                                    const timer = setTimeout(() => {

                                        // Do with pending transaction
                                        setpending(pending.filter(function (item) { return item.id !== text.id }))
                                        axios.delete(`http://localhost:3000/pendingTransaction/${text.id}`)
                                        //Do with Blockchain
                                        const NBC = [...BC, newBlock]
                                        axios.post("http://localhost:3000/blockchain", newBlock)
                                        setBC(NBC)
                                        //Do with account
                                        const fromAcc = data.filter(item => item.address === text.fromAddress)
                                        axios.put(`http://localhost:3000/account/${fromAcc[0].id}/`, {
                                            id: fromAcc[0].id,
                                            balance: fromAcc[0].balance - text.amount,
                                            privateKey: fromAcc[0].privateKey,
                                            address: fromAcc[0].address
                                        })
                                        const toAcc = data.filter(item => item.address === text.toAddress)
                                        axios.put(`http://localhost:3000/account/${toAcc[0].id}/`, {
                                            id: toAcc[0].id,
                                            balance: parseInt(toAcc[0].balance) + parseInt(text.amount),
                                            privateKey: toAcc[0].privateKey,
                                            address: toAcc[0].address
                                        })
                                        axios.put(`http://localhost:3000/account/${myAcc[0].id}/`, {
                                            balance: myAcc[0].balance + 10,
                                            privateKey: myAcc[0].privateKey,
                                            address: myAcc[0].address
                                        })
                                        let myAccUpdate = [{
                                            id: myAcc[0].id,
                                            privateKey: myAcc[0].privateKey,
                                            balance: myAcc[0].balance + 10,
                                            address: myAcc[0].address,
                                        }]
                                        setMyAcc(myAccUpdate)
                                        notification.open({
                                            message: 'Mine successfully',
                                            description: 'You will receive 10 coin as reward',
                                            data: newBlock
                                        })
                                    }, 10000);
                                    return () => clearTimeout(timer);

                                }}>Mine</Button>
                            </Space>
                        ),
                    },
                ]}
                dataSource={pending.filter(item => (item.fromAddress !== myAcc[0].address) && (item.toAddress !== myAcc[0].address))}
            >

            </Table>
        </div>
    );
}

export default Admin;
