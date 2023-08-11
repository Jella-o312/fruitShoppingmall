import { useSelector } from 'react-redux';
import bg from '../bg.jpg';
import { useNavigate } from 'react-router-dom';

function WatchedProduct({fruit}) {  // APP에서 전달받은 과일 정보를 받음

  const navigate = useNavigate();
  // state에는 store에서 쏴준 Cart와 Watched가 들어있음 
  // (거기서 watched만 쓴다고 적었으니 watch값만 있음)
  // watched에는 현재 id 값만 들어있음
  const watched = useSelector((state)=> state.watched); // id 들만 들어있음 (없을수도 있고 최대 3개까지 들어있음)

  return (
    <div className="recent-container">
      <div className="cards">
      <p>최근 본 상품</p>
        {watched.map((id) => (  // watched에 있는 값을 반복문 돌려서 
          <div className="card" key={id} onClick={()=>{navigate('/detail/' + id)}} >
            <img src={'https://raw.githubusercontent.com/Naessss/study/main/'+fruit[id].title + '.jpg'} alt={fruit[id].title} />
            <p>{fruit[id].title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchedProduct;