
import { Platform } from 'react-native'
import { deleteItemAsync } from 'expo-secure-store'

const isWeb = Platform.OS === 'web'

const destroyIdentity = (AsyncStorage, identityKey) => {
  return isWeb ? AsyncStorage.removeItem(identityKey) : deleteItemAsync(identityKey)
}

export default destroyIdentity
