import React, {useContext, useEffect, useState} from "react";
// import style
import './css/ShowTasks.scss'
// import Context
import TaskContext from "../../Context/Tasks";
import SingleTask from "./SingleTask";
import {getDatabase, ref, child, get} from "firebase/database";
import Loading from './../Loading/Loading';
import loadingImg from './img/redo.svg';
import ThingsContext from "../../Context/ContextA";


function ShowTasks() {
    const Context = useContext(TaskContext);
    const ContextUser = useContext(ThingsContext)

    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState(false);

    const jsonHandler = (data) => {
        if (typeof data === 'object' && data !== null) {
            let task = Object.entries(data)
                .map(([key, text]) => {
                    return {
                        ...text,
                        key
                    }
                })

            Context.dispatch({type: 'init_todo', task});
            setLoading(false)
        } else {
            setLoading(false)
        }
    }

    let getTask = () => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `${ContextUser.uid}`)).then((snapshot) => {
            if (snapshot.exists()) {
                jsonHandler(snapshot.val());
            } else {
                console.log("No data available");
                setLoading(false);
            }
            setAlert(false)
        }).catch((error) => {
            setAlert(true)
        });
    }
    useEffect(() => {

        // Request to firebase
        getTask();

    }, [])

    return (
        <>
            {
                !alert ?
                    !loading ?
                        Context.Tasks.length === 0 ? <p>there isn`t any todos</p> : Context.Tasks.map(item =>
                            <SingleTask item={item}
                                        key={item.key}/>).reverse()
                        :
                        <Loading/>
                    : <div className={'loading-parent'} onClick={() => window.location.reload(false)}>
                        <img src={loadingImg} alt="loading" className={'refresh-img'}/>
                    </div>
            }
        </>
    )
}

export default ShowTasks;