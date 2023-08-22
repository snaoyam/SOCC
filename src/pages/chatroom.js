/** @jsxImportSource @emotion/react */
import React from "react";
import Topbar from "../components/topbar"
import CopyIcon from "../assents/images/copy.png"
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const Daily = ({date, summary}) => {
  return (
    <div css={{
      width: '100%',
      padding: '15px 7px 5px 0',
    }}>
      <div css={{
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <div css={{
          display: 'flex',
        }}>
          🤖
          <div css={{
            padding: '0 0 0 4px'
          }}>
            {date}
          </div>
        </div>
        <img alt='copy' css={{
          width: '24px',
          height: '24px',
        }} src={CopyIcon} />
      </div>
      <ul css={{margin: 0}}>
        {summary.map((v) => <li>{v}</li>)}
      </ul>
      <div css={{
        display: 'flex',
        flexDirection: 'row-reverse'
      }}>
      </div>
    </div>
  )
}

const Seperator = () => {
  return (
    <div css={{
      height: '1px',
      width: '100%',
      padding: '10px',
    }}>
      <div css={{
        height: '1px',
        width: '100%',
        backgroundColor: '#ABABAB',
      }}>

      </div>
    </div>
  )
}

const App = ({iid, token}) => {
  const navigate = useNavigate()
  const [chats, setChats] = React.useState([])
  /*
  {
    "id": 2,
    "name": "디스콰이엇",
    "created_at": "2023-02-18T07:16:27.624863+09:00",
    "daily_chats": [
        {
            "id": 8,
            "summary_text": "웹앱 운영에 대한 질문\n무료버전의 웹사이트도 웹앱 형태로 만들어서 웹푸시 기능을 사용할 수 있는지에 대한 질문\nPWA 앱과 웹푸시에 대한 대화\nPWA나 웹푸시는 iOS에서 구현이 안 되는 것 같다는 의견\niOS 16에서는 PWA나 웹푸시를 지원한다는 글을 블로그에서 발견한 이야기\n웹사이트 제작과 iOS 지원에 대한 고민\n웹사이트를 만들어 예약 기능을 추가하는 것을 고민 중\niOS 16.4가 출시되어도 사용자들이 업데이트를 안 하면 웹푸시를 못 받을 수도 있다는 의견\n상담소 이용자 대상이 트민한 분들이라서 iOS 사용이 적을 수 있다는 의견\n플레어레인을 이용하면 무료로 사용할 수 있다는 이야기",
            "level": 3,
            "created_at": "2023년 02월 18일"
        },
        {
            "id": 7,
            "summary_text": "개발 관련 뉴스\n스테이블 디퓨전의 새로운 영상 생성 AI 출시\n챗GPT가 초대형 데이터센터에서 개발됨\n대표 유니콘인 재스퍼, 생성AI 이용한 기업용 제품군 출시\nAI의 영향과 활용 관련 뉴스\n인공지능을 이용한 프로그램 챗 GPT의 대세\nAI가 일과 직업에 미치는 영향 발표\n챗GPT를 이용한 의학논문 작성 및 업스테이지의 가상인턴 활용 등 AI의 활용 가능성 논의\n문학 작품과 AI 관련 뉴스\n양산형 AI문학작가와 차별화 가능성 논의\nAI를 이용한 스토리 게임과 같은 AI의 활용 가능성\n문학 작품의 정의와 AI에 대한 논의",
            "level": 3,
            "created_at": "2023년 02월 17일"
        },
        {
            "id": 6,
            "summary_text": "앱 데이터 측정 방법\n플레이스토어에 출시한 앱 사용자들의 데이터(DAU, MAU)를 측정하려면 별도의 툴을 사용해야 함\n파이어베이스 어낼리틱스나 구글 애널리틱스를 활용하면 쉽게 측정 가능\n웹앱의 경우 구글 애널리틱스만 사용해도 지수를 쉽게 얻을 수 있음\n어웨이큰의 macOS 버전 출시\n어웨이큰의 macOS 버전이 출시되어 생산성 향상을 기대할 수 있음\n타이머 기능이 추가되어 더욱 편리함\n온보딩이 귀엽고 설치하는 방법에 대한 가이드 수정이 필요할 수 있음\n유용한 서비스 소개\n구글시트나 DB에서 직접 발송되는 카카오 알림톡 자동화 기능이 추가된 서비스를 소개함\n노코드방에서 이 서비스를 알아봤고 좋아보임",
            "level": 3,
            "created_at": "2023년 02월 16일"
        },
        {
            "id": 5,
            "summary_text": "질문 내용\n크라우드 펀딩 제품 상세페이지 외주 업체 구하기\n업체가 자료 확인을 지연하여 의아함을 느끼는 상황\n디자인 계열 업체의 반응에 대한 의문점\n응답 내용\n급한 상황이라면 전화를 하는 것이 좋다는 조언\n자료를 전날 보내고 당일 확인하지 않았다고 바로 불성실함을 운하는 것은 이르다는 조언\n업체가 바이업체일 수 있다는 추측\n업체가 여러 프로젝트를 동시에 진행하다보니 자료 확인이 지연될 수 있다는 의견\n이메일 커뮤니케이션에서는 보통 1영업일 내로 회신을 받는다는 경험을 언급\n커뮤니티 매니저 업무와 특징, 평균 연봉 등에 대한 정보를 다룬 글을 소개하며 관심이 있는 분들에게 도움이 될 수 있다는 내용",
            "level": 3,
            "created_at": "2023년 02월 15일"
        },
        {
            "id": 4,
            "summary_text": "질문 내용\n크라우드 펀딩 제품 상세페이지 외주 업체 구하기\n업체가 자료 확인을 지연하여 의아함을 느끼는 상황\n디자인 계열 업체의 반응에 대한 의문점\n응답 내용\n급한 상황이라면 전화를 하는 것이 좋다는 조언\n자료를 전날 보내고 당일 확인하지 않았다고 바로 불성실함을 운하는 것은 이르다는 조언\n업체가 바이업체일 수 있다는 추측\n업체가 여러 프로젝트를 동시에 진행하다보니 자료 확인이 지연될 수 있다는 의견\n이메일 커뮤니케이션에서는 보통 1영업일 내로 회신을 받는다는 경험을 언급\n커뮤니티 매니저 업무와 특징, 평균 연봉 등에 대한 정보를 다룬 글을 소개하며 관심이 있는 분들에게 도움이 될 수 있다는 내용",
            "level": 3,
            "created_at": "2023년 02월 14일"
        },
        {
            "id": 3,
            "summary_text": "List 1: 고민 내용\n프론트엔드 희망 4학년 재학생이며, 1개월간 진행된 프로젝트를 마감했음\n프로젝트에서 리팩토링을 하지 못했으며, 이력서에 추가하기 위해 고민 중\n새 프로젝트를 하는 것과 기존 프로젝트를 추가적으로 개선하는 것 중 고민 중\nList 2: 다른 고민 내용\n기존 프로젝트가 배포 중단되고 사용자가 없어 고민 중\n외부에서 스터디 1개, 프로젝트 1개, 동아리 1개 추가로 시작 예정\n이력서 쓰기 위한 시간 절감을 고려해 새 프로젝트를 하는 것을 고민함\nList 3: 프로젝트 조언\n새 프로젝트를 하는 이유는 경험을 새롭게 할 수 있기 때문\n기존 프로젝트에서 리팩토링을 시도하는 것도 좋은 선택일 수 있음\n리팩토링을 하지 못한 이유와 팀원을 설득하는 과정, 개선 사항 등을 인터뷰에서 언급하면 면접에서 더 많은 이야기를 할 수 있음",
            "level": 3,
            "created_at": "2023년 02월 13일"
        }
    ]
  }
  */
  React.useEffect(() => {
    axios.get(`http://channel.jseoplim.com/api/chat-rooms/${iid}`, {
      params: {}, 
      headers: {
      'Authorization': `Token ${token}`
      }
    }).then(v => { setChats(v) })
  }, [token, iid])

  return (
    <div css={{
      width: '100%',
      height: '100%',
    }}>
      <Topbar title={'디스콰이엇'}/>
      <div css={{
        padding: '10px 24px 128px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
        <div css={{
          backgroundColor: '#16C7EE',
          height: '54px',
          width: '100%',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          color: 'white',
          justifyContent: 'space-between',
          padding: '0 14px',
        }}>
          <div css={{
            fontWeight: '500',
          }}>
            최근 불러온 일자 | 2월 18일
          </div>
          <div css={{
            fontWeight: 'bold',
          }} onClick={() => {
            navigate('/add')
          }}>
            더 불러오기
          </div>
        </div>
        {chats.daily_chats.map(v => <React.Fragment><Daily date={v.created_at} summary={v.summary_text.split('\n')}/><Seperator /></React.Fragment>
        )}
        
      </div>
    </div>
  )
}

export default App;