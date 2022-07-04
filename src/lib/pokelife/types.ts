export type State = PokemonType[][]
export enum PokemonType {
  NORMAL,
  FIRE,
  WATER,
  GRASS,
  ELECTRIC,
  ICE,
  FIGHTING,
  POISON,
  GROUND,
  FLYING,
  PSYCHIC,
  BUG,
  ROCK,
  GHOST,
  DARK,
  DRAGON,
  STEEL,
  FAIRY,
}

export enum AttackEffectiveness {
  NO_EFFECT = 0,
  NOT_VERY_EFFECTIVE = 1,
  NORMAL = 2,
  SUPER_EFFECTIVE = 4,
}
