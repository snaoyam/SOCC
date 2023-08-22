/** @jsxImportSource @emotion/react */
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import axios from "axios"

function App({setToken, token}) {
  const [progress, setProgress] = React.useState(0)
  const [inputs, setInputs] = React.useState({'email': '', 'phone_number': ''})
  const navigate = useNavigate()
  const login = async () => {
    try {
        const { data } = await axios.put(`http://channel.jseoplim.com/api/auth/login/`, inputs)
        if(data.token) {
          setToken(data.token)
          navigate(`/`)
        }
        else {
          throw new Error('token not found')
        }
      } catch(_) {
        alert("Please check ID and passw0rd")
      }
  }

  switch(progress) {
    case 0:
      return (
        <div css={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div css={{
            flex: 4,
          }}></div>
          <div css={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontSize: `28px`,
            fontWeight: '700',
            lineHeight: '36px',
          }}>
            <div>안 보는 채팅방,</div>
            <div>우리가 요약해 드려요</div>
          </div>
          <div css={{
            flex: 8,
          }}></div>
          <div css={{
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
            <Button variant="primary" size="lg" onClick={() => {setProgress(1)}}>
              시작
            </Button>
          </div>
          <div css={{
            height: '60px'
          }}></div>
        </div>
      )
    case 1:
      return (
        <div css={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div css={{
            flex: 3
          }}></div>
          <div css={{
            display: 'flex',
            height: '60px',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'start',
            fontSize: `24px`,
            fontWeight: '700',
            lineHeight: '36px',
          }}>
            <div>이메일를 입력해주세요</div>
          </div>
          <div css={{
            width: '100%',
            height: '60px',
            display: 'flex',
            justifyContent: 'center',
          }}>
            <div css={{
              width: '86%',
              backgroundColor: '#F5F5F5',
              borderRadius: '4px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <input 
                onChange={(e) => setInputs({...inputs, 'email': e.target.value})}
                placeholder="example@email.com"
                css={{
                  backgroundColor: 'transparent',
                  fontSize: '20px',
                  textAlign: 'center', 
                  border: 0,
                  '&:focus': {
                    outline: 'none',
                  },
                  '&:focus::placeholder': {
                    color: 'transparent'
                  },
                }}
              >
              </input>
            </div>
          </div>
          <div css={{
            flex: 6
          }}></div>
          <div css={{
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
            <Button variant="primary" size="lg" onClick={() => {setProgress(2)}}>
              다음
            </Button>
          </div>
          <div css={{
            height: '60px'
          }}></div>
        </div>
      )
    case 2:
      return (
        <div css={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div css={{
            flex: 3
          }}></div>
          <div css={{
            display: 'flex',
            height: '60px',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'start',
            fontSize: `24px`,
            fontWeight: '700',
            lineHeight: '36px',
          }}>
            <div>전화번호를 입력해주세요</div>
          </div>
          <div css={{
            width: '100%',
            height: '60px',
            display: 'flex',
            justifyContent: 'center',
          }}>
            <div css={{
              width: '86%',
              backgroundColor: '#F5F5F5',
              borderRadius: '4px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <input 
                onChange={(e) => setInputs({...inputs, 'phone_number': e.target.value})}
                placeholder="010-0000-0000"
                pattern="\d*"
                type="number"
                css={{
                  backgroundColor: 'transparent',
                  fontSize: '20px',
                  textAlign: 'center', 
                  border: 0,
                  '&:focus': {
                    outline: 'none',
                  },
                  '&:focus::placeholder': {
                    color: 'transparent'
                  },
                }}
              >
              </input>
            </div>
          </div>
          <div css={{
            flex: 6
          }}></div>
          <div css={{
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
            <Button variant="primary" size="lg" onClick={login}>
              다음
            </Button>
          </div>
          <div css={{
            height: '60px'
          }}></div>
        </div>
      )
    default:
      return (<></>)
  }
  
}

export default App;