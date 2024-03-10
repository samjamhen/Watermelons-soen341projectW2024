import {createContext, useReducer} from 'react';

export const AuthContext = createContext();

const user = JSON.parse(localStorage.getItem('user')) || null;

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null}
        default:
            return state;
    }
}

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: user
    });

    console.log('AuthContext state: ', state)

    return (
        <AuthContext.Provider value = {{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}