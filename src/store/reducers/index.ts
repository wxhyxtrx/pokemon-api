import { combineReducers } from "redux";
import pokemonReducers from "./pokemonReducers";

export default combineReducers({
  pokemon: pokemonReducers,
});
