import './App.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ToDoList from './ToDoList';
import SearchStudent from './SearchStudent';


const axiosPost = () => {
  axios
    .post('/api/post', { params: { data: "hi post" } })
    .then(function(response) {
      alert(response.data);
    })
    .catch(function(error) {
      alert(error);
    })
}

const yesterday = [
  {
    ToDoTitle: '웹시설 공부',
    Description: 'Redux 마스터',
  },
  {
    ToDoTitle: '운체 공부',
    Description: 'paging 마스터',
  },
  {
    ToDoTitle: '웹시설 팀플',
    Description: '스타벅스 8PM',
  }
];

const today = [
  {
    ToDoTitle: '웹시설 과제',
    Description: 'Lab12 끝내기',
  },
  {
    ToDoTitle: '동아리 모임',
    Description: '학교 운동장',
  },
  {
    ToDoTitle: '친구 만나기',
    Description: '학교앞 정문 1시',
  }
];

function App() {
  const total = useSelector((state) => state.total)

  return (
    <div className="App">
      <h1>Lab12 201720736 이균</h1>
      <SearchStudent></SearchStudent>
      {/* <span>누적 서버 요청 횟수: {total}</span>
      <div><button onClick={ClearTotal}>초기화</button></div> */}
      {/* <div>
        <span>total 완료 수: </span>
        <span>{total}</span>
        <ToDoList day={'YesterDay'} list={yesterday}></ToDoList>
        <ToDoList day={'Today'} list={today} />
      </div>
      <div>
        <button>get</button>
        <button onClick={axiosPost}>post</button>
        <button>delete</button>
        <button>put</button>
      </div> */}
    </div>
  );
}

export default App;
