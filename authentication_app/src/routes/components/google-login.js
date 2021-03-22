// refresh token 
import { refreshTokenSetup } from '../../utils/refreshToken';
import React from 'react';
// google login
import { GoogleLogin } from 'react-google-login';
// client ID for google Login
const clientId = '3974672229-pk0tigonqlvbd7c20m3b08o5e2smh70q.apps.googleusercontent.com'

export default function Login(){
        // google login function 
        const onSuccess = (res) => {
            console.log('Login success', res.profileObj);

            refreshTokenSetup(res)
        }
    
        const onFailure = (res) => {
            console.log("Login failed", res)
        }

        return(
            <div style={{ marginTop:"10px" }}>
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Login"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    style={{marginTop: '100px'}}
                    isSignedIn={true}
                />

            </div>
        )

}