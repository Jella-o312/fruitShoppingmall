import { useEffect, useState } from "react";

// 상세페이지에서 하단 tap버튼 누를때 tap별로 띄워줄 정보
const TabContent = ({tabNumber}) => {
  
  const [fade, setFade] = useState(null);
  
  // 아래 있는 return안에 최상위 div의 class name을 변경하여 APP.css 효과가 적용되도록 (start end)로 만들어줌
  // useEffect는 mount됐을때 tapnumber가 바뀔때만 작동됨
  // clean up function을 사용한 이유는 리액트가 한 effect안에 연달아서 동일 state를 변경할때
  // 마지막 코드만 적용하기 때문에 중간에 다른 작업을 넣어줌

  // 📌작동 순서
    // 1. mount 됐을때 timer작동 
    // 2. [tabnumber]바꼈을때는 clear up function 먼저 작동됨
    //   - timer를 clear(제거) 후
    //   - setFade로 fade에 저장되어 있던 'end' 값 지워줌
    //   - 그 뒤에 timer 작동
    // 3. unmount됐을때는 clear up function(return)만 작동됨
  useEffect(()=>{
    
    let timer = setTimeout(()=>{
      setFade('end');
    },50)
    
    // ↓ clean up funtion : 위에 setFade('end')를 추가하기 전에 먼저 작동해줄 코드
    return ()=>{
      clearTimeout(timer);
      setFade(null);
    }
  },[tabNumber])



  return (
    <div className={"start " + fade}>
    {
    [<div>상세정보</div>, <div>리뷰</div>, <div>교환, 반품정보</div>][tabNumber]
    }
    
    </div>
  );



  
  {/* 원리 ['a','b','c','d'][2] → 배열 방번호 2번째 ('c'가 도출됨) 
  한줄 코드일때는 return [<div>상세정보</div>, <div>리뷰</div>, <div>교환, 반품정보</div>][tabNumber]; 이렇게만 적어도됨*/}

  // 위의 코드와 같은거
  // if(tabNumber===0){
  //   return(
  //     <div>상세정보</div>
  //   );
  // }  else if(tabNumber===1){
  //   return(
  //     <div>리뷰</div>
  //   );
  // } else if(tabNumber===2){
  //   return(
  //     <div>반품, 교환정보</div>
  //   );
  // }
}

export default TabContent;