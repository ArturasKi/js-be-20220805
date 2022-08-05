import './bootstrap.css';
import './App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Front from './Components/Front/Front';
// import Back from './Components/Back/Back';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Front show="front"/>} />
          <Route path="/list" element={<Front show="list"/>} />
          {/* <Route path="/pateikti" element={<Front show="pateikti"/>} />
          <Route path="/pasiulymai" element={<Front show="pasiulymai"/>} /> */}
          {/* <Route path="/admin" element={<Back show="admin" />} />
          <Route path="/admin/savivaldybes" element={<Back show="savivaldybes" />} />
          <Route path="/admin/sritys" element={<Back show="sritys" />} /> */}
          {/* <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/admin" element={<RequireAuth role="admin"><Back show="clothes"/></RequireAuth>} /> */}
          {/* <Route path="/admin/cats" element={<RequireAuth role="admin"><Back show="cats"/></RequireAuth>} />
          <Route path="/admin/products" element={<RequireAuth role="admin"><Back show="products"/></RequireAuth>} />
          <Route path="/admin/comments" element={<RequireAuth role="admin"><Back show="com"/></RequireAuth>} /> */}c
      </Routes>
    </BrowserRouter>
  );
}

export default App;
