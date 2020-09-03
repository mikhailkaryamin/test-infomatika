import React from 'react';
import { string } from 'prop-types';

export default function SideLabel({ teamName, prefix }) {
  return (
    <div className={`side-label side-label--${prefix}`}>
      {teamName}
    </div>
  );
}

SideLabel.propTypes = {
  prefix: string.isRequired,
  teamName: string.isRequired,
};
