import { useState } from "react";
import React from 'react';

function CheckBox(props) {
    const [checked, setChecked] = useState(true);
    const onChange = e => {
        if(checked) {
            setChecked(!checked);
            props.unCheckHandler(props.item, checked);
        } else {
            setChecked(!checked);
            props.checkHandler(props.item);
        }
    }
    
    return (
        <>
            <label key={props.index}><input type='checkbox' key={props.index} checked={checked} onChange={onChange}/> {props.item.publishDay} </label>
        </>
    )
}

export default CheckBox;