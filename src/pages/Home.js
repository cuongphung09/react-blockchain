import React from "react";
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
function Home(props) {
  return <div>
    {
      ec.keyFromPrivate('1111').getPublic('hex')
    }

  </div>;

}

export default Home;