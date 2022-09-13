import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Ranking from '../pages/Ranking';

test('Se aparece Ranking e Home na tela', () => {
  renderWithRouterAndRedux(<Ranking />);
  const rankingTitle = screen.getByRole('heading', { level:3, name:/Ranking/i});
  const homeButton = screen.getByRole('button', { name:/Home/i})
  expect(rankingTitle).toBeInTheDocument();
  expect(homeButton).toBeInTheDocument();
});

test('Se aparace o Header na tela', () => {
  renderWithRouterAndRedux(<Ranking />);

  const headerImg = screen.getByRole('img', { name: 'Foto de perfil do jogador' });
  const headerPlayerName = screen.getByTestId('header-player-name');
  const headerPlayerScore = screen.getByTestId('header-score');
  expect(headerImg).toBeInTheDocument();
  expect(headerPlayerName).toBeInTheDocument();
  expect(headerPlayerScore).toBeInTheDocument();
});

test('Ao clicar no botão Home a página é redirecionada para "/"', () => {
  const { history } = renderWithRouterAndRedux(<Ranking />);
  const homeButton = screen.getByRole('button', { name:/Home/i })
  userEvent.click(homeButton);
  const loginUrl = '/';
  expect(history.location.pathname).toBe(loginUrl);
});