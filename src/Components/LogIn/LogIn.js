import React, {useState} from "react";
import './css/LogIn.scss';
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {toast, ToastContainer} from "react-toastify";
import Loading from "../Loading/Loading";

function LogIn(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loadinga, SetLoading] = useState(true);
    const [texterr, SetTexterr] = useState();

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
                        loadinga ?
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