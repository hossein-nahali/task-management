import React from "react";
// import css
import './css/ShowTitle.scss'

function ShowTitle(props) {

    return (
        <div className={'title-body'}>
            <h2>{props.title}</h2>
        </div>
    )
}

export default ShowTitle;