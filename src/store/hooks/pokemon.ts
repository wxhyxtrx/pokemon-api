import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../types";
import { getDetailPokemon, getListPokemon } from "../actions/pokemonAction";

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

  return {
    managementPokemonState,
    listPokemon,
    detailPokemon,
  };
};
