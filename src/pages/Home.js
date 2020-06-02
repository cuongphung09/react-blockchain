import React from "react";
import { Card } from "antd";
// const EC = require("elliptic").ec;
// const ec = new EC("secp256k1");

function Home(props) {
  return (
    <div style={{ margin: 10, flexDirection: 'row', flex: 1,}}>
      <p
        style={{
          fontSize: 40,
          fontWeight: 'bold',
          fontFamily:'Lucida Console'
        }}
      >
        MY COIN WALLET
      </p>
      <div style={{ display: 'flex',justifyContent: 'flex-start',}}>
        <Card hoverable={true}
          title="Create a new wallet"
          headStyle={{color: 'white'}}
          style={{ width: 300, marginRight: 10, backgroundColor: '#5A78F0' }}
          onClick={() => {
            props.history.push("/signup");
          }}
        >
          <p style={{color:'white'}}>Generate your own unique MyCoin wallet. Receive a private key to login</p>
          <h1 style={{color:'white'}}>Get started ➜</h1>
        </Card>
        <Card hoverable={true}
          title="Access my wallet"
          headStyle={{color: 'white'}}
          style={{ width: 300, backgroundColor: '#05C0A5' }}
          onClick={() => {
            props.history.push("/login");
          }}
        >
          <p style={{color:'white'}}>Connect to the blockchain using your private key</p>
          <h1 style={{color:'white'}}>Access now ➜</h1>
        </Card>
      </div>
    </div>
  );
}

export default Home;
