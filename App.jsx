import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import List from "./pages/List";
import Graph from "./pages/Graph";

function App() {
  return (
    <BrowserRouter basename="/caps33"> // Add basename for GitHub Pages
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/list" element={<List />} />
        <Route path="/graph" element={<Graph />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;