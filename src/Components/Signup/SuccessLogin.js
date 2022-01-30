import React from "react";
import './css/successLogin.scss';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from './../../firebase';

// currentUser.email
function SuccessLogin(props) {
    console.log(props);

    return (
        <p>{props.gmail}</p>
    )
}

export default SuccessLogin;

