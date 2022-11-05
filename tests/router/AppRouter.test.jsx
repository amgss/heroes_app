import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../../src/auth/context/AuthContext';
import { PublicRoute, PrivateRoute, AppRouter } from '../../src/router';

describe('Pruebas sobre <AppRouter/>', () => {
    test('Debe nmostrar el login si NO está autenticado', () => {
        const contextValue = { logged: false };
        
        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter/>
                </AuthContext.Provider>
            </MemoryRouter>
        );
        expect(screen.getAllByText('LoginPage')).toBeTruthy();
    });

    test('Debe mostrar el componente de <MarvelPage/> si está autenticado', () => {
        const contextValue = { logged: true, user: { id: 1, name: 'Usuario' } };
        Storage.prototype.setItem = jest.fn();

        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter/>
                </AuthContext.Provider>
            </MemoryRouter>
        );
        expect(screen.getByText('Marvel')).toBeTruthy();
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath','/marvel');
        screen.debug();
    });
});