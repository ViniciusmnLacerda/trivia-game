import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Game from '../pages/Game';

test('Se aparace o Header na tela', () => {
  renderWithRouterAndRedux(<Game />);
  const headerImg = screen.getByRole('img', { name: 'Foto de perfil do jogador' });
  const headerPlayerName = screen.getByTestId('header-player-name');
  const headerPlayerScore = screen.getByTestId('header-score');
  expect(headerImg).toBeInTheDocument();
  expect(headerPlayerName).toBeInTheDocument();
  expect(headerPlayerScore).toBeInTheDocument();
});

/* test('Se aparace o Timer na tela', () => {
  renderWithRouterAndRedux(<Game />);
const timer = screen.getByTestId('game-timer');
expect(timer).toBeInTheDocument();
}); */

test('Se aparece as perguntas na tela', () => {
  renderWithRouterAndRedux(<Game />);
  const questionCategory = screen.getByTestId('question-category');
  const questionText = screen.getByTestId('question-text');
  expect(questionCategory).toBeInTheDocument();
  expect(questionText).toBeInTheDocument();
});