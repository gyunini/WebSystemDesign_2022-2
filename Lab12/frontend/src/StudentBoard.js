import React, { useState } from "react";
import Student from "./Student";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


const StudentBoard = (props) => {
    const [deleteState, setDeleteState] = useState(false);
    const dispatch = useDispatch();
    const total = useSelector((state) => state.total)

    console.log('프롭스 확인: ' + props.studentdata);
    console.log(props.studentdata.studentId);
    const deleteStudent = () => {
        dispatch({ type: '/done' });
        if(total >= 10) {
            return;
        }
        console.log(props.studentdata.studentId);
        axios
            .delete('/api/delete', { params: { data: props.studentdata.studentId} })
            .then(function(response) {
                console.log(response.data);
                setDeleteState(true);
                props.deleteList(response.data);
            })
            .catch(function(error) {
                console.log(error);
            })
    }
    console.log(deleteState);
    if(!deleteState) {
        return (
            <div style={{ display: 'flex'}}>
                <div style={{marginLeft: 'auto', margin: 'auto'}}>{props.index}.</div>
                <Student studentdata={props.studentdata}/>
                <div style={{marginRight: 'auto', margin: 'auto'}}><button onClick={deleteStudent}>삭제</button></div>
            </div>
        );
    }else if(deleteState) {
        return (
            <div style={{ display: 'flex'}}>
                <div style={{marginLeft: 'auto', margin: 'auto'}}>{props.index}.</div>
                <Student studentdata={props.studentdata}/>
                <div style={{marginRight: 'auto', margin: 'auto'}}><button onClick={deleteStudent}>삭제</button></div>
            </div>
        );
    }
    
};

export default StudentBoard;