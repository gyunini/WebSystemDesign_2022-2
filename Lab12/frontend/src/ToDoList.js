import React from "react";
import ToDoComp from "./ToDoComp";
const ToDoList = (props) => {
    return (
        <div style={{ backgroundColor: 'lightGrey' }}>
            <div>{props.day}'s ToDo</div>
            {props.list.map((item) => {
                return (
                    <ToDoComp Title={item.ToDoTitle} Description={item.Description}></ToDoComp>
                );
            })}
        </div>
    );
};

export default ToDoList;