import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ScenarioCreate from './pages/ScenarioCreate';
import PracticeComplete from './pages/PracticeComplete';
import { Reset } from 'styled-reset'


function App() {
  return (
    <>
    <Reset />  {/* Reset css 적용 */}
    <Router>
    <Routes>
      <Route path="/" element={<ScenarioCreate />} />
      <Route path="success" element={<PracticeComplete />} />
      <Route path="*" element={<Navigate to="/" />} /> {/* 잘못된 경로일 경우 메인 페이지로 리디렉션 */}
    </Routes>
  </Router>
  </>
  );
}

export default App;

