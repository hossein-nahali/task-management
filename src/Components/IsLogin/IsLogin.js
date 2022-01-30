import React from "react";

function IsLogin(props) {

    return (
        <>
            <div className={'information'}>
                <div className={'email d-flex mt-3'}>
                    <p className={'me-2 mb-0'}>Email : </p><p>{props.email}</p>
                </div>
                <button type={'button'} onClick={props.logout}>Logout</button>
            </div>
        </>
    )
}

export default IsLogin;