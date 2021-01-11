# @kravc/expo-portal-agent

[Portal](https://portal.kra.vc/about/) agent helpers to be used by Expo
applications.

## Setup

Add packages to your expo project:

```sh
npm i --save @kravc/expo-portal-agent
npm i --save @kravc/expo-portal-polyfills
```

Setup polyfills and workarounds:

```sh
npx polyfills
```

Configure issuer and credential types via [@kravc/portal](https://github.com/alexkravets/portal).

## Connect Button

```js
import React, { useState } from 'react'

import { Text, Button } from 'react-native'
import { useAgent } from '@kravc/expo-portal-agent'

const issuerId = 'ISSUER_ID'

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

const issuerId         = 'ISSUER_ID'
const credentialTypeId = 'CREDENTIAL_TYPE_ID'

const issueCredentialAsync = (credentialSubject = {}) => {
  const agent = getAgent()

  if (!agent) {
    return
  }

  return agent.issueCredential(issuerId, credentialId, credentialSubject)
}
```
