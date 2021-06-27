
import sha256 from 'js-sha256'
import { Buffer } from 'buffer'

const createHash = (alg) => {
  const isSupported = [ 'sha256' ].includes(alg)

  if (!isSupported) {
    throw new Error(`"${alg}" is not supported`)
  }

  class CryptoHash {
    constructor() {
      this._data = ''
    }

    update(data) {
      this._data = `${this._data}${data}`
      return this
    }

    digest() {
      const hashHex = sha256(this._data)
      return Buffer.from(hashHex, 'hex')
    }
  }

  return new CryptoHash()
}

export { createHash }
export default { createHash }
