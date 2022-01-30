import React from "react";

const TaskContext = React.createContext({
    todos: [],
    add: () => {
    },
    edit: () => {
    },
    done: () => {
    },
    delete: () => {
    }
});

export default TaskContext;