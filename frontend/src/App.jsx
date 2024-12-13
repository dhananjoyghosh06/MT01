import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";


function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/courses' element={<Home/>}></Route>
        <Route path='/explore' element={<Home/>}></Route>
        <Route path='/contact' element={<Home/>}></Route>
        <Route path='/articles' element={<Home/>}></Route>
        <Route path='/tutorials' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/forgotpassword' element={<ForgotPassword/>}></Route>
        <Route path="/otpverification" element={<Otpverication/>}/>
        <Route path='/profile' element={<Profile/>} />
        
      </Routes>
    </Router>
  );
}

export default App;
