
import { Platform } from 'react-native'
import { Identity } from '@kravc/identity'
import generateSeed from './generateSeed'
import { setItemAsync, getItemAsync } from 'expo-secure-store'

const isWeb = Platform.OS === 'web'

const getIdentity = async (AsyncStorage, identityKey) => {
  const getSeed = () => isWeb ? AsyncStorage.getItem(identityKey) : getItemAsync(identityKey)
  const setSeed = val => isWeb ? AsyncStorage.setItem(identityKey, val) : setItemAsync(identityKey, val)

  let seed = await getSeed()

  if (!seed) {
    seed = await generateSeed(Identity.SEED_LENGTH)
    await setSeed(seed)
  }

  const identity = await Identity.fromSeed(seed)

  return identity
}

export default getIdentity
