import { IGameField } from "./GameField";
import { IGameView } from "./GameView";
import { ICoord } from "./types/ICoord";
import { IFieldSize } from "./types/IFieldSize";

export class Game {
  private isRunning = false;

  private stepSizeMs = 1;

  private countGeneration = 0;

  private timer: ReturnType<typeof setInterval>;

  constructor(
    private gameField: IGameField,
    private gameView: IGameView,
    stepSizeMs = 1
  ) {
    this.stepSizeMs = stepSizeMs;
    this.render();

    this.gameView.onCellClick(({ row, column }: ICoord) => {
      this.gameField.toggleCellState(row, column);
      this.render();
    });

    this.gameView.onClearField(() => {
      this.countGeneration = 0;
      this.gameField.clearField();
      this.render();
    });

    this.gameView.onFieldSizeChange((fieldSize: IFieldSize) => {
      this.gameField.setSize(fieldSize.width, fieldSize.height);
      this.render();
    });

    this.gameView.onSpeedChange((speed = 1) => {
      this.stepSizeMs = stepSizeMs / (+speed || 1);

      if (this.isRunning) {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
          this.gameField.nextGeneration();
          this.render();
        }, this.stepSizeMs);
      }
    });

    this.gameView.onGameStateChange((newState: boolean) => {
      this.isRunning = newState;

      if (!newState) {
        clearInterval(this.timer);
      } else {
        this.isRunning = this.gameField.nextGeneration();
        this.timer = setInterval(() => {
          this.isRunning = this.gameField.nextGeneration();

          if (!this.isRunning) {
            clearInterval(this.timer);
          }
          this.render();
        }, this.stepSizeMs);
      }

      this.render();
    });
  }

  render() {
    const state = this.gameField.getState();

    if (this.isRunning) {
      this.countGeneration++;
      this.gameView.updateCountGeneration(`renders: ${this.countGeneration}`);
    }

    this.gameView.updateGameField(state);
    this.gameView.updateGameState({
      isRunning: this.isRunning,
      width: state[0].length,
      height: state.length,
    });
  }
}
