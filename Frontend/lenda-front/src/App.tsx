import { useState } from 'react'
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Auction from "./components/Auction";



// import "./assets/css/style.css"



function App() {

  return (

      <div>
          {/*<div id="page" className="clearfix">*/}
              {/*<Working />*/}
          <Navbar />
          <Header />
          <Auction />
          {/*</div>*/}
      </div>

  )
}

export default App
