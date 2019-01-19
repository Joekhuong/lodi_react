import * as React from "react";

let AppContext = React.createContext();

let initialState = {
  isAuthenticated: false,
  user: null
};

let reducer = (state, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {    
    case "LOGIN":
        return { ...state, ...action.payload };
    case "LOGOUT":
        return { ...state, ...action.payload };
    case "SET_AUTHENTICATE":
        return { ...state, isAuthenticated: action.payload };
    case "reset":
    default:
      return initialState;
  }
};

function AppContextProvider(props) {
  // [A]
  let [state, dispatch] = React.useReducer(reducer, initialState);
  let value = { state, dispatch };


  // [B]
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}

let AppContextConsumer = AppContext.Consumer;

// [C]
export { AppContext, AppContextProvider, AppContextConsumer };