import LoginButton from './Login';
import { useAuth0 } from '@auth0/auth0-react';
import {Navbar } from 'react-bootstrap';
import Navbaar from '../_header/Navbar'





function Funcion() {
  const {isAuthenticated} =useAuth0();
  return (
    <header>
      {isAuthenticated?(
        <>
            <Navbar.Text>
              <Navbaar/>
            </Navbar.Text>
        </>
      ): (
          <LoginButton />
      )}

     <>
     {isAuthenticated?(
       null     ) : (
     <presentacion/>)}
     </>
   </header>

    )  
}

export default Funcion;
