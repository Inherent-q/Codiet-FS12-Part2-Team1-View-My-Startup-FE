import { Routes, Route } from "react-router-dom";
import GNB from "./components/GNB";
import Home from './home/Home';
import Select from './select/Select';
import ComparisonStatus from './compare/ComparisonStatus';
import Investment from './investment/Investment';
import Results from './results/Results';
import Detail from './detail/Detail';

function App() {
  return (
    <>
      <GNB />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/select" element={<Select />} />
        <Route path="/compare" element={<ComparisonStatus />} />
        <Route path="/investment" element={<Investment />} />
        <Route path="/results" element={<Results />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </>
  );
}

export default App;
