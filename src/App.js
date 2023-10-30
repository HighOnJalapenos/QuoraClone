import "./App.css";
import Navbar from "./components/Navbar";
import SmallNavbar from "./components/SmallNavbar";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <SmallNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
