import Navbar from "./components/navbar/Navbar"
import "./layout.scss"
import HomePage from './routes/homePage/homePage' // Adjust the path based on your project structure




function App() {
  return (
    <div className="layout" >
      <div className="navbar">
      <Navbar/>
      </div>
      <div className="content">
      <HomePage/>
    </div>
    </div>
  )
}

export default App;