import React from 'react';
import './Components/_header/style.css'
import Funcion from './Components/login/funcion.jsx';
import { Auth0Provider } from "@auth0/auth0-react";

function App() {

  return (

    <Auth0Provider
      domain="dev-4kfmgjry.us.auth0.com"
      clientId="PkFxoj0wpO1UnB2ILd5VrmaN0xp0vuWb"
      redirectUri={window.location.origin}
    >
      <Funcion />
    </Auth0Provider>



  );
}

export default App;
