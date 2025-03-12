import React from 'react'
import { lazy } from 'react'
import "./App.css";
import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom";

const Home = lazy(()=>import("./components/Home/Home"));
const IndiCard = lazy(()=>import("./components/IndiCard/IndiCard"))

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Individual" element={<IndiCard />}></Route>
      </Routes>
    </Router>
  )
}

export default App
