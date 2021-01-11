
import { useState, useEffect } from 'react'

import Agent       from './Agent'
import showError   from './showError'
import { openURL } from 'expo-linking'
import { AppState, Platform } from 'react-native'

const isWeb = Platform.OS === 'web'

const useAgent = (issuerId, onUsernamePress, setIsInProgress) => {
  const [ isReady, setIsReady ] = useState(false)

  useEffect(() => {
    if (!isReady) {
      (async () => {
        const agent = new Agent(issuerId)
        await agent.initialize()

        if (isWeb) {
          await agent.register()
        }

        global.agent = agent
        setIsReady(true)
      })()
    }

    return
  }, [ isReady ])

  const register = async (shouldShowError = false) => {
    setIsInProgress(true)

    try {
      await global.agent.register()

    } catch (error) {
      if (shouldShowError) {
        return showError(error, () => setIsInProgress(false))
      }

    }

    setIsInProgress(false)
  }

  const onAppResume = async () => {
    if (!global.agent) {
      return
    }

    const { isConnected } = global.agent

    if (isConnected) {
      return
    }

    await register()
  }

  useEffect(() => {
    const onAppStateChange = async (nextAppState) => {
      const isActive = nextAppState === 'active'

      if (isActive) {
        await onAppResume()
      }
    }

    AppState.addEventListener('change', onAppStateChange)

    return () => AppState.removeEventListener('change', onAppStateChange)
  }, [])

  const onReset = async () => {
    if (!global.agent) {
      return
    }

    await global.agent.resetAsync()
  }

  const [ openMenu ] = onUsernamePress(onReset)

  const onConnect = async () => {
    if (!global.agent) {
      return
    }

    const { isRegistered, isConnected } = global.agent

    if (isConnected) {
      return openMenu()
    }

    if (!isRegistered) {
      await register(true)
    }

    if (isWeb) {
      return
    }

    const { connectUrl, appStoreUrl } = global.agent

    try {
      await openURL(connectUrl)

    } catch (error) {
      const { message } = error
      const isPortalAppNotFoundError = message.startsWith('Unable to open URL')

      if (isPortalAppNotFoundError) {
        return openURL(appStoreUrl)
      }
    }
  }

  let username      = global.agent ? global.agent.username    : null
  let connectUrl    = global.agent ? global.agent.connectUrl  : null
  const isConnected = global.agent ? global.agent.isConnected : false

  if (isConnected) {
    connectUrl = null
  }

  return [ onConnect, username, connectUrl ]
}

export default useAgent
