
import sha256 from 'js-sha256'
import { Buffer } from 'buffer'

const createHash = (alg) => {
  const isSupported = [ 'sha256' ].includes(alg)

  if (!isSupported) {
    throw new Error(`"${alg}" is not supported`)
  }

  return {
    update: (value) => {
      const hashHex = sha256(value)

      return {
        digest: () => Buffer.from(hashHex, 'hex')
      }
    }
  }
}

export default {
  createHash
}
