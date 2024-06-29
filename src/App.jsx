import Navbar from "./components/navbar/Navbar"
import "./layout.scss"
function App() {
  return (
    <div className="layout" >
      <div className="navbar">
      <Navbar/>
      </div>
      <div className="content">
      <homePage/>
    </div>
    </div>
  )
}

export default App;