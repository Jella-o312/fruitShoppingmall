import { useNavigate, useParams } from "react-router-dom";
import './detail.css';
import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import TabContent from "./TabContent";
import { addCart } from "../redux/store";
import { useDispatch } from "react-redux";
import { setWatched } from "../redux/watchedSlice";



const Detail = ({fruit}) => {
  
  // {id} 구조분해 할당 → 할당받을때만 {}를 사용하고 아래에서 사용할때는 그냥 id라고 적으면됨
  const {id} = useParams();   // useParams() : url파라미터에 대한 정보를 가져오는 hook
  const [time, setTime] = useState(5);
  const[alert, setAlert] = useState(true);  // 보일때는 true
  const[tabNumber,setTabNumber] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  //내가 본 상품의 id를 로컬스토리지에 추가
  useEffect(()=>{
    // 로컬스토리지에 있는 값을 빼옴
    let watched = localStorage.getItem('watched');
    watched = JSON.parse(watched);
    // includes : 내가 보고 있는 배열에 해당 id가 있으면 true
    if(watched.length ===3 && !watched.includes(id))
    watched.pop();

    watched = [id, ...watched]; // 로컬스토리지에 저장된 id들

    // 중복제거
    watched = new Set(watched);
    // 배열로 변환
    watched = Array.from(watched);
    
    localStorage.setItem('watched',  JSON.stringify(watched));
    console.log(watched);
    dispatch(setWatched(watched));
  },[]);


  useEffect(()=> {
    // 숫자 줄어드는 코드
      // time > 0 && setTimeout(() => setTime(time - 1), 1000); 
    
    // 5초 뒤 사라지는 코드
    let timer = setTimeout(()=>{
      setAlert(false);
    },5000)

    //이렇게 clean up funtion이라고 이름이 딱히 있는 것이 아니라 clear뭐시기 가 들어있는 코드를 말한닭
    return ()=>{
      clearTimeout(timer);
    }

  });


  // 타입체크 하면 좋음
  // console(typeof id);

  // 💛 상품 id와 페이지 url 파라미터에 있는 id가 같은지 물어봄
  // find : 배열방 id랑 위에 있는 id랑 같냐 물어봄 같지 않으면 false로 반환
  // id는 타입이 String이여서 number 바꿔서 확인함
  let result = fruit.find(data => data.id === Number(id));

  // 얘가 작동되면 아래 있는 return은 작동되지 않음 (!result는 값이 없을때 nudifind 상태일때)
  if(!result){
    return (
      <div>없는 상품</div>
    );
  }



  
  
  return(
    <div className="container mt-3">
      {
        //alert이 true일때 보이는 식 (근데 뭔지 모르겠음)
        alert && 
        <div className="alert alert-danger">반짝할인 상품</div>
        // <div className="alert alert-danger">반짝할인 상품 <span style={{color: 'red'}}><b>{time}</b></span> 초 후 종료</div>
      }
      <div className="row">
        <div className="col-md-6">
          {/* <img src={process.env.PUBLIC_URL + `/img/${fruit[id].title}.jpg`} width="80%" /> */}
          <img src={`https://raw.githubusercontent.com/Naessss/study/main/${fruit[id].title}.jpg`}/>
        </div>
        <div className="col-md-6" id="lef">
          <h4 className="pt-5">{fruit[id].title}</h4>
          <p>{fruit[id].content}</p>
          <p>{fruit[id].price} 원</p>

          {/* 💛 주문하기 눌렀을때 장바구니에 추가되게 만들기 */}
          <button className="btn btn-danger" onClick={()=>{
            // 해당 detail 페이지에서 보여주는 상품정보 보내주기
            dispatch(addCart({id : +id, title : fruit[id].title, count: 1})); // id앞에 +를 붙이면 숫자로 들어가짐

            //  주문하기 버튼 누르면 장바구니 추가 알림뜨고 장바구니 이동 물어봄 확인 버튼 누르면 장바구니로 페이지 이동
            let check = window.confirm('🛒 ' + fruit[id].title + '이 장바구니에 추가됐습니다 🛒 \n \n장바구니로 이동하시겠습니까?');

            check && navigate('/cart');
          }}>주문하기</button>
        </div>
      </div>





      <Nav className="mt-4" justify variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link eventKey="link-0" onClick={()=>{
            setTabNumber(0)
          }}>상세정보</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" onClick={()=>{
            setTabNumber(1)
          }}>리뷰</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2" onClick={()=>{
            setTabNumber(2)
          }}>반품,교환정보</Nav.Link>
        </Nav.Item>
      </Nav>

      <TabContent tabNumber = {tabNumber}></TabContent>

    </div>
  );
}

export default Detail;
