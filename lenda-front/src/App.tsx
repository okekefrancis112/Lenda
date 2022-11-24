import { useState } from 'react'
import Navbar from "./components/Navbar";
import Header from "./components/Header";

// import "./assets/css/style.css"



function App() {

  return (

      <div id="wrapper">
          <div id="page" className="clearfix">
            <Navbar />
            <Header />
          </div>
      </div>

  )
}

export default App
