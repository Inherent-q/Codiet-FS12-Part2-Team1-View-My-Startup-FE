import { Routes, Route, Link } from "react-router-dom";
import { ModalProvider } from "./context/ModalContext";
import GNB from "./components/GNB";
import Home from "./home/Home";
import SelectPage from "./select/Select"; // (종찬) 추가
import Detail from "./detail/Detail.jsx";
import Results from "./Results/Results.jsx";
import Investment from "./investment/Investment.jsx";
import ComparisonStatus from "./compare/ComparisonStatus";

function App() {
  return (
    <ModalProvider>
      <GNB />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/select" element={<SelectPage />} />
        <Route path="/compare" element={<ComparisonStatus />} />
        <Route path="/investment" element={<Investment />} />
        <Route path="/results" element={<Results />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </ModalProvider>
  );
}

export default App;
