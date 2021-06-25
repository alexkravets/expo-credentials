
import { Identity } from '@kravc/identity'
import { getRandomBytesAsync } from 'expo-random'

const SEED_LENGTH = Identity.SEED_LENGTH

const generateSeed = async () => {
  const array = await getRandomBytesAsync(SEED_LENGTH)

  const seed = [...array]
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')

  return seed
}

export default generateSeed
