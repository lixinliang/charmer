declare module '*.css' {
  const style: string
  export default style
}

declare module '*.png' {
  const style: string
  export default style
}

declare module 'localforage' {
  type LocalForage = import('localforage')
  export default LocalForage
}

declare const MODE: string
declare const HASH: string
declare const VERSION: string
declare const TIMESTAMP: string

declare type MetaLogDetail = Record<string, string | number | boolean>

declare interface MetaLogItem {
  meta: MetaLogDetail
  timestamp: number
}

declare interface BundleOptions {
  name: string
  storage: Storage | LocalForage
}

declare interface Window {
  _updateBundle(options: BundleOptions): Promise<string>
  _invokeBundle(options: BundleOptions): void
  _addLog(meta: MetaLogDetail): void
  _metaLog: Array<MetaLogItem>
  _localForage: LocalForage
  _storeBundle: LocalForage
  _storeGallery: LocalForage
  _emitter: EventEmitter
}

declare interface Navigator {
  standalone: boolean
}

declare interface String {
  call: (this: string) => void
}
