import { BrowserRouter, Routes, Route } from "react-router-dom";

import Role from "./pages/Role";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import Home from "./pages/Home";
import List from "./pages/List";
import Graph from "./pages/Graph";
import AuthListener from "./AuthListener";

function App() {
  return (
    <BrowserRouter basename="/caps33">
      <AuthListener />
      <Routes>
        {/* ROLE PAGE */}
        <Route path="/" element={<Role />} />

        {/* LOGIN USER */}
        <Route path="/login" element={<Login />} />

        {/* REGISTER USER */}
        <Route path="/register" element={<Register />} />

        {/* LOGIN ADMIN */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* HOME */}
        <Route path="/home" element={<Home />} />

        {/* LIST */}
        <Route path="/list" element={<List />} />

        {/* GRAPH */}
        <Route path="/graph" element={<Graph />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;