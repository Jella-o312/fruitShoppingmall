import { Outlet, useNavigate } from "react-router-dom";

const About = ()=>{

  const navigate = useNavigate();

  return(
    <>
      {/* ↓ 버튼 누르면 작동될 About의 하위 페이지 */}
      <button onClick={()=> {navigate('/about/introduce')}}>회사소개</button>
      <button onClick={()=> {navigate('/about/history')}}>연혁</button>
      <button onClick={()=> {navigate('/about/location')}}>오시는길</button>

      {/* ↓ 자식 라우터를 어디에 표시할건지 지정하는 태그 */}
      <Outlet></Outlet>
    </>
  );
}

export default About;