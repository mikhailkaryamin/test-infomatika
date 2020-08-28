import React from 'react';
import ButtonBuy from './button-buy';

function Hexagon({match}) {
  return (
    <div className="hexagon-wrapper">
      <div className="hexagon">
        <div className="hexagon__info">
          <span className="hexagon__info-place">
            {match.place}
          </span>
          <span className="hexagon__info-date">
            {match.date}
          </span>
          <span className="hexagon__info-time">
            {match.time}
          </span>
          <ButtonBuy />
        </div>
        <div className="hexagon__face1" />
        <div className="hexagon__face2" />
      </div>
    </div>

  );
}

export default Hexagon;
