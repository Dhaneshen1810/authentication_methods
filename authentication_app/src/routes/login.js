import React from 'react';
import ReactDom from 'react-dom';
import "../styles/Login.css"
import {useState, useEffect} from 'react';
import Axios from 'axios';

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
    function handleSubmit(event){
        event.preventDefault();

        console.log(credentials.password)
        // verifies whether credentials exist in database
        Axios.get('http://localhost:9000/users/'+credentials.username,{
            params:{
                password: credentials.password
            }
        })
        .then(async function (response) {
            console.log(response.data.response)
            window.location.href = "/success";
        })
        .catch(function (err) {
            console.log(err)
            displayError()

        })

        
        /*if (credentials.username === "Ron" && credentials.password === "Maleshko"){
            window.location.href = "/success";
        }
        else{
             // display unaurized user promp
             let parentDiv = document.querySelector("#prompt");
             let message = React.createElement('div', {style:{color:"red"}}, "Username or password is incorrect")
             ReactDom.render(
                 message,
                 parentDiv
             )
        }*/
        
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
                <button className="enter-btn" type="submit">Enter</button>
            </form>
        </div>
    )
}