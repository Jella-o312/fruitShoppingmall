import { useNavigate } from "react-router-dom";

const Card = ({data}) => {

  //⭐ 반복문으로 만드는거
  
  const navigate = useNavigate();

  return (
      <div className='col-md-4' onClick={()=>{
        navigate('/detail/' + data.id)
      }} style={{cursor : 'pointer'}}>
        {/* 안전한 이미지 첨부 방법 : ↓ 페이지가 바뀌거나 이동될때 자동으로 url을 찾아서 이미지를 넣어줌 */}
        {/* <img src='img/apple.jpg' style={{width: '80%'}}/> ← 이렇게 코드를 치면 나중에 오류생길수도 있음*/}
        {/* <img src={process.env.PUBLIC_URL + `/img/${data.title}.jpg`} style={{width: '70%'}}/> */}
        <img src={`https://raw.githubusercontent.com/Naessss/study/main/${data.title}.jpg`} style={{width: '60%'}}/>
        <h4>{data.title}</h4>
        <p>₩{data.price}원</p>
      </div>
       
  );

}



export default Card;