import * as React from "react";

let AppContext = React.createContext();

let initialState = {
  isAuthenticated: false,
  user: null,
  isLoading: true,
  listen_to_auth:true
};

let reducer = (state, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {    
    case "LOGIN":
        console.log('Login',action);
        var a = { ...state, ...action.payload };
        console.log(a);
        localStorage.setItem('authUser', JSON.stringify(action.payload.user));
        return { ...state, ...action.payload };
    case "LOGOUT":
        console.log('Logout');
        var a = { ...state, ...action.payload };
        console.log(a);
        localStorage.removeItem('authUser');
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