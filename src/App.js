import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// pages & components
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import Signup from "./pages/signup/Signup"

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
