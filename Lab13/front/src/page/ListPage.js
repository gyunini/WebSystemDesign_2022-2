import axios from 'axios';
import React, { useState } from 'react';
import CheckBox from './CheckBox';
import BookComponent from './BookComponent';
import WaitingPage from './WaitingPage';

function ListPage(props) {
    const [first, setFirst] = useState(false);
    const [bookList, setBookList] = useState([]);
    const [bookList2, setBookList2] = useState([]);
    const [tempList, setTempList] = useState([]);
    const [wait, setWait] = useState(false);

    const unCheckHandler = (data, checked) => {
        console.log(bookList.filter(i => i.publishDay !== data.publishDay));
        setTempList(bookList.filter(i => i.publishDay === data.publishDay));
        // setTempList(tempList.concat(bookList.filter(i => i.publishDay === data.publishDay)));
        setBookList(bookList.filter(i => i.publishDay !== data.publishDay));
    }
    const checkHandler = (data) => {
        console.log(bookList);
        console.log(data);
        console.log(tempList);
        setBookList(bookList.concat(tempList));
    }
    const deleteHandler = (data) => {
        console.log(bookList2.filter(i => i.sergeId !== data));
        setBookList(bookList.filter(i => i.sergeId !== data));
        setBookList2(bookList2.filter(i => i.sergeId !== data));
        alert('삭제 성공');
    }
    const deleteState = (data) => {
        if(data === false) {
            setWait(false);
        }
        if(data === true) {
            setWait(true);
        }
    }
    
    axios
        .get('/api/get')
        .then(function(response) {
            console.log(response.data);
            setWait(true);
            if(!first) {
                setFirst(true);
                setBookList(response.data);
                // setBookList2(response.data);
                setBookList2(response.data.filter(
                    (arr, index, callback) => index === callback.findIndex(t => t.publishDay === arr.publishDay)
                  ));
                console.log(bookList2.sort((a, b) => a.publishDay - b.publishDay));
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
    console.log(bookList);
    console.log(bookList2.sort((a, b) => a.publishDay - b.publishDay));
    console.log(bookList2.filter(
        (arr, index, callback) => index === callback.findIndex(t => t.publishDay === arr.publishDay)
      ));
      
    if(wait === false) {
        return <WaitingPage/>
    } else {
        return (
            <div>
                전체 책정보 요약 리스트 페이지
                <div style={{ border: 'solid', margin:'0 auto'}}>
                    <h3>화면 조작 패널</h3>
                    <p>현재 등록되어있는 서지 정보는 {bookList.length}개입니다.</p>
                    <h4>특정 연도만 확인하기</h4>
                    {bookList2 !== undefined ? bookList2.map((item, i) => {
                        return <CheckBox item={item} index={i} unCheckHandler={unCheckHandler} checkHandler={checkHandler}/>
                    }) : <></>}
                </div>
                <div>
                    {bookList !== undefined ? bookList.map((item) => {
                        return(
                            <BookComponent item={item} deleteHandler={deleteHandler} deleteState={deleteState}/>
                        )
                    }): <></>}
                </div>
            </div>
        );
    }
};

export default ListPage;