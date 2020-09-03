import React from 'react';
import { string } from 'prop-types';

export default function SideLabel({ teamName }) {
  return (
    <div className="side-label">
      {teamName}
    </div>
  );
}

SideLabel.propTypes = {
  teamName: string.isRequired,
};
