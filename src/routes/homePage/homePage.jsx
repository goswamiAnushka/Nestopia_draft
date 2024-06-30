import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";

function HomePage() {
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Discover Your Perfect Home</h1>
          <p>
            Explore a wide range of rental properties that suit your lifestyle and budget. With our extensive experience and award-winning service, finding your dream place has never been easier. Let us help you make your next move stress-free and enjoyable.
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Years of Excellence</h2>
            </div>
            <div className="box">
              <h1>200</h1>
              <h2>Prestigious Awards</h2>
            </div>
            <div className="box">
              <h1>2000+</h1>
              <h2>Properties Available</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="Background Image" className="bg" />
      </div>
    </div>
  );
}

export default HomePage;
