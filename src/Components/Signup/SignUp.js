import React, {useContext, useState} from "react";
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth';

// import css
import './css/LoginForm.scss'
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../Loading/Loading";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer, toast} from 'react-toastify';
import ThingsContext from "../../Context/ContextA";

function SignUp(props) {
    const [loading, SetLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const things = useContext(ThingsContext);

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const notification = (type, text) => {
        switch (type) {
            case 'error' :
                return toast.error(text, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    theme: 'colored',
                });
            default:
                return toast.error(text, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    theme: 'colored',
                });
        }
    }

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
                        <ToastContainer position="top-right"
                                        autoClose={3000}
                                        newestOnTop={false}
                                        rtl={false}
                                        pauseOnFocusLoss
                                        hideProgressBar={true}
                                        draggable
                                        pauseOnHover={false}
                                        theme={'colored'}/>
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