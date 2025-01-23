import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import UserDetails from "./components/UserDetails";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<UserDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
