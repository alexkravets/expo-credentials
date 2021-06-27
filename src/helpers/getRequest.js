
import querystring from 'querystring'

const getRequest = (baseUrl) => {
  return async (identity, operationId, parameters, options = {}) => {
    let url = `${baseUrl}${operationId}`

    const { mutation, ...query } = parameters
    const hasQuery = Object.keys(query).length > 0

    if (hasQuery) {
      const queryString = querystring.stringify(query)
      url = `${url}?${queryString}`
    }

    let body

    if (mutation) {
      body = JSON.stringify(mutation)
      options.method = options.method || 'POST'
    }

    const token         = await identity.createAuthorization(url, body)
    const authorization = `Bearer ${token}`

    options = { ...options, url, body, headers: { authorization } }

    const response = await fetch(url, options)

    if (response.ok) {
      const hasNoBody = response.status === 204

      if (hasNoBody) {
        return
      }

      const result = await response.json()
      return result
    }

    const result = await response.json()

    const { error: originalError = {} }  = result
    const { message = 'Request failed' } = originalError

    const error = new Error(message)
    error.parameters    = parameters
    error.operationId   = operationId
    error.originalError = originalError

    throw error
  }
}

export default getRequest
