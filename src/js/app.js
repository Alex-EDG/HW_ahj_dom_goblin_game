import Game from './Game';

const game = new Game(4);
game.bindToDOM(document.querySelector('#game-container'));

game.drawGUI();
game.startRandom();
