import React from "react";
import './css/loading.scss'
import loading from './img/loading.svg'

function Loading() {

    return (
        <>
            <div className={'loading-parent'}>
                <img src={loading} alt="loading svg" className={'loading-img'}/>
            </div>
        </>
    )
}

export default Loading;