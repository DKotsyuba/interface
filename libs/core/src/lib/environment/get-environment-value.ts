export interface Environment {
  oneInchDevPortalHost: string
  walletConnectProjectId: string
  baseHref: string
  appVersion: string
  infuraApiKey: string
}

declare const __environment__: Environment


export function getEnvironmentValue<K extends keyof Environment>(valueName: K): Environment[K] {
  return __environment__[valueName]
}
