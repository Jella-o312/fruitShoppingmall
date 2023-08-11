import logo from './logo.svg';
import './App.css';
import data from './mockData';
import { lazy, useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Header from './component/Header';
import Main from './component/Main';
import Detail from './component/Detail';
import About from './component/About';
import { styled } from 'styled-components';
import axios from 'axios';
import Cart from './component/Cart';
import WatchedProduct from './component/WatchedProduct';

// ✔ 컴포넌트 생성
    // const Btn = styled.button`
    // background : ${props => props.background}; 
  // 받아온 배경색이 빨강이면 글자색을 흰색으로 해주세오
    // color: ${props => props.background==='red' ? 'white' : 'blue'};
    // font-size : 30px;
    // border : 1px solid red;
    // `
// Btn 컴포넌트 속성을 물려받은 새 스타일 컴포넌트 만들기 (속성 더 추가가능)
    // const NewBtn = styled(Btn)`
    //   width: 300px;
    //   height: 250px;
    // `

    // const Div = styled.div`
    // background : skyblue;
    // padding : 20px;
    // margin : 10px;
    // border : 1px solid red;
    // `
    // export {Btn, Div};

// 상단에 import하는 것이 아니라, 해당 페이지에 가는 순간 값을 받아옴 => 그래서 
  // const Detail = lazy(()=> import('./component/Detail'));
  // const About = lazy(()=> import('./component/About'));
  // const Cart = lazy(()=> import('./component/Cart'));


// 랜더링 될때마다 다시 읽어오지 않기 위해 바깥쪽에 만듬
const URL = 'https://raw.githubusercontent.com/Naessss/study/main/fruit.json';


function App() {

  //State
  const[fruit, setFruit] = useState([]);

  // 서버가 다 읽어진 다음에 진행되도록 여기에 생성
  useEffect(()=> {
    axios.get(URL)
         .then((result)=>{
           console.log(result.data);
            setFruit(result.data);
         })
         .catch((error)=>{
          console.log(error);
         })
  },[])


  useEffect(()=>{
    localStorage.setItem('watched',  JSON.stringify([]));
  },[])





  return (
    <div className="App">

      {/* ✔ 위에서 만든 스타일 컴포넌트 사용 
      <Div>
      <Btn background = 'yellow'>스타일 적용된 버튼임</Btn>
      <Btn background = 'red'>스타일 적용된 버튼임</Btn>
      <NewBtn background = 'pink'>Btn 속성을 물려받아서 다른 속성을 추가한 버튼</NewBtn>
      </Div> */}

      <Header />
      <WatchedProduct fruit = {fruit}/>
      {/* 라우팅 세팅 후 여기다 라우츠 넣고 그 안에 라우트들 넣어주기  */}
      <Routes>
        {/*💛 페이지 세팅 */}
        <Route path ='/' element={<Main fruit = {fruit} />} />
        {/* ↓ Route path ='/detail/:id' url 파라미터 (id라는 곳에 값을 넣어줌 이름은 마음대로)*/}
        <Route path ='/detail/:id' element={<Detail fruit={fruit}/>} />
        <Route path ='/cart' element={<Cart/>} />
        <Route path = '/about' element={<About/>}>

        {/* 💛 하위 페이지 세팅
          라우터 태그 안에 쓰는 라우터는 하위 라우터로 인식함 (그래서 주소/about/ 뒤에 들어갈 path만 써줌)*/}
          <Route path = 'introduce' element={<div>회사소개</div>} />
          <Route path = 'history' element={<div>연혁</div>} />
          <Route path = 'location' element={<div>오시는길</div>} />
        </Route>

        {/* 💛 예외 페이지 세팅
        '*' 는 위에 세팅해둔 페이지 이외에 모든 url 세팅 ex) www.fruit.com/lkjlkj   */}
        <Route path='*' element={<div>Page not found</div>} />
      </Routes>
      




      {/* 💛 서버에서 값 받아오기
      <button onClick={()=>{
        axios.get('https://raw.githubusercontent.com/Naessss/study/main/fru.json') // 버튼을 클릭하면 axios가 url주소로 get요청을 날림
        .then((result)=>{       // result는 요청 성공 시 받은 객체를 저장하는 공간
          console.log(result);  // 요청 성공시 처리할 코드 공간
            // 💛서버에서 받은 값 fruit state에 저장하기
              setFruit([...fruit,...result.data])
        })
        .catch((error)=>{ //요청 실패시 처리할 공간
          console.log(error);
        })
      }}>서버요청</button> */}

      {/* 위에 코드 fetch로 작성하기 
        <button onClick={()=>{
        fetch('https://raw.githubusercontent.com/Naessss/study/main/fru.json')
        .then((response)=>{
         return response.json();
        })
        .then((result)=>{
          console.log(result);
        })
        .catch((error)=>{
          console.log(error);
        })
      }}>서버요청</button> */}


    </div>
  );
}

export default App;
