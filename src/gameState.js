import { modFox, modSence, togglePoopBag } from "./ui";
import {
  RAIN_CHANCE,
  SCENES,
  DAY_LENGTH,
  NIGHT_LENGTH,
  getNextDieTime,
  getNextHungryTime,
  getNextPoopTime,
} from "./constants";

const gameState = {
  current: "INIT",
  clock: 1,
  wakeTime: -1,
  sleepTime: -1,
  hungryTime: -1,
  poopTime: -1,
  dieTime: -1,
  timeToStartCelebrating: -1,
  timeToEndCelebrating: -1,
  tick() {
    this.clock++;
    console.log("clock Count: ", this.clock);

    if (this.clock === this.wakeTime) {
      this.wake();
    } else if (this.clock === this.sleepTime) {
      this.sleep();
    } else if (this.clock === this.hungryTime) {
      this.getHungry();
    } else if (this.clock === this.timeToStartCelebrating) {
      this.startCelebrating();
    } else if (this.clock === this.timeToEndCelebrating) {
      this.endCelebrating();
    } else if (this.clock === this.dieTime) {
      this.die();
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

    // modFox("idling");
    this.scence = Math.random() > RAIN_CHANCE ? 0 : 1;
    modSence(SCENES[this.scene]);
    this.sleepTime = this.clock + DAY_LENGTH;
    this.hungryTime = getNextHungryTime(this.clock);
    this.determineFoxState();
  },
  sleep() {
    this.state = "SLEEP";
    modFox("sleep");
    modSence("night");
    this.wakeTime = this.clock + NIGHT_LENGTH;
  },
  getHungry() {
    console.log("hungry");
    this.current = "HUNGRY";
    this.dieTime = getNextDieTime(this.clock);
    this.hungryTime = -1;
    modFox("hungry");
  },
  die() {
    console.log("die");
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
      case "fish":
        this.feed();
        break;
    }
  },
  changeWeather() {
    console.log("Change weather");
  },
  cleanUpPoop() {
    if (this.current === "POOPING") {
      return;
    }

    this.dieTime = -1;
    togglePoopBag(true);
    this.startCelebrating();
  },
  startCelebrating() {
    this.current = "CELEBRATING";
    modFox("celebrate");
    this.timeToStartCelebrating = -1;
    this.timeToEndCelebrating = this.clock + 2;
  },
  endCelebrating() {
    this.timeToEndCelebrating = -1;
    this.current = "IDLING";
    this.determineFoxState();

    togglePoopBag(false);
  },
  determineFoxState() {
    if (this.current == "IDLING") {
      if (SCENES[this.scence] == "rain") {
        modFox("rain");
      } else {
        modFox("idling");
      }
    }
  },
  feed() {
    console.log("Feed");

    if (this.current !== "HUNGRY") {
      return;
    }

    this.current = "FEEDING";
    this.dieTime = -1;
    this.poopTime = getNextPoopTime(this.clock);
    modFox("eating");

    this.timeToStartCelebrating = this.clock + 2;
  },
  poop() {
    this.current = "POOPING";
    this.poopTime = -1;
    this.dieTime = getNextDieTime(this.clock);
    modFox("pooping");
  },
};

window.gameState = gameState;

export const handleUserAction = gameState.handleUserAction.bind(gameState);
export default gameState;
