# @kravc/expo-portal-agent

[Portal](https://portal.kra.vc/about/) agent helpers to be used by Expo
applications.

## Connect Button

```js
import React, { useState } from 'react'

import { Text, Button } from 'react-native'
import { useAgent } from '@kravc/expo-portal-agent'

// NOTE: Get issuer ID: https://github.com/alexkravets/portal
const issuerId = ''

const ConnectButton = function () {
  const onUsernamePress = onReset => [ () => onReset() ]

  const [ isInProgress, setIsInProgress ]   = useState(false)
  const [ onConnect, username, connectUrl ] = useAgent(issuerId, onUsernamePress, setIsInProgress)

  if (isInProgress) {
    return (
      <Text>
        Connecting...
      </Text>
    )
  }

  const title = username ? `@${username}` : 'Connect'

  return (
    <Button
      title={title}
      onPress={onConnect}
      connectUrl={connectUrl}
    />
  )
}

export default ConnectButton
```

## Issue Credential

```js
import { getAgent } from '@kravc/expo-portal-agent'

// NOTE: Get issuer ID and credential type ID: https://github.com/alexkravets/portal
const issuerId         = ''
const credentialTypeId = ''

const issueCredentialAsync = (credentialSubject = {}) => {
  const agent = getAgent()

  if (!agent) {
    return
  }

  return agent.issueCredential(issuerId, credentialId, credentialSubject)
}
```
