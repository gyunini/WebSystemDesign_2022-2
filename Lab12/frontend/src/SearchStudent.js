import React, { useState } from 'react';
import axios from 'axios';
import StudentBoard from './StudentBoard';
import { useDispatch } from 'react-redux';
import AddStudent from './AddStudent';
import { useSelector } from 'react-redux';


const SearchStudent = () => {
    const [studentIdState, setStudentId] = useState('');
    const [isStudent, setIsStudent] = useState(false);
    const [studentData, setStudentData] = useState({});
    const [studentList, setStudentList] = useState([]);
    const [addState, setAddState] = useState(false);
    const [deleteState, setDeleteState] = useState(false);
    const [searchState, setSearchState] = useState(false);
    const dispatch = useDispatch();
    const total = useSelector((state) => state.total)

    const onChangeStudentdId = e => setStudentId(e.target.value);

    const axiosStudentFind = () => {
        dispatch({ type: '/done' });
        if(total >= 10) {
            return;
        }
        if(studentIdState.length === 0) {
            alert('학번을 입력하세요');
            return;
        }
        axios
            .get('/api/get', { params: { data: studentIdState} })
            .then(function(response) {
                console.log(response.data);
                alert(response.data[0].studentId);
                setStudentData(response.data[0]);
                setIsStudent(true);
                setSearchState(true);
                console.log(studentData);
                // studentList.push(response.data[0]);
                setStudentList([...studentList , response.data[0]]);
                console.log(studentList);
                console.log(String(studentData.studentId));
            })
            .catch(function(error) {
                if(error.response.status === 404) {
                    alert('No such Student');
                }
            })
        setStudentId('');
        console.log(isStudent);
    }

    const addList = (data) => {
        console.log(data);
        if (!studentList.find(e => e === data) && !deleteState) {
            setStudentList([...studentList, data]);
            setAddState(true);
        }
        //setStudentList([...studentList, data]);
        console.log(studentList);
    }

    const deleteList = (data) => {
        // studentList.pop();
        console.log(data);
        console.log('삭제리스트: ' + studentList);
        console.log(studentList.filter(i => i.studentId !== data));
        setDeleteState(true);
        setStudentList(studentList.filter(i => i.studentId !== data));
    }

    if(addState && deleteState) {
        console.log(studentList);
        return (
            <div>
                {/* <h1>hello1</h1> */}
                <input type='text' value={studentIdState} onChange={onChangeStudentdId}></input>
                <button onClick={axiosStudentFind}>조회</button>
                <AddStudent addList={addList}/>
                {studentList.map((item, i) => {
                    return <StudentBoard studentdata={item} index={i+1} deleteList={deleteList}></StudentBoard>
                })}
            </div>
        )
    }

    if (deleteState && searchState) {
        console.log(studentList);
        return (
            <div>
                {/* <h1>hello2</h1> */}
                <input type='text' value={studentIdState} onChange={onChangeStudentdId}></input>
                <button onClick={axiosStudentFind}>조회</button>
                <AddStudent addList={addList}/>
                {studentList.map((item, i) => {
                    return <StudentBoard studentdata={item} index={i+1} deleteList={deleteList}></StudentBoard>
                })}
            </div>
        )
    }

    if(studentList.length !== 0 ) { // Object.keys(studentData).length !== 0
        console.log(studentList);
        return (
            <div>
                {/* <h1>hello3</h1> */}
                <input type='text' value={studentIdState} onChange={onChangeStudentdId}></input>
                <button onClick={axiosStudentFind}>조회</button>
                <AddStudent addList={addList}/>
                {studentList.map((item, i) => {
                    return <StudentBoard studentdata={item} index={i+1} deleteList={deleteList}></StudentBoard>
                })}
            </div>
        )
    }
    return (
        <div>
            <input type='text' value={studentIdState} onChange={onChangeStudentdId}></input>
            <button onClick={axiosStudentFind}>조회</button>
            <AddStudent addList={addList}/>
      </div>
    )
}

export default SearchStudent;