import { Dispatch } from "redux";
import {
  IErrorType,
  IListPokemon,
  PokemonAction,
  PokemonData,
  PokemonType,
} from "../types/pokemonType";
import { API } from "@/config/API";
import axios from "axios";

export const pokemonPending = (): PokemonAction => ({
  type: PokemonType.POKEMON_PENDING,
  payload: {
    data: null,
  },
});

export const pokemonSuccess = (data: PokemonData): PokemonAction => ({
  type: PokemonType.POKEMON_SUCCESS,
  payload: { data },
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
      dispatch(pokemonSuccess({ listPokemon: response }));
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
      dispatch(pokemonSuccess({ detailPokemon: response }));
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
