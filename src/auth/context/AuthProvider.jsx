import { useReducer } from 'react';
import { types } from '../types/types';
import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer';

const initialState = { logged: false };
const init = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    return {
        logged: !!user,
        user
    };
};

export const AuthProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, initialState, init);
    const login = (name = '') => {
        const user = { id: 1, name };

        const action = {
            type: types.login,
            payload: user
        };

        localStorage.setItem('user', JSON.stringify(user));

        dispatch(action);
    };

    const logout = (name = '') => {
        localStorage.removeItem('user');
        const action = {
            type: types.logout,
            payload: {
                id: null,
                name: ''
            }
        };

        dispatch(action);
    };

    return (
        <AuthContext.Provider value={{ ...authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
