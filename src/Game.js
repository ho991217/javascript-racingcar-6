import { Console } from '@woowacourse/mission-utils';
import Car from './Car.js';
import Input from './utils/Input.js';

class Game {
  #cars;

  #trialCount;

  #winningPosition;

  #winners;

  #input;

  constructor() {
    this.#cars = [];
    this.#trialCount = 0;
    this.#winningPosition = 0;
    this.#winners = [];
    this.#input = new Input();
  }

  async #init() {
    const names = await this.#input.getCarNames();
    this.#cars = names.map((name) => new Car(name));

    this.#trialCount = await this.#input.getTrialCount();
  }

  async run() {
    await this.#init();
  }

  #executeRound() {
    this.#cars.forEach((car) => {
      car.move();
      car.print();
      if (this.#winningPosition < car.getPosition()) this.#winningPosition = car.getPosition();
    });
    this.#winners = this.#cars.filter((car) => car.position === this.#winningPosition);

    Console.print('\n');
  }
}

export default Game;
