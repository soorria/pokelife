import { randomItem } from '~/utils/misc'
import { allTypes, effectivenessMap } from './constants'
import { AttackEffectiveness, PokemonType, State } from './types'
import { randomType } from './utils'

let allowedTypes = [...allTypes]

export const setAllowedTypes = (types: PokemonType[]) => (allowedTypes = types)

export const randomState = (width: number, height: number) =>
  Array.from({ length: height }, _ =>
    Array.from({ length: width }, _ => randomType(allowedTypes))
  )

const TARGET_FOR_KILL = AttackEffectiveness.NORMAL * 2

export const nextState = (state: State) => {
  const rows = state.length
  const cols = state[0]!.length

  function* surrounding(state: State, x: number, y: number) {
    for (let i = -1; i <= 1; ++i) {
      for (let j = -1; j <= 1; ++j) {
        if (i !== j) yield state[(y + i + rows) % rows]![(x + j + cols) % cols]!
      }
    }
  }

  const result: State = []

  for (let y = 0; y < rows; ++y) {
    const row: State[number] = []
    for (let x = 0; x < cols; ++x) {
      const cell = state[y]![x]!
      const counts = new Map<PokemonType, number>()
      for (const s of surrounding(state, x, y)) {
        counts.set(s, (counts.get(s) ?? 0) + effectivenessMap[s][cell])
      }

      let max_c = 0
      let max_t = null
      for (const [t, c] of counts) {
        if (c > max_c) {
          max_c = c
          max_t = t
        }
      }

      if (max_c >= TARGET_FOR_KILL) {
        const typesAtMax = Array.from(counts)
          .filter(([_, c]) => c === max_c)
          .map(([t]) => t)
        row.push(randomItem(typesAtMax))
      } else {
        row.push(cell)
      }
    }
    result.push(row)
  }

  return result
}

type Row = State[number]

const resizeRow = (row: Row, cols: number): Row => {
  const result: Row = []
  for (let i = 0; i < cols; ++i) {
    result.push(row[i] ?? randomType(allowedTypes))
  }
  return result
}

export const resizeState = (
  state: State,
  rows: number,
  cols: number
): State => {
  const result = []
  for (let i = 0; i < rows; ++i) {
    const maybeRow = state[i]
    if (maybeRow) {
      result.push(resizeRow(maybeRow, cols))
    } else {
      result.push(Array.from({ length: cols }, _ => randomType(allowedTypes)))
    }
  }
  return result
}
