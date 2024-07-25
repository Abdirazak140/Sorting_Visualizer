import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/home";
import Navbar from "./components/navbar";
import MergeSort from "./pages/sorts/merge_sort";
import QuickSort from "./pages/sorts/quick_sort";

function App() {
  return (
    <div>
      <Navbar/>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/merge-sort" element={<MergeSort/>}/>
            <Route path="/quick-sort" element={<QuickSort/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
