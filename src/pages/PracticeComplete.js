import React from 'react';
import styles from './PracticeComplete.module.css';
import { ResponsiveContainer } from '../components/containers/ResponsiveContainer';
import Successbutton from'../assets/images/checksign.png';

import { useLocation , useNavigate  } from 'react-router-dom';

function PracticeComplete() {

  const location = useLocation();
  const { email } = location.state || ''; 

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
  <div  className={styles.divcontainer}>
    <div className={styles.flexcontainer}>
       
      
      <div className={styles.centercontaienr}>
        <div className={styles.customForm}>
          <ResponsiveContainer width={64} height={64}  className={styles.successimgcontainer} >
                <img className={styles.successimg} src={Successbutton} alt="succees button" />
         </ResponsiveContainer>
         <p className={styles.maintext}>신청 완료</p>
         <p className={styles.maintext2}>신청하신 이메일로 안내드리겠습니다.</p>
      </div>
    </div>
    <ResponsiveContainer height={61} className={styles.customButtonContainer}>
      <div className={styles.customButton} onClick={handleGoBack}>
        <p className={styles.customButtonText}>돌아가기</p>
      </div>
    </ResponsiveContainer>
   </div>
   
  </div>
 
  );
}

export default PracticeComplete;
