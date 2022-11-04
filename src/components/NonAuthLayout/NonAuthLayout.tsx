import React, { Fragment } from 'react';

const NonAuthLayout = ({ children }: { children: React.ReactChildren }) => (
  <Fragment>{children}</Fragment>
);

export default NonAuthLayout;
