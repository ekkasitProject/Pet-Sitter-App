import "./App.css";
import PetSitterList from "./pages/PetSitterList";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PetSitterList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
