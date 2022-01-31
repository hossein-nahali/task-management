import {toast} from "react-toastify";

const notification = (type, text) => {
    switch (type) {
        case 'error' :
            return toast.error(text, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                theme: 'colored',
            });

        case 'success' :
            return toast.success(text, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                theme: 'colored',
            });
        default:
            return toast.error(text, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                theme: 'colored',
            });
    }
}

export default notification;