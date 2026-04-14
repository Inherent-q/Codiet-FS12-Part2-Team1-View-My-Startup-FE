import { Routes, Route, Link } from "react-router-dom";
import GNB from "./components/GNB";
import SelectPage from "./select/Select"; // (종찬) 추가
import Detail from "./detail/Detail.jsx";
import Results from "./Results/Results.jsx";
import Investment from "../src/components/Investment";

function App() {
  return (
    <>
      <GNB />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/select" element={<SelectPage />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/investment" element={<Investment />} />
        <Route path="/results" element={<Results />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </>
  );
}

function Home() {
  return <h1>기업 전체 리스트 조회 페이지</h1>;
}

function Select() {
  return <h1>나의 기업 비교 선택 페이지</h1>;
}

function Compare() {
  return <h1>비교 현황 페이지</h1>;
}

export default App;
