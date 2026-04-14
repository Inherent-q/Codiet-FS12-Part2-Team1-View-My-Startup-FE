import { Routes, Route, Link } from "react-router-dom";
import GNB from "./components/GNB";
import Home from "./home/Home";
import SelectPage from "./select/Select"; // (종찬) 추가
import Detail from "./detail/Detail.jsx";
import Results from "./Results/Results.jsx";

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

function Compare() {
  return <h1>비교 현황 페이지</h1>;
}

function Investment() {
  return <h1>투자 현황 페이지</h1>;
}

export default App;
