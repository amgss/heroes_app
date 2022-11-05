import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../../src/auth/context/AuthContext';
import { Navbar } from '../../../src/ui';

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}));

describe('Pruebas sobre <Navbar/>', () => {
    const contextValue = {
        logged: true,
        user: { id: 1, name: 'Usuario' },
        login: jest.fn(),
        logout: jest.fn()
    };
    beforeEach(() => jest.clearAllMocks());

    test('Debe navegar al Navigate (login) si NO está autenticado', () => {
        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getByText(contextValue.user.name)).toBeTruthy();
    });

    test('Debe llamar a logout y navigate cuando se hace click en el botón de Logout', () => {
        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        const logoutBtn = screen.getByRole('button');
        fireEvent.click(logoutBtn);
        expect(contextValue.logout).toHaveBeenCalled();
        expect(mockedUseNavigate).toHaveBeenCalledWith('/login', {
            "replace": true
        });
    });
});