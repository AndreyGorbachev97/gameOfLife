import { IGameField } from "./GameField";
import { IGameView } from "./GameView";

export class Game {
  private isRunning = false;

  private stepSizeMs = 1;

  private timer: ReturnType<typeof setInterval>;

  constructor(
    private gameField: IGameField,
    private gameView: IGameView,
    stepSizeMs = 1
  ) {
    this.stepSizeMs = stepSizeMs;
    this.render();

    this.gameView.onCellClick((x, y) => {
      this.gameField.toggleCellState(x, y);
      this.render();
    });

    this.gameView.onClearField(() => {
      this.gameField.clearField();
      this.render();
    });

    this.gameView.onFieldSizeChange((width, height) => {
      this.gameField.setSize(width, height);
      this.render();
    });

    this.gameView.onSpeedChange((speed: number) => {
      this.stepSizeMs = stepSizeMs / speed;

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
        this.isRunning = !!this.gameField.nextGeneration();
        this.timer = setInterval(() => {
          this.isRunning = !!this.gameField.nextGeneration();

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
    this.gameView.updateGameField(state);
    this.gameView.updateGameState({
      isRunning: this.isRunning,
      width: state[0].length,
      height: state.length,
    });
  }
}
