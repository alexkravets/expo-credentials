
import { getRandomBytesAsync } from 'expo-random'

const generateSeed = async (size) => {
  const array = await getRandomBytesAsync(size)

  const seed = [...array]
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')

  return seed
}

export default generateSeed
