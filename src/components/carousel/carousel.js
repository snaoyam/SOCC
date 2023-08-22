/** @jsxImportSource @emotion/react */
import React, { Component } from 'react'
import NonPassiveTouchTarget from './non_passive_touch_target'
import TouchCarousel, { clamp } from 'react-touch-carousel'
import touchWithMouseHOC from './mouse_support'
import Button from 'react-bootstrap/Button'
import { withRouter } from '../../tools/withRouter'
import add1 from '../../assents/images/add1.png'
import add2 from '../../assents/images/add2.png'
import add3 from '../../assents/images/add3.png'

const data = [
  {title: '3단계만 거치면 돼요', text1: "대화내용을 요약하고 싶은", text2: "채팅방에 들어가서 맨 위 오른쪽 '메뉴' 클릭", email: '', image: add1},
  {title: '저희가 나머지는 다 할게요', text1: "맨 하단 '설정' 버튼 클릭 후", text2: "스크롤해서 '대화 내용 내보내기' 클릭", email: '', image: add2},
  {title: '참 쉽죠?', text1: '이제 아래 이메일을 복사한 뒤', text2: "대화내용을 보내주세요", email: 'jseoplim2@gmail.com', image: add3}
]

const queryPage = parseInt(window.location.search.slice(1))
const startPage = queryPage ? clamp(queryPage, 0, data.length - 1) : 0

const carouselWidth = window.innerHeight < window.innerWidth*1.5 ? 0.55*window.innerHeight : window.innerWidth 
const cardSize = carouselWidth

class App extends Component {
  
  constructor (props) {
    super(props)
    const renderedData = this.getRenderedData(startPage)
    this.state = {
      page: clamp(startPage, 0, data.length - renderedData.length),
      renderedData
    }
    this.defaultCursor = (data.length - renderedData.length) - startPage
  }

  // Open a length-3 window on the data
  getRenderedData (cursor) {
    switch (cursor) {
      case 0: {
        return data.slice(0, 3)
      }
      case data.length - 1: {
        return data.slice(data.length - 3)
      }
      default: {
        return data.slice(cursor - 1, cursor + 2)
      }
    }
  }

  modPage = () => {
    const cursor = this.carousel.getCursor()
    const { page, renderedData } = this.state
    if (Math.round(cursor) !== cursor) return
    if ( // Do we reach the edge of the window but not the edge of the data?
      (page !== 0 && cursor === 0) ||
      (page !== data.length - renderedData.length && cursor === 1 - renderedData.length)
    ) {
      // Then move the window.
      const newCursor = -1 // put cursor at center
      const newPage = page - cursor + newCursor
      this.setState({
        page: newPage,
        renderedData: this.getRenderedData(newPage)
      })
      // This kinda breaks grabbing. But not a big deal I guess.
      this.carousel.modAs(newCursor)
    }
  }

  container = touchWithMouseHOC((props) => {
    const { cursor, carouselState, ...rest } = props
    const translateX = cursor * cardSize
    return (
      <NonPassiveTouchTarget
        className='carousel-container'
        onTouchStart={this.modPage}
        onMouseDown={this.modPage}
        css={{
          position: 'relative',
          height: '100%',
          width: '100%',
          margin: '0 auto',
          overflow: 'hidden',
          touchAction: 'pan-y',
        }}
      >
        <NonPassiveTouchTarget
          className='carousel-track'
          style={{ transform: `translate3d(${translateX}px, 0, 0)` }}
          {...rest}
          css={{
            display: 'flex',
            height: '100%',
            width: '100%',
          }}
        />
      </NonPassiveTouchTarget>
    )
  })

  renderCard = (index, _, cursor) => {
    const { page } = this.state
    const item = data[page + index]

    return (
      <div key={index} className='carousel-card' css={{
        flex: '0 0 100vw',
        width: '100%',
        maxWidth: '100%',
        height: '100%',
        fontWeight: 'bold',
        WebkitTapHighlightColor: 'transparent',
      }}>
        <div className='carousel-card-inner' css={{
          position: 'relative',
          flexDirection: 'column',
          width: '100%',
          maxWidth: '100%',
          height: '100%',
        }}>
          <div css={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '100%',
          }}>
            <div css={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              height: '100%',
              maxWidth: '100%',
              position: 'relative',
              justifyContent: 'space-between'
            }}>
              <div css={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
                <div css={{
                  fontSize: `24px`,
                  fontWeight: '700',
                  lineHeight: '36px',
                  margin: '0 0 12px 0'
                }}>
                  {item.title}
                </div>
                <div css={{
                  fontSize: `16px`,
                  fontWeight: '200',
                }}>
                  {item.text1}
                </div>
                <div css={{
                  fontSize: `16px`,
                  fontWeight: '200',
                }}>
                  {item.text2}
                </div>
                {
                  item.email 
                  ? <div css={{
                    margin: '12px 0 0 0',
                    height: '42px',
                    width: '70%',
                    maxWidth: '300px',
                    backgroundColor: '#F5F5F5',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 0 0 20px',
                    color: '#AAAAAA',
                    justifyContent: 'space-between'
                    
                  }}>
                    {item.email}
                    <div css={{
                      backgroundColor: 'white',
                      borderRadius: '3px',
                      width: '64px',
                      height: '30px',
                      margin: '6px',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <div css={{
                        color: 'black',
                        fontSize: '14px',
                        position: 'absolute',
                      }}
                      onClick={() => {
                        navigator.clipboard
                        .writeText(item.email)
                        .then(() => {
                          alert("클립보드에 복사되었습니다.");
                        })
                        .catch(() => {
                          alert("복사를 다시 시도해주세요.");
                        });
                      }}>
                        복사하기
                      </div>
                    </div>
                  </div>
                  : <></>
                }
              </div>
              
              <img css={{width: '90%', marginBottom: '450px'}} alt={"add"} src={item.image} />
              {
                item.email ? 
                <div css={{
                  position: 'absolute',
                  margin: '0 0 500px 0',
                  bottom: '4vh',
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
                    
                    setTimeout(() => {
                      window.history.replaceState(null, 'react', '/');
                    }, 500)
                    this.props.navigate('..')
                  }}>
                    채팅방으로 이동하기
                  </Button>
                </div>
                : <></>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }

  render () {
    const { renderedData } = this.state
    const CarouselContainer = this.container
    return (
      <TouchCarousel
        ref={elt => { this.carousel = elt }}
        component={CarouselContainer}
        cardSize={cardSize}
        cardCount={renderedData.length}
        loop={false}
        renderCard={this.renderCard}
        defaultCursor={this.defaultCursor}
      />
    )
  }
}

export default withRouter(App);