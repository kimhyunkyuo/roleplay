import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ScenarioCreate.module.css';
import { ResponsiveContainer } from '../components/containers/ResponsiveContainer';
import Logotype from '../assets/images/logotype.svg';
import Maintype from '../assets/images/main.png';
import Questiontype from '../assets/images/question.png';
import axios from 'axios';

const slackApiUrl = process.env.REACT_APP_SLACK_API_URL;

// 슬랙으로 메시지 전송 함수
const sendSlackMessage = async (email) => {
  try {
    // 현재 시간을 ISO 형식으로 변환
    const now = new Date().toISOString(); // ISO 8601 형식

    // 이메일과 ISO 형식의 현재 시간을 전송
    const response = await axios.post(
      slackApiUrl,
      { email, timestamp: now }
    );

    console.log('응답 성공:', response.data); // 응답 데이터 확인
  } catch (err) {
    console.warn('응답 실패:', err);
  }
};

function ScenarioCreate() {
  const [email, setEmail] = useState(''); // 이메일 상태 값 관리
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 훅
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  // 이메일 형식 검증 함수
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      alert('이메일 형식으로 입력해주세요!'); // 이메일 형식이 맞지 않으면 경고창
    }  else {
      if (isLoading) return; // 이미 로딩 중일 경우 함수 종료
      setIsLoading(true); // 로딩 시작
      
      await sendSlackMessage(email);
      setIsLoading(false); // 로딩 끝
      navigate('/success', { state: { email } });
    }
  };


  return (
    <div className={styles.divcontainer}>
      <div className={styles.flexcontainer}>
        <ResponsiveContainer width={220} height={40} className={styles.logoContainer}>
          <img className={styles.logoImage} src={Logotype} alt="ScriptMate Logo" />
        </ResponsiveContainer>

        <div className={styles.customcontainer}>
          <div className={styles.customForm}>
            <ResponsiveContainer className={styles.mainImgContainer}>
              <img className={styles.mainImage} src={Maintype} alt="mainimg" />
            </ResponsiveContainer>
          </div>

          <div className={styles.customForm2}>
            <div className={styles.customForm21}>
              <ResponsiveContainer width={48} height={50} className={styles.questionImgContainer}>
                <img className={styles.questionImage} src={Questiontype} alt="questionimg" />
              </ResponsiveContainer>
              <p className={styles.customTitle}>고객 친화적인 영업을</p>
              <p className={styles.customTitle1}>만들어드릴게요</p>
              <p className={styles.customTitle2}>자신의 영업 내용을 기반으로 개선점과 모니터링 파일을</p>
              <p className={styles.customTitle21}>제공하여 고객 친화적인 영업을 할 수 있게 합니다.</p>
              <p className={styles.customTitle3}>이메일을 입력하시면, 선착순 100명에게</p>
              <p className={styles.customTitle31}>베타 버전을 먼저 체험할 수 있는 기회를 드립니다</p>
              <ResponsiveContainer className={styles.customInputContainer} height={44}>
                <input
                  className={styles.customInput}
                  type='email'
                  placeholder='이메일을 입력해주세요'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </ResponsiveContainer>
              <ResponsiveContainer height={61} className={styles.customButton} onClick={handleSubmit}>
              <p className={styles.customButtonText}>{isLoading ? '이메일 발송중' : '베타버전 체험하기'}</p>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScenarioCreate;