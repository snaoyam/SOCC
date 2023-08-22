/** @jsxImportSource @emotion/react */
import React from 'react'
// import { useMediaQuery } from 'react-responsive'
import { Routes, Route } from 'react-router-dom'
import useWindowDimensions from './hooks/window_dimension'
import LoginPage from './pages/login'
import HomePage from './pages/home'
import DrawerPage from './pages/add_chat'
import ChatroomPage from './pages/chatroom'
import axios from 'axios'


const App = () => {
  const [token, setToken] = React.useState('')
  const [chatroomList, setChatRoomList] = React.useState([])
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  React.useEffect(() => {
    setScreenSize();
  });
  const {height, width} = useWindowDimensions()
  const chatroomRoute = chatroomList.map((v) => <Route exact path={"/room/" + v._id} key={v._id} element={<ChatroomPage token={token} iid={v.id} />}/>)
  /*
    chatroomRoute = [{
        "id": 2,
        "name": "디스콰이엇",
        "created_at": "2023년 02월 18일"
      },
    {
      "id": 3,
      "name": "chatGPTer 1번방",
      "created_at": "2023년 02월 18일"
      }, 
    ]
  */

  React.useEffect(() => {

    axios.get(`http://channel.jseoplim.com/api/chat-rooms`, {
      params: {},
      headers: {
        'Authorization': `Token ${token}`
      }
    })
      .then(v => { setChatRoomList(v) })
  }, [token])
  

  return (
    <React.Fragment>
      <div css={{
        backgroundColor: 'lightgray',
        width: '100%',
        height: '100%',
        display: 'flex',
        // alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div css={{
          height: '100%',
          backgroundColor: 'white',
          maxWidth: height < width*1.5 ? '55vh' : '',
          width: '100%',
        }}>
          {/* <Topbar></Topbar> */}
          <Routes>
            <Route path='/' element={<HomePage token={token} chatroomList={chatroomList}/>}>
              <Route path="add" element={<DrawerPage token={token}/>}></Route>
            </Route>
            <Route path='/login' element={<LoginPage setToken={setToken} token={token}/>}></Route>
            {chatroomRoute}
          </Routes>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
