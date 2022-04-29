export const PAGE = {
  CHARACTERS: () => '/personagens',
  FILMS: () => '/filmes',
  REGISTER: () => '/cadastro',
  CHARACTERS_INFO: (name: string) => `${PAGE.CHARACTERS()}/${name}`,
  FILMS_INFO: (name: string) => `${PAGE.FILMS()}/${name}`
}

export const ENDPOINT = {
  BASE: () => 'https://swapi.dev/api',
  CHARACTERS: () => 'people',
  FILMS: () => 'films',
  PLANETS: () => 'planets',
  VEHICLES: () => 'vehicles',
  SPECIES: () => "species",
  STARSHIPS: () => 'starships',
}

export const PAGE_SIZE = 20

export const ERROR_DEFAULT = 'Preencha esse campo para continuar'

export const EMAIL_REGEX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,6}$/;