
import { AppState }  from 'react-native'
import { useEffect } from 'react'

const ACTIVE = 'active'

const useOnResume = (callback, shouldRunOnInitialize = true) => {
  useEffect(() => {
    const onAppResume = async (nextAppState) => {
      const isActive = nextAppState === ACTIVE

      if (isActive) {
        return callback()
      }
    }

    if (shouldRunOnInitialize) {
      callback()
    }

    AppState.addEventListener('change', onAppResume)

    return () => AppState.removeEventListener('change', onAppResume)
  }, [])
}

export default useOnResume
