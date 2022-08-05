import './bootstrap.css';
import './App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Front from './Components/Front/Front';
import Back from './Components/Back/Back';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Front show="front"/>} />
          <Route path="/list" element={<Front show="list"/>} />
          <Route path="/admin" element={<Back show="admin"/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
