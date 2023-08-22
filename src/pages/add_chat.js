/** @jsxImportSource @emotion/react */
import React from "react";
import Drawer from '../components/drawer'
import useWindowDimensions from '../hooks/window_dimension';
import Carousel from '../components/carousel/carousel'

const App = () => {
  const {height, width} = useWindowDimensions()
  const [input, setInput] = React.useState(-1)
  // if(chatRoomList.length <= 0)
  

  return (
    <Drawer>
      <div css={{
        backgroundColor: 'white',
        height: 'calc(70vh + 500px)',
        maxWidth: height < width*1.5 ? '55vh' : '',
        transform: 'translateY(500px)',
        width: '100%',
        borderRadius: '16px 16px 0 0',
        margin: '0 auto'
      }}>
        {
          input === -1 ?
          <div css={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <div css={{
              padding: '40px 0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
              <div css={{
                fontSize: `24px`,
                fontWeight: '700',
                lineHeight: '36px',
              }}>
                어느 수준으로 요약해드릴까요?
              </div>
              <div css={{
                fontSize: `16px`,
                fontWeight: '200',
              }}>
                *나중에 수정할 수 있어요
              </div>
            </div>
            <div css={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              flexDirection: 'column',
              '& > input': {
                display: 'none'
              },
              '& > input+label': {
                cursor: 'pointer',
                borderRadius: '30px',
                height: '60px',
                width: '86%',
                border: '0',
                textAlign: 'center',
                backgroundColor: '#F5F5F5',
                margin: '1vh 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              },
              '& > input:checked+label': {
                backgroundColor: 'white',
                border: '1px solid #16C7EE',
                color: '#16C7EE'
              }
            }}>
              <input onChange={() => {setInput(0)}} type="radio" id="select" name="shop" /><label for="select">고등학생 이하</label>
              <input onChange={() => {setInput(1)}} type="radio" id="select2" name="shop" /><label for="select2">대학생</label>
              <input onChange={() => {setInput(2)}} type="radio" id="select3" name="shop" /><label for="select3">직장인</label>
              <input onChange={() => {setInput(3)}} type="radio" id="select4" name="shop" /><label for="select4">상관없음</label>
            </div>
          </div>
          :
          <div css={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <div css={{
              width: '100%',
              '& > svg': {
                margin: '35px 30px',
              }
            }} onClick={() => {setInput(-1)}}>
              <svg width="13" height="22" viewBox="0 0 13 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 1L2 10.1525L12 21" stroke="#888888" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <Carousel />
          </div>
        }
      </div>
    </Drawer>
  )
}

export default App;


