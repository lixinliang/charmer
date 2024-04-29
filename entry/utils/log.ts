window._metaLog = window._metaLog || []

window._addLog = window._addLog || ((meta: MetaLogDetail) => {
  window._metaLog.push({
    meta,
    timestamp: +new Date,
  })
})

export const log = (meta: MetaLogDetail) => {
  window._addLog(meta)
}
