import React, {useState} from "react";

function EditMode(props) {

    const [text, setText] = useState(props.item.text);

    let EditHandler = e => setText(e.target.value);

    let formEditHandler = e => {
        e.preventDefault();
    }

    return (
        <div className='edit-mode-content'>
            <form onSubmit={formEditHandler}>
                <input type={'text'} value={text} onChange={EditHandler}/>
                <button type={"button"} className={'edit'} onClick={() => props.edit(text)}>
                    <span>Submit</span>
                </button>
            </form>
        </div>
    )
}

export default EditMode;