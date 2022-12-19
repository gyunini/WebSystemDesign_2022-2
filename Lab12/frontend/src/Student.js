import React from "react";

const Student = (props) => {
    console.log('프롭스 확인: ' + props.studentdata);
    console.log(props.studentdata.studentId);
    return (
        <div style={{ border: 'solid', margin: '0', padding: '0', backgroundColor: "lightblue"}}>
            <div style={{ border: 'solid', height: '130px', width: '200px'}}>
                <span style={{display: 'inline-block', height: '100px', width: '100px'}}>
                    <img src={props.studentdata.photoURL} alt='학생이미지' width='100px' height='100px'></img>
                </span>
                <span style={{display: 'inline-block', height: '100px', width: '100px'}}>
                    <div>{props.studentdata.koreanName}</div>
                    <div>{props.studentdata.englishName}</div>
                    <div>{props.studentdata.department}</div>
                    <div>{props.studentdata.studentId}</div>
                </span>
            </div>
        </div>
    );
};

export default Student;