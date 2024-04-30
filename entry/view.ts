import '@/utils/dev'
import { log } from '@/utils/log'
import { init } from '@/utils/init'

log({
  hash: HASH,
  mode: MODE,
  version: VERSION,
  timestamp: TIMESTAMP,
})
init()
