import { configureStore, createSlice } from "@reduxjs/toolkit";
import info from "./infoSlice";
import watched from "./watchedSlice";

// ↓ state에 관련된 초기값과 정보를 가지고 있는 변수
  const cart = createSlice({
  name : 'cart',     // state이름
  initialState : [   // state 초기값
  {
    id : 0,
    title : 'apple',
    count : 2
  },
  {
    id : 4,
    title : 'peach',
    count : 1
  }
  ],
  reducers : {
    addCount(state,action){  
      // findIndex : 조건에 맞는 배열의 방번호를 반환해주는 코드
      let index = state.findIndex ((data)=>{
        return data.id === Number(action.payload);  // cart에서 보내준 값과 같은 id를 가진 배열방번호를 리턴
      })

      state[index].count++;
    },
    minusCount(state,action){
      let index = state.findIndex ((data)=> data.id === Number(action.payload))
      let countNum =  state[index].count;
      
      // 조건식을 걸어서 1보다 클때까지만 -가 작동되고 , 1부터는 - 없이 계속 1값을 가지도록 함 
      countNum>1 ? state[index].count-=1 : state[index].count = 1
    },



    // detail에서 장바구니 클릭하면 store cart에 추가되게 함수 만들기
    addCart (state, action){
      // 전달받은 action안에 있는 fruit의 정보 담기
      const newFruit = action.payload;

      // 전달 받은 action (fruit정보)의 id와 같은 값을 가지고 있는게 있는지 확인 
      // 동일한 id가 없으면 -1값을 return해줌 
      let index = state.findIndex ((data)=>{
        return data.id === Number(action.payload.id);
      })

      // 위에서 확인한 index값이 0보다 작은 -1인경우 기존 장바구니에 없는 상품으로 
      // 추가해주고, 0이상이면 store(장바구니)에 있는 상품임으로 상품 개수만 +1
      index<0 ? state.push(newFruit)  : state[index].count++ ;
    },


    
    // 삭제 기능
    removeItem (state, action){
      let index = state.findIndex ((data)=> data.id === Number(action.payload))
      // 간의 변수 만들어서 슬라이스 한거 cart에 넣기
      state = state.splice(index,1);
    }
  } 
  })


  const number = createSlice({
    name : 'number', 
    initialState : 1,  
    reducers : {         // reducers 는 함수 정하는 구역이라고 생각하면되고 원래는 action 역할임
      changeNumber(state, action){   // changeNumber → 함수 이름(원하는걸로 지으면됨) / (state)는 매개변수로 해당 변수 number안에 있는 state초기값 (initialState)을 가져옴 (매개변수 이름은 아무거나 가능 )
        // 📌(state, action) = (number변수에 있는 state값을 담는 매개변수, Cart에서 보내준 값을 받는 매개변수 ) 
          //→ 둘다 변수명은 아무거나 지어도됨
        // 📌 console.log(action.payload)    action안에 있는 payload는 Cart에서 보내준 값을 저장하는 곳 
          // ex)  dispatch(changeNumber(10)); 이면 action.payload안에는 10이 들어있음
        return state +1 ;
      }
    }
  })

  // ⭐ 오브젝트, 배열 형태로 state초기값을 한다면  resucers 에서 return 없이도 값을 변경할 수 있다. 
  // ⭐ 직접 수정 가능 : redux에서는 오브젯트나 배열을 깨고 변경할 필요X
    // 버튼 누르면 이름 바뀌게 만든 예시 코드
    // const imsi = createSlice({
    //   name : 'num', 
    //   initialState : {
    //     name : '길동',
    //     age : 10
    //   },  
    //   reducers : { 
    //     changeNumber(state){   
    //       state.name = '철수'
    //     }
    //   }
    // })


  export const {addCount, minusCount, addCart, removeItem} = cart.actions;
  // export const {changeNumber} = number.actions;
  // 함수가 여러개라면 아래와 같이 보낼 수 있음
    // export const {changeNumber, 다른함수명} = number.actions;
    



  export default configureStore({
    reducer : { 
      cart : cart.reducer,  //  key : value 형식 
      // info : info.reducer   infoSlice.js 에서 받아온 info 변수 사용하려면 import되어 있어야함
      watched :watched.reducer
    }

  })