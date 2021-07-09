
// TODO: Check if we can use safe buffer here, which is used by identity:
import { Buffer } from 'buffer'

global.Buffer = global.Buffer || Buffer
