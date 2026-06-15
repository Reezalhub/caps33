import { BrowserRouter, Routes, Route } from "react-router-dom";

import Role from "./pages/Role";
import Login from "./pages/Login";
import Home from "./pages/Home";
import List from "./pages/List";
import Graph from "./pages/Graph";

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        {/* ROLE PAGE */}
        <Route path="/" element={<Role />} />

        {/* LOGIN USER */}
        <Route path="/login" element={<Login />} />

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