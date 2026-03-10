import Game from '../Game';

test('Формируется исключение при container равным  null', () => {
  const expected = 'Игровой процесс не привязан к DOM';
  const game = new Game(4);
  const received = () => game.checkBinding();
  expect(received).toThrow(expected);
});
