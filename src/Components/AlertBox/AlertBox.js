import React from 'react';

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AlertBox(props) {

    toast.error(props.text, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
    });

    return (
        <div>
            <ToastContainer/>
        </div>
    );
}

export default AlertBox;