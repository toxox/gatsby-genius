import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import Image from '../Image';
import { ImagePropType } from '../../utils/customPropTypes';

const Container = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  color: #000;
`;

const Card = ({ imageSrc, title, subtitle, url = '/' }) => (
  <Link to={`/${url}`}>
    <Container>
      <Image src={imageSrc} />
      <h4>{title}</h4>
      {subtitle && <h4>{subtitle}</h4>}
    </Container>
  </Link>
);

Card.propTypes = {
  imageSrc: ImagePropType,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  url: PropTypes.string.isRequired,
};

Card.defaultProps = {
  imageSrc: null,
  subtitle: null,
};

export default Card;
