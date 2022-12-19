import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


const AddStudent = (props) => {
    const [buttonClicked, setButtonClicked] = useState(false);
    const [korName, setKorName] = useState('');
    const [engName, setEngName] = useState('');
    const [dep, setDep] = useState('');
    const [stdid, setStdid] = useState('');
    const [url, seturl] = useState('');
    const [DBdata, setDBdata] = useState({});
    const dispatch = useDispatch();
    const total = useSelector((state) => state.total)

    const onChangeKorName = (e) => setKorName(e.target.value);
    const onChangeEngName = (e) => setEngName(e.target.value);
    const onChangeDep = (e) => setDep(e.target.value);
    const onChangeStdid = (e) => setStdid(e.target.value);
    const onChangeUrl = (e) => seturl(e.target.value);

    const addStudent = () => {
        if(buttonClicked) {
            setButtonClicked(false);
            return;
        }
        setButtonClicked(true);

    }
    const ClearTotal = () => {
        dispatch({ type: '/clear' });
      }
    const addDB = () => {
        dispatch({ type: '/done' });
        if(total >= 10) {
            return;
        }
        axios
            .post('/api/post', { 
                koreanName: korName,
                englishName: engName,
                photoURL: url,
                studentId: stdid,
                department: dep
            })
            .then(function(response) {
                console.log(response.data);
                setDBdata(response.data);
                setButtonClicked(false);
                setKorName('');
                setEngName('');
                setDep('');
                setStdid('');
                seturl('');
                alert('학번이 정상적으로 추가되었습니다');
                
            })
            .catch(function(error) {  
                if(error.response.status === 400) {
                    alert('Already exist studentId');
                } else if(error.response.status === 401) {
                    alert('No studentId');
                }
            })
        if(buttonClicked) {
            setButtonClicked(false);
            return;
        }
    }
    console.log(DBdata);
    // if(total >= 11) {
    //     alert('가능한 서버 요청 횟수를 초과하였습니다');
    // }
    if(buttonClicked) {
        return (
            <div>
                <button onClick={addStudent}>학생추가</button>
                <div>
                    국문이름<input type='text' value={korName} onChange={onChangeKorName}></input>
                    영문이름<input type='text' value={engName} onChange={onChangeEngName}></input>
                    학과<input type='text' value={dep} onChange={onChangeDep}></input>
                    학번<input type='text' value={stdid} onChange={onChangeStdid}></input>
                    사진주소<input type='text' value={url} onChange={onChangeUrl}></input>
                    <button onClick={addDB}>추가</button>
                    <div>누적 서버 요청 횟수: {total}</div>
                    <div><button onClick={ClearTotal}>초기화</button></div>
                    {Object.keys(DBdata).length !== 0 ? props.addList(DBdata): <></>}
                </div>  
            </div>
        );
    } else if(!buttonClicked && Object.keys(DBdata).length !== 0) {
        return (
            <div>
                 <button onClick={addStudent}>학생추가</button>
                 <div>누적 서버 요청 횟수: {total}</div>
                <div><button onClick={ClearTotal}>초기화</button></div>
                {Object.keys(DBdata).length !== 0 ? props.addList(DBdata): <></>}
            </div>
        )
    }
    return (
        <div>
            <button onClick={addStudent}>학생추가</button>
            <div>누적 서버 요청 횟수: {total}</div>
            <div><button onClick={ClearTotal}>초기화</button></div>
        </div>
    );
};

export default AddStudent;