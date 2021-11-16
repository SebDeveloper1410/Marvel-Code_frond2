import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return <div className ="text-center" ><button className="btn btn-outline-primary" onClick={() => loginWithRedirect()}>Marvel Code</button></div> 
};

export default LoginButton;




