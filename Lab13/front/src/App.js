import './App.css';
import {Route, Routes} from 'react-router';
import { Link } from 'react-router-dom';
import MainPage from './page/MainPage';
import ListPage from './page/ListPage';
import BookPage from './page/BookPage';
import RegisterPage from './page/RegisterPage';

function App() {
  return (
    <div className="App">
      <div>
        <nav style={{display: 'flex', backgroundColor:'#769fef'}}>
            <span style={{marginRight: 'auto'}}><h3>서지정보 관리기</h3></span>
            <span style={{marginLeft: 'auto', margin:'auto 0'}}><Link to="/">메인으로</Link></span>
        </nav>
        <Routes>
          <Route path="/" element={<MainPage></MainPage>}/>
          <Route path="/list" element={<ListPage></ListPage>}/>
          <Route path="/book/:sergeId" element={<BookPage></BookPage>}/>
          <Route path="/register" element={<RegisterPage></RegisterPage>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
