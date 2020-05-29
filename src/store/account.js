const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const account = [
    {
        privateKey: 'db97cd2cfe74b3a24da25d2d9afbde3cda0169b2768e49c44f918ac2f5368549',
        balance: '50',
        address: ec.keyFromPrivate('db97cd2cfe74b3a24da25d2d9afbde3cda0169b2768e49c44f918ac2f5368549').getPublic('hex'),
    },
    {
        privateKey: '0d620f8857237ade2269ee459a0aca38ad70d790913fb308d96caa3dd5c3579a',
        balance: '200',
        address: ec.keyFromPrivate('0d620f8857237ade2269ee459a0aca38ad70d790913fb308d96caa3dd5c3579a').getPublic('hex'),

    },
    {
        privateKey: '111',
        balance: '300',
        address: ec.keyFromPrivate('111').getPublic('hex'),
    }
];
exports.account= account;
module.exports.push2arr = function(val)
{
   account.push(val)
};
