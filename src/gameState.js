const gameState = {
  current: "INIT",
  clock: 1,
  wakeTime: -1,
  tick() {
    this.clock++;
    console.log("clock", this.clock);

    return this.clock;
  },
  startGame() {
    console.log("hatching");
    this.current = "HATCHING";
    this.wakeTime = this.clock + 3;
  },
  wake() {
    console.log("awoken");
    this.current = "IDLING";
    this.wakeTime = -1;
  },
  handleUserAction(icon) {
    if (
      ["SLEEP", "FEEDING", "CELEBRATING", "HATCHING"].includes(this.current)
    ) {
      return;
    }

    if (this.current == "INIT" || this.current == "DEAD") {
      this.startGame();
      return;
    }

    switch (icon) {
      case "weather":
        this.changeWeather();
        break;
      case "poop":
        this.cleanUpPoop();
        break;
      case "Feed":
        this.feed();
        break;
    }
  },
  changeWeather() {
    console.log("Change weather");
  },
  cleanUpPoop() {
    console.log("Poop");
  },
  feed() {
    console.log("Feed");
  },
};

window.gameState = gameState;
export const handleUserAction = gameState.handleUserAction.bind(gameState);
export default gameState;
