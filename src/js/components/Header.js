import React from 'react';
import PropTypes from 'prop-types';

const Header = ({title}) => (
  <div className="card border-light card-header">
    <h2 className='text-center'>{title.toUpperCase()}</h2>
  </div>
);

Header.propTypes = {
  title: PropTypes.string.isRequired
};

export default Header;
