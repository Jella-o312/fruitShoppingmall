import { createSlice } from "@reduxjs/toolkit";


const watched = createSlice({
  name : 'watched',   // state이름
  initialState : [],  // state 초기값
  
  //함수 생성
  reducers:{
    setWatched(state, action){  // action은 다른곳에서 쏴준 정보값이 있음
      return action.payload;  // 정보값 안에 payload 안에 쏴준 id들이 있음 , 위에 있는 state로 id들을 넣어줌

    }
  }
})

export const {setWatched} = watched.actions;

export default watched;