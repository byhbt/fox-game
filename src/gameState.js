import { modFox, modSence } from "./ui";
import { RAIN_CHANCE, SCENES, DAY_LENGTH, NIGHT_LENGTH } from "./constants";

const gameState = {
  current: "INIT",
  clock: 1,
  wakeTime: -1,
  sleepTime: -1,
  tick() {
    this.clock++;
    console.log("clock", this.clock);

    if (this.clock === this.wakeTime) {
      this.wake();
    } else if (this.clock === this.sleepTime) {
      this.sleep();
    }

    return this.clock;
  },
  startGame() {
    this.current = "HATCHING";
    this.wakeTime = this.clock + 3;

    modFox("egg");
    modSence("day");
  },
  wake() {
    this.current = "IDLING";
    this.wakeTime = -1;

    modFox("idling");
    this.scence = Math.random() > RAIN_CHANCE ? 0 : 1;
    modSence(SCENES[this.scene]);
    this.sleepTime = this.clock + DAY_LENGTH;
  },
  sleep() {
    this.state = "SLEEP";
    modFox("sleep");
    modSence("night");
    this.wakeTime = this.clock + NIGHT_LENGTH;
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
