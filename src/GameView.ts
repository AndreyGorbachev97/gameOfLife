import { Cell } from "./types/Cell";

interface IState {
  width: number;
  height: number;
  isRunning: boolean;
}

export interface IGameView {
  updateGameField: (field: Cell[][]) => void;
  updateGameState: (state: IState) => void;
  onCellClick: (cb: (x: number, y: number) => void) => void;
  onGameStateChange: (cb: (newState: boolean) => void) => void;
  onFieldSizeChange: (cb: (width: number, height: number) => void) => void;
  onSpeedChange: (cb: (speed: number) => void) => void;
  onClearField: (cb: () => void) => void;
}

export class GameView implements IGameView {
  private htmlElement: HTMLElement;

  private isRunning = false;

  private gameStateChangeHandler!: (newState: boolean) => void;

  private onFieldSizeChangeHandler!: (width: number, height: number) => void;

  private gameSpeedChangeHandler!: (speed: number | null) => void;

  private gameClearFieldHandler!: () => void;

  private cellContainer: HTMLDivElement = document.createElement("div");

  // private cellClickHandler: (x: number, y: number) => void;
  constructor(el: HTMLElement) {
    const gameFieldView = document.createElement("div");
    const gameControlsView = document.createElement("div");
    const buttonStopped = document.createElement("button");
    const buttonClear = document.createElement("button");

    gameFieldView.className = "gameField";
    gameControlsView.className = "gameControls";

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
      this.gameSpeedChangeHandler(e.target.value);
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
        this.onFieldSizeChangeHandler(
          Number(inputWidth.value),
          Number(inputHeight.value)
        );
      });
    });

    this.cellContainer.classList.add("cell-container");
    gameFieldView.append(this.cellContainer);

    gameControlsView.append(buttonStopped);
    gameControlsView.append(buttonClear);
    gameControlsView.append(inputWidth);
    gameControlsView.append(inputHeight);
    gameControlsView.append(inputRange);

    el.append(gameControlsView);
    el.append(gameFieldView);

    this.htmlElement = el;
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

  public onCellClick(cb: (x: number, y: number) => void) {
    this.htmlElement.addEventListener("click", (ev) => {
      const target = ev.target as HTMLElement;
      if (!(target as HTMLElement).matches(".cell")) {
        return;
      }
      const x = Number(target.getAttribute("data-x"));
      const y = Number(target.getAttribute("data-y"));
      cb(x, y);
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

  public onFieldSizeChange(cb: (width: number, height: number) => void) {
    this.onFieldSizeChangeHandler = cb;
  }
}
