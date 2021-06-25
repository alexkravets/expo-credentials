
import getRequest      from '../helpers/getRequest'
import getIdentity     from '../identity/getIdentity'
import { createStore } from '@kravc/mobx-create-store'

const observables = {
  username:      null,
  clientUrl:     null,
  connectUrl:    null,
  connectionUrl: null
}

function createAgent(AsyncStorage, keyPrefix, identityKey, issuerId, options = {}) {
  keyPrefix = `${keyPrefix}_agent`

  if (!identityKey) {
    throw new Error('Missing "identityKey" parameter')
  }

  if (!issuerId) {
    throw new Error('Missing "issuerId" parameter')
  }

  const {
    credentialsBaseUrl: baseUrl = 'https://api.dev.credentials.kra.vc/v1/'
  } = options

  const request = getRequest(baseUrl)

  class Agent extends createStore(AsyncStorage, keyPrefix, observables) {
    constructor() {
      super()
    }

    async onInitialize() {
      this._identity = await getIdentity(AsyncStorage, identityKey)
    }

    get isConnected() {
      return !!this.username
    }

    get isRegistered() {
      return !!this.connectUrl
    }

    async synchronizeAsync() {
      const mutation = { issuerId }

      const {
        username = null,
        clientUrl,
        connectUrl,
        connectionUrl
      } = await request(this._identity, 'CreateOrReadAgent', { mutation })

      await this.saveManyAsync({
        username,
        clientUrl,
        connectUrl,
        connectionUrl
      })
    }

    async issueCredentialAsync(credentialTypeId, credentialSubject) {
      if (!this.isConnected) {
        return
      }

      const id = this._identity.did
      const credentialSubjectJson = JSON.stringify({ id, ...credentialSubject })

      const mutation = {
        issuerId,
        credentialTypeId,
        credentialSubjectJson
      }

      await request(this._identity, 'IssueCredential', { mutation })
    }

    // TODO: Finish resetAsync method.
  }

  return new Agent()
}

export default createAgent
