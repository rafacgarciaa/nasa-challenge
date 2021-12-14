import { NavLink, useLocation } from 'react-router-dom'

export const Header = () => {
    const location = useLocation();
    return (
        <header className={`cover-container ${location.pathname !== '/challenge' ? 'mb-auto' : ''}`}>
            <div>
                <h3 className="float-md-start mb-0">Southern App</h3>
                <nav className="nav nav-masthead justify-content-center float-md-end">
                    <NavLink 
                        className={ ({ isActive }) => 'nav-item nav-link' + (isActive ? ' active' : '') }
                        to="/"
                    >
                        Home
                    </NavLink>

                    <NavLink 
                        className={ ({ isActive }) => 'nav-item nav-link' + (isActive ? ' active' : '') }
                        to="/challenge"
                    >
                        Challenge
                    </NavLink>
                </nav>
            </div>
        </header>
    );
};
