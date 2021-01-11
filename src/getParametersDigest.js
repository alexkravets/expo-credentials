'use strict'

import sha256       from 'js-sha256'
import canonicalize from 'canonicalize'

const getParametersDigest = (parameters) => {
  const canonized = canonicalize(parameters)
  const digest = sha256(canonized)

  return digest
}

export default getParametersDigest
