import "./navbar.scss"
function Navbar() {
    return (
        <nav>
          <div className="left">left</div>
          <a href="/">
          <img src="/logo.png" alt="" />
          <span>Nestopia</span>
          </a>
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Agents</a>
          <div className="right">Right</div>
        
        </nav>
    )
}

export default Navbar;