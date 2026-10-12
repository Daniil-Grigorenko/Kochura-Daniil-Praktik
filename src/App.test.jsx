import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';

describe('App component', () => {
  it('renders the main page correctly in default ru language', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByText('Единая платформа для студентов')).toBeInTheDocument();
    expect(screen.getByText('HexletLife')).toBeInTheDocument();
  });
});
