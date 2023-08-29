import React, { createContext, useEffect, useReducer, useMemo } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const initialAuthState = {
    isLoggedIn: false,
    isLoading: true
}

const authReducer = (state, action) => {
    switch(action.type){

        case 'LOADED': 
            return {
                ...state,
                isLoading: false
            }
        case 'LOGIN': 
            return {
                ...state,
                isLoggedIn: true,
            }

        case 'REGISTER': 
            return {
                ...state,
                isLoggedIn: true,
            }
            
        case 'LOGOUT': 
            return {
                ...state,
                isLoggedIn: false,
                userGroup: null
            }

        default: 
            return state;
    }
}


const AuthProvider = ({children}) => {

    const authMemo = useMemo(() => ({

        login: () => {
            dispatch({type: 'LOGIN'});
        },

        // function to remove cookies and logout user, since cookies were set with httpOnly flag
        // for increasing security, it needs to be removed from serverside
        logout: async () => {
            await axios.get('/api/logout');
            dispatch({type: 'LOGOUT'});
        }
    }), []);
    
    const [authState, dispatch] = useReducer(authReducer, initialAuthState);

    /*Checking for authentication on initial app load
    this function only run once and save the user data in authState
    */
    useEffect(() => {

        const checkAuthentication = async () => {
            try{
                const response = await axios.get('/api/check_login');
                if(response.status === 200)
                    dispatch({type: 'LOGIN'});
            } catch(e){
                console.log(e);
            } finally{
                dispatch({type: 'LOADED'});
            }
        }

        checkAuthentication();
    }, []);

    // If the authentication hasnt been checked show loading component
    if (authState.isLoading)
        return <h1>Loading</h1>

    return (
        <AuthContext.Provider
            value={{
                authState,
                authMemo
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;