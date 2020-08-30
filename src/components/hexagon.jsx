import React from 'react';
import { shape, string } from 'prop-types';
import ButtonBuy from './button-buy';

function Hexagon({ match }) {
  const isMain = match.date === '11 сентября';

  return (
    <div className="hexagon-wrapper">
      <div className={`hexagon hexagon--${match.size}`}>
        <div className="hexagon__info">

          {isMain && (
            <span className="hexagon__info-place hexagon__info-place--main">
              {match.place}
            </span>
          )}

          <span className={`hexagon__info-date hexagon__info-date--${match.size}`}>
            {match.date}
          </span>

          {isMain && (
            <React.Fragment>
              <span className="hexagon__info-time hexagon__info-time--main">
                {match.time}
              </span>
              <ButtonBuy />
            </React.Fragment>
          )}
        </div>
      </div>
    </div>

  );
}

Hexagon.propTypes = {
  match: shape({
    date: string,
    place: string,
    time: string,
  }).isRequired,
};

export default Hexagon;
