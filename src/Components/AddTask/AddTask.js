import React, {useState, useContext} from "react";
//import css
import './css/AddTask.scss'
// import image
import plusIcon from './img/plus.png';
// import Context
import TaskContext from "../../Context/Tasks";

import {getDatabase, ref, set} from "firebase/database";
import ThingsContext from "../../Context/ContextA";

function AddTask() {

    const [text, setText] = useState('');
    const Context = useContext(TaskContext);
    const ContextUser = useContext(ThingsContext)
    const db = getDatabase();

    let formHandler = e => {
        e.preventDefault();
        Context.dispatch({type: 'add_task', key: Date.now(), done: false, text});

        set(ref(db, `${ContextUser.uid}/${Date.now()}`), {
            key: Date.now(),
            done: false,
            text
        }).then(r => '');
        setText('');

    };

    let inputHandler = e => {
        setText(e.target.value);
    };

    return (
        <div className={'task-form'}>
            <form onSubmit={formHandler} className="add-task">
                <button type="submit">
                    <img src={plusIcon} alt="plusIcon"/>
                </button>
                <div className="input-text">
                    <input type="text" id={'Task-input'}
                           value={text} onChange={inputHandler} required/>
                    <label htmlFor="Task-input">Add a task</label>
                </div>
            </form>
        </div>
    )
}

export default AddTask;