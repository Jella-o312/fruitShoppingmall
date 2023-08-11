import { createSlice } from "@reduxjs/toolkit";

const info = createSlice({
  name : 'info',
  initialState : {
    name : '홍길동',
    age : 20,
    gender : 'm'
  },
  reducers : {
    setAge(state){  // 변수명(값을 저장할 임시변수명)
      state.age = 30
    },
    changeGender(state){
      state.gender = 'f'
    }
  }
})

export const {setAge, changeGender} = info.actions; // info.actions → 외부에서 해당 변수 안에 있는 함수를 쓸 수 있게함 
export default info;