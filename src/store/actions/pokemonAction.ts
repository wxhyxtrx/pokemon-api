import { Dispatch } from "redux";
import {
  IBagPokemons,
  IErrorType,
  IListPokemon,
  PokemonAction,
  PokemonData,
  PokemonType,
} from "../types/pokemonType";
import { API } from "@/config/API";
import axios from "axios";
import { usePokemon } from "../hooks/pokemon";
import { RootState } from "../types";
import { error } from "console";

export const pokemonPending = (): PokemonAction => ({
  type: PokemonType.POKEMON_PENDING,
  payload: {
    data: null,
  },
});

export const pokemonSuccess = (data: Partial<PokemonData>): PokemonAction => ({
  type: PokemonType.POKEMON_SUCCESS,
  payload: { ...data },
});

export const pokemonError = (error: IErrorType): PokemonAction => ({
  type: PokemonType.POKEMON_ERROR,
  payload: { error },
});

export const getListPokemon =
  (limit: string, offset: string, name?: string) => async (dispatch: Dispatch<PokemonAction>) => {
    dispatch(pokemonPending());
    const url = name ? `/pokemon/${name}` : `/pokemon?limit=${limit}&offset=${offset}`;
    try {
      const result = await API.get(url);

      const { status, data } = result;

      let pokemonData;
      if (!name) {
        pokemonData = await Promise.all(
          data.results.map(async (item: IListPokemon) => {
            const result = await axios.get(item.url);
            return result.data;
          })
        );
      }
      const response = {
        code: status,
        data: {
          count: name ? [data].length : data.count,
          pokemon: name ? [data] : pokemonData,
        },
        message: "success",
      };
      dispatch(pokemonSuccess({ listPokemon: name ? [data] : pokemonData }));
      return response;
    } catch (error: any) {
      const response = {
        code: error.status ?? 404,
        data: null,
        error: error.response.data,
        message: error.message ?? "failed",
      };
      dispatch(pokemonError(response));
      return response;
    }
  };

export const getDetailPokemon =
  (name: string | string[] | undefined) => async (dispatch: Dispatch<PokemonAction>) => {
    dispatch(pokemonPending());

    const url = `/pokemon/${name}`;

    try {
      const result = await API.get(url);
      const { status, data } = result;
      const response = {
        code: status,
        data: data,
        message: "success get detail",
      };
      dispatch(pokemonSuccess({ detailPokemon: data }));
      return response;
    } catch (error: any) {
      const response = {
        code: error.status ?? 404,
        data: null,
        error: error.response.data,
        message: error.message ?? "failed get detail",
      };
      dispatch(pokemonError(response));
      return response;
    }
  };

export const myPokemons =
  (name: string, pokemon: string, image: string) =>
  async (dispatch: Dispatch<PokemonAction>, getState: () => RootState) => {
    dispatch(pokemonPending());

    const {
      pokemon: { myPokemons },
    } = getState();

    const isPokemonExist = myPokemons?.some((item: IBagPokemons) => item.pokemon === pokemon);

    if (isPokemonExist) {
      const response = {
        code: 400,
        data: null,
        message: "Pokémon already exists in your collection!",
        error: true,
      };
      dispatch(pokemonError(response));
      return response;
    }

    const data: IBagPokemons = {
      name,
      pokemon,
      image,
    };

    const updatedPokemons = [...(myPokemons ?? []), data]; 

    dispatch(pokemonSuccess({ myPokemons: updatedPokemons }));

    const response = {
      code: 200,
      data: data,
      message: "Pokémon added successfully",
    };
    return response;
  };

export const delPokemon =
  (name: string) => async (dispatch: Dispatch<PokemonAction>, getState: () => RootState) => {
    dispatch(pokemonPending());

    try {
      const {
        pokemon: { myPokemons },
      } = getState();

      const updatedPokemons = myPokemons?.filter(
        (pokemon: IBagPokemons) => pokemon.pokemon !== name
      );

      dispatch(pokemonSuccess({ myPokemons: updatedPokemons }));

      return {
        code: 200,
        data: updatedPokemons,
        message: "Pokémon deleted successfully",
      };
    } catch (error: any) {
      const response = {
        code: error.status ?? 500,
        data: null,
        message: "Failed to delete Pokémon",
        error: error.response.data,
      };

      dispatch(pokemonError(response));
      return response;
    }
  };
