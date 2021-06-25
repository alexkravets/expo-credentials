import React, { useState } from 'react'

import { observer } from '@kravc/mobx-create-store'

import useMenu     from './useMenu'
import showError   from './showError'
import openClient  from './openClient'
import useOnResume from '../helpers/useOnResume'

function ConnectAgent({ agent, Status, Button }) {
  const [ isInProgress, setIsInProgress ] = useState(false)

  const trySynchronize = async (shouldShowError = false) => {
    const { isConnected } = agent

    if (isConnected) {
      return
    }

    if (isInProgress) {
      return
    }

    setIsInProgress(true)

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

  const { username, isRegistered, isConnected } = agent

  const title = username ? `@${username}` : 'Connect'

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
    return <Status />
  }

  return <Button title={title} onPress={onPress} />
}

export default observer(ConnectAgent)
