import React from 'react';

function Hexagon({match}) {
  return (
    <div className="hexagon">

      <div className="information">
        {match.date}
        {match.time}
        {match.place}
        {match.rivalFirst}
        {match.rivalSecond}
      </div>
      <div className="face1" />
      <div className="face2" />
    </div>
  );
}

export default Hexagon;
