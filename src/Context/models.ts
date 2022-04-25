import { Dispatch } from "react";
import { Character, Film, Planet, Specie, Starship, Vehicle } from "../Api/models";

export interface ContextProps<T, P> {
  state: T;
  dispatch: Dispatch<P>;
}

export enum ActionTypes {
  SET_CONTEXT = "SET_CONTEXT",
}

export type GlobalAction =
  | { type: ActionTypes.SET_CONTEXT; payload: GlobalState }


export interface GlobalState {
  characters: Character[],
  films: Film[],
  planets: Planet[],
  species: Specie[],
  starships: Starship[],
  vehicles: Vehicle[] 
}

export interface GlobalContextProps
  extends ContextProps<GlobalState, GlobalAction> {}
