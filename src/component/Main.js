import Card from './Card';
import bg from '../bg.jpg';  // 📌같은 폴더에 있는 배경이미지를 import하면 bg라는 이름으로 이미지를 변수처럼 사용 O
import { useState } from 'react';


const Main = ({fruit}) =>{
  // fruit에 들어있는 오브젝트 개수 뽑기 (얘가 max)
  let max = fruit.length;
  const [ViewCount, setViewCount] = useState(3); 
  let viewFruit = fruit.slice(0, ViewCount);  // 0부터 viewCount 전까지
  



  return(
    <>
      <div className='main-bg' style={{backgroundImage : 'url('+ bg +')'}}>
        <span>광식이네 과일가게</span>
      </div>
      {/* 📌 <img src ={bg}/> 이렇게 임폴트한 bg를 태그처럼 쓸 수 있음*/}

      <div className='Container mt-3'>
        <div className='row'>
          {
            // 💛컴포넌트 반복문 fruit값이 들어있는만큼 Card 컴포넌트에 값 보내줘서 반복 3개씩 반복
            viewFruit.map((data,i)=>{
              return(
              <Card data = {data} key={i}/>   
              );
            })
          }
        </div>
        <div>
          {
          // 💛ViewCount 값이 9보다 작을때 버튼이 보이고 9보다 크면 상품 없음이 뜸
          ViewCount<max ? 
            <button onClick={()=>{setViewCount(ViewCount+3) }} >더 보기</button>
          : <div className="alert alert-danger" style={{fontSize:'150%', width: '90%', margin: 'auto', textAlign: 'center'}}>
            더 이상 상품이 x</div>
          }
        </div>

      </div>
    </>
  );
}

export default Main;



// 간의 배열

// if(i<max){
//   if(i<3){
//     return(
//     <Card data = {data} key={i}/>
//     )
//   }
  
//   if(i>2 && i<6 && firstMore===1){
//     return(
//       <Card data = {data} key={i}/>
//       )
//   }
// }