import React, { useState } from 'react'
import axios from 'axios';

function RegisterPage(props) {
    const [bookName, setBookName] = useState('');
    const [summary, setSummary] = useState('');
    const [publishDay, setPublishDay] = useState('');
    const [author, setAuthor] = useState('');

    const onChangeBookName = (e) => setBookName(e.target.value);
    const onChangeSummary = (e) => setSummary(e.target.value);
    const onChangePublishDay = (e) => setPublishDay(e.target.value);
    const onChangeAuthor = (e) => setAuthor(e.target.value);

    const Clear = () => {
        setBookName('');
        setSummary('');
        setPublishDay('');
        setAuthor('');
    }
    const Enroll = () => {
        if(bookName === ''){
            alert('책 등록에 실패하였습니다. 책 이름이 비어있습니다.');
            return;
        } else if ( publishDay === '') {
            alert('책 등록에 실패하였습니다. 출간 년도가 비어있습니다.');
            return;
        } else if (author === '') {
            alert('책 등록에 실패하였습니다. 책 저자가 비어있습니다.');
            return;
        }
        axios
        .post('/api/post', { 
            bookName: bookName,
            summary: summary,
            publishDay: publishDay,
            author: author,
        })
        .then(function(response) {
            console.log(response.data);
            alert('책이 DB에 정상적으로 등록되었습니다.');
            setBookName('');
            setSummary('');
            setPublishDay('');
            setAuthor('');
        })
        .catch(function(error) {  
            if(error.response.status === 400) {
                alert('Already exist studentId');
            } else if(error.response.status === 401) {
                alert('No studentId');
            }
        })
    }

    return (
        <div>
            책 등록 페이지
            <div style={{ border: 'solid', width:'300px', margin:'0 auto'}}>
                <h3>새로운 책 등록</h3>
                책 이름<input type='text' value={bookName} onChange={onChangeBookName}></input><br/>
                책 한줄 소개<input type='text' value={summary} onChange={onChangeSummary}></input><br/>
                출간 연도<input type='text' value={publishDay} onChange={onChangePublishDay}></input><br/>
                저자<input type='text' value={author} onChange={onChangeAuthor}></input>
                <div>{author}, {bookName}, {publishDay}</div>
                <div>
                    <button onClick={Clear}>초기화</button>
                    <button onClick={Enroll}>등록</button>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;