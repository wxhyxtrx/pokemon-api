export enum PokemonType {
  POKEMON_PENDING = "POKEMON_PENDING",
  POKEMON_SUCCESS = "POKEMON_SUCCESS",
  POKEMON_ERROR = "POKEMON_ERROR",
}

export interface PokemonState {
  data: PokemonData | null;
  isLoading: boolean;
  error: IErrorType | null;
}

export interface PokemonData {
  listPokemon?: any;
  detailPokemon?: any;
}

export interface IErrorType {
  code: number;
  message: string;
  data: null;
  error: any;
}

export interface PokemonResponse {
  code: number;
  message: string;
  data: PokemonData | null;
}

export interface IListPokemon {
  name: string;
  url: string;
}

interface GetPokemonAction {
  type: PokemonType.POKEMON_SUCCESS;
  payload: {
    data: PokemonData;
  };
}

interface SetLoadingAction {
  type: PokemonType.POKEMON_PENDING;
  payload: { data: null };
}

interface SetErrorAction {
  type: PokemonType.POKEMON_ERROR;
  payload: {
    error: IErrorType;
  };
}

export type PokemonAction = GetPokemonAction | SetLoadingAction | SetErrorAction;
