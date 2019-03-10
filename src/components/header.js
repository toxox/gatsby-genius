import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { FaGithub } from 'react-icons/fa';

const HeaderContainer = styled.header``;

const LogoContainer = styled.div`
  background: #ffff64;
  margin: 0 auto;
  padding: 0.25rem 0;
  text-align: center;
  a {
    font-size: 1.15rem;
    text-transform: uppercase;
    letter-spacing: 8px;
    color: #ffff64;
    text-shadow: -2px 2px 1px #000, -3px 2px 1px #000;
  }
`;

const Menu = styled.div`
  background: #000;
  display: flex;
  justify-content: space-around;
  padding: 0.3rem 1rem;
`;

const MenuLink = styled.div`
  * {
    color: #ffffff;
    text-transform: uppercase;
    &:hover {
      color: #ffff64;
    }
  }
`;

const Header = ({ siteTitle }) => (
  <HeaderContainer>
    <LogoContainer>
      <Link to="/">{siteTitle}</Link>
    </LogoContainer>
    <Menu>
      <MenuLink>
        <Link to="/">Home</Link>
      </MenuLink>
      <MenuLink>
        <Link to="/">
          <FaGithub size="1.15rem" />
        </Link>
      </MenuLink>
    </Menu>
  </HeaderContainer>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
