import React from 'react';

import {
  Actions,
  Desctiption,
  Image,
  Title,
  Warapper,
  Container,
} from './ListEmpty.components';

const ListEmpty = ({
  image,
  title,
  description,
  actions,
}: {
  image: string;
  title: string;
  description: string;
  actions: React.ReactNode;
}) => (
  <Container>
    <Warapper>
      <Image src={image} />
      <Title>{title}</Title>
      <Desctiption>{description}</Desctiption>
      <Actions>{actions}</Actions>
    </Warapper>
  </Container>
);
export default ListEmpty;
