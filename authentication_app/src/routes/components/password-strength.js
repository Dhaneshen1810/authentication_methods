import React from 'react';
import ReactDom from 'react-dom';
import {useState, useEffect} from 'react';
import "../../styles/Password-strength.css"

export default function PasswordStrength(props){
    useEffect(() => {
        // strength is updated on each update
        updateStrength(props.strength)
    })

    // function updates strength rendering
    function updateStrength(strength){
        let parentDiv = document.querySelector("#strength-box-container");    // parent div


        // choose the background color for the boxes.
        // The background color depends on the strength, and ranges as follows
        // 1: red, 2:yellow, 3:orange, 4:lightgreen, 5:green
        // we will use a switch to determine which color to use
        var bgrdColor = "red"   // initialise color to red
        switch (strength) {
            case 2:
                bgrdColor = "yellow"
                break;
            case 3:
                bgrdColor = "orange"
                break;
            case 4:
                bgrdColor = "lightgreen"
                break;
            case 5:
                bgrdColor = "green"
                break;  
            default:
                break;
        }

        // create box elements
        // we need the same number of boxes as the strength argument 
        var boxArr = [] // initialise array to contain box elements
        for (var i=0; i<strength; i++){
            let strengthBox = React.createElement('div', { className:"strength-box", id:strength, style:{backgroundColor:bgrdColor} }, null)    // initialise strength box element
            boxArr.push(strengthBox);
        }

        let boxContainer = React.createElement('div', { className:"strength-box-container flex-row" }, boxArr)

        // render boxes
        ReactDom.render(
            boxContainer,
            parentDiv
        )
    }

    return(
        <div className="password-strength-container">
            <div>Password strength:</div>
            <div id="strength-box-container">
            </div>
            
        </div>
    )   
}