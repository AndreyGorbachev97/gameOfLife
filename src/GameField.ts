import { Cell } from "./types/Cell";

export interface IGameField {
  getState(): Cell[][];
  toggleCellState(x: number, y: number): void;
  nextGeneration(): boolean;
  setSize(width: number, height: number): void;
}

export class GameField implements IGameField {
  private field: Cell[][];
  private copyField: Cell[][];
  constructor(width: number = 0, height: number = 1) {
    const result: Cell[][] = [];
    for (let i = 0; i < height; i++) {
      result.push([]);
      for (let j = 0; j < width; j++) {
        result[i].push(0);
      }
    }
    this.field = result;
    this.copyField = [[]];
  }

  public getState() {
    return this.field;
  }

  public toggleCellState(x: number, y: number) {
    this.field[y][x] = this.field[y][x] ? 0 : 1;
  }

  // рождение или смерть
  private birthOrDeath(x: number, y: number) {
    const field = this.field;
    // const field = this.field.map((row) => [...row]);

    this.field = field.map((row) => [...row]);

    let counter = 0;
    // проверка соседей
    field[y - 1] && field[y - 1][x - 1] && counter++; // левый верхний угол
    field[y - 1] && field[y - 1][x] && counter++; // вверх
    field[y - 1] && field[y - 1][x + 1] && counter++; // правый верхний угол
    field[y] && field[y][x + 1] && counter++; // справа
    field[y + 1] && field[y + 1][x + 1] && counter++; // правый нижний угол
    field[y + 1] && field[y + 1][x] && counter++; // снизу
    field[y + 1] && field[y + 1][x - 1] && counter++; // левый нижний угол
    field[y] && field[y][x - 1] && counter++; // слева

    const isAlive = field[y][x];
    // если с живой клеткой меньше 2 или больше 3 соседей, клетка умирает
    if (isAlive && (counter > 3 || counter < 2)) {
      this.copyField[y][x] = 0;
      return 0;
    }
    // если с мертвой клеткой 3 соседа, клетка оживает
    if (!isAlive && counter === 3) {
      this.copyField[y][x] = 1;
      return 1;
    }

    return isAlive;
  }

  public nextGeneration() {
    let numberLivingCells = 0;
    // копия поля, для того чтобы изменять состояния клеток одновременно
    this.copyField = this.field.map((row) => [...row]);

    for (let i = 0; i < this.field[0].length; i++) {
      for (let j = 0; j < this.field.length; j++) {
        numberLivingCells += this.birthOrDeath(i, j);
      }
    }
    this.field = this.copyField;

    // возвращаем мертвое поле или живое
    console.log("isRunning", numberLivingCells);
    return !!numberLivingCells;
  }

  public setSize(width: number, height: number) {
    const field = [...this.field];
    const result: Cell[][] = [];

    for (let i = 0; i < height; i++) {
      result.push([]);

      for (let j = 0; j < width; j++) {
        if (field[i] && field[i][j] !== undefined) {
          result[i].push(field[i][j]);
        } else {
          result[i].push(0);
        }
      }
    }

    this.field = result;
  }
}
