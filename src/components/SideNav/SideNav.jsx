import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import useAuth from '../../hooks/useAuth';
import { NOT_AUTHED_NAV, AUTHED_NAV, ADMIN_NAV } from '../../constants';

import './sidenav.css';

function SideNav({ active, setActive, isAdminPage }) {
  const { auth } = useAuth();

  const renderNavLinks = () => {
    if (auth && isAdminPage) {
      return ADMIN_NAV.map((navItem) => (
        <li className="side-nav-list__item" key={navItem.text}>
          <Link className={`nav-link ${navItem.style ? navItem.style : ''}`} to={navItem.path}>
            {navItem.text}
          </Link>
        </li>
      ));
    }

    if (auth) {
      return AUTHED_NAV.map((navItem) => (
        <li className="side-nav-list__item" key={navItem.text}>
          <Link className={`nav-link ${navItem.style ? navItem.style : ''}`} to={navItem.path}>
            {navItem.text}
          </Link>
        </li>
      ));
    }

    return NOT_AUTHED_NAV.map((navItem) => (
      <li className="side-nav-list__item" key={navItem.text}>
        <Link className={`nav-link ${navItem.style ? navItem.style : ''}`} to={navItem.path}>
          {navItem.text}
        </Link>
      </li>
    ));
  };

  return (
    <>
      <div className={`side-nav ${active ? 'active' : ''}`}>
        <ul className="side-nav__list">{renderNavLinks()}</ul>
      </div>

      <div className={`side-nav-close-container ${active ? 'active' : ''}`}>
        <div
          type="button"
          className="side-nav-close-container_close-button"
          onClick={setActive ? () => setActive(false) : () => {}}
          aria-hidden="true"
        >
          <FontAwesomeIcon icon={faXmark} />
        </div>
      </div>
    </>
  );
}

SideNav.defaultProps = {
  active: false,
  isAdminPage: false,
  setActive: null,
};

SideNav.propTypes = {
  active: PropTypes.bool,
  isAdminPage: PropTypes.bool,
  setActive: PropTypes.func,
};

export default SideNav;
