let bitcoin = require('bitcoinjs-lib')

export function getExchangeRate (currency) {
  return new Promise(resolve => {
    // if (currency.match( /ARS|AUD|BRL|CAD|DKK|AED|EUR|HKD|INR|ILS|KES|MXN|NZD|NOK|PHP|PLN|GBP|SGD|SEK|CHF|USD|JPY|CNY/g ) !== null) {
    //   ajax(`https://api.uphold.com:443/v0/ticker/${token}${currency}`)
    //     .then(function(result) {
    //       const rate = parseFloat(result.ask + result.bid) / 2;
    //       console.log(rate);
    //       resolve(rate);
    //     })
    //     .catch(function(e) {
    //       console.log(`error: ${e}`);
    //     });
    // } else { // end
    ajax(`https://api.get-spark.com/${currency}`)
      .then(function (result) {
        console.log(`exchange rate: ${result[currency]}`)
        resolve(parseFloat(result[currency]))
      })
      .catch(function (e) {
        console.log(`error: ${e}`)
      })
    // } // end
  })
}

export function getAddress (account) {
  return new Promise(resolve => {
    if (account.startsWith('xpub')) {
      // get current address index
      let index = localStorage.getItem('index')
      let root = bitcoin.bip32.fromBase58(account)
      let key = root.derivePath(`0/${index}`)
      let address = bitcoin.payments.p2pkh({ pubkey: key.publicKey, network: { pubKeyHash: 0x4c } }) // 0x4c DASH pubKeyHash
      // return address at current index
      resolve(address.address)
    } else {
      resolve(account)
    }
  })
}

function ajax (url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest()
    xhr.onload = function () {
      resolve(JSON.parse(this.responseText))
    }
    xhr.onerror = reject
    xhr.open('GET', url)
    xhr.send()
  })
}
