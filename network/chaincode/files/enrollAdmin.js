'use strict';

const FabricCAServices = require('fabric-ca-client');
const { Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

async function main() {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'organizations', 'peerOrganizations', 'farmer.example.com', 'connection-farmer.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new CA client for interacting with the CA.
        const caInfo = ccp.certificateAuthorities['ca.farmer.example.com'];
        const caTLSCACerts = caInfo.tlsCACerts.pem;
        const ca = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false }, caInfo.caName);

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the admin user.
        const identity = await wallet.get('farmer_admin');
        if (identity) {
            console.log('An identity for the admin user "farmer_admin" already exists in the wallet');
            return;
        }

        // Enroll the admin user, and import the new identity into the wallet.
        const enrollment = await ca.enroll({ enrollmentID: 'admin', enrollmentSecret: 'adminpw' });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'FarmerMSP',
            type: 'X.509',
        };
        await wallet.put('farmer_admin', x509Identity);
        console.log('Successfully enrolled admin user "farmer_admin" and imported it into the wallet');

    } catch (error) {
        console.error(`Failed to enroll admin user "farmer_admin": ${error}`);
        process.exit(1);
    }

    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'organizations', 'peerOrganizations', 'logistics.example.com', 'connection-logistics.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new CA client for interacting with the CA.
        const caInfo = ccp.certificateAuthorities['ca.logistics.example.com'];
        const caTLSCACerts = caInfo.tlsCACerts.pem;
        const ca = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false }, caInfo.caName);

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the admin user.
        const identity = await wallet.get('logistics_admin');
        if (identity) {
            console.log('An identity for the admin user "logistics_admin" already exists in the wallet');
            return;
        }

        // Enroll the admin user, and import the new identity into the wallet.
        const enrollment = await ca.enroll({ enrollmentID: 'admin', enrollmentSecret: 'adminpw' });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'LogisticsMSP',
            type: 'X.509',
        };
        await wallet.put('logistics_admin', x509Identity);
        console.log('Successfully enrolled admin user "logistics_admin" and imported it into the wallet');

    } catch (error) {
        console.error(`Failed to enroll admin user "logistics_admin": ${error}`);
        process.exit(1);
    }

    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'organizations', 'peerOrganizations', 'warehouse.example.com', 'connection-warehouse.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new CA client for interacting with the CA.
        const caInfo = ccp.certificateAuthorities['ca.warehouse.example.com'];
        const caTLSCACerts = caInfo.tlsCACerts.pem;
        const ca = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false }, caInfo.caName);

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the admin user.
        const identity = await wallet.get('warehouse_admin');
        if (identity) {
            console.log('An identity for the admin user "warehouse_admin" already exists in the wallet');
            return;
        }

        // Enroll the admin user, and import the new identity into the wallet.
        const enrollment = await ca.enroll({ enrollmentID: 'admin', enrollmentSecret: 'adminpw' });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'WarehouseMSP',
            type: 'X.509',
        };
        await wallet.put('warehouse_admin', x509Identity);
        console.log('Successfully enrolled admin user "warehouse_admin" and imported it into the wallet');

    } catch (error) {
        console.error(`Failed to enroll admin user "warehouse_admin": ${error}`);
        process.exit(1);
    }

    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'organizations', 'peerOrganizations', 'buyer.example.com', 'connection-buyer.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new CA client for interacting with the CA.
        const caInfo = ccp.certificateAuthorities['ca.buyer.example.com'];
        const caTLSCACerts = caInfo.tlsCACerts.pem;
        const ca = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false }, caInfo.caName);

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the admin user.
        const identity = await wallet.get('buyer_admin');
        if (identity) {
            console.log('An identity for the admin user "buyer_aadmin" already exists in the wallet');
            return;
        }

        // Enroll the admin user, and import the new identity into the wallet.
        const enrollment = await ca.enroll({ enrollmentID: 'admin', enrollmentSecret: 'adminpw' });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'BuyerMSP',
            type: 'X.509',
        };
        await wallet.put('buyer_admin', x509Identity);
        console.log('Successfully enrolled admin user "buyer_admin" and imported it into the wallet');

    } catch (error) {
        console.error(`Failed to enroll admin user "buyer_admin": ${error}`);
        process.exit(1);
    }
}
main();
