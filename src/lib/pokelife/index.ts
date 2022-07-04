export * from './automaton'
export * from './constants'
export * from './types'
export * from './utils'
export const pokelifeWorker = new ComlinkWorker<typeof import('./worker')>(
  new URL('./worker.ts', import.meta.url)
)
