import { useState } from 'react'
import { observer } from '@kravc/mobx-create-store'

import useMenu     from './useMenu'
import showError   from './showError'
import openClient  from './openClient'
import getUsername from './getUsername'
import useOnResume from '../helpers/useOnResume'

function ConnectAgent({ agent, status, button }) {
  const [ isInProgress, setIsInProgress ] = useState(false)

  const trySynchronize = async (shouldShowError = false) => {
    const { isConnected } = agent

    if (isInProgress) {
      return
    }

    if (!isConnected) {
      setIsInProgress(true)
    }

    try {
      await agent.synchronizeAsync()

    } catch (error) {
      if (shouldShowError) {
        return showError(error, () => setIsInProgress(false))
      }

    }

    setIsInProgress(false)
  }

  useOnResume(() => trySynchronize())

  const [ openMenu ] = useMenu(agent)

  const { response, isConnected, isRegistered  } = agent
  const title = isConnected ? getUsername(response) : 'Connect'

  const onPress = async () => {
    if (isConnected) {
      return openMenu()
    }

    if (!isRegistered) {
      await trySynchronize(true)
    }

    const { connectUrl, clientUrl } = agent

    openClient(connectUrl, clientUrl)
  }

  if (isInProgress) {
    return status()
  }

  return button(title, onPress)
}

export default observer(ConnectAgent)
