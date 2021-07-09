
import getRequest      from '../helpers/getRequest'
import getIdentity     from '../identity/getIdentity'
import { createStore } from '@kravc/mobx-create-store'

const observables = {
  clientUrl:     null,
  connectUrl:    null,
  isConnected:   null,
  responseJson:  null,
  connectionUrl: null
}

function createAgentStore(AsyncStorage, keyPrefix, identityKey, issuerId, options = {}) {
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

    get isRegistered() {
      return !!this.connectUrl
    }

    get response() {
      if (this.responseJson) {
        return JSON.parse(this.responseJson)
      }

      return {}
    }

    async synchronizeAsync() {
      const mutation = { issuerId }

      const { data } =
        await request(this._identity, 'CreateOrReadAgent', { mutation })

      const {
        clientUrl,
        connectUrl,
        isConnected,
        responseJson,
        connectionUrl
      } = data

      await this.saveManyAsync({
        clientUrl,
        connectUrl,
        isConnected,
        responseJson,
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

      await request(this._identity, 'IssueAgentCredential', { mutation })
    }

    async tryDisconnectAsync() {
      try {
        await request(this._identity, 'ResetAgent', { issuerId }, { method: 'PATCH' })

      } catch (error) {
        // console.error(error)

        return
      }

      await this.saveManyAsync({
        isConnected:  false,
        responseJson: null
      })
    }
  }

  return new Agent()
}

export default createAgentStore
