import { createDebouncedMemo } from '@solid-primitives/memo'
import { Accessor } from 'solid-js'
import { useScreenSize } from '~/hooks/use-screen-size'
import { randomItem } from '~/utils/misc'
import { allTypes } from './constants'
import { PokemonType } from './types'

export const randomType = (types: readonly PokemonType[] = allTypes) =>
  randomItem(types)

const DEBOUNCE_TIME = 500
const _defaultCellSizeAccessor = () => 16
const _defaultBufferAccessor = () => 0
export const useCanvasSize = (
  cellSize: Accessor<number> = _defaultCellSizeAccessor,
  buffer: Accessor<number> = () => 0
) => {
  const windowSize = useScreenSize()

  const rows = createDebouncedMemo(
    () => Math.floor(windowSize.height / cellSize()) + buffer(),
    DEBOUNCE_TIME
  )
  const cols = createDebouncedMemo(
    () => Math.floor(windowSize.width / cellSize()) + buffer(),
    DEBOUNCE_TIME
  )
  const height = () => rows() * cellSize()
  const width = () => cols() * cellSize()

  return {
    get rows() {
      return rows()
    },
    get cols() {
      return cols()
    },
    get height() {
      return height()
    },
    get width() {
      return width()
    },
  }
}
