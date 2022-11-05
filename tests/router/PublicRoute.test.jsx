import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../../src/auth/context/AuthContext';
import { PublicRoute } from '../../src/router/PublicRoute';

describe('Pruebas sobre <PublicRoute/>', () => {
    test('Debe mostrar el children (login) si no está autenticado', () => {
        const contextValue = { logged: false };
        render(
            <AuthContext.Provider value={contextValue}>
                <PublicRoute>
                    <h1>Ruta pública</h1>
                </PublicRoute>
            </AuthContext.Provider>
        );
        expect(screen.getByText('Ruta pública')).toBeTruthy();
    });

    test('Debe navegar al Navigate (marvel) si está autenticado', () => {
        const contextValue = { logged: false, user: { id: 1, name: 'Usuario' } };
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/']}>
                    <Routes>
                        <Route path='/login' element={
                            <PublicRoute>
                                <h1>Ruta pública</h1>
                            </PublicRoute>
                        } />
                        <Route path='/' element={<h1>Marvel</h1>} />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect(screen.getByText('Marvel')).toBeTruthy();
    });
});