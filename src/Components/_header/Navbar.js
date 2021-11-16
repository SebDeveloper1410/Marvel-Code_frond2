import { BrowserRouter as Router, Link, Switch } from "react-router-dom";
import Productos from '../products/productos'
import Usuarios from '../usuarios/usuarios'
import Ventas from '../ventas/ventas'
import React from 'react';
import './style.css'
import LogoutButton from '../login/Logout';
import { Profile } from '../login/Perfil';

const Navbar = () => {
    return (
        <div>
            <div className="logo">
                <img src="logo.jpg" alt="logotipo" />
            </div>
            <div className="username">
            <LogoutButton/> <Profile/>
            </div>
            <hr/>
            <Router>
                <div >
                    <Link to="/usuarios" className="btn btn-light">Usuarios</Link>
                    {" "}
                    <Link to="/productos" className="btn btn-light">Productos</Link>
                    {" "}
                    <Link to="/ventas" className="btn btn-light">Ventas</Link>
                </div>
                <Switch>
                    <Router path="/productos">
                        <Productos />
                    </Router>

                    <Router path="/ventas">
                        <Ventas />
                    </Router>
                    <Router path="/usuarios">
                        <Usuarios />
                    </Router>
                    </Switch>
            </Router>
        </div>
    );
}

export default Navbar;