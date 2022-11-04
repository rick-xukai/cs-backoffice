import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

test('renders Welcome to CrowdServe!', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  expect(getByText(/Welcome to CrowdServe!/i)).toBeInTheDocument();
});
