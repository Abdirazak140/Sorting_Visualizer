import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/home";
import Navbar from "./components/navbar";

function App() {
  return (
    <div>
      <Navbar/>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
