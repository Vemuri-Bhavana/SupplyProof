#!/bin/bash
#
# SPDX-License-Identifier: Apache-2.0




# default to using Org1
ORG=${1:-Farmer}

# Exit on first error, print all commands.
set -e
set -o pipefail

# Where am I?
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"

ORDERER_CA=${DIR}/test-network/organizations/ordererOrganizations/example.com/tlsca/tlsca.example.com-cert.pem
PEER0_FARMER_CA=${DIR}/test-network/organizations/peerOrganizations/farmer.example.com/tlsca/tlsca.farmer.example.com-cert.pem
PEER0_LOGISTICS_CA=${DIR}/test-network/organizations/peerOrganizations/logistics.example.com/tlsca/tlsca.logistics.example.com-cert.pem
PEER0_WAREHOUSE_CA=${DIR}/test-network/organizations/peerOrganizations/warehouse.example.com/tlsca/tlsca.warehouse.example.com-cert.pem
PEER0_BUYER_CA=${DIR}/test-network/organizations/peerOrganizations/buyer.example.com/tlsca/tlsca.buyer.example.com-cert.pem


if [${ORG,,} == "farmer" ]; then

   CORE_PEER_LOCALMSPID=FarmerMSP
   CORE_PEER_MSPCONFIGPATH=${DIR}/test-network/organizations/peerOrganizations/farmer.example.com/users/Admin@farmer.example.com/msp
   CORE_PEER_ADDRESS=localhost:7051
   CORE_PEER_TLS_ROOTCERT_FILE=${DIR}/test-network/organizations/peerOrganizations/farmer.example.com/tlsca/tlsca.farmer.example.com-cert.pem

elif [${ORG,,} == "logistics"]; then

   CORE_PEER_LOCALMSPID=LogisticsMSP
   CORE_PEER_MSPCONFIGPATH=${DIR}/test-network/organizations/peerOrganizations/logistics.example.com/users/Admin@logistics.example.com/msp
   CORE_PEER_ADDRESS=localhost:8051
   CORE_PEER_TLS_ROOTCERT_FILE=${DIR}/test-network/organizations/peerOrganizations/logistics.example.com/tlsca/tlsca.logistics.example.com-cert.pem

elif [${ORG,,} == "warehouse"]; then

   CORE_PEER_LOCALMSPID=WarehouseMSP
   CORE_PEER_MSPCONFIGPATH=${DIR}/test-network/organizations/peerOrganizations/warehouse.example.com/users/Admin@warehouse.example.com/msp
   CORE_PEER_ADDRESS=localhost:9051
   CORE_PEER_TLS_ROOTCERT_FILE=${DIR}/test-network/organizations/peerOrganizations/warehouse.example.com/tlsca/tlsca.warehouse.example.com-cert.pem

elif [${ORG,,} == "buyer"]; then

   CORE_PEER_LOCALMSPID=BuyerMSP
   CORE_PEER_MSPCONFIGPATH=${DIR}/test-network/organizations/peerOrganizations/buyer.example.com/users/Admin@buyer.example.com/msp
   CORE_PEER_ADDRESS=localhost:10051
   CORE_PEER_TLS_ROOTCERT_FILE=${DIR}/test-network/organizations/peerOrganizations/buyer.example.com/tlsca/tlsca.buyer.example.com-cert.pem

else
   echo "Unknown \"$ORG\", please choose Farmer or logistics or warehouse or buyer"
   echo "For example to get the environment variables to set upa logistics shell environment run:  ./setOrgEnv.sh Logistics"
   echo
   echo "This can be automated to set them as well with:"
   echo
   echo 'export $(./setOrgEnv.sh logistics | xargs)'
   exit 1
fi

# output the variables that need to be set
echo "CORE_PEER_TLS_ENABLED=true"
echo "ORDERER_CA=${ORDERER_CA}"
echo "PEER0_ORG1_CA=${PEER0_ORG1_CA}"
echo "PEER0_ORG2_CA=${PEER0_ORG2_CA}"
echo "PEER0_ORG3_CA=${PEER0_ORG3_CA}"

echo "CORE_PEER_MSPCONFIGPATH=${CORE_PEER_MSPCONFIGPATH}"
echo "CORE_PEER_ADDRESS=${CORE_PEER_ADDRESS}"
echo "CORE_PEER_TLS_ROOTCERT_FILE=${CORE_PEER_TLS_ROOTCERT_FILE}"

echo "CORE_PEER_LOCALMSPID=${CORE_PEER_LOCALMSPID}"
