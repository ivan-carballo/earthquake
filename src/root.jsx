import { Outlet, NavLink } from "react-router-dom";
import './css/routerLinks.css'


const Root = () => {


    return (
        <div>
            <nav>
                <div id='div-links'>
                    <NavLink to="/" className='link'>Recientes</NavLink>
                    <NavLink to="/finder" className='link'>Buscador</NavLink>
                    <NavLink to="/simulator" className='link'>Simulador</NavLink>
                    <NavLink to="/aviso" className='link'>Aviso</NavLink>
                </div>
            </nav>
            <Outlet />
        </div>
    )
};

export {
    Root
}