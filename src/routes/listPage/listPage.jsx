import React, { useState } from 'react';
import { listData } from "../../lib/dummydata";
import "./listPage.scss";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";

function ListPage() {
  const data = listData;
  const [showMap, setShowMap] = useState(false);

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          {data.map(item => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className={`mapContainer ${showMap ? 'visible' : ''}`}>
        <Map items={data} />
      </div>
      <button className="toggleMapButton" onClick={() => setShowMap(!showMap)}>
        {showMap ? 'Hide Map' : 'Show Map'}
      </button>
    </div>
  );
}

export default ListPage;
