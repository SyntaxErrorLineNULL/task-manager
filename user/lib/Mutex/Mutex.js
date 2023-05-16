'use strict';

export class Mutex {
  #locked;

  #queue;

  constructor () {
    this.#locked = false;
    this.#queue = [];
  }

  Lock() {
    return new Promise((resolve) => {
      if (!this.#locked) {
        this.#locked = true
        resolve();
      } else {
        this.#queue.push(resolve);
      }
    });
  }

  UnLock() {
    if (!this.#locked) {
      throw new Error('Mutex is not locked');
    }

    this.#locked = false;

    while (this.#queue !== 0) {
      const next = this.#queue.shift();
      this.#locked = true;
      next();
    }
  }
}
