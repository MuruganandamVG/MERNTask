import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import BikeAssembly from "./components/BikeAssembly";
import Adminlogin from "./components/Admin/Adminlogin";
import { useState } from "react";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ProductionDetails from "./components/Admin/ProductionDetails";
function App() {
  const [currentuser, setCurrentuser] = useState();
  console.log(currentuser, "App");
  return (
    // <div>
    //   <Navbar />
    //   <Signup />
    // </div>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/login"
            element={<Login setCurrentuser={setCurrentuser} />}
          />
          <Route path="/admin" element={<Adminlogin />} />
        </Route>
        <Route
          path="/bikeassembly"
          element={currentuser && <BikeAssembly currentuser={currentuser} />}
        />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/productiondetails" element={<ProductionDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
