import { AttackEffectiveness, PokemonType } from './types'

export const allTypes = [
  PokemonType.NORMAL,
  PokemonType.FIRE,
  PokemonType.WATER,
  PokemonType.GRASS,
  PokemonType.ELECTRIC,
  PokemonType.ICE,
  PokemonType.FIGHTING,
  PokemonType.POISON,
  PokemonType.GROUND,
  PokemonType.FLYING,
  PokemonType.PSYCHIC,
  PokemonType.BUG,
  PokemonType.ROCK,
  PokemonType.GHOST,
  PokemonType.DARK,
  PokemonType.DRAGON,
  PokemonType.STEEL,
  PokemonType.FAIRY,
] as const

/**
 * Generated from https://github.com/zonination/pokemon-chart/blob/master/chart.csv
 *
 * Usage:
 *
 * ```js
 * const waterAttackingFire = effectivenessMap[PokemonType.Water][PokemonType.Fire]
 * ```
 */
export const effectivenessMap = {
  [PokemonType.NORMAL]: {
    [PokemonType.NORMAL]: AttackEffectiveness.NORMAL,
    [PokemonType.FIRE]: AttackEffectiveness.NORMAL,
    [PokemonType.WATER]: AttackEffectiveness.NORMAL,
    [PokemonType.ELECTRIC]: AttackEffectiveness.NORMAL,
    [PokemonType.GRASS]: AttackEffectiveness.NORMAL,
    [PokemonType.ICE]: AttackEffectiveness.NORMAL,
    [PokemonType.FIGHTING]: AttackEffectiveness.NORMAL,
    [PokemonType.POISON]: AttackEffectiveness.NORMAL,
    [PokemonType.GROUND]: AttackEffectiveness.NORMAL,
    [PokemonType.FLYING]: AttackEffectiveness.NORMAL,
    [PokemonType.PSYCHIC]: AttackEffectiveness.NORMAL,
    [PokemonType.BUG]: AttackEffectiveness.NORMAL,
    [PokemonType.ROCK]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.GHOST]: AttackEffectiveness.NO_EFFECT,
    [PokemonType.DRAGON]: AttackEffectiveness.NORMAL,
    [PokemonType.DARK]: AttackEffectiveness.NORMAL,
    [PokemonType.STEEL]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.FAIRY]: AttackEffectiveness.NORMAL,
  },
  [PokemonType.FIRE]: {
    [PokemonType.NORMAL]: AttackEffectiveness.NORMAL,
    [PokemonType.FIRE]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.WATER]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.ELECTRIC]: AttackEffectiveness.NORMAL,
    [PokemonType.GRASS]: AttackEffectiveness.SUPER_EFFECTIVE,
    [PokemonType.ICE]: AttackEffectiveness.SUPER_EFFECTIVE,
    [PokemonType.FIGHTING]: AttackEffectiveness.NORMAL,
    [PokemonType.POISON]: AttackEffectiveness.NORMAL,
    [PokemonType.GROUND]: AttackEffectiveness.NORMAL,
    [PokemonType.FLYING]: AttackEffectiveness.NORMAL,
    [PokemonType.PSYCHIC]: AttackEffectiveness.NORMAL,
    [PokemonType.BUG]: AttackEffectiveness.SUPER_EFFECTIVE,
    [PokemonType.ROCK]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.GHOST]: AttackEffectiveness.NORMAL,
    [PokemonType.DRAGON]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.DARK]: AttackEffectiveness.NORMAL,
    [PokemonType.STEEL]: AttackEffectiveness.SUPER_EFFECTIVE,
    [PokemonType.FAIRY]: AttackEffectiveness.NORMAL,
  },
  [PokemonType.WATER]: {
    [PokemonType.NORMAL]: AttackEffectiveness.NORMAL,
    [PokemonType.FIRE]: AttackEffectiveness.SUPER_EFFECTIVE,
    [PokemonType.WATER]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.ELECTRIC]: AttackEffectiveness.NORMAL,
    [PokemonType.GRASS]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.ICE]: AttackEffectiveness.NORMAL,
    [PokemonType.FIGHTING]: AttackEffectiveness.NORMAL,
    [PokemonType.POISON]: AttackEffectiveness.NORMAL,
    [PokemonType.GROUND]: AttackEffectiveness.SUPER_EFFECTIVE,
    [PokemonType.FLYING]: AttackEffectiveness.NORMAL,
    [PokemonType.PSYCHIC]: AttackEffectiveness.NORMAL,
    [PokemonType.BUG]: AttackEffectiveness.NORMAL,
    [PokemonType.ROCK]: AttackEffectiveness.SUPER_EFFECTIVE,
    [PokemonType.GHOST]: AttackEffectiveness.NORMAL,
    [PokemonType.DRAGON]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.DARK]: AttackEffectiveness.NORMAL,
    [PokemonType.STEEL]: AttackEffectiveness.NORMAL,
    [PokemonType.FAIRY]: AttackEffectiveness.NORMAL,
  },
  [PokemonType.ELECTRIC]: {
    [PokemonType.NORMAL]: AttackEffectiveness.NORMAL,
    [PokemonType.FIRE]: AttackEffectiveness.NORMAL,
    [PokemonType.WATER]: AttackEffectiveness.SUPER_EFFECTIVE,
    [PokemonType.ELECTRIC]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.GRASS]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.ICE]: AttackEffectiveness.NORMAL,
    [PokemonType.FIGHTING]: AttackEffectiveness.NORMAL,
    [PokemonType.POISON]: AttackEffectiveness.NORMAL,
    [PokemonType.GROUND]: AttackEffectiveness.NO_EFFECT,
    [PokemonType.FLYING]: AttackEffectiveness.SUPER_EFFECTIVE,
    [PokemonType.PSYCHIC]: AttackEffectiveness.NORMAL,
    [PokemonType.BUG]: AttackEffectiveness.NORMAL,
    [PokemonType.ROCK]: AttackEffectiveness.NORMAL,
    [PokemonType.GHOST]: AttackEffectiveness.NORMAL,
    [PokemonType.DRAGON]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.DARK]: AttackEffectiveness.NORMAL,
    [PokemonType.STEEL]: AttackEffectiveness.NORMAL,
    [PokemonType.FAIRY]: AttackEffectiveness.NORMAL,
  },
  [PokemonType.GRASS]: {
    [PokemonType.NORMAL]: AttackEffectiveness.NORMAL,
    [PokemonType.FIRE]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.WATER]: AttackEffectiveness.SUPER_EFFECTIVE,
    [PokemonType.ELECTRIC]: AttackEffectiveness.NORMAL,
    [PokemonType.GRASS]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.ICE]: AttackEffectiveness.NORMAL,
    [PokemonType.FIGHTING]: AttackEffectiveness.NORMAL,
    [PokemonType.POISON]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.GROUND]: AttackEffectiveness.SUPER_EFFECTIVE,
    [PokemonType.FLYING]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.PSYCHIC]: AttackEffectiveness.NORMAL,
    [PokemonType.BUG]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.ROCK]: AttackEffectiveness.SUPER_EFFECTIVE,
    [PokemonType.GHOST]: AttackEffectiveness.NORMAL,
    [PokemonType.DRAGON]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.DARK]: AttackEffectiveness.NORMAL,
    [PokemonType.STEEL]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.FAIRY]: AttackEffectiveness.NORMAL,
  },
  [PokemonType.ICE]: {
    [PokemonType.NORMAL]: AttackEffectiveness.NORMAL,
    [PokemonType.FIRE]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.WATER]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.ELECTRIC]: AttackEffectiveness.NORMAL,
    [PokemonType.GRASS]: AttackEffectiveness.SUPER_EFFECTIVE,
    [PokemonType.ICE]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.FIGHTING]: AttackEffectiveness.NORMAL,
    [PokemonType.POISON]: AttackEffectiveness.NORMAL,
    [PokemonType.GROUND]: AttackEffectiveness.SUPER_EFFECTIVE,
    [PokemonType.FLYING]: AttackEffectiveness.SUPER_EFFECTIVE,
    [PokemonType.PSYCHIC]: AttackEffectiveness.NORMAL,
    [PokemonType.BUG]: AttackEffectiveness.NORMAL,
    [PokemonType.ROCK]: AttackEffectiveness.NORMAL,
    [PokemonType.GHOST]: AttackEffectiveness.NORMAL,
    [PokemonType.DRAGON]: AttackEffectiveness.SUPER_EFFECTIVE,
    [PokemonType.DARK]: AttackEffectiveness.NORMAL,
    [PokemonType.STEEL]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.FAIRY]: AttackEffectiveness.NORMAL,
  },
  [PokemonType.FIGHTING]: {
    [PokemonType.NORMAL]: AttackEffectiveness.SUPER_EFFECTIVE,
    [PokemonType.FIRE]: AttackEffectiveness.NORMAL,
    [PokemonType.WATER]: AttackEffectiveness.NORMAL,
    [PokemonType.ELECTRIC]: AttackEffectiveness.NORMAL,
    [PokemonType.GRASS]: AttackEffectiveness.NORMAL,
    [PokemonType.ICE]: AttackEffectiveness.SUPER_EFFECTIVE,
    [PokemonType.FIGHTING]: AttackEffectiveness.NORMAL,
    [PokemonType.POISON]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.GROUND]: AttackEffectiveness.NORMAL,
    [PokemonType.FLYING]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.PSYCHIC]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.BUG]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.ROCK]: AttackEffectiveness.SUPER_EFFECTIVE,
    [PokemonType.GHOST]: AttackEffectiveness.NO_EFFECT,
    [PokemonType.DRAGON]: AttackEffectiveness.NORMAL,
    [PokemonType.DARK]: AttackEffectiveness.SUPER_EFFECTIVE,
    [PokemonType.STEEL]: AttackEffectiveness.SUPER_EFFECTIVE,
    [PokemonType.FAIRY]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
  },
  [PokemonType.POISON]: {
    [PokemonType.NORMAL]: AttackEffectiveness.NORMAL,
    [PokemonType.FIRE]: AttackEffectiveness.NORMAL,
    [PokemonType.WATER]: AttackEffectiveness.NORMAL,
    [PokemonType.ELECTRIC]: AttackEffectiveness.NORMAL,
    [PokemonType.GRASS]: AttackEffectiveness.SUPER_EFFECTIVE,
    [PokemonType.ICE]: AttackEffectiveness.NORMAL,
    [PokemonType.FIGHTING]: AttackEffectiveness.NORMAL,
    [PokemonType.POISON]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.GROUND]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.FLYING]: AttackEffectiveness.NORMAL,
    [PokemonType.PSYCHIC]: AttackEffectiveness.NORMAL,
    [PokemonType.BUG]: AttackEffectiveness.NORMAL,
    [PokemonType.ROCK]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.GHOST]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.DRAGON]: AttackEffectiveness.NORMAL,
    [PokemonType.DARK]: AttackEffectiveness.NORMAL,
    [PokemonType.STEEL]: AttackEffectiveness.NO_EFFECT,
    [PokemonType.FAIRY]: AttackEffectiveness.SUPER_EFFECTIVE,
  },
  [PokemonType.GROUND]: {
    [PokemonType.NORMAL]: AttackEffectiveness.NORMAL,
    [PokemonType.FIRE]: AttackEffectiveness.SUPER_EFFECTIVE,
    [PokemonType.WATER]: AttackEffectiveness.NORMAL,
    [PokemonType.ELECTRIC]: AttackEffectiveness.SUPER_EFFECTIVE,
    [PokemonType.GRASS]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.ICE]: AttackEffectiveness.NORMAL,
    [PokemonType.FIGHTING]: AttackEffectiveness.NORMAL,
    [PokemonType.POISON]: AttackEffectiveness.SUPER_EFFECTIVE,
    [PokemonType.GROUND]: AttackEffectiveness.NORMAL,
    [PokemonType.FLYING]: AttackEffectiveness.NO_EFFECT,
    [PokemonType.PSYCHIC]: AttackEffectiveness.NORMAL,
    [PokemonType.BUG]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.ROCK]: AttackEffectiveness.SUPER_EFFECTIVE,
    [PokemonType.GHOST]: AttackEffectiveness.NORMAL,
    [PokemonType.DRAGON]: AttackEffectiveness.NORMAL,
    [PokemonType.DARK]: AttackEffectiveness.NORMAL,
    [PokemonType.STEEL]: AttackEffectiveness.SUPER_EFFECTIVE,
    [PokemonType.FAIRY]: AttackEffectiveness.NORMAL,
  },
  [PokemonType.FLYING]: {
    [PokemonType.NORMAL]: AttackEffectiveness.NORMAL,
    [PokemonType.FIRE]: AttackEffectiveness.NORMAL,
    [PokemonType.WATER]: AttackEffectiveness.NORMAL,
    [PokemonType.ELECTRIC]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.GRASS]: AttackEffectiveness.SUPER_EFFECTIVE,
    [PokemonType.ICE]: AttackEffectiveness.NORMAL,
    [PokemonType.FIGHTING]: AttackEffectiveness.SUPER_EFFECTIVE,
    [PokemonType.POISON]: AttackEffectiveness.NORMAL,
    [PokemonType.GROUND]: AttackEffectiveness.NORMAL,
    [PokemonType.FLYING]: AttackEffectiveness.NORMAL,
    [PokemonType.PSYCHIC]: AttackEffectiveness.NORMAL,
    [PokemonType.BUG]: AttackEffectiveness.SUPER_EFFECTIVE,
    [PokemonType.ROCK]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.GHOST]: AttackEffectiveness.NORMAL,
    [PokemonType.DRAGON]: AttackEffectiveness.NORMAL,
    [PokemonType.DARK]: AttackEffectiveness.NORMAL,
    [PokemonType.STEEL]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.FAIRY]: AttackEffectiveness.NORMAL,
  },
  [PokemonType.PSYCHIC]: {
    [PokemonType.NORMAL]: AttackEffectiveness.NORMAL,
    [PokemonType.FIRE]: AttackEffectiveness.NORMAL,
    [PokemonType.WATER]: AttackEffectiveness.NORMAL,
    [PokemonType.ELECTRIC]: AttackEffectiveness.NORMAL,
    [PokemonType.GRASS]: AttackEffectiveness.NORMAL,
    [PokemonType.ICE]: AttackEffectiveness.NORMAL,
    [PokemonType.FIGHTING]: AttackEffectiveness.SUPER_EFFECTIVE,
    [PokemonType.POISON]: AttackEffectiveness.SUPER_EFFECTIVE,
    [PokemonType.GROUND]: AttackEffectiveness.NORMAL,
    [PokemonType.FLYING]: AttackEffectiveness.NORMAL,
    [PokemonType.PSYCHIC]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.BUG]: AttackEffectiveness.NORMAL,
    [PokemonType.ROCK]: AttackEffectiveness.NORMAL,
    [PokemonType.GHOST]: AttackEffectiveness.NORMAL,
    [PokemonType.DRAGON]: AttackEffectiveness.NORMAL,
    [PokemonType.DARK]: AttackEffectiveness.NO_EFFECT,
    [PokemonType.STEEL]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.FAIRY]: AttackEffectiveness.NORMAL,
  },
  [PokemonType.BUG]: {
    [PokemonType.NORMAL]: AttackEffectiveness.NORMAL,
    [PokemonType.FIRE]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.WATER]: AttackEffectiveness.NORMAL,
    [PokemonType.ELECTRIC]: AttackEffectiveness.NORMAL,
    [PokemonType.GRASS]: AttackEffectiveness.SUPER_EFFECTIVE,
    [PokemonType.ICE]: AttackEffectiveness.NORMAL,
    [PokemonType.FIGHTING]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.POISON]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.GROUND]: AttackEffectiveness.NORMAL,
    [PokemonType.FLYING]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.PSYCHIC]: AttackEffectiveness.SUPER_EFFECTIVE,
    [PokemonType.BUG]: AttackEffectiveness.NORMAL,
    [PokemonType.ROCK]: AttackEffectiveness.NORMAL,
    [PokemonType.GHOST]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.DRAGON]: AttackEffectiveness.NORMAL,
    [PokemonType.DARK]: AttackEffectiveness.SUPER_EFFECTIVE,
    [PokemonType.STEEL]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.FAIRY]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
  },
  [PokemonType.ROCK]: {
    [PokemonType.NORMAL]: AttackEffectiveness.NORMAL,
    [PokemonType.FIRE]: AttackEffectiveness.SUPER_EFFECTIVE,
    [PokemonType.WATER]: AttackEffectiveness.NORMAL,
    [PokemonType.ELECTRIC]: AttackEffectiveness.NORMAL,
    [PokemonType.GRASS]: AttackEffectiveness.NORMAL,
    [PokemonType.ICE]: AttackEffectiveness.SUPER_EFFECTIVE,
    [PokemonType.FIGHTING]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.POISON]: AttackEffectiveness.NORMAL,
    [PokemonType.GROUND]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.FLYING]: AttackEffectiveness.SUPER_EFFECTIVE,
    [PokemonType.PSYCHIC]: AttackEffectiveness.NORMAL,
    [PokemonType.BUG]: AttackEffectiveness.SUPER_EFFECTIVE,
    [PokemonType.ROCK]: AttackEffectiveness.NORMAL,
    [PokemonType.GHOST]: AttackEffectiveness.NORMAL,
    [PokemonType.DRAGON]: AttackEffectiveness.NORMAL,
    [PokemonType.DARK]: AttackEffectiveness.NORMAL,
    [PokemonType.STEEL]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.FAIRY]: AttackEffectiveness.NORMAL,
  },
  [PokemonType.GHOST]: {
    [PokemonType.NORMAL]: AttackEffectiveness.NO_EFFECT,
    [PokemonType.FIRE]: AttackEffectiveness.NORMAL,
    [PokemonType.WATER]: AttackEffectiveness.NORMAL,
    [PokemonType.ELECTRIC]: AttackEffectiveness.NORMAL,
    [PokemonType.GRASS]: AttackEffectiveness.NORMAL,
    [PokemonType.ICE]: AttackEffectiveness.NORMAL,
    [PokemonType.FIGHTING]: AttackEffectiveness.NORMAL,
    [PokemonType.POISON]: AttackEffectiveness.NORMAL,
    [PokemonType.GROUND]: AttackEffectiveness.NORMAL,
    [PokemonType.FLYING]: AttackEffectiveness.NORMAL,
    [PokemonType.PSYCHIC]: AttackEffectiveness.SUPER_EFFECTIVE,
    [PokemonType.BUG]: AttackEffectiveness.NORMAL,
    [PokemonType.ROCK]: AttackEffectiveness.NORMAL,
    [PokemonType.GHOST]: AttackEffectiveness.SUPER_EFFECTIVE,
    [PokemonType.DRAGON]: AttackEffectiveness.NORMAL,
    [PokemonType.DARK]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.STEEL]: AttackEffectiveness.NORMAL,
    [PokemonType.FAIRY]: AttackEffectiveness.NORMAL,
  },
  [PokemonType.DRAGON]: {
    [PokemonType.NORMAL]: AttackEffectiveness.NORMAL,
    [PokemonType.FIRE]: AttackEffectiveness.NORMAL,
    [PokemonType.WATER]: AttackEffectiveness.NORMAL,
    [PokemonType.ELECTRIC]: AttackEffectiveness.NORMAL,
    [PokemonType.GRASS]: AttackEffectiveness.NORMAL,
    [PokemonType.ICE]: AttackEffectiveness.NORMAL,
    [PokemonType.FIGHTING]: AttackEffectiveness.NORMAL,
    [PokemonType.POISON]: AttackEffectiveness.NORMAL,
    [PokemonType.GROUND]: AttackEffectiveness.NORMAL,
    [PokemonType.FLYING]: AttackEffectiveness.NORMAL,
    [PokemonType.PSYCHIC]: AttackEffectiveness.NORMAL,
    [PokemonType.BUG]: AttackEffectiveness.NORMAL,
    [PokemonType.ROCK]: AttackEffectiveness.NORMAL,
    [PokemonType.GHOST]: AttackEffectiveness.NORMAL,
    [PokemonType.DRAGON]: AttackEffectiveness.SUPER_EFFECTIVE,
    [PokemonType.DARK]: AttackEffectiveness.NORMAL,
    [PokemonType.STEEL]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.FAIRY]: AttackEffectiveness.NO_EFFECT,
  },
  [PokemonType.DARK]: {
    [PokemonType.NORMAL]: AttackEffectiveness.NORMAL,
    [PokemonType.FIRE]: AttackEffectiveness.NORMAL,
    [PokemonType.WATER]: AttackEffectiveness.NORMAL,
    [PokemonType.ELECTRIC]: AttackEffectiveness.NORMAL,
    [PokemonType.GRASS]: AttackEffectiveness.NORMAL,
    [PokemonType.ICE]: AttackEffectiveness.NORMAL,
    [PokemonType.FIGHTING]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.POISON]: AttackEffectiveness.NORMAL,
    [PokemonType.GROUND]: AttackEffectiveness.NORMAL,
    [PokemonType.FLYING]: AttackEffectiveness.NORMAL,
    [PokemonType.PSYCHIC]: AttackEffectiveness.SUPER_EFFECTIVE,
    [PokemonType.BUG]: AttackEffectiveness.NORMAL,
    [PokemonType.ROCK]: AttackEffectiveness.NORMAL,
    [PokemonType.GHOST]: AttackEffectiveness.SUPER_EFFECTIVE,
    [PokemonType.DRAGON]: AttackEffectiveness.NORMAL,
    [PokemonType.DARK]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.STEEL]: AttackEffectiveness.NORMAL,
    [PokemonType.FAIRY]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
  },
  [PokemonType.STEEL]: {
    [PokemonType.NORMAL]: AttackEffectiveness.NORMAL,
    [PokemonType.FIRE]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.WATER]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.ELECTRIC]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.GRASS]: AttackEffectiveness.NORMAL,
    [PokemonType.ICE]: AttackEffectiveness.SUPER_EFFECTIVE,
    [PokemonType.FIGHTING]: AttackEffectiveness.NORMAL,
    [PokemonType.POISON]: AttackEffectiveness.NORMAL,
    [PokemonType.GROUND]: AttackEffectiveness.NORMAL,
    [PokemonType.FLYING]: AttackEffectiveness.NORMAL,
    [PokemonType.PSYCHIC]: AttackEffectiveness.NORMAL,
    [PokemonType.BUG]: AttackEffectiveness.NORMAL,
    [PokemonType.ROCK]: AttackEffectiveness.SUPER_EFFECTIVE,
    [PokemonType.GHOST]: AttackEffectiveness.NORMAL,
    [PokemonType.DRAGON]: AttackEffectiveness.NORMAL,
    [PokemonType.DARK]: AttackEffectiveness.NORMAL,
    [PokemonType.STEEL]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.FAIRY]: AttackEffectiveness.SUPER_EFFECTIVE,
  },
  [PokemonType.FAIRY]: {
    [PokemonType.NORMAL]: AttackEffectiveness.NORMAL,
    [PokemonType.FIRE]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.WATER]: AttackEffectiveness.NORMAL,
    [PokemonType.ELECTRIC]: AttackEffectiveness.NORMAL,
    [PokemonType.GRASS]: AttackEffectiveness.NORMAL,
    [PokemonType.ICE]: AttackEffectiveness.NORMAL,
    [PokemonType.FIGHTING]: AttackEffectiveness.SUPER_EFFECTIVE,
    [PokemonType.POISON]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.GROUND]: AttackEffectiveness.NORMAL,
    [PokemonType.FLYING]: AttackEffectiveness.NORMAL,
    [PokemonType.PSYCHIC]: AttackEffectiveness.NORMAL,
    [PokemonType.BUG]: AttackEffectiveness.NORMAL,
    [PokemonType.ROCK]: AttackEffectiveness.NORMAL,
    [PokemonType.GHOST]: AttackEffectiveness.NORMAL,
    [PokemonType.DRAGON]: AttackEffectiveness.SUPER_EFFECTIVE,
    [PokemonType.DARK]: AttackEffectiveness.SUPER_EFFECTIVE,
    [PokemonType.STEEL]: AttackEffectiveness.NOT_VERY_EFFECTIVE,
    [PokemonType.FAIRY]: AttackEffectiveness.NORMAL,
  },
}

export const effectivenessToWeight = {
  [AttackEffectiveness.NO_EFFECT]: 0,
  [AttackEffectiveness.NOT_VERY_EFFECTIVE]: 1,
  [AttackEffectiveness.NORMAL]: 2,
  [AttackEffectiveness.SUPER_EFFECTIVE]: 4,
} as const

export const colorTheme = {
  [PokemonType.NORMAL]: '#A8A878',
  [PokemonType.FIRE]: '#F08030',
  [PokemonType.WATER]: '#6890F0',
  [PokemonType.GRASS]: '#78C850',
  [PokemonType.ELECTRIC]: '#F8D030',
  [PokemonType.ICE]: '#98D8D8',
  [PokemonType.FIGHTING]: '#C03028',
  [PokemonType.POISON]: '#A040A0',
  [PokemonType.GROUND]: '#E0C068',
  [PokemonType.FLYING]: '#A890F0',
  [PokemonType.PSYCHIC]: '#F85888',
  [PokemonType.BUG]: '#A8B820',
  [PokemonType.ROCK]: '#B8A038',
  [PokemonType.GHOST]: '#705898',
  [PokemonType.DARK]: '#705848',
  [PokemonType.DRAGON]: '#7038F8',
  [PokemonType.STEEL]: '#B8B8D0',
  [PokemonType.FAIRY]: '#EE99AC',
} as const

export const typeNameMap = {
  [PokemonType.NORMAL]: 'normal',
  [PokemonType.FIRE]: 'fire',
  [PokemonType.WATER]: 'water',
  [PokemonType.GRASS]: 'grass',
  [PokemonType.ELECTRIC]: 'electric',
  [PokemonType.ICE]: 'ice',
  [PokemonType.FIGHTING]: 'fighting',
  [PokemonType.POISON]: 'poison',
  [PokemonType.GROUND]: 'ground',
  [PokemonType.FLYING]: 'flying',
  [PokemonType.PSYCHIC]: 'psychic',
  [PokemonType.BUG]: 'bug',
  [PokemonType.ROCK]: 'rock',
  [PokemonType.GHOST]: 'ghost',
  [PokemonType.DARK]: 'dark',
  [PokemonType.DRAGON]: 'dragon',
  [PokemonType.STEEL]: 'steel',
  [PokemonType.FAIRY]: 'fairy',
} as const

export const typeNameMapReverse = Object.fromEntries(
  Object.entries(typeNameMap).map(([t, n]) => [n, parseInt(t)])
)
