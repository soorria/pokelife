import { randomType } from './utils'

export const randomState = (width: number, height: number) =>
  Array.from({ length: height }, _ =>
    Array.from({ length: width }, _ => randomType())
  )
