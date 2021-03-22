import React from 'react';
// google login
import { GoogleLogin } from 'react-google-login';
// client ID for google Login
const clientId = '3974672229-pk0tigonqlvbd7c20m3b08o5e2smh70q.apps.googleusercontent.com'
// refresh token 
//import { refreshTokenSetup } from '../../utils/refreshToken';

export default function Login(){
        // google login function 
        const onSuccess = (res) => {
            console.log('Login success', res.profileObj);

            //refreshTokenSetup(res)
        }
    
        const onFailure = (res) => {
            console.log("Login failed", res)
        }

        return(
            <div>
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Login"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'Single_host_origin'}
                    style={{marginTop: '100px'}}
                    isSignedIn={true}
                />

            </div>
        )

}