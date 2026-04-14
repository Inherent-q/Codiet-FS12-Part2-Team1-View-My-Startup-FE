import { Routes, Route } from "react-router-dom";
import Header from './components/Header/Header';
import Home from './home/Home';
import Select from './select/Select';
import ComparisonStatus from './compare/ComparisonStatus';
import Investment from './investment/Investment';
import Results from './results/Results';
import Detail from './detail/Detail';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/select" element={<Select />} />
          <Route path="/compare" element={<ComparisonStatus />} />
          <Route path="/investment" element={<Investment />} />
          <Route path="/results" element={<Results />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
