import './bootstrap.css';
import './App.scss';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { login, logout, authConfig } from './Functions/auth';
import Front from './Components/Front/Front';
import Back from './Components/Back/Back';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Front show="front"/>} />
          <Route path="/list" element={<Front show="list"/>} />
          <Route path="/admin" element={<RequireAuth role="admin"><Back show="admin"/></RequireAuth>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

function RequireAuth({ children, role }) {
  const [view, setView] = useState(<h2>Please wait...</h2>);

  useEffect(() => {
    axios.get('http://localhost:3003/login-check?role=' + role, authConfig())
      .then(res => {
        if ('ok' === res.data.msg) {
          setView(children);
        } else {
          setView(<Navigate to="/login" replace />);
        }
      })
  }, [children, role]);
  return view;
}

function LoginPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const doLogin = () => {
    axios.post('http://localhost:3003/login', { user, pass })
      .then(res => {
        console.log(res.data);
        if ('ok' === res.data.msg) {
          login(res.data.key);
          navigate('/', { replace: true });
        }
      })
  }
  return (
    <div className='container col-2'>
      <div className='row'>
        <div className='card login'>
          <div className='card-body'>
            <div className='form-group'>name: <input type="text" value={user} onChange={e => setUser(e.target.value)}></input></div>
            <div className='form-group'>password: <input type="password" value={pass} onChange={e => setPass(e.target.value)}></input></div>
            <button onClick={doLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LogoutPage() {
  useEffect(() => logout(), []);
  return (
    <Navigate to="/login" replace />
  )
}


export default App;