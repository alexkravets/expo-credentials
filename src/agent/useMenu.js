
import openClient         from './openClient'
import { useActionSheet } from '@expo/react-native-action-sheet'

const useMenu = agent => {
  const { showActionSheetWithOptions } = useActionSheet()

  const options                = [ 'Open Connection', 'Disconnect', 'Cancel' ]
  const cancelButtonIndex      = options.length - 1
  const disconnectButtonIndex  = options.length - 2
  const destructiveButtonIndex = 1

  const { connectionUrl, clientUrl } = agent

  const openConnection = () => openClient(connectionUrl, clientUrl)

  const disconnect = () => agent.resetAsync()

  const openMenu = () => showActionSheetWithOptions({
    options,
    cancelButtonIndex,
    destructiveButtonIndex
  }, buttonIndex => {
    const isCanceled   = cancelButtonIndex === buttonIndex
    const isDisconnect = disconnectButtonIndex === buttonIndex

    if (isCanceled) {
      return
    }

    if (isDisconnect) {
      return disconnect()
    }

    return openConnection()
  })

  return [ openMenu ]
}

export default useMenu
