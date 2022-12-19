import React from 'react';
import { useDispatch } from 'react-redux';

const ToDoComp = (props) => {
    const dispatch = useDispatch();
    const toggleCheckBox = (e) => {
        if(e.target.checked) {
            dispatch({ type: '/done' });
        }
    };

    return (
        <div style={{ border: 'solid', margin: '10px'}}>
            <input type='checkbox' onClick={toggleCheckBox}></input>
            <div>
                <span style={{ marginRight: '10px', color: 'grey' }}>ToDo</span>
                <span>{props.Title}</span>
            </div>
            <div>
                <span style={{ marginRight: '10px', color: 'grey' }}>Description</span>
                <span>{props.Description}</span>
            </div>
        </div>
    );
};

export default ToDoComp;