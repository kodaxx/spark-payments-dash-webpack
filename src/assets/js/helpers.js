export function getExchangeRate (token, currency) {
  return new Promise(resolve => {
    // if (currency.match( /ARS|AUD|BRL|CAD|DKK|AED|EUR|HKD|INR|ILS|KES|MXN|NZD|NOK|PHP|PLN|GBP|SGD|SEK|CHF|USD|JPY|CNY/g ) !== null) {
    //   ajax(`https://api.uphold.com:443/v0/ticker/DASH${currency}`)
    //     .then(function(result) {
    //       const rate = parseFloat(result.ask + result.bid) / 2;
    //       console.log(rate);
    //       resolve(rate);
    //     })
    //     .catch(function(e) {
    //       console.log(`error: ${e}`);
    //     });
    // } else { // end
    ajax(`https://min-api.cryptocompare.com/data/price?fsym=${token}&tsyms=${currency}`)
      .then(function (result) {
        console.log(result)
        resolve(result[currency])
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
      console.log('xpub coming soon.')
      // swal('Sorry', 'xPub coming soon :(', 'error')
    } else {
      resolve(account)
    }
  })
}

export function latestTx (url) {
  return new Promise(resolve => {
    ajax(url)
      .then(function (result) {
        console.log(result)
        let id = '0'
        if (result.txs.length > 0) {
          id = result.txs[0].txid
        }
        console.log(id)
        resolve(id)
      })
      .catch(function (e) {
        console.log(`error: ${e}`)
      })
  })
}

export function verify (url, initial, price) {
  return new Promise(resolve => {
    ajax(url)
      .then(function (result) {
        let status = false
        let latest = '0'
        let found = 0
        let expected = parseFloat(price).toFixed(8)
        if (result.txs.length > 0) {
          latest = result.txs[0].txid
          if (latest !== initial) { // string vs int?
            this.locked = result.txs[0].txlock
            result.txs[0].vout.forEach(function (output) {
              if (output.scriptPubKey.addresses[0] === this.address) {
                found = output.value
                this.price.received = found
              }
            })
          }
        }
        console.log(result)
        console.log(`expected amount: ${expected}`)
        console.log(`found amount: ${found}`)
        if (latest !== initial && found >= expected && expected !== 0) { // string vs num?
          status = true
        }
        resolve(status)
      })
      .catch(function (e) {
        console.log(`error: ${e}`)
      })
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
