import React, { useContext, useEffect } from "react";
import { CountUp } from "countup.js";
import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const{currentUser}=useContext(AuthContext)
  useEffect(() => {
    const countUpOptions = { duration: 2 };
    const yearsCountUp = new CountUp("yearsCount", 16, countUpOptions);
    const awardsCountUp = new CountUp("awardsCount", 200, countUpOptions);
    const propertiesCountUp = new CountUp("propertiesCount", 2000, countUpOptions);

    if (!yearsCountUp.error) yearsCountUp.start();
    if (!awardsCountUp.error) awardsCountUp.start();
    if (!propertiesCountUp.error) propertiesCountUp.start();
  }, []);

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
              <h1 id="yearsCount">5+</h1>
              <h2>Years of Excellence</h2>
            </div>
            <div className="box">
              <h1 id="awardsCount">50</h1>
              <h2>Prestigious Awards</h2>
            </div>
            <div className="box">
              <h1 id="propertiesCount">2000+/</h1>
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
