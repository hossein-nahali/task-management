import React, {useState, useContext} from "react";
// import style
import './css/ShowTasks.scss'

import TaskContext from "../../Context/Tasks";

import {Dropdown} from 'react-bootstrap'

import EditModeTask from "./EditMode";

import {getDatabase, set, ref} from "firebase/database";
import ThingsContext from "../../Context/ContextA";

function SingleTask(props) {

    const [checkedInput, setCheckedInput] = useState(true);
    const [EditMode, setEditMode] = useState(false);
    const Context = useContext(TaskContext);
    const db = getDatabase();
    const ContextUser = useContext(ThingsContext)

    let checkboxHandler = e => {
        checkedInput ? setCheckedInput(false) : setCheckedInput(true);
        console.log(checkedInput);
        Context.dispatch({type: 'done_toggle', key: props.item.key, done: checkedInput})
        set(ref(db, `${ContextUser.uid}/${props.item.key}`), {
            key: props.item.key,
            text: props.item.text,
            done: checkedInput
        }).then(r => '');
    };

    let EditHandler = newText => {
        Context.dispatch({type: 'edit_task', key: props.item.key, newText})

        set(ref(db, `${ContextUser.uid}/${props.item.key}`), {
            key: props.item.key,
            text: newText,
            done: props.item.done
        }).then(r => '');

        setEditMode(false)
    };

    let DeleteHandler = newText => {
        set(ref(db, `${ContextUser.uid}/${props.item.key}`), {}).then(r => '');
        Context.dispatch({type: 'delete_task', item: props.item})
    };

    return (
        <div className={`task-body ${props.item.done ? 'active' : ''} ${EditMode ? 'edit-mode' : ''}`}>
            <div className={`checkbox-icon ${props.item.done ? 'active' : ''}`} onClick={checkboxHandler}>
                <input type="checkbox" hidden={true} defaultChecked={props.checked}/>
                <span className='tick'>

                </span>
                <span className='checkbox-bg'>

                </span>
            </div>
            {EditMode
                ?
                <EditModeTask item={props.item} edit={EditHandler}/>
                :
                <>
                    <div className="content-task">
                        <p>{props.item.text}</p>
                    </div>
                    <Dropdown drop={'start'}>
                        <Dropdown.Toggle id="dropdown-basic">
                            <span>.</span>
                            <span>.</span>
                            <span>.</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <div className={'control'}>
                                <Dropdown.Item className={'edit'} onClick={() => setEditMode(true)}>
                                    <span>Edit</span>
                                </Dropdown.Item>
                                <Dropdown.Item className={'delete'} onClick={DeleteHandler}>
                                    <span>Delete</span>
                                </Dropdown.Item>
                            </div>
                        </Dropdown.Menu>
                    </Dropdown>

                </>
            }
        </div>
    )
}

export default SingleTask;