
const DEFAULT_USERNAME = 'Anonymous'

const getUsername = response => {
  const hasEmptyResponse = response.length === 0

  if (hasEmptyResponse) {
    return DEFAULT_USERNAME
  }

  if (!response[0]) {
    return DEFAULT_USERNAME
  }

  // TODO: Get username, based on original issuer inputs configuration:
  const username = response[0].values[0]

  return `@${username}`
}

export default getUsername
