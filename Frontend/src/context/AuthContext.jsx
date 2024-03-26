import { useContext, useReducer, useEffect, createContext } from "react";

const initialState = {
  user: localStorage.getItem('user') !== undefined ? JSON.parse(localStorage.getItem('user')) : null,
  role: localStorage.getItem('role') || null,  // Corrected: Role should be set to 'role'
  token: localStorage.getItem('token') || null,  // Corrected: Token should be set to 'token'
};


export const authContext = createContext(initialState);

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        role: null,
        token: null,
      };

    case "LOGIN_SUCCESS":
      return {
        user: action.payload.user,
        role: action.payload.role,
        token: action.payload.token,
         
      };
    case "LOGOUT": {
      return {
        user: null,
        role: null,
        token: null,
      };
    }
 
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect (()=>{

    localStorage.setItem('user', JSON.stringify(state.user));
    localStorage.setItem('role', state.role);
    localStorage.setItem('token', state.token);
     

  }, [state])
  
  return (
    <authContext.Provider
      value={{ user:state.user,token:state.token, role:state.role , dispatch}}
     
    >
      {children}
    </authContext.Provider>

  )
  
};
