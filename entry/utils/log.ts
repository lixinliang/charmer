export const log = () => {
  window._addLog?.({
    hash: HASH,
    mode: MODE,
    version: VERSION,
    timestamp: TIMESTAMP,
  })
}
