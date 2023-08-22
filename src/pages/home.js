/** @jsxImportSource @emotion/react */
import React from "react";
import { Outlet, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import useWindowDimensions from '../hooks/window_dimension'
import axios from "axios"

const ChatRoomButton = ({title, updateDate, onClick}) => {


  return (
    <div css={{
      margin: '3vw',
      padding: '5vw',
      border: '1px solid #D9D9D9',
      borderRadius: '8px',
    }}
    onClick={onClick}>
      <div css={{
        fontWeight: 500,
        fontSize: '20px',
        lineHeight: '23px',
      }}>
        {title}
      </div>
      <div css={{
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '28px',
        color: '#333333'
      }}>
        최근 업데이트: {updateDate}
      </div>
    </div>
  )
}

const App = ({token, chatroomList}) => {
  // const {height, width} = useWindowDimensions()
  const navigate = useNavigate()
  const {height, width} = useWindowDimensions()
  // React.useEffect(() => {
  //   if(!token) {
  //     navigate('/login')
  //   }
  // }, [token, navigate])

  return (
    <React.Fragment>
      <div css={{
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        padding: '3vh 1vw'
      }}>
        {chatroomList.map(v => <ChatRoomButton title={v.name} updateDate={v.created_at} idd={v.id} onClick={() => { navigate(`/room/${v.id}`) }}></ChatRoomButton>)}
      </div>
      <div css={{
        position: 'fixed',
        bottom: '4vh',
        maxWidth: height < width*1.5 ? '55vh' : '',
        width: '100%',
        height: '60px',
        display: 'flex',
        justifyContent: 'center',
        '& > button': {
          borderRadius: '30px',
          backgroundColor: '#16C7EE',
          borderColor: '#16C7EE',
          width: '86%',
          fontWeight: 'bold',
          '&:hover &:focus': {
            backgroundColor: '#13b2d4',
            borderColor: '#13b2d4',
          }
        }
      }}>
        <Button variant="primary" size="lg" onClick={() => {
          navigate('add')
        }}>
          대화 더 불러오기
        </Button>
      </div>
      <Outlet />
    </React.Fragment>
  )
}

export default App