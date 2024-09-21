import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../types";
import { getListPokemon } from "../actions/pokemonAction";

export const usePokemon = () => {
  const dispatch = useDispatch<any>();
  const managementPokemonState = useSelector((state: RootState) => state.pokemon);

  const listPokemon = async (limit: string, offset: string, name?: string) => {
    const pokemon = await dispatch(getListPokemon(offset, limit, name));
    return pokemon;
  };

  return {
    managementPokemonState,
    listPokemon,
  };
};
