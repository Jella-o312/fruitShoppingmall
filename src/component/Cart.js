import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCount, delItem, minusCount, removeItem } from "../redux/store";
import { memo, useMemo, useState } from "react";

// import해야함 (처음에만 랜더링됨)
const Test = memo(({num}) =>{
  console.log('test컴포넌트');

  return(
    <div>
      <h1>{num}</h1>
    메모이제이션 테스트 중
    </div>
  );
})

// 재귀함수
    // 자기 자신을 호출해서 반복문처럼 사용함
const fact = (n) =>{
  if(n <= 1)
    return n;

  return n * fact(n-1);
}



const Cart = ()=>{
  // store에 만들어둔 함수를 호출하는 기능
   const dispatch = useDispatch();

  // redux로 만든 store파일이 보내준 state 값을 받아와서함
  //(state) 대신 아무거나 적어도됨 기능은 props같은걸로 생각하면될듯 (무조건 object형식으로 통으로 받아옴)
  const cart = useSelector((state)=> state.cart);
  const [num, setNum] = useState(0);
  const [n,setN] = useState(10);

  const result = useMemo(()=>{
   return (
    fact(n)
   );
  },[n])

  // redux로 만든 store파일이 보내준 state 값을 받아와서함
  // 위의 코드와 같음 위의코드는 값이 하나기 때문에 한줄로 써도됨
    // const cart = useSelector((state)=>{   
    //   return state;
    // })

  //구조 분해 할당으로 const 명과 state안에 있는 key값이 같으면 알아서 넣어줌 해당 변수에 넣어줌
    // const {test, item} = useSelector((state)=>{
    //   return state;
    // })

    // console.log(test, item);



  return(
    <>
    <input type="number" value={n} onChange={(e)=>{
      setN(e.target.value);
    }} />
      {result}
      <Test num = {num}/>
      <button onClick={() => {
        setNum(num + 1);
      }}>버튼</button>

      <div style={{padding: '10px 7px 30px 10px', fontWeight: '900', fontSize: '20px'}}>장바구니 페이지</div>
      <Table>
        

        <thead>
          <tr>
            <th>번호</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경</th>
          </tr>
        </thead>
        <tbody>
          {
            cart.map((data, i) => {
              return (
                <tr key={i}>
                  <td>{data.id}</td>
                  <td>{data.title}</td>
                  <td>
                    {/* 여기서 i를 보내줄때는 반복 배열 수를 보내주지만 store에서 받을때는 object 형태로 받는다 */}
                    <button onClick = {()=>dispatch(minusCount(data.id))}>-</button> 
                    &nbsp;&nbsp;{data.count}&nbsp;&nbsp;
                    <button onClick = {()=>dispatch(addCount(data.id))}>+</button>
                    </td>
                  <td><button onClick = {()=> dispatch(removeItem(data.id))}> 삭제 </button></td>
                </tr>
              );
            })
          }
        </tbody>
      </Table>
    </>
  );

}

export default Cart;

