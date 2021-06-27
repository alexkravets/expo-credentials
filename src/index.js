
import {
  useActionSheet,
  connectActionSheet,
  ActionSheetProvider
} from '@expo/react-native-action-sheet'

import getRequest  from './helpers/getRequest'
import useOnResume from './helpers/useOnResume'

import getIdentity     from './identity/getIdentity'
import destroyIdentity from './identity/destroyIdentity'

import ConnectAgent     from './agent/ConnectAgent'
import createAgentStore from './agent/createAgentStore'

export {
  getRequest,
  useOnResume,
  getIdentity,
  ConnectAgent,
  useActionSheet,
  destroyIdentity,
  createAgentStore,
  connectActionSheet,
  ActionSheetProvider
}
