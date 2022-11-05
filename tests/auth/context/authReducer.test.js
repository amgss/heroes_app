import { authReducer } from '../../../src/auth/context/authReducer';
import { types } from '../../../src/auth/types/types';

describe('Pruebas en authReducer', () => {
    const action = {type: types.login, payload: {id: 1, name: 'antonio.martin'}};
    const loggedState = { logged: true, user: action.payload };
    const logoutState = { logged: false };

    test('Debe retornar el estado por defecto', () => {
        const state = authReducer({ logged: false }, {});
        expect(state).toEqual({ logged: false });
    });

    test('Debe llamar al login, autenticar y establecer el susario', () => {
        const state = authReducer({ logged: false }, action);
        expect(state).toEqual(loggedState);
    });

    test('Debe llamar al logout y borrar el susario', () => {
        const state = authReducer({ logged: true }, {type: types.logout});
        expect(state).toEqual(logoutState);
    });
});
