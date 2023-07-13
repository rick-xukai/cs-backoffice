import React from 'react';

import {
  Actions,
  Desctiption,
  Image,
  Title,
  Warapper,
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
  <Warapper>
    <Image src={image} />
    <Title>{title}</Title>
    <Desctiption>{description}</Desctiption>
    <Actions>{actions}</Actions>
  </Warapper>
);
export default ListEmpty;
