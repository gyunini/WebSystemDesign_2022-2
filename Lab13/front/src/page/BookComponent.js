import axios from "axios";
import { Link } from "react-router-dom";

function BookComponent(props) {

    const deleteBook = () => {
        props.deleteState(false);
        axios
            .delete('/api/delete', { params: { data: props.item.sergeId} })
            .then(function(response) {
                console.log(response.data);
                props.deleteHandler(props.item.sergeId);
                props.deleteState(true);
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
    }

    return (
        <>
            <div style={{ border: 'solid', width:'200px', float:'left'}}>
                <h3>{props.item.bookName}</h3>
                <p style={{color:'grey'}}>{props.item.author} 저 ({props.item.publishDay}년)</p>
                <p>서지 관리 ID: {props.item.sergeId}</p>
                <button style={{backgroundColor:'lightcoral'}} onClick={deleteBook}>삭제</button>
                <Link to={`/book/${props.item.sergeId}`}><button style={{backgroundColor:'lightblue'}}>자세히</button></Link>
            </div>
        </>
    )
}

export default BookComponent;