import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import CamPredict from "./pages/CamPredict";
import ImagePredict from "./pages/ImagePredict";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-indigo-800">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<CamPredict />} />
          <Route path="images" element={<ImagePredict />} />
        </Route>
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
