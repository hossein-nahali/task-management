import React, {useState} from "react";
import './css/LogIn.scss';
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import Loading from "../Loading/Loading";
import notification from "../Notification/Notification";
import validateEmail from "../ValidateEmail/ValidateEmail";

function LogIn(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, SetLoading] = useState(true);


    const register = async (e) => {
        e.preventDefault();
        SetLoading(false);
        const auth = getAuth();
        if (validateEmail(email)) {

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in// ...
                })
                .catch((err) => {
                    SetLoading(true);
                    if (err.message === 'Firebase: Error (auth/user-not-found).') {
                        notification('error', 'No user found. register')
                    } else if (err.message === 'Firebase: Error (auth/wrong-password).') {
                        notification('error', 'Wrong password.')
                    } else {
                        notification('error', 'If something goes wrong, try again')
                    }
                });
        } else {
            notification('error', 'invalid email')
            SetLoading(true);
        }

    }

    return (

        <>

            {
                <>
                    {
                        loading ?
                            <form onSubmit={register} className={'login'}>
                                <div className="input-email">
                                    <input type="text" id={'email-login'} required value={email}
                                           onChange={(e) => setEmail(e.target.value)}/>
                                    <label htmlFor="email-login">Email</label>
                                </div>
                                <div className="input-password">
                                    <input type="password" id={'password'} required value={password}
                                           onChange={(e) => setPassword(e.target.value)}/>
                                    <label htmlFor="password">Password</label>
                                </div>
                                <div className={'footer-login'}>
                                    <button type={'submit'}>submit</button>
                                    <p onClick={props.changeComponent}>Do not have an account? register</p>
                                </div>
                            </form>
                            : <Loading/>
                    }
                </>
            }
        </>

    )
}

export default LogIn;