const express = require('express');
const bodyParser = require('body-parser');
const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Set up the app to use body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Route to handle form submission
app.post('/submit', async (req, res) => {
  try {
    // Connect to the gateway
    const ccpPath = '../../organizations/peerOrganizations/farmer.example.com/connection-farmer.json';
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

    const walletPath = path.join(process.cwd(), 'wallet');
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: 'appid',
      discovery: { enabled: true, asLocalhost: true },
    });

    // Get the network and contract
    const network = await gateway.getNetwork('mychannel');
    const contract = network.getContract('fabcar');

    // Submit the transaction
    await contract.submitTransaction(
      'createCar',
      req.body.name,
      req.body.name1,
      req.body.name2,
      req.body.email,
      req.body.age.toString()
    );

    // Disconnect from the gateway
    await gateway.disconnect();

    // Send a response to the client
    res.send('Transaction submitted successfully');
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    res.status(500).send(`Failed to submit transaction: ${error}`);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
