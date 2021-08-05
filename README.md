# Spark Payments (Web and Mobile)
Spark Payments is a mobile-friendly payment terminal app for web and mobile that merchants can use to accept Dash payments.

## Current Features

* Enter sale amounts in your local currency (supports 94 currencies) and have them converted to an amount in Dash
* A QR code payment request is generated
* Get an on-screen notification when the requested amount is received at your address (or partial)
* Detects if transactions were sent with InstantSend (or not)
* Translated to 12 languages so far
* Support for both xPub and static addresses
* Password protected settings page
* Compatible with Ledger/Trezor/KeepKey hardware wallets

## Donate URLs

#### Allow donor to choose amount
* `https://get-spark.com/app/#/donate?address=XuYVsm8YPXZJytJ6g4n2yg6xD1PR5bT7t4` <--- use your address

#### Pre-fill donation amount
* `https://get-spark.com/app/#/sale/1.00%20USD?address=XuYVsm8YPXZJytJ6g4n2yg6xD1PR5bT7t4` <--- url encode amount ("1.00 USD" = 1.00%20USD), use your own addressS

## Build Setup

``` bash
# clone repository
git clone https://github.com/SparkPayments/spark-payments-dash-webpack.git spark

# change directories
cd spark

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production (web) with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# build for production (mobile) with minification
npm run build-mobile (I use this building for both)

# clean build files
npm run clean
```
