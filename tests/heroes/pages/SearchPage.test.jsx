import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../../src/auth/context/AuthContext";
import { SearchPage } from "../../../src/heroes/pages/SearchPage";

describe('Pruebas sobre <SearchPage/>', () => {
    const contextValue = {
        logged: true,
        user: { id: 1, name: 'Usuario' },
        login: jest.fn(),
        logout: jest.fn()
    };

    beforeEach(() => jest.clearAllMocks());

    test('Debe mostrarse correctamente con valores por defecto', () => {
        const {container} = render(
            <MemoryRouter initialEntries={['/search']}>
                <AuthContext.Provider value={contextValue}>
                    <SearchPage />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect(container).toMatchSnapshot();
    });

    test('Debe mostrar a Batman y el input vacío', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <AuthContext.Provider value={contextValue}>
                    <SearchPage />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        const input = screen.getByRole('searchbox');
        expect(input.value).toBe('');
        expect(screen.getByText('Batman')).toMatchSnapshot();

        const img = screen.getByRole('img');
        expect(img.src).toContain('dc-batman');

        const alert = screen.getByLabelText('alert');
        expect(alert.style.display).toBe('none');

        screen.debug();
    });
});