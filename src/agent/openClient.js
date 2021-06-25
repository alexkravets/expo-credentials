
import { openURL } from 'expo-linking'

const openClient = async (url, clientUrl) => {
  try {
    await openURL(url)

  } catch (error) {
    const { message } = error
    const isClientAppNotFoundError = message.startsWith('Unable to open URL')

    if (isClientAppNotFoundError) {
      return openURL(clientUrl)
    }
  }
}

export default openClient
