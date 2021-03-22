import React from 'react';
import FacebookLogin from 'react-facebook-login';

export default function facebookLogin(){
    return(
        <div style={{ marginTop:"10px" }}>
            <FacebookLogin
                appId="1355923314769150"
                fields="name, email, picture"
            />
        </div>
    )
}