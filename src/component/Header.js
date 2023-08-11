import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, redirect, useNavigate } from "react-router-dom";

const Header = () =>{
  const navigate = useNavigate(); // useNavigate() : 페이지 이동과 관련된 함수가 내장된 Hook
  
  // ↓ React-Query 라이브러리 기본 코드
  // const 결과 저장 변수 = useQuery(['쿼리이름'], ()=>{
  //   return (
  //  서버요청 코드
  //  )
  // })

  const userInfoQuery = useQuery (['userInfo'], ()=>
    axios.get('https://raw.githubusercontent.com/Naessss/study/main/userinfo.json')
         .then((result)=>{
          console.log(result);
          return result.data;
         })
         .catch(error =>{
          console.log(error);
         }),
         {
          // 리패치는 홈페이지 들어왓을때 한번만 하고 싶다면 infinity
          staleTime : Infinity
         }
  )


  return(
    // 아래 태그들 다 ctrl + space눌러서 react-bootstrab클릭해서 import해줘야함

    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/" style={{fontSize: 25}}>🍓</Navbar.Brand>
        <Nav className="me-auto">

          
          <Nav.Link onClick={()=> {navigate('/')}}>Home</Nav.Link>  
          <Nav.Link onClick={()=> {navigate('/about')}}>About</Nav.Link>
          <Nav.Link onClick={()=> {navigate('/detail')}}>상세페이지</Nav.Link>
          <Nav.Link onClick={()=> {navigate('/cart')}}>장바구니</Nav.Link>
          <Nav.Link onClick={()=> {navigate(-1)}}>Back</Nav.Link>

        </Nav>
        
        <Nav style={{color: 'white'}}>
          {/* 받아오는 정보에 따라서 보여줄 상태 창 */}
          {/* && 엔드 연산자 → 조건이 참이면 두번째 조건식이 발동됨 */}
          {userInfoQuery.isLoading && '로딩중'}
          {userInfoQuery.isError && '오류'}
          {userInfoQuery.data && userInfoQuery.data[0].name}
          
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;