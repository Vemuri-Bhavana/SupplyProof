#!/bin/bash

function one_line_pem {
    echo "`awk 'NF {sub(/\\n/, ""); printf "%s\\\\\\\n",$0;}' $1`"
}

function json_ccp {
    local PP=$(one_line_pem $4)
    local CP=$(one_line_pem $5)
    sed -e "s/\${ORG}/$1/" \
        -e "s/\${P0PORT}/$2/" \
        -e "s/\${CAPORT}/$3/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        organizations/ccp-template.json
}

function yaml_ccp {
    local PP=$(one_line_pem $4)
    local CP=$(one_line_pem $5)
    sed -e "s/\${ORG}/$1/" \
        -e "s/\${P0PORT}/$2/" \
        -e "s/\${CAPORT}/$3/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        organizations/ccp-template.yaml | sed -e $'s/\\\\n/\\\n          /g'
}

ORG=farmer
P0PORT=7051
CAPORT=7054
PEERPEM=organizations/peerOrganizations/farmer.example.com/tlsca/tlsca.farmer.example.com-cert.pem
CAPEM=organizations/peerOrganizations/farmer.example.com/ca/ca.farmer.example.com-cert.pem

echo "$(json_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/farmer.example.com/connection-farmer.json
echo "$(yaml_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/farmer.example.com/connection-farmer.yaml

ORG=logistics
P0PORT=8051
CAPORT=8054
PEERPEM=organizations/peerOrganizations/logistics.example.com/tlsca/tlsca.logistics.example.com-cert.pem
CAPEM=organizations/peerOrganizations/logistics.example.com/ca/ca.logistics.example.com-cert.pem

echo "$(json_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/logistics.example.com/connection-logistics.json
echo "$(yaml_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/logistics.example.com/connection-logistics.yaml

ORG=warehouse
P0PORT=9051
CAPORT=9054
PEERPEM=organizations/peerOrganizations/warehouse.example.com/tlsca/tlsca.warehouse.example.com-cert.pem
CAPEM=organizations/peerOrganizations/warehouse.example.com/ca/ca.warehouse.example.com-cert.pem

echo "$(json_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/warehouse.example.com/connection-warehouse.json
echo "$(yaml_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/warehouse.example.com/connection-warehouse.yaml

ORG=buyer
P0PORT=10051
CAPORT=10054
PEERPEM=organizations/peerOrganizations/buyer.example.com/tlsca/tlsca.buyer.example.com-cert.pem
CAPEM=organizations/peerOrganizations/buyer.example.com/ca/ca.buyer.example.com-cert.pem

echo "$(json_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/buyer.example.com/connection-buyer.json
echo "$(yaml_ccp $ORG $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/buyer.example.com/connection-buyer.yaml