
import { Alert } from 'react-native'

const showError = (error, onPress) => {
  const title = 'Request Failed'
  const text  = 'Check your internet connection.'

  const buttons = [{ text: 'OK', onPress }]

  return Alert.alert(title, text, buttons, { cancelable: false })
}

export default showError
