import React, { createContext, useReducer, useContext } from "react";
import {
  ActionTypes,
  GlobalState,
  GlobalAction,
  GlobalContextProps
} from "./models";

export const initialState = {} as GlobalState;

const Context = createContext({} as GlobalContextProps);

const reducer = (state = initialState, action: GlobalAction): GlobalState => {
  switch (action.type) {
    case ActionTypes.SET_CONTEXT: {
      return action.payload
    }
    default: {
      throw new Error(`Unsupported action type: ${action}`);
    }
  }
};

interface InitialState extends React.HTMLAttributes<HTMLDivElement> {
  globalState?: GlobalState;
}

export const GlobalContextProvider: React.FunctionComponent<InitialState> = ({
  children,
  globalState = initialState,
}) => {
  const [state, dispatch] = useReducer(reducer, globalState);
  const value = { state, dispatch } as GlobalContextProps;
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export function GlobalContext() {
  const { state, dispatch } = useContext(Context);
  return { state, dispatch, ActionTypes };
}
