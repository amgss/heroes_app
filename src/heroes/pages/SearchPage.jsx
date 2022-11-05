import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { HeroCard } from '../components';
import { getHeroesByName } from '../helpers'
import { useForm } from '../../hooks/FormCustomHook';

export const SearchPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { q = '' } = queryString.parse(location.search);
    const heroes = getHeroesByName(q);
    const showSearch = (q.length === 0);
    const showError = (q.length > 0 && heroes.length === 0);
    const { searchText, onInputChange, onResetForm } = useForm({ searchText: '' });

    const onSubmitSearch = (event) => {
        event.preventDefault();
        navigate(`?q=${searchText}`);
        onResetForm();
    };

    return (
        <>
            <h1 className="mt-2">Busca tu héroe</h1>
            <hr />
            <div className="row mt-5">
                <div className="col-5">
                    <h4>Buscando</h4>
                    <hr />

                    <form className="d-flex" onSubmit={onSubmitSearch}>
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            name="searchText"
                            value={searchText}
                            onChange={onInputChange}
                        />
                        <button className="btn btn-outline-primary" type="submit">
                            Buscar
                        </button>
                    </form>
                </div>
                <div className="col-7">
                    <h4>Resultados:</h4>
                    <hr />
                    <div
                        aria-label="alert"
                        className="alert alert-primary animate__animated animate__fadeIn"
                        style={{ display: showSearch ? '' : 'none' }}
                    >
                        Busca tu héroe
                    </div>
                    <div
                        aria-label="error"
                        className="alert alert-danger animate__animated animate__fadeIn"
                        style={{ display: showError ? '' : 'none' }}
                    >
                        No hay resultados para <b>{q}</b>
                    </div>
                    {
                        heroes.map(hero => (
                            <HeroCard key={hero.id} {...hero} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}
