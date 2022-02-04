import React, {useContext, useState} from "react";
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth';

// import css
import './css/LoginForm.scss'
import Loading from "../Loading/Loading";
import ThingsContext from "../../Context/ContextA";
import notification from "../../package/Notification/Notification";
import validateEmail from "../../package/ValidateEmail/ValidateEmail";

function SignUp(props) {
    const [loading, SetLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const things = useContext(ThingsContext);

    const register = async (e) => {
        e.preventDefault();
        SetLoading(false)
        const auth = getAuth();
        if (validateEmail(email)) {
            if (password === passwordConfirmation) {
                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                    })
                    .catch((err) => {
                        SetLoading(true)
                        if (err.message === 'Firebase: Error (auth/user-not-found).') {
                            notification('error', 'No user found. register')
                        } else if (err.message === 'Firebase: Error (auth/wrong-password).') {
                            notification('error', 'Wrong password.')
                        } else {
                            notification('error', 'If something goes wrong, try again')
                        }
                    });
            } else {
                SetLoading(true)
                notification('error', 'The password is not the same')
            }
        } else {
            SetLoading(true);
            notification('error', 'invalid email')
        }
    }

    return (
        <>
            <div className="parent-form">
                {
                    <>
                        {
                            loading ?
                                <form onSubmit={register}>
                                    <div className="input-email">
                                        <input type="text" id={'email-login'} required
                                               value={email}
                                               onChange={(e) => setEmail(e.target.value)}/>
                                        <label htmlFor="email-login">Email</label>
                                    </div>
                                    <div className="input-password">
                                        <input type="password" id={'password'} required
                                               value={things.password}
                                               onChange={(e) => setPassword(e.target.value)}/>
                                        <label htmlFor="password">Password</label>
                                    </div>
                                    <div className="input-password-Confirmation">
                                        <input type="password" id={'password-confirmation'}
                                               required
                                               value={passwordConfirmation}
                                               onChange={(e) => setPasswordConfirmation(e.target.value)}/>
                                        <label htmlFor="password-confirmation">Password
                                            Confirmation</label>
                                    </div>
                                    <button type={'submit'}>submit
                                    </button>
                                    <p onClick={props.changeComponent}>Do you have an account?
                                        log
                                        in</p>
                                </form>
                                : <Loading/>
                        }
                    </>

                }
            </div>
        </>

    )

}

export default SignUp;