import React from 'react';
import { shape, string, bool } from 'prop-types';

import ButtonBuy from './button-buy';

function Hexagon({ match, isMain, prefix }) {
  return (
    <div
      className="hexagon-wrapper"

    >
      <div className={`hexagon hexagon--${prefix}`}>
        <div className="hexagon__info">

          {isMain && (
            <span className="hexagon__info-place">
              {match.place}
            </span>
          )}

          <span className={`hexagon__info-date hexagon__info-date--${prefix}`}>
            {match.date}
          </span>

          {isMain && (
            <React.Fragment>
              <span className="hexagon__info-time">
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
  isMain: bool.isRequired,
  match: shape({
    date: string,
    place: string,
    time: string,
  }).isRequired,
  prefix: string.isRequired,
};

export default Hexagon;
