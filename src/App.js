import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages & components
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import Signup from "./pages/signup/Signup"
import Navbar from "./components/Navbar";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { authIsReady, user } = useAuthContext()
  
  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          
          <Routes>
            {!user && <Route path="/" element={<Login />}></Route>}
            {user && <Route path="/" element={<Home />}></Route>}

            {!user && <Route path="/login" element={<Login />}></Route>}
            {!user && <Route path="/login" element={<Home />}></Route>}

            {!user && <Route path="/signup" element={<Signup />}></Route>}
            {user && <Route path="/" element={<Home />}></Route>}

            {/* In case user wants to type an invalid url */}
            <Route path="/*" element={<Home />}></Route>
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
