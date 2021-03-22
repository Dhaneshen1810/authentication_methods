import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId = '3974672229-pk0tigonqlvbd7c20m3b08o5e2smh70q.apps.googleusercontent.com';

export default function Logout(){
    const onSuccess = () =>{
        alert('Logout successful');
    }

    return(
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
            />
        </div>
    )
}