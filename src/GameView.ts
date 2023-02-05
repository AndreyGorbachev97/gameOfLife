import { Cell } from "./types/Cell";
import { ICoord } from "./types/ICoord";
import { IFieldSize } from "./types/IFieldSize";

interface IState {
  width: number;
  height: number;
  isRunning: boolean;
}

export interface IGameView {
  updateGameField: (field: Cell[][]) => void;
  updateCountGeneration: (count: string) => void;
  updateGameState: (state: IState) => void;
  onCellClick: (cb: (coord: ICoord) => void) => void;
  onGameStateChange: (cb: (newState: boolean) => void) => void;
  onFieldSizeChange: (cb: (fieldSize: IFieldSize) => void) => void;
  onSpeedChange: (cb: (speed: number) => void) => void;
  onClearField: (cb: () => void) => void;
}

export class GameView implements IGameView {
  private htmlElement: HTMLElement;

  private isRunning = false;

  private gameStateChangeHandler: (newState: boolean) => void;

  private onFieldSizeChangeHandler: (fieldSize: IFieldSize) => void;

  private gameSpeedChangeHandler: (speed: number) => void;

  private gameClearFieldHandler: () => void;

  private cellContainer: HTMLDivElement = document.createElement("div");

  private gameControlsView: HTMLDivElement = document.createElement("div");

  // private cellClickHandler: (x: number, y: number) => void;
  constructor(el: HTMLElement) {
    const gameFieldView = document.createElement("div");
    this.gameControlsView = document.createElement("div");
    const buttonStopped = document.createElement("button");
    const buttonClear = document.createElement("button");

    const countGeneration = document.createElement("div");
    countGeneration.className = "generation";
    countGeneration.innerHTML = "0";

    gameFieldView.className = "gameField";
    this.gameControlsView.className = "gameControls";

    buttonStopped.classList.add("btn");
    buttonStopped.classList.add("run-button");
    buttonStopped.classList.add("run-button--stopped");
    buttonStopped.innerHTML = "Play";

    buttonClear.classList.add("btn");
    buttonClear.classList.add("clear-button");
    buttonClear.innerHTML = "Clear";

    buttonStopped.addEventListener("click", () => {
      if (!this.gameStateChangeHandler) {
        return;
      }
      this.gameStateChangeHandler(!this.isRunning);
    });

    buttonClear.addEventListener("click", () => {
      if (!this.gameClearFieldHandler) {
        return;
      }
      this.gameClearFieldHandler();
    });

    const inputRange = document.createElement("input");
    // todo не знаю как типизировать event
    inputRange.addEventListener("change", (e: any) => {
      this.gameSpeedChangeHandler(+(e.target as HTMLInputElement).value);
    });

    const inputWidth = document.createElement("input");
    const inputHeight = document.createElement("input");
    inputRange.setAttribute("placeholder", "Speed");
    inputRange.setAttribute("type", "number");
    inputWidth.setAttribute("placeholder", "Width");
    inputWidth.setAttribute("type", "number");
    inputHeight.setAttribute("placeholder", "Height");
    inputHeight.setAttribute("type", "number");

    inputRange.className = "speed";
    inputWidth.classList.add("field-size");
    inputWidth.classList.add("field-size--width");
    inputHeight.classList.add("field-size");
    inputHeight.classList.add("field-size--height");

    [inputWidth, inputHeight].forEach((input) => {
      input.addEventListener("change", () => {
        if (!this.onFieldSizeChangeHandler) {
          return;
        }
        this.onFieldSizeChangeHandler({
          width: Number(inputWidth.value),
          height: Number(inputHeight.value),
        });
      });
    });

    this.cellContainer.classList.add("cell-container");
    gameFieldView.append(this.cellContainer);

    this.gameControlsView.append(buttonStopped);
    this.gameControlsView.append(buttonClear);
    this.gameControlsView.append(inputWidth);
    this.gameControlsView.append(inputHeight);
    this.gameControlsView.append(inputRange);
    this.gameControlsView.append(countGeneration);

    el.append(this.gameControlsView);
    el.append(gameFieldView);

    this.htmlElement = el;
  }

  updateCountGeneration(count: string) {
    const countGeneration = this.gameControlsView.querySelector(".generation");
    countGeneration.innerHTML = count;
  }

  updateGameField(field: Cell[][]) {
    this.cellContainer.innerHTML = "";
    for (let i = 0; i < field.length; i++) {
      const row = document.createElement("div");
      row.className = "cell-row";
      for (let j = 0; j < field[0].length; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        if (field[i][j]) {
          cell.classList.add("cell--alive");
        } else {
          cell.classList.add("cell");
          cell.classList.add("cell--dead");
        }
        cell.setAttribute("data-x", `${j}`);
        cell.setAttribute("data-y", `${i}`);

        row.append(cell);
      }
      this.cellContainer.append(row);
    }
  }

  public updateGameState(state: IState) {
    const { isRunning, width, height } = state;
    this.isRunning = isRunning;

    const btn: HTMLInputElement = this.htmlElement.querySelector(".run-button");

    const inputWidth = this.htmlElement.querySelector(
      ".field-size.field-size--width"
    ) as HTMLInputElement;
    const inputHeight = this.htmlElement.querySelector(
      "input[type='number'].field-size.field-size--height"
    ) as HTMLInputElement;

    inputWidth.value = width.toString();
    inputHeight.value = height.toString();

    if (isRunning) {
      btn.className = "";
      btn.classList.add("btn");
      btn.classList.add("run-button");
      btn.classList.add("run-button--runned");
      btn.innerHTML = "Stop";
    } else {
      btn.className = "";
      btn.classList.add("btn");
      btn.classList.add("run-button");
      btn.classList.add("run-button--stopped");
      btn.innerHTML = "Play";
    }
  }

  public onCellClick(cb: (coord: ICoord) => void) {
    this.htmlElement.addEventListener("click", (ev) => {
      const target = ev.target as HTMLElement;
      if (!(target as HTMLElement).matches(".cell")) {
        return;
      }
      const x = Number(target.getAttribute("data-x"));
      const y = Number(target.getAttribute("data-y"));
      cb({ row: x, column: y });
    });
  }

  public onSpeedChange(cb: (speed: number) => void) {
    this.gameSpeedChangeHandler = cb;
  }

  public onGameStateChange(cb: (newState: boolean) => void) {
    this.gameStateChangeHandler = cb;
  }

  public onClearField(cb: () => void) {
    this.gameClearFieldHandler = cb;
  }

  public onFieldSizeChange(cb: (fieldSize: IFieldSize) => void) {
    this.onFieldSizeChangeHandler = cb;
  }
}
