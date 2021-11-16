import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const Profile = () =>{
    const {user }=useAuth0();
    
    return (
        
        
            <>
               <h7> Perfil: {user.name} </h7>
            </>
        
    )
}
export default Profile;