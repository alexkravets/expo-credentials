'use strict'

import getParametersDigest from './getParametersDigest'

const createAuthorization = async (identity, parameters, options = {}) => {
  const challenge = getParametersDigest(parameters)

  const proofOptions = { challenge }

  if (options.domain) {
    proofOptions.domain = options.domain
  }

  return identity.createPresentation([], { format: 'jwt', proofOptions })
}

export default createAuthorization
