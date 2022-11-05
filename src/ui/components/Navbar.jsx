import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/context/AuthContext';

export const Navbar = () => {
    const navigate = useNavigate();
    const { logged, user, logout } = useContext(AuthContext);
    const onLogout = () => {
        if (logged) {
            logout(user.name);
            console.log('logout');
            navigate('/login', {
                replace: true
            });
        }
    }

    const onLogin = () => {
        if (!logged) {
            console.log('login');
            navigate('/login', {
                replace: true
            });
        }
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark" style={{'padding': '0 10px 0 10px'}}>

            <Link
                className="navbar-brand"
                to="/"
            >
                Asociaciones
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">
                    <NavLink
                        className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
                        to="/marvel"
                    >
                        Marvel
                    </NavLink>
                    <NavLink
                        className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
                        to="/dc"
                    >
                        DC
                    </NavLink>
                    <NavLink
                        className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
                        to="/search"
                    >
                        Search
                    </NavLink>
                    {/* <NavLink
                        className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
                        to="/heroe"
                    >
                        Heroe
                    </NavLink> */}
                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                <ul className="navbar-nav ml-auto">
                    <span
                        className="nav-item nav-link text-light"
                    >
                        {user?.name}
                    </span>
                    <button
                        className="nav-item nav-link btn btn-outline-primary"
                        onClick={logged ? onLogout : onLogin}
                    >
                        <span className='mr-2'>{logged ? 'Logout ' : 'Login '}</span>
                        {/* <span className='bi bi-box-arrow-right'></span> */}
                        <i className="bi bi-box-arrow-right"></i>
                    </button>
                </ul>
            </div>
        </nav>
    )
}