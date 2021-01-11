
import createAuthorization from './createAuthorization'

const host = 'https://portal.kra.vc/credentials/'
const authorizationOptions = { domain: host }

const request = async (identity, operationId, parameters, method) => {
  const authorization = await createAuthorization(identity, parameters, authorizationOptions)
  const url = `${host}${operationId}`

  const options = {
    headers: { authorization },
    url
  }

  const { mutation } = parameters

  if (mutation) {
    options.body   = JSON.stringify(mutation)
    options.method = method || 'POST'
  }

  const response = await fetch(url, options)
  const result   = await response.json()

  if (response.ok) {
    return result
  }

  const { error: originalError = {} }  = result
  const { message = 'Request failed' } = originalError

  const error = new Error(message)
  error.originalError = originalError

  throw error
}

export default request
