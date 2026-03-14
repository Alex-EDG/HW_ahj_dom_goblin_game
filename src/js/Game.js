/**
 * Класс генерирует HTML-разметку игрового поля по переданным данным ( boardSize ),
 * с фиксированным количеством элементов по стороне поля.
 * @param {boardSize} boardSize
 */
export default class Game {
  constructor(boardSize = 4) {
    this.boardSize = boardSize;
    this.container = null;
    this.boardElement = null;
    this.cells = [];
  }

  /**
   * Метод получает HTMLElement из DOM и записывает его в свойство this.container
   * @param {HTMLelement} container
   */
  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('Контейнер не является элементом "HTMLElement"');
    }
    this.container = container;
  }

  /**
   * Метод генерирует HTML-разметку с учётом переданных в конструктор класса данным и
   * втавляет её в DOM
   */
  drawGUI() {
    this.checkBinding();

    this.container.innerHTML = `
      <div class="board-container">
        <div data-id="board" class="board"></div>
      </div>
    `;

    this.boardElement = this.container.querySelector('[data-id=board]');
    this.boardElement.setAttribute('style', `grid-template-columns: repeat(${this.boardSize}, 1fr)`);

    for (let i = 0; i < this.boardSize ** 2; i += 1) {
      const cellEl = document.createElement('div');
      cellEl.classList.add('cell', 'map-tile');
      this.boardElement.append(cellEl);
    }

    this.cells = Array.from(this.boardElement.children);
  }

  /**
   * Метод рандомно генерирует расположение goblin на игровом поле через переданный в него интервал
   *@param {interval} interval
   */
  startGame(interval) {
    function getRandomInt(min, max) {
      const min0 = Math.ceil(min);
      const max0 = Math.floor(max);
      return Math.floor(Math.random() * (max0 - min0) + min0);
    }

    const image = document.createElement('img');
    image.src = './img/goblin.png';
    let randomIndex;
    this.timerId = setInterval(() => {
      const randomNumber = getRandomInt(0, this.cells.length - 1);
      if (randomNumber === randomIndex) {
        if (randomNumber === this.cells.length - 1) {
          randomIndex -= 1;
        } else {
          randomIndex += 1;
        }
      } else {
        randomIndex = randomNumber;
      }
      this.cells[randomIndex].append(image);
    }, interval);
  }

  /**
   *  Метод прекращает генерирацию расположения goblin на игровом поле
   */
  stopGame() {
    clearInterval(this.timerId);
  }

  /**
   * Метод проверяет связь контейнера с DOM
   */
  checkBinding() {
    if (this.container === null) {
      throw new Error('Игровой процесс не привязан к DOM');
    }
  }
}
