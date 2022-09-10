import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testes da tela de feedback', () => {
    test('Checa se são renderizado os componentes corretamente', () => {
        renderWithRouterAndRedux(<App />, { initialEntries: ['/feedback'] });
        const feedbackText = screen.getByTestId('feedback-text');
        const feedbackScore = screen.getByTestId('feedback-total-score');
        const totalCorrectAnswer = screen.getByTestId('feedback-total-question');
        const buttonRanking = screen.getByTestId('btn-ranking');
        const buttonPlayAgain = screen.getByTestId('btn-play-again');

        expect(feedbackText).toBeInTheDocument();
        expect(feedbackScore).toBeInTheDocument();
        expect(totalCorrectAnswer).toBeInTheDocument();
        expect(buttonRanking).toBeInTheDocument();
        expect(buttonPlayAgain).toBeInTheDocument();
        
    });
    test('Checa se ao clicar no botão ranking é redirecionado para /ranking', () => {
        const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/feedback'] });
        const buttonRanking = screen.getByTestId('btn-ranking');
        userEvent.click(buttonRanking);    
        const { pathname } = history.location;
        expect(pathname).toBe('/ranking');
    });

    test('Checa se é exibido "Well Done!" caso assertion seja maior que 3', () => {
        const initialState = {
            player: {
              name: '',
              assertions: 0,
              score: 5,
              gravatarEmail: '',
              endOfTime: false,
              wasAnswered: false
            }
          }
        renderWithRouterAndRedux(<App />, { initialState, initialEntries: ['/feedback'] });
        const feedbackText = screen.getByTestId('feedback-text');
        expect(feedbackText.innerHTML).toBe('Well Done!');
    });
});