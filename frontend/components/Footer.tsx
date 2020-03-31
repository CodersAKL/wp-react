import React from 'react';

const hrStyle = {
  marginTop: 75,
};
const Footer = () => (
  <div>
    <hr style={hrStyle} />
    <p>
      <span role="img" aria-label="fork">
        🍴
      </span>
    </p>
    <p>
      <span role="img" aria-label="wave">
        Copyright notice
      </span>
    </p>
  </div>
);

export default Footer;
