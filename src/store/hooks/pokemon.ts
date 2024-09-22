import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../types";
import { delPokemon, getDetailPokemon, getListPokemon, myPokemons } from "../actions/pokemonAction";
import { retry } from "@reduxjs/toolkit/query";

export const usePokemon = () => {
  const dispatch = useDispatch<any>();
  const managementPokemonState = useSelector((state: RootState) => state.pokemon);

  const listPokemon = async (limit: string, offset: string, name?: string) => {
    const pokemons = await dispatch(getListPokemon(offset, limit, name));
    return pokemons;
  };

  const detailPokemon = async (name: string | string[] | undefined) => {
    const pokemon = await dispatch(getDetailPokemon(name));
    return pokemon;
  };

  const addPokemon = async (name: string, pokemon: string, image: string) => {
    const hero = await dispatch(myPokemons(name, pokemon, image));
    return hero;
  };

  const deletePokemon = async (name: string) => {
    const pokemon = await dispatch(delPokemon(name));
    return pokemon;
  };

  return {
    managementPokemonState,
    listPokemon,
    detailPokemon,
    addPokemon,
    deletePokemon,
  };
};
