import React from 'react';
import { waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

test('Se os inputs existem e se "Play" redireciona para "/game" ', async () => {
  const { history } = renderWithRouterAndRedux(<App />);

  const LabelName = screen.getByLabelText('Name');
  const LabelEmail = screen.getByLabelText('Email');
  expect(LabelName).toBeInTheDocument();
  expect(LabelEmail).toBeInTheDocument();

  const inputName = screen.getByTestId('input-player-name');
  const inputEmail = screen.getByTestId('input-gravatar-email');
  const userName = 'PedrassiTheGreatest69';
  const userEmail = 'amoqueijo123@xablau.com';

  userEvent.type(inputName, userName)
  userEvent.type(inputEmail, userEmail)
  expect(inputName.value).toBe(userName);
  expect(inputEmail.value).toBe(userEmail);
  
  const playButton = screen.getByRole('button', { name: /Play/i });
  const gameUrl = '/game';
  userEvent.click(playButton);
  await waitFor(() => expect(history.location.pathname).toBe(gameUrl));
});

test('Se ao clicar em Configurações a pagina é mudada', () => {
  const { history } = renderWithRouterAndRedux(<App />);
  const configButton = screen.getByRole('button', { name: /Configurações/i });
  userEvent.click(configButton);
  const configUrl = '/configuracoes';
  expect(history.location.pathname).toBe(configUrl);
});