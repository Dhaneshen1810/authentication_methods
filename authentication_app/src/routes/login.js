import React from 'react';
import ReactDom from 'react-dom';
import "../styles/Login.css"
import {useState, useEffect} from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom'

// components
import GoogleLogin from './components/google-login';    // google login
//import GoogleLogout from './components/google-logout';    // google login
import FacebookLogin from './components/facebook-login' // facebook login

export default function Login(){
    const [credentials, setCredentials] = useState({username:"", password:""})

    // function handles change in user credentials
    function handleChange(event){
        let id = event.target.id;
        let value = event.target.value;

        setCredentials({
            ...credentials,
            [id]: value
        })
    }


    // function submits the form
    // and sends the credentials to backend using the Axios.js library
    function handleSubmit(event){
        event.preventDefault(); // prevents the default form flow.

        // make an api GET request using Axios
        // using the user credentials as parameter
        Axios.get('http://localhost:9000/users/'+credentials.username,{
            params:{
                password: credentials.password
            }
        })
        // user is authenticated
        // is allowed access
        .then(async function (response) {
            window.location.href = "/success";
        })
        // authentication failed
        // handle with error message display
        .catch(function (err) {
            displayError()

        })
            
    }

    // function displays erro message
    function displayError(){
        let parentDiv = document.querySelector("#prompt");
        let message = React.createElement('div', {style:{color:"red"}}, "Username or password is incorrect")
        ReactDom.render(
            message,
            parentDiv
        )

    }

    return(
        <div className="container">
            <form className="login-box flex-column" onSubmit={handleSubmit}>
                <h1 className="align-self-center">Login</h1>
                <div id="prompt"></div>
                <label htmlFor="username" className="label">Username</label>
                <input id="username" type="text" name="username" placeholder="Enter username" onChange={handleChange}/>
                <label htmlFor="password" className="label">Password</label>
                <input id="password" type="password" name="password" placeholder="Enter password" onChange={handleChange}/>
                <div style={{ marginTop:"5px" }}><Link to="/signup">Or sign up here</Link></div>
                <button className="enter-btn" type="submit">Enter</button>
                <GoogleLogin/>
                <FacebookLogin/>
            </form>
        </div>
    )
}