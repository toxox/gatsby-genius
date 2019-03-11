import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import Image from '../Image';

const Container = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  color: #000;
`;

const Card = ({ imageSrc, title, subtitle, url = '/' }) => (
  <Link to={url}>
    <Container>
      <Image src={imageSrc} />
      <h4>{title}</h4>
      {subtitle && <h4>{subtitle}</h4>}
    </Container>
  </Link>
);

export default Card;
