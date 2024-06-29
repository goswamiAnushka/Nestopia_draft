import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";

function HomePage() {
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Your Journey to a New Home Starts Here</h1>
          <p>
            We are a team of dedicated real estate professionals passionate about helping you find your dream home. With years of experience and a deep understanding of the market, we offer personalized service to meet your unique needs. Whether you're looking to rent, buy, or invest, we provide expert guidance and support from start to finish. Our goal is to make the process smooth and enjoyable, ensuring you find a home that perfectly fits your lifestyle and budget. Let us help you turn your homeownership dreams into reality.
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Years of Experience</h2>
            </div>
            <div className="box">
              <h1>200</h1>
              <h2>Award Gained</h2>
            </div>
            <div className="box">
              <h1>2000+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default HomePage;
