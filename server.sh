#!/bin/bash

# shell directory path
shdir="$( cd "$(dirname "$0")" ; pwd -P)"

# remove wallet/cryto-config
rm -rf $shdir/wallet
rm -rf $shdir/crypto-config

# copy cryto-config
cp -rf "../blockchain/build/asset/artifacts/crypto-config" $shdir/

node server.js
