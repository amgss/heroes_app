import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../../src/auth/context/AuthContext';
import { PrivateRoute } from '../../src/router';

describe('Pruebas sobre <HeoresRoutes/>', () => {
    test('Debe navegar al children (marvel) si está autenticado', () => {
        const contextValue = { logged: true, user: { id: 1, name: 'Usuario' } };
        Storage.prototype.setItem = jest.fn();
        
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/marvel']}>
                    <Routes>
                        <Route path='/marvel' element={
                            <PrivateRoute>
                                <h1>Marvel</h1>
                            </PrivateRoute>
                        } />
                        <Route path='/login' element={<h1>Ruta pública</h1>} />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect(screen.getByText('Marvel')).toBeTruthy();
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath','/marvel');
    });

    test('Debe navegar al Navigate (login) si NO está autenticado', () => {
        const contextValue = { logged: false };
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/marvel']}>
                    <Routes>
                        <Route path='/marvel' element={
                            <PrivateRoute>
                                <h1>Marvel</h1>
                            </PrivateRoute>
                        } />
                        <Route path='/login' element={<h1>Ruta pública</h1>} />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect(screen.getByText('Ruta pública')).toBeTruthy();
    });
});