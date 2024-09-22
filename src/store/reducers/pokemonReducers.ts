/* eslint-disable import/no-anonymous-default-export */
import { PokemonType, PokemonData, PokemonAction } from "../types/pokemonType";

const initialState = {
  listPokemon: [],
  detailPokemon: {},
  myPokemons: [],
  isLoading: false,
  error: null,
};

export default (state: PokemonData = initialState, { type, payload }: PokemonAction) => {
  switch (type) {
    case PokemonType.POKEMON_PENDING:
      return { ...state, ...payload, error: null, isLoading: true };
    case PokemonType.POKEMON_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        listPokemon: payload?.listPokemon || state.listPokemon,
        detailPokemon: payload?.detailPokemon || state.detailPokemon,
        myPokemons: payload.myPokemons ?? state.myPokemons,
      };

    case PokemonType.POKEMON_ERROR:
      return { ...state, ...payload, error: null, isLoading: false };
    default:
      return state;
  }
};
