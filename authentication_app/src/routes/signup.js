import React from 'react';
import ReactDom from 'react-dom';
import "../styles/Login.css";
import {useState, useEffect} from 'react';
import Axios from 'axios';

// components
import PasswordStrength from './components/password-strength';

export default function Signup(){
    const [credentials, setCredentials] = useState({username:"", password:"", confirm_password:""})
    const [passwordStrength, setPAsswordStrength] = useState(0);

    // password strength is updated
    useEffect(() => {
        console.log("password strength:", passwordStrength);
    }, [passwordStrength])

    // function handles change in user credentials
    function handleChange(event){
        let id = event.target.id;
        let value = event.target.value;

        if (id === 'password'){
            let strength = calculatePasswordStrength(value); // get password strength
            setPAsswordStrength(strength); // update password strength
        }

        setCredentials({
            ...credentials,
            [id]: value
        })
    }


    // function calculates password strength
    // we initialise a counter variable (strength) for calculating
    // the strength as an integer
    // the higher the number, the stringer the password value is.
    // The password  gains 1 point for each of the following
    // - password contains at least 8 characters
    // - contains a capital letter
    // - contains a small case letter
    // - contains a number
    // - contains a special character
    // The password strength ranges from 0 to 5.
    function calculatePasswordStrength(password_value){
        let value = password_value;
        var strength = 0;
        var lengthCheck = false;    // password has a minimum length of 8 characters
        var capitalLetterCheck = false; // password contain at least 1 capital letter
        var smallCaseLetterCheck = false;   // password has a at least 1 small case letter
        var numberCheck = false;    // password contain at least 1 number
        var specialCharacterCheck = false;  // passwrod contain as least 1 special character

        // check whether password length is at least 8 characters
        if (value.length >= 8)
            lengthCheck = true;

        // iterate through password string character by character
        for (var i=0; i<password_value.length; i++){
            // password contains capital letter(s)
            if (password_value.charCodeAt(i) < 91 && password_value.charCodeAt(i) > 64)
                capitalLetterCheck = true;
            // password contains small case letter(s)
            else if (password_value.charCodeAt(i) < 123 && password_value.charCodeAt(i) > 96)
                smallCaseLetterCheck = true;
            // password contains number(s)
            else if (password_value.charCodeAt(i) < 58 && password_value.charCodeAt(i) > 47)
                numberCheck = true;
            // password contains special characters(s)
            else if ((password_value.charCodeAt(i) < 32 && password_value.charCodeAt(i) > 47) || (password_value.charCodeAt(i) < 65 && password_value.charCodeAt(i) > 57) ||
            (password_value.charCodeAt(i) < 97 && password_value.charCodeAt(i) > 90) || (password_value.charCodeAt(i) < 127 && password_value.charCodeAt(i) > 122))
                specialCharacterCheck = true;
        }

        // calculate strength points.
        // To calculate strength points, we add the booleans checks to an array
        // and iterate through that array
        // each "true" check counts as 1 point
        let checkArr = [lengthCheck, capitalLetterCheck, smallCaseLetterCheck, numberCheck, specialCharacterCheck];
        for (var i=0; i<checkArr.length; i++){
            if (checkArr[i] === true)
                strength++;
        }

        return strength
    }

    // function handles form submission
    function handleSubmit(event){
        event.preventDefault();
        console.log(credentials);

        // send information to backend
        Axios.post('http://localhost:9000/users/', credentials)
        .then(function(response){
            window.location.href = "/success";
        })
        .catch(function(err) {
            //display error
            console.log("error occured")
        })
    }


    return(
        <div className="container">
            <form className="login-box flex-column" onSubmit={handleSubmit}>
                <h1 className="align-self-center">Sign up</h1>
                <label htmlFor="username" className="label">Username</label>
                <input id="username" type="text" name="username" placeholder="Enter username" onChange={handleChange}/>
                <label htmlFor="password" className="label">Password</label>
                <input id="password" type="password" name="password" placeholder="Enter password" onChange={handleChange}/>
                <div id="password-strength">
                    <PasswordStrength strength={passwordStrength}/>
                </div>
                <label htmlFor="password" className="label">Confirm Password</label>
                <input id="confirm_password" type="password" name="password" placeholder="Re-enter password" onChange={handleChange}/>
                <button className="enter-btn" type="submit">Enter</button>
            </form>
        </div>
    )
}