import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import UserDetails from "./components/UserDetails";
import UpdateProfile from "./components/UpdateProfile";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<UserDetails />} />
          <Route path="/update" element={<UpdateProfile/>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/reset/:token" element={<ResetPassword/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
