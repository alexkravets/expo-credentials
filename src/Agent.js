
import request         from './request'
import AsyncStorage    from '@react-native-async-storage/async-storage'
import AgentIdentity   from './AgentIdentity'
import { createStore } from '@kravc/mobx-create-store'

const observables = {
  username:    null,
  connectUrl:  null,
  appStoreUrl: null
}

const STORE_ID = '@portal_agent'

class Agent extends createStore(AsyncStorage, STORE_ID, observables) {
  constructor(issuerId) {
    super()

    this._issuerId = issuerId
  }

  async resetAsync() {
    await super.resetAsync()
    await AgentIdentity.resetAgentIdentity()
  }

  async register() {
    const identity = await AgentIdentity.getAgentIdentity()

    const parameters = {
      mutation: {
        issuerId: this._issuerId
      }
    }

    const { data } = await request(identity, 'CreateOrReadAgent', parameters)

    const {
      username = null,
      walletConnectUrl:  connectUrl,
      walletAppStoreUrl: appStoreUrl
    } = data

    await this.saveManyAsync({
      username,
      connectUrl,
      appStoreUrl
    })
  }

  async issueCredential(issuerId, credentialTypeId, credentialSubject) {
    if (!this.isConnected) {
      return
    }

    const identity = await AgentIdentity.getAgentIdentity()

    const parameters = {
      mutation: {
        credentialSubjectJson: JSON.stringify(credentialSubject),
        issuerId,
        credentialTypeId
      }
    }

    await request(identity, 'IssueCredential', parameters)
  }

  get isConnected() {
    return !!this.username
  }

  get isRegistered() {
    return !!this.connectUrl
  }
}

export default Agent
