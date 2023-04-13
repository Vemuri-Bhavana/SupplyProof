'use strict';

const { Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter enrollment id: ', async (eid) => {
    console.log(`You entered: ${eid}`);

    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'organizations', 'peerOrganizations', 'warehouse.example.com', 'connection-warehouse.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new CA client for interacting with the CA.
        const caURL = ccp.certificateAuthorities['ca.warehouse.example.com'].url;
        const ca = new FabricCAServices(caURL);

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userIdentity = await wallet.get(eid);
        if (userIdentity) {
            console.log(`An identity for the user ${eid} already exists in the wallet`);
            return;
        }

        // Check to see if we've already enrolled the admin user.
        const adminIdentity = await wallet.get('warehouse_admin');
        if (!adminIdentity) {
            console.log(`An identity for the warehouse_admin user ${eid} does not exist in the wallet`);
            console.log(`Run the enrollAdmin.js application before retrying`);
            return;
        }

        // build a user object for authenticating with the CA
        const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
        const adminUser = await provider.getUserContext(adminIdentity, 'warehouse_admin');

        // Register the user, enroll the user, and import the new identity into the wallet.
        const secret = await ca.register({
            enrollmentID: eid,
            role: 'client'
        }, adminUser);
        const enrollment = await ca.enroll({
            enrollmentID: eid,
            enrollmentSecret: secret
        });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'WarehouseMSP',
            type: 'X.509',
        };
        await wallet.put(eid, x509Identity);
        console.log(`Successfully registered and enrolled warehouse_admin use ${eid} and imported it into the wallet`);

    } catch (error) {
        console.error(`Failed to register warehouse ${eid}: ${error}`);
        process.exit(1);
    }

    rl.close();
});