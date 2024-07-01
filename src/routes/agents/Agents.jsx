import React from 'react';
import './agents.scss';

function Agents() {
  return (
    <div className="agents">
      <div className="textContainer">
        <h1>Our Agents</h1>
        <p>Meet our team of professional and experienced real estate agents dedicated to helping you find the perfect home.</p>
        <div className="agentList">
          <div className="agent">
            <img src="/agent1.jpg" alt="Agent 1" />
            <h2>John Doe</h2>
            <p>Senior Agent</p>
          </div>
          <div className="agent">
            <img src="/agent2.jpg" alt="Agent 2" />
            <h2>Jane Smith</h2>
            <p>Agent</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Agents;
