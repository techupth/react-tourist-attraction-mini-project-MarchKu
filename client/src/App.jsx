import "./App.css";
import Main from "./assets/Components/MainPage";
import ViewMoreInfo from "./assets/Components/ViewMoreInfo";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
  <BrowserRouter>
    <Routes>
    <Route path="/" element={<Main />} />
    <Route path="/view/:keyword" element={<ViewMoreInfo/>} />
    </Routes>
  </BrowserRouter>  

  )
}

export default App;
