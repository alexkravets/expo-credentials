
import { Platform } from 'react-native'
import { Identity } from '@kravc/identity'
import generateSeed from './generateSeed'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setItemAsync, getItemAsync, deleteItemAsync } from 'expo-secure-store'

const isWeb = Platform.OS === 'web'
const KEY = 'MinesweeperAgentSeed'

const getSeed = () => isWeb ? AsyncStorage.getItem(KEY) : getItemAsync(KEY)

const setSeed = value => isWeb ? AsyncStorage.setItem(KEY, value) : setItemAsync(KEY, value)

const resetAgentIdentity = () => isWeb ? AsyncStorage.removeItem(KEY) : deleteItemAsync(KEY)

const getAgentIdentity = async (shouldResetSeed = false) => {
  let seed

  if (!shouldResetSeed) {
    seed = await getSeed()
  }

  if (!seed) {
    seed = await generateSeed(Identity.SEED_LENGTH)
    await setSeed(seed)
  }

  const identity = await Identity.fromSeed(seed)

  return identity
}

export default {
  getAgentIdentity,
  resetAgentIdentity
}
