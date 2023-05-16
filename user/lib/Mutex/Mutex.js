'use strict';

export class Mutex {
  #locked;

  #queue;
  constructor () {
    this.#locked = false;
    this.#queue = [];
  }

  lock() {}
}


