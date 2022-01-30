function AppReducer(prevState, action) {

    switch (action.type) {

        case 'init_todo':
            return {
                Tasks: action.task
            }

        case 'add_task' :
            return {
                Tasks: [
                    ...prevState.Tasks,
                    {key: action.key, done: action.done, text: action.text}
                ]
            }

        case 'done_toggle':
            let items = prevState.Tasks.find(item => item.key === action.key);
            items.done = action.done;

            return {
                Tasks: [
                    ...prevState.Tasks,
                ]
            }

        case 'edit_task':
            let item = prevState.Tasks.find(item => item.key === action.key);
            item.text = action.newText;

            return {
                Tasks: [
                    ...prevState.Tasks
                ]
            }

        case 'delete_task':
            let newStateDelete = prevState.Tasks.filter(item => item.key !== action.item.key);
            return {
                Tasks: [
                    ...newStateDelete,
                ]
            }

        // case 'register':
        //     let newStateDelete = prevState.Tasks.filter(item => item.key !== action.item.key);
        //     return {
        //         Tasks: [
        //             ...newStateDelete,
        //         ]
        //     }

        default:
            return prevState;
    }
}

export default AppReducer;