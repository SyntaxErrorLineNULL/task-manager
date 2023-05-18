'use strict';

export class Context {
  #name;

  #value;

  constructor (name, value?) {
    this.#name = name;
    this.#value = value;
    Object.freeze(this);
  }
}
