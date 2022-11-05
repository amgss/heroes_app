import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../../src/auth/context/AuthContext";
import { SearchPage } from "../../../src/heroes/pages/SearchPage";

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}));

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

    test('Debe mostrar un error si no encuentra el héroe', () => {
        const {container} = render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <AuthContext.Provider value={contextValue}>
                    <SearchPage />
                </AuthContext.Provider>
            </MemoryRouter>
        );
        
        const input = screen.getByRole('searchbox');
        input.setAttribute('value','batman123');
        fireEvent.change(input);

        const btn = screen.getByRole('button');
        fireEvent.click(btn);

        expect(mockedUseNavigate).toHaveBeenCalledWith('?q=batman123');

        const errorMsg = screen.getByLabelText('error');
        expect(errorMsg).toBeTruthy();
        expect(JSON.stringify(alert.style?.display)).toBe(undefined);
        screen.debug();
    });

    test('Debe llamar el navigate hacia la poantalla nueva', () => {
        const {container} = render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <AuthContext.Provider value={contextValue}>
                    <SearchPage />
                </AuthContext.Provider>
            </MemoryRouter>
        );
        
        const input = screen.getByRole('searchbox');
        input.setAttribute('value','batman');
        fireEvent.change(input);
        // fireEvent.change(input, {target: {name: 'searchText', value: 'superman'}});

        const btn = screen.getByRole('button');
        fireEvent.click(btn);

        // const form = screen.getByRole('form');
        // fireEvent.submit(form);

        expect(mockedUseNavigate).toHaveBeenCalledWith('?q=batman');

    });
});