import { Link } from 'react-router-dom';

function MainPage(props) {
    return (
        <div>
            <h1>서지 정보 관리기에 오신 것을 환영합니다.</h1>
            <p>실행하실 메뉴를 아래에서 골라 주세요.</p>
            <Link to={{pathname: '/list'}}><button>책 목록 확인</button></Link>
            <Link to="/register"><button>새로운 책 추가</button></Link>
        </div>
    );
};

export default MainPage;