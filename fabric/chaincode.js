const path = require('path');
const fs = require('fs');
const { Gateway, Wallets } = require('fabric-network');

exports.invoke = async (orgName, channelName, chaincodeName, params) => {
    try {
        const ccpPath = path.resolve('connection-profile.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        const walletPath = path.join(process.cwd(), `wallet/${orgName}`);
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        const identity = await wallet.get('admin');
        if (!identity) {
            console.log('An identity for the user "admin" does not exist in the wallet');
            console.log('Run the registerUser.ts application before retrying');
            return;
        }

        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'admin', discovery: { enabled: false, asLocalhost: true } });
        const network = await gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);
        const result = await contract.submitTransaction(...params);
        console.log(`Transaction has been submitted`);

        await gateway.disconnect();
        return result.toString();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        return;
    }
};

exports.query = async (orgName, channelName, chaincodeName, params) => {
    try {
        const ccpPath = path.resolve('connection-profile.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        const walletPath = path.join(process.cwd(), `wallet/${orgName}`);
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        const identity = await wallet.get('admin');
        if (!identity) {
            console.log('An identity for the user "admin" does not exist in the wallet');
            console.log('Run the registerUser.ts application before retrying');
            return;
        }

        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'admin', discovery: { enabled: false, asLocalhost: true } });
        const network = await gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);
        const result =  await contract.evaluateTransaction(...params);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

        await gateway.disconnect();
        return result.toString();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        return;
    }
};