import { lazy } from 'react'
import "./App.css";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";

const Home = lazy(()=>import("./components/Home/Home"));
const IndividualCard = lazy(()=>import("./components/IndiCard/IndividualCard"))

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Individual" element={<IndividualCard />}></Route>
      </Routes>
    </Router>
  )
}

export default App
