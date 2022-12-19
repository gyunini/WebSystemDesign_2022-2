import {useParams} from 'react-router';
import axios from 'axios';
import { useState } from 'react';
import WaitingPage from './WaitingPage';

function BookPage(props) {
    const params = useParams();
    const value = params.sergeId;
    const [first, setFirst] = useState(false);
    const [bookInfo, setBookInfo] = useState({});
    const [wait, setWait] = useState(false);
    
    axios
        .get('/api/get/info', { params: { data: value} })
        .then(function(response) {
            setWait(true);
            if(!first) {
                console.log(response.data);
                setBookInfo(response.data);
                setFirst(true);
            }
        })
        .catch(function(error) {
            if(error.response.status === 400) {
                alert('등록된 책이 없습니다.');
            }
            if(error.response.status === 500) {
                alert('DB연결 오류');
            }
            if(error.response.status === 504) {
                alert('서버가 꺼져있습니다.');
            } else {
                alert(error);
            }
        })
    console.log(bookInfo);
    if(wait === false) {
        return <WaitingPage/>
    } else {
        if(Object.keys(bookInfo).length !== 0) {
            return (
                <div style={{display:'flex'}}>
                    <div style={{ border: 'solid', width:'200px', margin:'0 auto'}}>
                        <h4>{bookInfo[0].bookName}</h4>
                        <ul>
                            <li>저자: {bookInfo[0].author}</li>
                            <li>출간년도: {bookInfo[0].publishDay}</li>
                        </ul>
                        <div>소개글</div>
                        <div>{bookInfo[0].summary}</div>
                        <h6>{bookInfo[0].author}, {bookInfo[0].bookName}, {bookInfo[0].publishDay}</h6>
                    </div>
                </div>
            );
        }
    }
};

export default BookPage;