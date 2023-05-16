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
  }
}
