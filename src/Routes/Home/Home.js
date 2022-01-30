import ShowTitle from "../../Components/ShowTitle/ShowTitle";
import AddTask from "../../Components/AddTask/AddTask";
import ShowTasks from "../../Components/ShowTasks/ShowTasks";
import {useContext, useEffect, useState} from "react";
import ThingsContext from "../../Context/ContextA";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import Loading from "../../Components/Loading/Loading";
import {NavLink} from "react-router-dom";
import './css/Home.scss'

function Home() {
    const context = useContext(ThingsContext);
    const [loading, SetLoading] = useState(false);
    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                SetLoading(true);
                context.SetUid(user.uid);
            } else {
                SetLoading(true);
            }
        });
    }, [])


    return (
        <>
            <ShowTitle title={'Home'}/>
            {
                loading ?
                    context.uid ?
                        <>
                            <AddTask/>
                            <ShowTasks/>
                        </>
                        : <div className={'no-login'}><p>To use, please log in.</p><NavLink to="/Account">login</NavLink>
                        </div>
                    : <Loading/>
            }
        </>
    )
}

export default Home