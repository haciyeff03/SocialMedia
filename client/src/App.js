import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Profile from "./Pages/Profile/Profil";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/profile/:userId" element={<Profile/>}/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
