/** @jsxImportSource @emotion/react */
import React from "react";
import { useNavigate } from "react-router-dom";
import useWindowDimensions from '../hooks/window_dimension'

function App({title}) {
  const navigate = useNavigate()
  const {height, width} = useWindowDimensions()
  return (
    <React.Fragment>
       <div
        css={{
          height: '64px',
          position: 'fixed',
          backgroundColor: 'white',
          top: 0,
          maxWidth: height < width*1.5 ? '55vh' : '',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: '0 0px',
          justifyContent: 'space-between',
        }}
      >
        <div css={{
          width: '64px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={() => {
          navigate('/')
        }}>
          <svg width="13" height="22" viewBox="0 0 13 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 1L2 10.1525L12 21" stroke="#888888" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <div css={{
          fontSize: '20px',
          lineHeight: '24px',
        }}>
          {title}
        </div>
        <div css={{
          width: '64px',
          height: '64px',
        }}></div>
      </div>
      <div css={{
        height: '64px',
        width: '100%',
      }}></div>
    </React.Fragment>
  )
}

export default App;