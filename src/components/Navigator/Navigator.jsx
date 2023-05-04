import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import SideNav from '../SideNav/SideNav';
import useAuth from '../../hooks/useAuth';
import { NOT_AUTHED_NAV, AUTHED_NAV, ADMIN_NAV } from '../../constants';

import './navigator.css';

function Navigator({ isAdminPage }) {
  const [sideNavActive, setSideNavActive] = useState(false);
  const { auth } = useAuth();

  const renderNavLinks = () => {
    if (auth && isAdminPage) {
      return ADMIN_NAV.map((navItem) => (
        <Link
          key={navItem.text}
          className={`nav-link ${navItem.style ? navItem.style : ''}`}
          to={navItem.path}
        >
          {navItem.text}
        </Link>
      ));
    }

    if (auth) {
      return AUTHED_NAV.map((navItem) => (
        <Link
          key={navItem.text}
          className={`nav-link ${navItem.style ? navItem.style : ''}`}
          to={navItem.path}
        >
          {navItem.text}
        </Link>
      ));
    }

    return NOT_AUTHED_NAV.map((navItem) => (
      <Link
        key={navItem.text}
        className={`nav-link ${navItem.style ? navItem.style : ''}`}
        to={navItem.path}
      >
        {navItem.text}
      </Link>
    ));
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Link className="navbar-brand" to="/">
            <img
              alt=""
              src="/logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            LabMI
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setSideNavActive(true)} />
          <Nav className="ml-auto">{renderNavLinks()}</Nav>
        </Container>
      </Navbar>
      <SideNav active={sideNavActive} setActive={setSideNavActive} isAdminPage={isAdminPage} />
    </>
  );
}

Navigator.defaultProps = {
  isAdminPage: false,
};

Navigator.propTypes = {
  isAdminPage: PropTypes.bool,
};

export default Navigator;
