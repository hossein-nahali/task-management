import React, {useContext, useEffect, useState} from "react";
import SignUp from "../../Components/Signup/SignUp";
import Loading from "../../Components/Loading/Loading";
import LogIn from "../../Components/LogIn/LogIn";
import {signOut, getAuth, onAuthStateChanged} from "firebase/auth";
import ThingsContext from "../../Context/ContextA";
import ShowTitle from "../../Components/ShowTitle/ShowTitle";
import IsLogin from "../../Components/IsLogin/IsLogin";

function Account() {

    const [LoginOrSignUp, SetLoginOrSignUp] = useState(true)
    const [loading, SetLoading] = useState(false);
    const [user, SetUser] = useState({});
    const context = useContext(ThingsContext);
    const auth = getAuth();

    const setState = () => {
        SetLoginOrSignUp(!LoginOrSignUp)
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                SetLoading(true);
                SetUser(user);
                context.SetUid(user.uid);
                // ...
            } else {
                SetLoading(true);
            }
        });
    }, [])


    const logout = async () => {
        signOut(auth).then(() => {
            SetUser({});
            context.SetUid('');
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <>
            <ShowTitle title={!user?.email ? LoginOrSignUp ? 'SignUp' : 'LogIn' : 'account'}/>
            {
                loading ?
                    !user?.email ?
                        LoginOrSignUp ?
                            <SignUp changeComponent={() => setState()}/> : <LogIn changeComponent={() => setState()}/>
                        : <IsLogin email={user?.email} logout={() => logout()}/>
                    : <Loading/>
            }
        </>
    )
}

export default Account;